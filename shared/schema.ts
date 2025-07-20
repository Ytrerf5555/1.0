import { z } from "zod";

// Event types for Firestore collection
export const eventTypeSchema = z.enum(["order", "service-request", "billing-request"]);

// Menu item schema
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  pack: z.boolean().default(false),
});

// Order event schema
export const orderEventSchema = z.object({
  type: z.literal("order"),
  table: z.number(),
  items: z.array(menuItemSchema),
  paymentMode: z.enum(["upi", "cash"]),
  timestamp: z.any(), // Firebase serverTimestamp
});

// Service request event schema
export const serviceRequestEventSchema = z.object({
  type: z.literal("service-request"),
  table: z.number(),
  request: z.enum(["staff", "water", "hot-water", "cleaning"]),
  timestamp: z.any(), // Firebase serverTimestamp
});

// Billing request event schema
export const billingRequestEventSchema = z.object({
  type: z.literal("billing-request"),
  table: z.number(),
  timestamp: z.any(), // Firebase serverTimestamp
});

// Union of all event types
export const eventSchema = z.discriminatedUnion("type", [
  orderEventSchema,
  serviceRequestEventSchema,
  billingRequestEventSchema,
]);

// Insert schemas (without ID)
export const insertOrderEventSchema = orderEventSchema;
export const insertServiceRequestEventSchema = serviceRequestEventSchema;
export const insertBillingRequestEventSchema = billingRequestEventSchema;

// Types
export type EventType = z.infer<typeof eventTypeSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type OrderEvent = z.infer<typeof orderEventSchema>;
export type ServiceRequestEvent = z.infer<typeof serviceRequestEventSchema>;
export type BillingRequestEvent = z.infer<typeof billingRequestEventSchema>;
export type Event = z.infer<typeof eventSchema>;
export type InsertOrderEvent = z.infer<typeof insertOrderEventSchema>;
export type InsertServiceRequestEvent = z.infer<typeof insertServiceRequestEventSchema>;
export type InsertBillingRequestEvent = z.infer<typeof insertBillingRequestEventSchema>;

// Menu data
export const MENU_ITEMS = [
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with aromatic spices",
    price: 280,
    category: "starters",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  },
  {
    id: "veg-samosa",
    name: "Veg Samosa",
    description: "Crispy pastry filled with spiced vegetables",
    price: 120,
    category: "starters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  },
  {
    id: "chicken-seekh",
    name: "Chicken Seekh Kebab",
    description: "Minced chicken grilled with traditional spices",
    price: 320,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  },
  {
    id: "garden-salad",
    name: "Fresh Garden Salad",
    description: "Mixed greens with seasonal vegetables",
    price: 180,
    category: "starters",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
  },
];

export const MENU_CATEGORIES = [
  { id: "starters", name: "Starters" },
  { id: "main-course", name: "Main Course" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" },
];
