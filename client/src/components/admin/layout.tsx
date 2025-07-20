import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, BarChart3, ShoppingBag, DollarSign, Bell, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();

  const getActiveRoute = (): string => {
    if (location === "/admin/orders") return "/admin/orders";
    if (location === "/admin/billing") return "/admin/billing";
    if (location === "/admin/requests") return "/admin/requests";
    return "/admin";
  };

  const activeRoute = getActiveRoute();

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-secondary-dark min-h-screen p-4">
        <div className="flex items-center space-x-3 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-warning-yellow rounded-lg flex items-center justify-center">
              <BarChart3 className="text-black" size={16} />
            </div>
            <h1 className="text-lg font-bold">Admin</h1>
          </div>
        </div>

        <ul className="space-y-2">
          <li>
            <Link href="/admin">
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 ${
                  activeRoute === "/admin" 
                    ? "bg-warning-yellow text-black font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-primary-dark"
                }`}
              >
                <Home className="mr-3" size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/admin/orders">
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 ${
                  activeRoute === "/admin/orders" 
                    ? "bg-warning-yellow text-black font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-primary-dark"
                }`}
              >
                <ShoppingBag className="mr-3" size={16} />
                <span>Live Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/admin/billing">
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 ${
                  activeRoute === "/admin/billing" 
                    ? "bg-warning-yellow text-black font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-primary-dark"
                }`}
              >
                <DollarSign className="mr-3" size={16} />
                <span>Billing</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/admin/requests">
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 ${
                  activeRoute === "/admin/requests" 
                    ? "bg-warning-yellow text-black font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-primary-dark"
                }`}
              >
                <Bell className="mr-3" size={16} />
                <span>Service Requests</span>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
