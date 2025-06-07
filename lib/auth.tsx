"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}

// Demo users database
const DEMO_USERS: Record<
  string,
  Omit<User, "id"> & { password: string; id: string }
> = {
  mor_2314: {
    id: "1",
    username: "mor_2314",
    password: "83r5^_",
    email: "mor_2314@gmail.com",
    name: "John Doe",
  },
  johnd: {
    id: "2",
    username: "johnd",
    password: "m38rmF$",
    email: "johnd@gmail.com",
    name: "John Doe",
  },
  kevinryan: {
    id: "3",
    username: "kevinryan",
    password: "kev02937@",
    email: "kevinryan@gmail.com",
    name: "Kevin Ryan",
  },
  olana: {
    id: "4",
    username: "olana",
    password: "olana123",
    email: "olana@gmail.com",
    name: "olana kelbesa",
  },
};

// Session storage keys
const SESSION_KEY = "UrjiStore_session";
const SESSION_EXPIRY_KEY = "UrjiStore_session_expiry";

// Session duration (24 hours)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

// Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Session management utilities
const saveSession = (user: User) => {
  const expiryTime = Date.now() + SESSION_DURATION;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
};

const getStoredSession = (): User | null => {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);

    if (!sessionData || !expiryTime) {
      return null;
    }

    // Check if session has expired
    if (Date.now() > Number.parseInt(expiryTime)) {
      clearSession();
      return null;
    }

    return JSON.parse(sessionData);
  } catch (error) {
    console.error("Error reading session:", error);
    clearSession();
    return null;
  }
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_EXPIRY_KEY);
};

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    const storedUser = getStoredSession();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  // Sign in function
  const signIn = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = DEMO_USERS[username];

      if (!userData || userData.password !== password) {
        return {
          success: false,
          error: "Invalid username or password",
        };
      }

      const user: User = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        name: userData.name,
      };

      // Save session
      saveSession(user);
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: "An error occurred during sign in",
      };
    }
  };

  // Sign out function
  const signOut = () => {
    clearSession();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    signUp: async (
      username: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if username already exists
        if (DEMO_USERS[username]) {
          return {
            success: false,
            error: "Username already exists",
          };
        }

        // Check if email already exists
        const emailExists = Object.values(DEMO_USERS).some(
          (user) => user.email === email
        );
        if (emailExists) {
          return {
            success: false,
            error: "Email already registered",
          };
        }

        // Create new user
        const newUser: User = {
          id: (Object.keys(DEMO_USERS).length + 1).toString(),
          username,
          email,
          name: username,
        };

        // In a real app, you would save this to a database
        // For demo purposes, we'll just save it to our DEMO_USERS
        DEMO_USERS[username] = {
          ...newUser,
          password, // In a real app, this should be hashed
        };

        // Don't save session or set user - let them log in separately
        return { success: true };
      } catch (error) {
        console.error("Sign up error:", error);
        return {
          success: false,
          error: "An error occurred during sign up",
        };
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">
              You need to sign in to access this page.
            </p>
            <a
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Sign In
            </a>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
