import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function AdminHeader() {
  const pathname = usePathname();
  const { isAuthenticated , isLoading, logout } = useAuth();


  const pageTitles: Record<string, string> = {
    "/auth/panel": "Lista zwierząt",
    "/auth/add-animal": "Dodaj zwierzę",
    "/auth-login": "Logowanie Administratora",
  };
  const pageTitle = pageTitles[pathname] || "Panel Administratora";


  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthenticated) {
      logout();
    }
  }

  if (!isAuthenticated || isLoading) {
    return; // or redirect to login page
  }

  return (
    <>
      {/* Navbar */}
      <div className="w-full bg-gray-200">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 h-26 justify-between">
            <div className="shrink-0">
              <img alt="Your Company" src="/logo.png" className="size-14" />
            </div>
            <ul className="flex gap-8">
              <li className="bg-red-400 text-white cursor-pointer hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                <Link href="/auth/panel">Lista zwierząt</Link>
              </li>
              <li className="bg-red-400 text-white cursor-pointer hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                <Link href="/auth/add-animal">Dodaj zwierzę</Link>
              </li>
            </ul>
          </div> 
        
            <div>
              <form onSubmit={handleLogout}>
                <button
                  type="submit"
                  className="bg-red-600 cursor-pointer text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Wyloguj się
                </button>
              </form>
            </div>
          
        </div>
      </div>

      {/* Dynamic Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {pageTitle}
          </h1>
        </div>
      </header>
    </>
  );
}
