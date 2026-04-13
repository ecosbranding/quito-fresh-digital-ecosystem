import { create } from 'zustand';

interface CartItem { id: string; name: string; price: number; quantity: number; image: string; }

interface CartStore {
  isOpen: boolean;
  items: CartItem[];
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  total: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  isOpen: false,
  items: [],
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => i.id === newItem.id);
    if (existing) {
      return { items: state.items.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }] };
  }),
  total: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
}));
