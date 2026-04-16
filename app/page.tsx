"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshV3() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", featured: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", tag: "100% NATURAL", featured: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E91E63", tag: "ANTIOXIDANTE", featured: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", tag: "FULL ENERGÍA", featured: false },
  ];

  const updateQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#fdfdfd', color: '#1A1A1A', fontFamily: 'system-ui, sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px #E91E63; }
          50% { box-shadow: 0 0 25px #E91E63; }
        }
        .leaf-wind { animation: wind 6s infinite ease-in-out; }
        .maracumora-glow { border: 3px solid #E91E63 !important; animation: glow 3s infinite; transform: scale(1.05); z-index: 5; }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .product-card { background: #fff; border-radius: 40px; padding: 40px 20px; transition: 0.4s; border: 1px solid #f0f0f0; }
        .sidebar { position: fixed; right: 0; top: 0; width: 360px; height: 100vh; background: #fff; z-index: 1000; box-shadow: -20px 0 60px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.6s cubic-bezier(0.22, 1, 0.36, 1); display: flex; flex-direction: column; }
        .cart-footer { padding: 30px; border-top: 1px solid #eee; background: white; flex-shrink: 0; }
      ` }} />

      {/* --- ELEMENTOS DECORATIVOS CON MOVIMIENTO --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
        {/* Hojas Estilo Logo con movimiento de viento */}
        <div className="leaf-wind" style={{ position: 'absolute', top: '10%', left: '2%', width: '120px', height: '160px', background: '#8CC63F', borderRadius: '5% 95% 5% 95%', opacity: 0.15, filter: 'blur(1px)' }} />
        <div className="leaf-wind" style={{ position: 'absolute', top: '60%', right: '3%', width: '100px', height: '140px', background: '#2E7D32', borderRadius: '95% 5% 95% 5%', opacity: 0.1, animationDelay: '1s' }} />
        
        {/* Flores decorativas sutiles */}
        <div className="leaf-wind" style={{ position: 'absolute', bottom: '15%', left: '5%', width: '60px', height: '60px', border: '8px double #E91E63', borderRadius: '50%', opacity: 0.1, animationDelay: '2s' }} />
      </div>

      {/* --- NAVBAR --- */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 150, padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)' }}>
        <img src="1000786704.jpg" alt="Quito Fresh Logo" style={{ height: '55px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }}>
          PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* --- HERO --- */}
      <header style={{ textAlign: 'center', padding: '80px 20px', position: 'relative' }}>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', lineHeight: 0.8, margin: 0 }}>
          SABORES QUE <br/><span style={{ color: '#8CC63F' }}>INSPIRAN</span>
        </h1>
        <img src="1000786704.jpg" alt="Logo Quito Fresh" style={{ maxWidth: '300px', margin: '40px 0', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} />
      </header>

      {/* --- CATÁLOGO CON RESALTADO --- */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.featured ? 'maracumora-glow' : ''}`} style={{ textAlign: 'center' }}>
              <div style={{ color: p.accent, fontWeight: '900', fontSize: '12px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2.2rem', margin: '0' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>{p.desc}</p>
              <div style={{ fontSize: '2.8rem', fontWeight: '900', margin: '20px 0' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} style={{ width: '100%', background: p.accent, color: 'white', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }}>AÑADIR</button>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: '80px 40px', textAlign: 'center', background: '#000', color: 'white' }}>
        <img src="1000786704.jpg" alt="Logo Footer" style={{ height: '50px', marginBottom: '20px', filter: 'brightness(1.5)' }} />
        <div className="text-bold">QUITO FRESH © 2026</div>
      </footer>

      {/* --- CARRITO (ESTRUCTURA CORREGIDA) --- */}
      <div className="sidebar">
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <h2 className="text-bold" style={{ fontSize: '1.4rem', margin: 0 }}>TU PACK</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '30px', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '20px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-bold">{i.name}</span>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: '900' }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ fontWeight: '900' }}>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px rgba(37,211,102,0.2)' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
