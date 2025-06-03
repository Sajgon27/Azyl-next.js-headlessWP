import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import axiosConfig from "../../axiosConfig";
import { usePathname, useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>; // or just void if not async
  logout: () => void;
};
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
  
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "true",
        },
      })
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathname]);

  const login = async (data: LoginData) => {
    const responsecookie = await axiosConfig.get(
      `http://localhost:8000/sanctum/csrf-cookie`,
      {
        withCredentials: true,
      }
    );

    const response = await axiosConfig.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
      data,

      {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    setIsAuthenticated(true);
router.push("/auth/panel");
};

  const logout = () => {
    axiosConfig.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    );
    setIsAuthenticated(false);
    alert("Zostałeś wylogowany");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
