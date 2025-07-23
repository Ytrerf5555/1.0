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

    console.log("Attempting to place order...", { cart, tableNumber, paymentMode });

    try {
      const order: InsertOrderEvent = {
        type: "order",
        table: tableNumber,
        items: cart,
        paymentMode,
        timestamp: serverTimestamp()
      };

      console.log("Order data prepared:", order);
      
      const docRef = await addDoc(collection(db, "events"), order);
      console.log("Order placed successfully with ID:", docRef.id);
      
      // Clear cart after successful order
      setCart([]);
      setPackFullOrder(false);
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${docRef.id.slice(-6)} has been sent to the kitchen.`,
      });
    } catch (error) {
      console.error("Detailed error placing order:", error);
      console.error("Error name:", (error as any)?.name);
      console.error("Error message:", (error as any)?.message);
      console.error("Error code:", (error as any)?.code);
      
      toast({
        title: "Error placing order",
        description: `Failed to submit order: ${(error as any)?.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const total = calculateTotal();

  return (
    <Card className="bg-secondary-dark border-gray-700">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Your Order</h3>
        
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              {cart.map((item) => (
                <Card key={item.id} className="bg-primary-dark border-gray-700">
                  <CardContent className="p-2.5 sm:p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm sm:text-base truncate mr-2">{item.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger-red hover:text-red-400 h-5 w-5 sm:h-6 sm:w-6 p-0 flex-shrink-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 bg-gray-600 hover:bg-gray-500"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={10} />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 sm:w-16 h-6 text-center bg-transparent border-none p-0 text-sm"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 bg-accent-orange hover:bg-orange-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={10} />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-2">
                        <div className="flex items-center space-x-1">
                          <Checkbox
                            id={`pack-${item.id}`}
                            checked={item.pack}
                            onCheckedChange={() => toggleItemPack(item.id)}
                          />
                          <Label htmlFor={`pack-${item.id}`} className="text-xs sm:text-sm">
                            Pack
                          </Label>
                        </div>
                        <span className="text-accent-orange font-bold text-sm sm:text-base">
                          ₹{getItemPrice(item.id) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Options */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pack-all"
                  checked={packFullOrder}
                  onCheckedChange={handlePackFullOrder}
                />
                <Label htmlFor="pack-all" className="text-sm sm:text-base">Pack entire order</Label>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Payment Method:</p>
                <RadioGroup value={paymentMode} onValueChange={(value: "upi" | "cash") => setPaymentMode(value)} className="flex flex-row sm:flex-col gap-4 sm:gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="text-sm sm:text-base">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="text-sm sm:text-base">UPI</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-3 sm:pt-4">
              <div className="flex justify-between text-base sm:text-lg font-bold mb-3 sm:mb-4">
                <span>Total:</span>
                <span className="text-accent-orange">₹{total}</span>
              </div>
              <Button 
                className="w-full bg-accent-orange hover:bg-orange-600 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base"
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
