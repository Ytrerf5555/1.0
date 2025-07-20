import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FoodMenu from "@/components/customer/food-menu";
import Cart from "@/components/customer/cart";
import ServiceRequests from "@/components/customer/service-requests";
import type { MenuItem } from "@shared/schema";

export default function CustomerPanel() {
  const [tableNumber, setTableNumber] = useState<number>(5);
  const [cart, setCart] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Get table number from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get('table');
    if (table) {
      setTableNumber(parseInt(table, 10));
    }
  }, []);

  return (
    <div className="min-h-screen bg-primary-dark">
      <header className="bg-secondary-dark p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-orange rounded-lg flex items-center justify-center">
                <Utensils className="text-white" size={16} />
              </div>
              <h1 className="text-xl font-bold">Table {tableNumber}</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Welcome Guest</p>
            <p className="text-accent-orange font-semibold text-sm">Ready to Order</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 order-1 lg:order-1">
            <FoodMenu cart={cart} setCart={setCart} />
          </div>
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
            <Cart 
              cart={cart} 
              setCart={setCart} 
              tableNumber={tableNumber} 
            />
            <ServiceRequests tableNumber={tableNumber} />
          </div>
        </div>
      </main>
    </div>
  );
}
