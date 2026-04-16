"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshPremiumFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", tag: "100% NATURAL", available: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E91E63", tag: "ANTIOXIDANTE", available: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", tag: "FULL ENERGÍA", available: false },
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
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, system-ui, sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* CAPA VISUAL: SPLASHES Y HOJAS ESTILIZADAS */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(233, 30, 99, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '45%', left: '-10%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.07) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* Hojas con el borderRadius específico del logo */}
        <div style={{ position: 'absolute', top: '12%', left: '3%', width: '80px', height: '120px', background: '#8CC63F', opacity: 0.1, borderRadius: '5% 95%', transform: 'rotate(-20deg)' }} />
        <div style={{ position: 'absolute', top: '70%', right: '4%', width: '70px', height: '110px', background: '#2E7D32', opacity: 0.08, borderRadius: '95% 5%', transform: 'rotate(15deg)' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-heavy { font-weight: 900; text-transform: uppercase; letter-spacing: -0.8px; }
        .glass-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.05); border-radius: 35px; padding: 30px; }
        .product-card { background: white; border: 1px solid #F0F0F0; border-radius: 35px; padding: 35px 20px; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: center; }
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .featured { border: 3px solid #E91E63; }
        .sidebar-right { position: fixed; right: 0; top: 0; width: 360px; height: 100vh; background: #FFF; z-index: 2000; box-shadow: -20px 0 60px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        @media (max-width: 600px) { .sidebar-right { width: 100%; } h1 { font-size: 2.8rem !important; } }
      ` }} />

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #F5F5F5' }}>
        <img src="1000786704.jpg" alt="Logo" style={{ height: '45px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', borderRadius: '50px', padding: '10px 22px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
          MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '70px 20px' }}>
        <div style={{ border: '1.5px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 18px', borderRadius: '50px', fontWeight: '900', fontSize: '11px', marginBottom: '25px' }}>EST. 2026</div>
        <h1 className="text-heavy" style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', lineHeight: 0.82, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786704.jpg" alt="Logo Principal" style={{ maxWidth: '260px', margin: '40px auto', display: 'block' }} />
      </header>

      {/* SECCIÓN MISION/VISION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="glass-card">
          <h3 className="text-heavy" style={{ color: '#8CC63F', fontSize: '1.1rem', marginBottom: '12px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555', margin: 0 }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente y lleno de energía vital.</p>
        </div>
        <div className="glass-card" style={{ background: '#8CC63F', color: 'white' }}>
          <h3 className="text-heavy" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Desde 2026</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>Llevando la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div className="glass-card">
          <h3 className="text-heavy" style={{ color: '#8CC63F', fontSize: '1.1rem', marginBottom: '12px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555', margin: 0 }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable de nuestros jugos con tecnología Cold Pressed.</p>
        </div>
      </section>

      {/* CATÁLOGO PROFESIONAL */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-heavy" style={{ textAlign: 'center', fontSize: '2.8rem', marginBottom: '50px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#BBB', fontWeight: '900', fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-heavy" style={{ fontSize: '2rem', margin: 0 }}>{p.name}</h3>
              <p style={{ fontSize: '13px', color: '#888', margin: '10px 0' }}>{p.desc}</p>
              <div style={{ fontSize: '2.8rem', fontWeight: '900', margin: '20px 0' }}>${p.price.toFixed(2)}</div>
              
              {p.available ? (
                <button onClick={() => addToCart(p)} style={{ width: '100%', background: p.accent, color: 'white', border: 'none', borderRadius: '50px', padding: '16px', fontWeight: '900', cursor: 'pointer', transition: '0.3s' }}>AÑADIR AL PACK</button>
              ) : (
                <div style={{ background: '#F8F8F8', color: '#BBB', borderRadius: '50px', padding: '16px', fontWeight: '900', fontSize: '14px' }}>MUY PRONTO</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VALORES TÉCNICOS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '40px 20px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚙️</div>
            <h4 className="text-heavy" style={{ fontSize: '14px', margin: '0 0 5px 0' }}>100% PRENSADO EN FRÍO</h4>
            <p style={{ fontSize: '12px', color: '#777' }}>Conserva Máxima Nutrición y Sabor Real.</p>
          </div>
          <div>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>🏔️</div>
            <h4 className="text-heavy" style={{ fontSize: '14px', margin: '0 0 5px 0' }}>ORIGEN ANDINO</h4>
            <p style={{ fontSize: '12px', color: '#777' }}>Valles Locales de Quito y Pichincha.</p>
          </div>
          <div>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚡</div>
            <h4 className="text-heavy" style={{ fontSize: '14px', margin: '0 0 5px 0' }}>ENERGÍA NATURAL</h4>
            <p style={{ fontSize: '12px', color: '#777' }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 40px', textAlign: 'center' }}>
        <img src="1000786704.jpg" alt="Footer Logo" style={{ height: '40px', marginBottom: '20px', filter: 'brightness(1.5)' }} />
        <div className="text-heavy" style={{ fontSize: '14px', letterSpacing: '2px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
        <div style={{ marginTop: '40px', fontSize: '9px', opacity: 0.2, textTransform: 'uppercase', letterSpacing: '1px' }}>Desarrollado por Ecos Branding & ORCA Studios</div>
      </footer>

      {/* CARRITO SIDEBAR */}
      <div className="sidebar-right">
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F5F5F5' }}>
          <h2 className="text-heavy" style={{ fontSize: '1.2rem', margin: 0 }}>TU SELECCIÓN</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '32px', cursor: 'pointer', color: '#CCC' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '20px 0', borderBottom: '1px solid #FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="text-heavy" style={{ fontSize: '0.95rem' }}>{i.name}</span>
                <span style={{ fontWeight: '900', fontSize: '1rem' }}>${(i.price * i.qty).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
                <button onClick={() => updateQty(i.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>-</button>
                <span style={{ fontWeight: '900', fontSize: '15px' }}>{i.qty}</span>
                <button onClick={() => updateQty(i.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <div style={{ fontSize: '40px', marginBottom: '20px', opacity: 0.2 }}>🛒</div>
              <p style={{ color: '#BBB', fontSize: '14px', fontWeight: 'bold' }}>TU PACK ESTÁ VACÍO</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '30px', borderTop: '1px solid #F5F5F5', background: '#FFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.6rem', fontWeight: '900', marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(37,211,102,0.2)' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
