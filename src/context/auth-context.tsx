"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { getFirebaseAuthClient } from "@/lib/firebase";
import { isAdminUser } from "@/lib/admin";
import { toast } from "sonner";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  /** True only when firebase returns a user linked to ADMIN_EMAIL list */
  isAdmin: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};
    try {
      const auth = getFirebaseAuthClient();
      unsub = onAuthStateChanged(auth, (next) => {
        setUser(next);
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }
    return () => unsub();
  }, []);

  const logout = useCallback(async () => {
    try {
      const auth = getFirebaseAuthClient();
      await signOut(auth);
      toast.success("Signed out calmly.");
    } catch {
      toast.error("Could not sign out — retry shortly.");
    }
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuthClient();
    await signInWithEmailAndPassword(auth, email.trim(), password);
    toast.success("Welcome back ✨");
  }, []);

  const signUpEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuthClient();
    await createUserWithEmailAndPassword(auth, email.trim(), password);
    toast.success("Account created.");
  }, []);

  const value = useMemo(() => {
    return {
      user,
      loading,
      isAdmin: isAdminUser(user),
      signInEmail,
      signUpEmail,
      logout,
    } satisfies AuthCtx;
  }, [user, loading, signInEmail, signUpEmail, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must live under AuthProvider");
  return ctx;
}
