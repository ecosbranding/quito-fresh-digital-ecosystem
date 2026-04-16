"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshUltimateWeb() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", disabled: false },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", tag: "100% NATURAL", disabled: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E91E63", tag: "ANTIOXIDANTE", disabled: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", tag: "FULL ENERGÍA", disabled: false },
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

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
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
      
      {/* IDENTIDAD VISUAL: SPLASH Y HOJAS ESTILO LOGO */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(255, 180, 0, 0.2) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '35%', left: '-15%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* Hojas Estilo Logo */}
        <div style={{ position: 'absolute', top: '12%', left: '4%', width: '110px', height: '160px', background: '#8CC63F', opacity: 0.2, borderRadius: '5% 95% 5% 95%', transform: 'rotate(-20deg)' }} />
        <div style={{ position: 'absolute', top: '55%', right: '3%', width: '90px', height: '140px', background: '#2E7D32', opacity: 0.1, borderRadius: '95% 5% 95% 5%', transform: 'rotate(15deg)' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
        .info-card { background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); padding: 40px; border-radius: 35px; border: 1px solid #F0F0F0; transition: 0.3s; }
        .info-card:hover { border-color: #8CC63F; transform: translateY(-5px); }
        .product-card { padding: 40px 20px; border-radius: 35px; border: 1px solid #EEE; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); transition: 0.3s; text-align: center; }
        .featured { border: 2px solid #E91E63; transform: scale(1.04); }
        .sidebar { position: fixed; right: 0; top: 0; width: 340px; height: 100%; background: #fff; z-index: 1000; box-shadow: -15px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); padding: 30px; display: flex; flex-direction: column; }
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 12px 25px; font-weight: 900; cursor: pointer; }
      ` }} />

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <img src="/1000786704.jpg" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-green">MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ border: '2px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 18px', borderRadius: '50px', fontWeight: '900', fontSize: '13px', marginBottom: '30px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', lineHeight: 0.85, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="/1000786704.jpg" alt="Hero Logo" style={{ maxWidth: '320px', margin: '40px 0', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }} />
      </header>

      {/* INFORMACIÓN COMPLETA (RESTAURADA) */}
      <section style={{ position: 'relative', zIndex: 1, padding: '40px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="info-card">
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ lineHeight: '1.7', color: '#555' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital para el día a día.</p>
        </div>
        <div className="info-card" style={{ background: '#8CC63F', color: 'white' }}>
          <h3 className="text-bold" style={{ marginBottom: '15px' }}>Desde 2026</h3>
          <p style={{ lineHeight: '1.7' }}>Quito Fresh nace con la promesa inquebrantable de llevar la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div className="info-card">
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ lineHeight: '1.7', color: '#555' }}>Ser la marca líder en bienestar premium en Ecuador, reconocida por la calidad inigualable de nuestros jugos Cold Pressed y nuestro compromiso con la salud pura.</p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.id === 1 ? 'featured' : ''}`}>
              <div style={{ color: p.accent, fontWeight: '900', fontSize: '12px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#666', height: '40px' }}>{p.desc}</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '20px 0' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} className="btn-green" style={{ width: '100%', background: p.accent }}>AÑADIR AL PACK</button>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS TÉCNICOS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: '250px' }}>
          <div style={{ fontSize: '45px', marginBottom: '20px' }}>⚙️</div>
          <h4 className="text-bold">100% PRENSADO EN FRÍO</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>Conserva Máxima Nutrición y Sabor Real.</p>
        </div>
        <div style={{ width: '250px' }}>
          <div style={{ fontSize: '45px', marginBottom: '20px' }}>🏔️</div>
          <h4 className="text-bold">ORIGEN ANDINO</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>Valles Locales de Quito y Pichincha.</p>
        </div>
        <div style={{ width: '250px' }}>
          <div style={{ fontSize: '45px', marginBottom: '20px' }}>⚡</div>
          <h4 className="text-bold">ENERGÍA NATURAL</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 40px', textAlign: 'center', background: '#111', color: 'white' }}>
        <img src="/1000786704.jpg" alt="Footer Logo" style={{ height: '50px', marginBottom: '20px', filter: 'brightness(1.5)' }} />
        <div className="text-bold" style={{ fontSize: '14px' }}>QUITO FRESH © 2026 - PUREZA REAL</div>
        <div style={{ marginTop: '40px', fontSize: '9px', opacity: 0.3, letterSpacing: '2px' }}>ESTRATÉGICAMENTE DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS</div>
      </footer>

      {/* CARRITO CON ELIMINACIÓN INDIVIDUAL */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="text-bold" style={{ fontSize: '1.4rem' }}>TU SELECCIÓN</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '30px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '20px 0', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div className="text-bold" style={{ fontSize: '1.1rem' }}>{i.name}</div>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', color: '#FF5252', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #DDD', cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: '900' }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #DDD', cursor: 'pointer' }}>+</button>
                </div>
                <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>${(i.price * i.qty).toFixed(2)}</div>
              </div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>Tu selección está vacía.</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '2px solid #EEE', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={() => setCart([])} style={{ width: '100%', background: 'none', border: '1px solid #FF5252', color: '#FF5252', padding: '12px', borderRadius: '50px', marginBottom: '15px', fontWeight: 'bold', cursor: 'pointer' }}>VACIAR PACK</button>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }}>PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>
    </div>
  );
}
