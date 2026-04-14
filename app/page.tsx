"use client";
import React, { useState } from 'react';

export default function QuitoFreshEcommerce() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const flavors = [
    { id: 1, name: "ANDINA", type: "Mora Silvestre", price: 4.50, accent: "#3b0a0a", bg: "#f7d9e1" },
    { id: 2, name: "VITAL", type: "Frutos Rojos", price: 4.50, accent: "#8B0000", bg: "#FFE4E1" },
    { id: 3, name: "DETOX", type: "Manzana Verde", price: 4.50, accent: "#1A2F1A", bg: "#E8F5E9" },
    { id: 4, name: "GOLD", type: "Maracuyá Real", price: 4.50, accent: "#B8860B", bg: "#FFFDE7" },
    { id: 5, name: "AMAZON", type: "Guayusa & Limón", price: 5.00, accent: "#2E7D32", bg: "#DCEDC8" },
    { id: 6, name: "SUNRISE", type: "Naranja & Cúrcuma", price: 4.75, accent: "#E65100", bg: "#FFF3E0" }
  ];

  const addToCart = (flavor) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === flavor.id);
      if (existing) {
        return prev.map(item => item.id === flavor.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...flavor, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const sendWhatsApp = () => {
    const detail = cart.map(item => `🥤 *${item.name}* (${item.type}) x${item.qty}`).join('%0A');
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);
    const text = `✨ *NUEVO PEDIDO - QUITO FRESH* ✨%0A%0AHola, quiero mi pack premium:%0A%0A${detail}%0A%0A💰 *Total:* $${total}%0A%0A📍 *¡Espero mi entrega andina!* 🏔️🍏`;
    window.open(`https://wa.me/593995849214?text=${text}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', color: '#1A1A1A', fontFamily: '"Outfit", sans-serif', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&family=Playfair+Display:ital,wght@1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .flavor-card { padding: 40px; border-radius: 40px; transition: 0.4s; display: flex; flex-direction: column; align-items: center; border: 1px solid transparent; cursor: pointer; }
        .flavor-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }
        .cart-sidebar { position: fixed; right: 0; top: 0; height: 100%; width: 350px; background: white; z-index: 1000; box-shadow: -10px 0 30px rgba(0,0,0,0.1); padding: 40px; transition: 0.5s; transform: ${isCartOpen ? 'translateX(0)' : 'translateX(100%)'}; }
      ` }} />

      {/* HEADER */}
      <nav style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', z_index: 100, boxSizing: 'border-box', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontWeight: 900, letterSpacing: '4px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
          🛒 CARRITO ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="font-serif" style={{ fontSize: '8vw', margin: 0 }}>The Cold <span style={{ fontStyle: 'italic', color: '#D32F2F' }}>Press</span></h1>
        <p style={{ letterSpacing: '3px', color: '#666' }}>COLECCIÓN PREMIUM 2026</p>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section style={{ padding: '0 40px 100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {flavors.map(f => (
            <div key={f.id} className="flavor-card" style={{ backgroundColor: f.bg }}>
              <span style={{ fontSize: '10px', fontWeight: 900, color: f.accent }}>EDICIÓN LIMITADA</span>
              <h3 className="font-serif" style={{ fontSize: '2rem', margin: '10px 0' }}>{f.name}</h3>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{f.type}</p>
              <p style={{ fontWeight: 700, margin: '20px 0' }}>${f.price.toFixed(2)}</p>
              <button onClick={() => addToCart(f)} style={{ background: f.accent, color: 'white', border: 'none', padding: '12px 30px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>
                AÑADIR +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* INFORMACIÓN EXTRA DE MARCA */}
      <section style={{ padding: '100px 40px', background: '#fff', textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: '3rem' }}>Pureza sin Concesiones</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px', marginTop: '50px' }}>
              <div style={{ maxWidth: '250px' }}>
                  <h4 style={{ fontWeight: 900 }}>SOSTENIBLE</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Frutas seleccionadas directamente de valles andinos, apoyando al productor local.</p>
              </div>
              <div style={{ maxWidth: '250px' }}>
                  <h4 style={{ fontWeight: 900 }}>TECNOLOGÍA</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Prensado en frío que mantiene el 100% de los nutrientes y enzimas vivas.</p>
              </div>
          </div>
      </section>

      {/* SIDEBAR DEL CARRITO */}
      <div className="cart-sidebar">
        <button onClick={() => setIsCartOpen(false)} style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        <h2 className="font-serif" style={{ marginTop: '40px' }}>Tu Pack</h2>
        <div style={{ margin: '40px 0', maxHeight: '60vh', overflowY: 'auto' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>x{item.qty}</div>
              </div>
              <div>${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length === 0 && <p>Tu carrito está vacío.</p>}
        </div>
        {cart.length > 0 && (
          <div style={{ borderTop: '2px solid #1A1A1A', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.2rem', marginBottom: '30px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={sendWhatsApp} style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '20px', borderRadius: '15px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
              ORDENAR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>

      <footer style={{ padding: '60px', textAlign: 'center', color: '#AAA', fontSize: '0.8rem' }}>
        QUITO FRESH BY ECOS BRANDING & ORCA STUDIOS © 2026
      </footer>
    </div>
  );
}
