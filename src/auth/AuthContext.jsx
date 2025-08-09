import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { meApi, loginApi, registerApi } from "./api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setUser(null);
      localStorage.removeItem("auth_user");
      return;
    }
    (async () => {
      try {
        const u = await meApi(token);
        setUser(u);
        localStorage.setItem("auth_user", JSON.stringify(u));
      } catch {
        setToken(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    })();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      async register(email, password) {
        setLoading(true);
        try {
          await registerApi({ email, password });
          return true;
        } finally {
          setLoading(false);
        }
      },
      async login(email, password) {
        setLoading(true);
        try {
          const { access_token } = await loginApi({ email, password });
          setToken(access_token);
          localStorage.setItem("auth_token", access_token);
          const u = await meApi(access_token);
          setUser(u);
          localStorage.setItem("auth_user", JSON.stringify(u));
          return true;
        } finally {
          setLoading(false);
        }
      },
      logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      },
    }),
    [token, user, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useDisplayName() {
  const { user } = useAuth();
  if (!user?.email) return null;
  const name = user.email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
