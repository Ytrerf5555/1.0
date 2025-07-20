import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Clock,
  TrendingUp,
  Plus,
  Table,
  BarChart3,
  Settings
} from "lucide-react";
import type { OrderEvent } from "@shared/schema";

interface OrderWithId extends OrderEvent {
  id: string;
}

export default function DashboardPage() {
  const [todayOrders, setTodayOrders] = useState<OrderWithId[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "events"),
      where("type", "==", "order")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData: OrderWithId[] = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        ordersData.push({ ...data, id: doc.id } as OrderWithId);
      });
      setTodayOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const todayRevenue = todayOrders.reduce((total, order) => {
    return total + order.items.reduce((orderTotal, item) => {
      const itemPrice = getItemPrice(item.id);
      return orderTotal + (itemPrice * item.quantity);
    }, 0);
  }, 0);

  const activeTables = new Set(todayOrders.map(order => order.table)).size;

  function getItemPrice(itemId: string): number {
    const prices: Record<string, number> = {
      'paneer-tikka': 280,
      'veg-samosa': 120,
      'chicken-seekh': 320,
      'garden-salad': 180,
    };
    return prices[itemId] || 0;
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-400 text-sm sm:text-base">Real-time restaurant management analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card className="bg-secondary-dark border-gray-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Today's Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-accent-orange">{todayOrders.length}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-accent-orange rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-white" size={16} />
              </div>
            </div>
            <p className="text-success-green text-xs sm:text-sm mt-2">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary-dark border-gray-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-success-green">₹{todayRevenue.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-success-green rounded-lg flex items-center justify-center">
                <DollarSign className="text-white" size={16} />
              </div>
            </div>
            <p className="text-success-green text-xs sm:text-sm mt-2">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary-dark border-gray-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Active Tables</p>
                <p className="text-lg sm:text-2xl font-bold text-warning-yellow">{activeTables}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-warning-yellow rounded-lg flex items-center justify-center">
                <Users className="text-black" size={16} />
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">out of 12 tables</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary-dark border-gray-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Avg Order Time</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-400">18</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={16} />
              </div>
            </div>
            <p className="text-success-green text-xs sm:text-sm mt-2">-3 min from avg</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="bg-secondary-dark border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">Recent Orders</h3>
                <Button variant="ghost" className="text-accent-orange hover:text-orange-400 text-xs sm:text-sm font-medium">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {todayOrders.slice(-3).reverse().map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-primary-dark rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-orange rounded-full flex items-center justify-center">
                        <span className="font-bold text-white">{order.table}</span>
                      </div>
                      <div>
                        <p className="font-medium">Table {order.table} - ₹{order.items.reduce((total, item) => total + (getItemPrice(item.id) * item.quantity), 0)}</p>
                        <p className="text-gray-400 text-sm">{order.items.length} items • 2 min ago</p>
                      </div>
                    </div>
                    <Badge className="bg-success-green text-white">Completed</Badge>
                  </div>
                ))}
                
                {todayOrders.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No orders yet today
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-secondary-dark border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Actions</h3>
              <div className="space-y-3 sm:space-y-4">
                <Button variant="ghost" className="w-full flex items-center justify-between p-3 sm:p-4 bg-primary-dark hover:bg-gray-700 rounded-lg h-auto">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Plus className="text-accent-orange" size={14} />
                    <span className="text-sm sm:text-base">Add New Item</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>

                <Button variant="ghost" className="w-full flex items-center justify-between p-3 sm:p-4 bg-primary-dark hover:bg-gray-700 rounded-lg h-auto">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Table className="text-success-green" size={14} />
                    <span className="text-sm sm:text-base">Manage Tables</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>

                <Button variant="ghost" className="w-full flex items-center justify-between p-3 sm:p-4 bg-primary-dark hover:bg-gray-700 rounded-lg h-auto">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <BarChart3 className="text-warning-yellow" size={14} />
                    <span className="text-sm sm:text-base">View Reports</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>

                <Button variant="ghost" className="w-full flex items-center justify-between p-3 sm:p-4 bg-primary-dark hover:bg-gray-700 rounded-lg h-auto">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Settings className="text-blue-400" size={14} />
                    <span className="text-sm sm:text-base">Settings</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
