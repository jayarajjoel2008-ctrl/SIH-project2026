import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div className="w-9 h-9 border-4 border-slate-200 border-t-[#584CE4] rounded-full animate-spin"></div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError && authError.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  if (!isAuthenticated) {
    const returnPath = location.pathname + location.search;
    return unauthenticatedElement || <Navigate to={`/login?returnTo=${encodeURIComponent(returnPath)}`} replace />;
  }

  return <Outlet />;
}
