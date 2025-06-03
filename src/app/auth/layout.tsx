// app/(admin)/layout.tsx or wherever your layout lives
"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useRouter , usePathname } from "next/navigation";
import AdminHeader from "./header";
import Loading from "@/components/ui/loading";

type LayoutProps = {
  children: ReactNode;
};

const ProtectedContent = ({ children }: LayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if ( !isAuthenticated) {
      router.push("/auth/login");
    }
    
  }, [pathname]);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <main>
      <AuthProvider>
        <ProtectedContent>{children}</ProtectedContent>
      </AuthProvider>
    </main>
  );
};

export default AuthLayout;
