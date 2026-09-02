import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    svi_score: { type: "number", description: "Stress Vulnerability Index 0-100" },
    risk_category: { type: "string", enum: ["Low", "Moderate", "High", "Critical"] },
    detected_indicators: {
      type: "array",
      items: { type: "string" },
      description: "Detected indicators from: trauma, fear, depression, suicidal ideation, intimidation, social isolation, extreme vulnerability"
    },
    voice_insights: {
      type: "object",
      properties: {
        pitch_variation: { type: "string" },
        pause_pattern: { type: "string" },
        speech_rate: { type: "string" },
        emotional_tone: { type: "string" }
      }
    },
    recommendations: {
      type: "array",
      items: { type: "string" },
      description: "Recommended actions from: counselling, legal aid, medical assistance, police intervention, witness protection, emergency support"
    },
    summary: { type: "string", description: "Clinical summary of the assessment" }
  },
  required: ["svi_score", "risk_category", "detected_indicators", "recommendations", "summary"]
};

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { narrative, language, self_reported_stress, voice_features, input_mode, primary_concern } = body || {};

    if (!narrative || !narrative.trim()) {
      return Response.json({ error: 'Narrative text is required for analysis' }, { status: 400 });
    }

    const stressHint = self_reported_stress ? `The complainant self-reported a stress level of ${self_reported_stress}/10.` : '';
    const voiceHint = voice_features
      ? `Voice analytics detected: pitch variation = ${voice_features.pitch_variation || 'n/a'}, pause pattern = ${voice_features.pause_pattern || 'n/a'}, speech rate = ${voice_features.speech_rate || 'n/a'}, emotional tone = ${voice_features.emotional_tone || 'n/a'}.`
      : 'No voice analytics available (text-based input).';
    const concernHint = primary_concern ? `Primary reported concern: ${primary_concern}.` : '';

    const prompt = `You are a trauma-informed clinical AI assistant supporting the National Helpline Against Atrocities (NHAA 14566) in India, which serves victims and complainants from Scheduled Castes and Scheduled Tribes who have faced caste-based discrimination, violence, social boycott, displacement, threats, or prolonged legal distress.

Analyze the following complainant narrative and produce a real-time stress and trauma assessment. Be sensitive, ethical, and clinically grounded. Do not diagnose a medical condition; produce a screening-level assessment.

Interaction language: ${language || 'English'}.
${concernHint}
${stressHint}
${voiceHint}

Complainant narrative:
"""
${narrative}
"""

Tasks:
1. Compute a Stress Vulnerability Index (SVI) from 0 to 100, considering detected emotional indicators, self-reported stress, voice features (if any), and severity of described trauma.
2. Categorize risk as Low (0-30), Moderate (31-55), High (56-80), or Critical (81-100).
3. Detect indicators present from: trauma, fear, depression, suicidal ideation, intimidation, social isolation, extreme vulnerability. Only list indicators actually suggested by the narrative.
4. If suicidal ideation or immediate danger is detected, ALWAYS include "emergency support" in recommendations and escalate to Critical.
5. Recommend appropriate actions from: counselling, legal aid, medical assistance, police intervention, witness protection, emergency support. Tailor to the risk level and indicators.
6. Write a brief, compassionate, non-stigmatizing clinical summary (2-4 sentences).

Return strictly valid JSON matching the schema.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: ANALYSIS_SCHEMA,
      model: "gpt_5_mini"
    });

    // Clamp and normalize
    let svi = Number(result.svi_score);
    if (isNaN(svi)) svi = 50;
    svi = Math.max(0, Math.min(100, Math.round(svi)));

    let category = result.risk_category;
    if (!["Low", "Moderate", "High", "Critical"].includes(category)) {
      category = svi <= 30 ? "Low" : svi <= 55 ? "Moderate" : svi <= 80 ? "High" : "Critical";
    }
    // Force critical if suicidal ideation detected
    const indicators = Array.isArray(result.detected_indicators) ? result.detected_indicators : [];
    if (indicators.some(i => /suicid/i.test(String(i)))) {
      category = "Critical";
      svi = Math.max(svi, 81);
    }

    let recommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
    if (category === "Critical" && !recommendations.some(r => /emergency/i.test(String(r)))) {
      recommendations.unshift("emergency support");
    }

    const voice_insights = result.voice_insights || voice_features || null;

    return Response.json({
      svi_score: svi,
      risk_category: category,
      detected_indicators: indicators,
      voice_features: voice_insights,
      recommendations,
      summary: result.summary || ''
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}