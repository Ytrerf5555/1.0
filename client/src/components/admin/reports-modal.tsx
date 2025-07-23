import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, TrendingUp, DollarSign, ShoppingBag, Users, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ReportPeriod = 'today' | 'week' | 'month' | 'quarter' | 'year';

const mockReportData = {
  today: {
    revenue: 15420,
    orders: 45,
    customers: 38,
    avgOrderValue: 342,
    popularItems: [
      { name: "Butter Chicken", orders: 12, revenue: 2400 },
      { name: "Paneer Tikka", orders: 8, revenue: 1600 },
      { name: "Biryani", orders: 7, revenue: 1750 },
    ],
    hourlyStats: [
      { hour: "12:00", orders: 5, revenue: 1250 },
      { hour: "13:00", orders: 8, revenue: 2100 },
      { hour: "14:00", orders: 12, revenue: 3200 },
      { hour: "19:00", orders: 15, revenue: 4500 },
      { hour: "20:00", orders: 5, revenue: 1200 },
    ]
  },
  week: {
    revenue: 89560,
    orders: 234,
    customers: 189,
    avgOrderValue: 383,
    popularItems: [
      { name: "Butter Chicken", orders: 45, revenue: 9000 },
      { name: "Dal Makhani", orders: 38, revenue: 7600 },
      { name: "Naan", orders: 52, revenue: 2600 },
    ]
  },
  month: {
    revenue: 345000,
    orders: 987,
    customers: 654,
    avgOrderValue: 349,
    popularItems: [
      { name: "Butter Chicken", orders: 156, revenue: 31200 },
      { name: "Paneer Tikka", orders: 134, revenue: 26800 },
      { name: "Biryani", orders: 98, revenue: 24500 },
    ]
  }
};

export default function ReportsModal({ open, onOpenChange }: ReportsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('today');
  const { toast } = useToast();

  const currentData = mockReportData[selectedPeriod as keyof typeof mockReportData] || mockReportData.today;

  const exportReport = () => {
    // In a real app, this would generate and download a CSV/PDF report
    toast({
      title: "Report exported!",
      description: `${selectedPeriod} report has been downloaded`,
    });
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] bg-secondary-dark border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Business Reports & Analytics</DialogTitle>
        </DialogHeader>

        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="text-accent-orange" size={20} />
            <Select value={selectedPeriod} onValueChange={(value: ReportPeriod) => setSelectedPeriod(value)}>
              <SelectTrigger className="w-40 bg-primary-dark border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={exportReport}
            className="bg-success-green hover:bg-green-600"
          >
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-primary-dark border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-success-green" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Revenue</div>
                  <div className="text-lg font-bold">{formatCurrency(currentData.revenue)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-dark border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="text-accent-orange" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Orders</div>
                  <div className="text-lg font-bold">{currentData.orders}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-dark border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="text-warning-yellow" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Customers</div>
                  <div className="text-lg font-bold">{currentData.customers}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-dark border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-blue-400" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Avg Order</div>
                  <div className="text-lg font-bold">{formatCurrency(currentData.avgOrderValue)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Popular Items */}
          <Card className="bg-primary-dark border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="text-warning-yellow" size={18} />
                <span>Top Selling Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.popularItems.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary-dark rounded-lg">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-400">{item.orders} orders</div>
                    </div>
                    <div className="text-success-green font-bold">
                      {formatCurrency(item.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hourly Performance (Today only) */}
          {selectedPeriod === 'today' && (
            <Card className="bg-primary-dark border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="text-blue-400" size={18} />
                  <span>Hourly Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.hourlyStats?.map((stat: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-dark rounded-lg">
                      <div className="font-medium">{stat.hour}</div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="text-gray-400">Orders: </span>
                          <span className="text-accent-orange">{stat.orders}</span>
                        </div>
                        <div className="text-success-green font-bold">
                          {formatCurrency(stat.revenue)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weekly/Monthly Summary */}
          {selectedPeriod !== 'today' && (
            <Card className="bg-primary-dark border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="text-success-green" size={18} />
                  <span>Performance Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary-dark rounded-lg">
                    <span className="text-gray-400">Average Daily Revenue</span>
                    <span className="font-bold text-success-green">
                      {formatCurrency(Math.round(currentData.revenue / (selectedPeriod === 'week' ? 7 : 30)))}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary-dark rounded-lg">
                    <span className="text-gray-400">Average Daily Orders</span>
                    <span className="font-bold text-accent-orange">
                      {Math.round(currentData.orders / (selectedPeriod === 'week' ? 7 : 30))}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary-dark rounded-lg">
                    <span className="text-gray-400">Customer Retention</span>
                    <span className="font-bold text-warning-yellow">73%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary-dark rounded-lg">
                    <span className="text-gray-400">Growth vs Previous Period</span>
                    <span className="font-bold text-success-green">+12.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="ghost"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}