"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { User, AuthState } from "@/types";

type AuthAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        dispatch({ type: "SET_LOADING", payload: false });
        return false;
      }

      const user = await response.json();
      dispatch({ type: "SET_USER", payload: user });
      return true;
    } catch {
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const value = useMemo(
    () => ({ ...state, login, logout }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
