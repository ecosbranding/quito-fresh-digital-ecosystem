"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshRefined() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", disabled: false },
    { id: 2, name: "GREEN BOOST", desc: "Próximamente", price: 4.50, accent: "#8CC63F", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 3, name: "BERRY BLISS", desc: "Próximamente", price: 4.50, accent: "#E64A19", tag: "PRÓXIMAMENTE", disabled: true },
    { id: 4, name: "GOLD CITRUS", desc: "Próximamente", price: 4.50, accent: "#FFB300", tag: "PRÓXIMAMENTE", disabled: true },
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(i => i.qty > 0));
  };

  const addToCart = (p) => {
    if (p.disabled) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const clearCart = () => {
    if(window.confirm("¿Vaciar tu selección?")) setCart([]);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* CAPA DE IDENTIDAD (SPLASH Y HOJAS CSS) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Splashes inspirados en el logo */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255, 180, 0, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '40%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* Hojas vectoriales (CSS border-radius) */}
        <div style={{ position: 'absolute', top: '15%', left: '5%', width: '80px', height: '120px', background: '#8CC63F', opacity: 0.15, borderRadius: '0 100% 0 100%', transform: 'rotate(-15deg)' }} />
        <div style={{ position: 'absolute', top: '25%', right: '2%', width: '100px', height: '150px', background: '#FFB400', opacity: 0.1, borderRadius: '100% 0 100% 0', transform: 'rotate(20deg)' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
        .product-card { padding: 40px 20px; border-radius: 30px; border: 1px solid #EEE; background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); transition: 0.3s; text-align: center; }
        .featured { border: 3px solid #E91E63; transform: scale(1.03); }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 10px 20px; font-weight: bold; cursor: pointer; }
        /* Carrito más compacto */
        .sidebar { position: fixed; right: 0; top: 0; width: 320px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s; padding: 25px; display: flex; flex-direction: column; }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <img src="/1000786704.jpg" alt="Logo" style={{ height: '45px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main">PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 20px' }}>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 0.9, margin: 0 }}>
          TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.
        </h1>
        <img src="/1000786704.jpg" alt="Quito Fresh Esto Refresca" style={{ maxWidth: '280px', margin: '30px 0' }} />
      </header>

      {/* CATÁLOGO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '50px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.id === 1 ? 'featured' : ''}`} style={{ opacity: p.disabled ? 0.6 : 1 }}>
              <div style={{ color: p.accent, fontWeight: 'bold', fontSize: '11px', marginBottom: '10px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ margin: '0 0 10px 0' }}>{p.name}</h3>
              <div style={{ fontSize: '2rem', fontWeight: '900', margin: '15px 0' }}>${p.price.toFixed(2)}</div>
              <button disabled={p.disabled} onClick={() => addToCart(p)} className="btn-main" style={{ width: '100%', background: p.accent }}>
                {p.disabled ? "MUY PRONTO" : "AÑADIR"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '50px 20px', textAlign: 'center', background: '#111', color: 'white' }}>
        <img src="/1000786704.jpg" alt="Logo" style={{ height: '40px', marginBottom: '15px', filter: 'brightness(1.5)' }} />
        <div className="text-bold" style={{ fontSize: '12px' }}>QUITO FRESH © 2026</div>
        <div style={{ marginTop: '20px', fontSize: '8px', opacity: 0.3 }}>DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS</div>
      </footer>

      {/* SIDEBAR DEL CARRITO REDISEÑADO */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="text-bold" style={{ fontSize: '1.2rem' }}>MI SELECCIÓN</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '25px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #EEE' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{i.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '24px', border: '1px solid #DDD' }}>-</button>
                  <span>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '24px', border: '1px solid #DDD' }}>+</button>
                </div>
              </div>
              <div style={{ fontWeight: '900' }}>${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ color: '#999', fontSize: '14px', textAlign: 'center' }}>Carrito vacío.</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '1.2rem', marginBottom: '15px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #FF5252', color: '#FF5252', padding: '10px', borderRadius: '50px', fontSize: '12px', cursor: 'pointer', marginBottom: '10px' }}>VACIAR CARRITO</button>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: 'bold' }}>PEDIR POR WHATSAPP</button>
          </div>
        )}
      </div>
    </div>
  );
}
