"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshInmersivo() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA" },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", tag: "100% NATURAL" },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E91E63", tag: "ANTIOXIDANTE" },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", tag: "FULL ENERGÍA" },
  ];

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };
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
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* --- CAPA DE DECORACIÓN SUPERPUESTA (EL "REVESTIMIENTO" REALISTA) --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
        
        {/* Splash de Jugo Superior (Realismo con Gradient y Blur) */}
        <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(255, 180, 0, 0.25) 0%, transparent 70%)', filter: 'blur(30px)', borderRadius: '50%' }} />
        
        {/* Hoja Estilo Logo - Primer Plano (Desenfoque de profundidad) */}
        <div style={{ 
          position: 'absolute', top: '15%', left: '-20px', width: '130px', height: '180px', 
          background: 'linear-gradient(135deg, #8CC63F 0%, #689F38 100%)', 
          borderRadius: '5% 95% 5% 95%', transform: 'rotate(-15deg)', 
          opacity: 0.8, filter: 'blur(2px)', boxShadow: '20px 20px 40px rgba(0,0,0,0.1)' 
        }} />

        {/* Splash Inferior */}
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.15) 0%, transparent 75%)', filter: 'blur(40px)', borderRadius: '50%' }} />

        {/* Hoja Pequeña - Segundo Plano (Más nítida) */}
        <div style={{ 
          position: 'absolute', bottom: '20%', right: '2%', width: '80px', height: '120px', 
          background: '#2E7D32', borderRadius: '95% 5% 95% 5%', 
          transform: 'rotate(10deg)', opacity: 0.6, boxShadow: '10px 10px 20px rgba(0,0,0,0.05)' 
        }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
        .info-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); padding: 40px; border-radius: 35px; border: 1px solid rgba(0,0,0,0.05); }
        .product-card { padding: 40px 20px; border-radius: 35px; border: 1px solid #EEE; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .sidebar { position: fixed; right: 0; top: 0; width: 340px; height: 100vh; background: #fff; z-index: 1000; box-shadow: -15px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 12px 25px; font-weight: 900; cursor: pointer; }
      ` }} />

      {/* --- CONTENIDO DE LA WEB --- */}
      
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(15px)' }}>
        <img src="1000786704.jpg" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main">MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <header style={{ textAlign: 'center', padding: '100px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ border: '2px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 18px', borderRadius: '50px', fontWeight: '900', fontSize: '13px', marginBottom: '30px' }}>QUITO - ECUADOR</div>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', lineHeight: 0.85, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786704.jpg" alt="Hero Logo" style={{ maxWidth: '320px', margin: '50px 0', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} />
      </header>

      {/* INFORMACIÓN CORPORATIVA */}
      <section style={{ padding: '40px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="info-card">
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Misión</h3>
          <p style={{ lineHeight: '1.7', color: '#444' }}>Nutrir con extractos puros de la tierra andina, fomentando un estilo de vida consciente y energía vital.</p>
        </div>
        <div className="info-card" style={{ background: '#8CC63F', color: 'white' }}>
          <h3 className="text-bold" style={{ marginBottom: '15px' }}>Desde 2026</h3>
          <p style={{ lineHeight: '1.7' }}>Llevando la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div className="info-card">
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Visión</h3>
          <p style={{ lineHeight: '1.7', color: '#444' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por nuestra calidad inigualable Cold Pressed.</p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>SABORES DISPONIBLES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card" style={{ textAlign: 'center' }}>
              <div style={{ color: p.accent, fontWeight: '900', fontSize: '12px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2rem', margin: '0' }}>{p.name}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '20px 0' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} className="btn-main" style={{ width: '100%', background: p.accent }}>AÑADIR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 40px', textAlign: 'center', background: '#000', color: 'white', position: 'relative', zIndex: 10 }}>
        <img src="1000786704.jpg" alt="Footer Logo" style={{ height: '50px', marginBottom: '25px', filter: 'brightness(1.5)' }} />
        <div className="text-bold" style={{ fontSize: '14px' }}>QUITO FRESH © 2026</div>
        <div style={{ marginTop: '40px', fontSize: '9px', opacity: 0.4, letterSpacing: '2px' }}>DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS</div>
      </footer>

      {/* CARRITO CON DISEÑO FIJO */}
      <div className="sidebar">
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EEE' }}>
          <h2 className="text-bold" style={{ fontSize: '1.4rem' }}>MI PACK</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '30px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '20px 0', borderBottom: '1px solid #F5F5F5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <span className="text-bold" style={{ fontSize: '1.1rem' }}>{i.name}</span>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #DDD', cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: '900' }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #DDD', cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>No has añadido nada aún.</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '30px', borderTop: '1px solid #EEE', background: '#FFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={() => setCart([])} style={{ width: '100%', padding: '12px', borderRadius: '50px', border: '1px solid #FF5252', color: '#FF5252', background: 'none', marginBottom: '15px', fontWeight: 'bold', cursor: 'pointer' }}>VACIAR CARRITO</button>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }}>PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>
    </div>
  );
}
