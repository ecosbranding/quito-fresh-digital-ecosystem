"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshFinalPremium() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Paleta de colores reforzada basada en tus referencias favoritas
  const products = [
    { id: 1, name: "ANDINA", desc: "Mora Silvestre seleccionada de los valles", price: 4.50, color: "#FFFFFF", accent: "#880E4F", bg: "#E91E63" },
    { id: 2, name: "VITAL", desc: "Mix vital de fresas y arándanos", price: 4.50, color: "#FFFFFF", accent: "#B71C1C", bg: "#F44336" },
    { id: 3, name: "DETOX", desc: "Manzana verde, apio y espinaca", price: 4.50, color: "#FFFFFF", accent: "#1B5E20", bg: "#4CAF50" },
    { id: 4, name: "GOLD", desc: "Maracuyá Real & Cúrcuma", price: 4.50, color: "#1A1A1A", accent: "#F57F17", bg: "#FFEB3B" },
    { id: 5, name: "AMAZON", desc: "Guayusa pura y revitalizante", price: 5.00, color: "#FFFFFF", accent: "#004D40", bg: "#009688" },
    { id: 6, name: "SUNRISE", desc: "Zanahoria, Jengibre y Naranja", price: 4.75, color: "#FFFFFF", accent: "#E65100", bg: "#FF9800" },
    { id: 7, name: "PURE", desc: "Agua de Coco 100% natural", price: 4.00, color: "#FFFFFF", accent: "#01579B", bg: "#03A9F4" },
    { id: 8, name: "RELAX", desc: "Lavanda y Arándanos Azules", price: 5.50, color: "#FFFFFF", accent: "#311B92", bg: "#673AB7" }
  ];

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const checkout = () => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty} ($${(i.price * i.qty).toFixed(2)})`).join('%0A');
    const msg = `✨ *ORDEN PREMIUM - QUITO FRESH* ✨%0A%0AHola! Quiero mi pack de bienestar:%0A%0A${items}%0A%0A💰 *TOTAL:* $${total}%0A%0A📍 *¡Espero mi entrega!* 🏔️🍏`;
    window.open(`https://wa.me/593995849214?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&family=Playfair+Display:ital,wght@1,700&display=swap');
        .font-brand { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .btn-add { transition: 0.3s; border: 2px solid transparent; }
        .btn-add:hover { transform: scale(1.05); background: #FFF !important; color: #000 !important; border-color: #000; }
        .cart-sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 450px; height: 100%; background: #fff; z-index: 1000; box-shadow: -20px 0 60px rgba(0,0,0,0.15); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s ease-out; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; }
      ` }} />

      {/* HEADER DINÁMICO */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(15px)', zIndex: 100, boxSizing: 'border-box', borderBottom: '1px solid #EEE' }}>
        <div className="font-brand" style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '2px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="font-brand" style={{ background: '#000', color: '#FFF', border: 'none', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '16px' }}>
          VER MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION - TEXTO GRANDE Y LEGIBLE */}
      <header style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px', marginTop: '80px' }}>
        <h1 className="font-serif" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', margin: 0, lineHeight: 1 }}>Natural <br/><span style={{ fontStyle: 'italic', color: '#D32F2F' }}>Performance</span></h1>
        <p className="font-brand" style={{ letterSpacing: '4px', marginTop: '30px', fontSize: '18px', fontWeight: 400, maxWidth: '600px', opacity: 0.8 }}>PRENSADO EN FRÍO • SIN ADITIVOS • 100% NATURAL</p>
      </header>

      {/* NUESTRA FILOSOFÍA - REFORZADA */}
      <section style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>La Ciencia de lo Natural</h2>
          <p className="font-brand" style={{ fontSize: '20px', lineHeight: 1.7, color: '#444' }}>Extraemos la esencia pura de la tierra. Nuestro compromiso es con la pureza absoluta: sin colorantes, sin preservantes, solo nutrición de alto rendimiento.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
          <div style={{ fontSize: '18px' }}>🍎 <strong>100% Orgánico:</strong> Fruta seleccionada a mano.</div>
          <div style={{ fontSize: '18px' }}>⚡ <strong>Cold Pressed:</strong> Conservamos cada enzima vital.</div>
          <div style={{ fontSize: '18px' }}>🛡️ <strong>Sin Filtros:</strong> Pureza total en cada gota.</div>
        </div>
      </section>

      {/* EL CATÁLOGO - COLORES VIBRANTES */}
      <main style={{ padding: '60px 20px', maxWidth: '1300px', margin: '0 auto' }}>
        <h2 className="font-serif" style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '60px' }}>Nuestro Surtido</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className="card" style={{ backgroundColor: p.bg, color: p.color, padding: '50px 35px', borderRadius: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', marginBottom: '15px', opacity: 0.9 }}>QUITO FRESH ®</div>
              <h3 className="font-serif" style={{ fontSize: '2.8rem', margin: '0 0 10px 0' }}>{p.name}</h3>
              <p className="font-brand" style={{ fontSize: '18px', margin: '0 0 30px 0', fontWeight: 400 }}>{p.desc}</p>
              <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} className="btn-add" style={{ background: p.accent, color: '#FFF', border: 'none', padding: '18px 0', width: '100%', borderRadius: '15px', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}>
                AÑADIR AL PACK
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* CARRITO SIDEBAR */}
      <div className="cart-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: '2.5rem' }}>Tu Selección</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '40px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', margin: '40px 0' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px 0', borderBottom: '1px solid #EEE' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '18px' }}>{i.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Cantidad: {i.qty}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <strong style={{ fontSize: '18px' }}>${(i.price * i.qty).toFixed(2)}</strong>
                <button onClick={() => setCart(cart.filter(item => item.id !== i.id))} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '100px', opacity: 0.5 }}>Tu pack está vacío.</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '3px solid #000', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 800, marginBottom: '30px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} style={{ width: '100%', background: '#25D366', color: '#FFF', padding: '25px', borderRadius: '15px', border: 'none', fontWeight: 800, fontSize: '18px', cursor: 'pointer' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>

      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #EEE' }}>
        <p className="font-brand" style={{ fontSize: '12px', letterSpacing: '2px', opacity: 0.5 }}>STRATEGICALLY DEVELOPED BY ECOS BRANDING & ORCA STUDIOS © 2026</p>
      </footer>
    </div>
  );
}
