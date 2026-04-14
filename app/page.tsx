"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshUltimate() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "ANDINA", desc: "Mora Silvestre & Esencias", price: 4.50, color: "#631024", bg: "#FCE4EC" },
    { id: 2, name: "VITAL", desc: "Mix de Frutos Rojos Premium", price: 4.50, color: "#A34848", bg: "#FFEBEE" },
    { id: 3, name: "DETOX", desc: "Manzana Verde & Espinaca", price: 4.50, color: "#4A6B4A", bg: "#F1F8E9" },
    { id: 4, name: "GOLD", desc: "Maracuyá Real & Cúrcuma", price: 4.50, color: "#B8860B", bg: "#FFFDE7" },
    { id: 5, name: "AMAZON", desc: "Guayusa Energizante", price: 5.00, color: "#2E7D32", bg: "#E8F5E9" },
    { id: 6, name: "SUNRISE", desc: "Zanahoria & Jengibre", price: 4.75, color: "#E65100", bg: "#FFF3E0" },
    { id: 7, name: "PURE", desc: "Agua de Coco & Electrolitos", price: 4.00, color: "#0288D1", bg: "#E1F5FE" },
    { id: 8, name: "RELAX", desc: "Lavanda & Arándanos", price: 5.50, color: "#512DA8", bg: "#EDE7F6" }
  ];

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const checkout = () => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty} ($${(i.price * i.qty).toFixed(2)})`).join('%0A');
    const msg = `✨ *ORDEN PREMIUM - QUITO FRESH* ✨%0A%0A¡Hola! He seleccionado estos productos para mi pack de bienestar:%0A%0A${items}%0A%0A💰 *TOTAL:* $${total}%0A%0A📍 *Por favor, confírmenme disponibilidad para entrega.* 🏔️🍃`;
    window.open(`https://wa.me/593995849214?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0, minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;900&family=Playfair+Display:ital,wght@1,600&display=swap');
        .font-brand { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .card { transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .cart-overlay { position: fixed; right: 0; top: 0; width: 100%; max-width: 400px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.5s; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; }
      ` }} />

      {/* HEADER BAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '25px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 100, boxSizing: 'border-box' }}>
        <div className="font-brand" style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '4px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="font-brand" style={{ background: '#1A1A1A', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>
          PEDIDO ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#FAFAFA', padding: '0 20px' }}>
        <h1 className="font-serif" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', margin: 0 }}>Natural <span style={{ fontStyle: 'italic', color: '#D32F2F' }}>Performance</span></h1>
        <p className="font-brand" style={{ letterSpacing: '5px', opacity: 0.5, marginTop: '20px', fontSize: '12px' }}>PRENSADO EN FRÍO • SIN ADITIVOS • 100% REAL</p>
      </header>

      {/* MARCA E INFO */}
      <section style={{ padding: '100px 50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: '3rem' }}>Nuestra Filosofía</h2>
          <p className="font-brand" style={{ lineHeight: 1.8, opacity: 0.7 }}>Extraemos la esencia de la tierra para alimentar tu potencial. En Quito Fresh, el lujo es la pureza absoluta. Cada gota es un activo para tu bienestar físico y mental.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '20px' }}>⭐ <strong>Prensado en frío:</strong> Máxima retención de nutrientes.</div>
          <div style={{ marginBottom: '20px' }}>🌿 <strong>Sostenible:</strong> Apoyo directo a valles locales.</div>
          <div>♻️ <strong>Envase Premium:</strong> Diseñado para conservar la frescura.</div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <main style={{ padding: '50px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '50px', textAlign: 'center' }}>El Catálogo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className="card" style={{ backgroundColor: p.bg, padding: '50px 30px', borderRadius: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: p.color, letterSpacing: '2px', marginBottom: '15px' }}>LIMITED EDITION</div>
              <h3 className="font-serif" style={{ fontSize: '2.5rem', margin: 0 }}>{p.name}</h3>
              <p className="font-brand" style={{ fontSize: '14px', opacity: 0.6, margin: '10px 0 25px 0' }}>{p.desc}</p>
              <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '25px' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} style={{ background: '#1A1A1A', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '50px', fontWeight: 900, cursor: 'pointer', width: '100%' }}>AÑADIR +</button>
            </div>
          ))}
        </div>
      </main>

      {/* CARRITO SIDEBAR */}
      <div className="cart-overlay">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: '2rem' }}>Tu Selección</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', margin: '30px 0' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{i.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.5 }}>Cant: {i.qty}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <strong>${(i.price * i.qty).toFixed(2)}</strong>
                <button onClick={() => removeFromCart(i.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '50px' }}>Tu pack está vacío</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '2px solid #000', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 900, marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} style={{ width: '100%', background: '#25D366', color: '#fff', padding: '20px', borderRadius: '20px', border: 'none', fontWeight: 900, fontSize: '1rem', cursor: 'pointer' }}>PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>

      <footer style={{ padding: '80px 20px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #EEE' }}>
        <p className="font-brand" style={{ fontSize: '10px', letterSpacing: '3px', opacity: 0.3 }}>DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS © 2026</p>
      </footer>
    </div>
  );
}
