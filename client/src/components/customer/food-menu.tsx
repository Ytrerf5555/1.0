import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MENU_ITEMS, MENU_CATEGORIES } from "@shared/schema";
import type { MenuItem } from "@shared/schema";

interface FoodMenuProps {
  cart: MenuItem[];
  setCart: (cart: MenuItem[]) => void;
}

export default function FoodMenu({ cart, setCart }: FoodMenuProps) {
  const [activeCategory, setActiveCategory] = useState("starters");

  const addToCart = (itemId: string, name: string) => {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
      // If exists, increase quantity
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // If doesn't exist, add new item
      setCart([...cart, {
        id: itemId,
        name,
        quantity: 1,
        pack: false
      }]);
    }
  };

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <Card className="bg-secondary-dark border-gray-700">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our Menu</h2>
        
        {/* Category Tabs */}
        <div className="flex space-x-1 mb-4 sm:mb-6 bg-primary-dark rounded-lg p-1 overflow-x-auto scrollbar-hide">
          {MENU_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                activeCategory === category.id 
                  ? "bg-accent-orange text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-primary-dark border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-28 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3"
                />
                <h3 className="font-semibold mb-1 text-sm sm:text-base">{item.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-accent-orange font-bold text-sm sm:text-base">₹{item.price}</span>
                  <Button 
                    className="bg-accent-orange hover:bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex-shrink-0"
                    onClick={() => addToCart(item.id, item.name)}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No items available in this category
          </div>
        )}
      </CardContent>
    </Card>
  );
}
