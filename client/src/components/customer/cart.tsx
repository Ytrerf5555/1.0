import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MENU_ITEMS } from "@shared/schema";
import type { MenuItem, InsertOrderEvent } from "@shared/schema";

interface CartProps {
  cart: MenuItem[];
  setCart: (cart: MenuItem[]) => void;
  tableNumber: number;
}

export default function Cart({ cart, setCart, tableNumber }: CartProps) {
  const [paymentMode, setPaymentMode] = useState<"upi" | "cash">("upi");
  const [packFullOrder, setPackFullOrder] = useState(false);
  const { toast } = useToast();

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const toggleItemPack = (itemId: string) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, pack: !item.pack }
        : item
    ));
  };

  const handlePackFullOrder = (checked: boolean) => {
    setPackFullOrder(checked);
    setCart(cart.map(item => ({ ...item, pack: checked })));
  };

  const getItemPrice = (itemId: string): number => {
    const menuItem = MENU_ITEMS.find(item => item.id === itemId);
    return menuItem?.price || 0;
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => {
      const itemPrice = getItemPrice(item.id);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    try {
      const order: InsertOrderEvent = {
        type: "order",
        table: tableNumber,
        items: cart,
        paymentMode,
        timestamp: serverTimestamp()
      };

      await addDoc(collection(db, "events"), order);
      
      // Clear cart after successful order
      setCart([]);
      setPackFullOrder(false);
      
      toast({
        title: "Order placed successfully!",
        description: `Your order has been sent to the kitchen.`,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error placing order",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const total = calculateTotal();

  return (
    <Card className="bg-secondary-dark border-gray-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Your Order</h3>
        
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <Card key={item.id} className="bg-primary-dark border-gray-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger-red hover:text-red-400 h-6 w-6 p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 bg-gray-600 hover:bg-gray-500"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-6 text-center bg-transparent border-none p-0"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 bg-accent-orange hover:bg-orange-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Checkbox
                            id={`pack-${item.id}`}
                            checked={item.pack}
                            onCheckedChange={() => toggleItemPack(item.id)}
                          />
                          <Label htmlFor={`pack-${item.id}`} className="text-sm">
                            Pack
                          </Label>
                        </div>
                        <span className="text-accent-orange font-bold">
                          ₹{getItemPrice(item.id) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Options */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pack-all"
                  checked={packFullOrder}
                  onCheckedChange={handlePackFullOrder}
                />
                <Label htmlFor="pack-all">Pack entire order</Label>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Payment Method:</p>
                <RadioGroup value={paymentMode} onValueChange={(value: "upi" | "cash") => setPaymentMode(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span className="text-accent-orange">₹{total}</span>
              </div>
              <Button 
                className="w-full bg-accent-orange hover:bg-orange-600 text-white font-semibold py-3"
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
