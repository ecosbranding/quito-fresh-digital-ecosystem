"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMasterEdition() {
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
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, Arial, sans-serif', margin: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* CAPA VISUAL: SPLASHES Y HOJAS CON BORDES DE LOGO */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '2%', right: '-15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(233, 30, 99, 0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '45%', left: '-20%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(140, 198, 63, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* Hojas asimétricas estilo Quito Fresh */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '110px', height: '160px', background: '#8CC63F', opacity: 0.1, borderRadius: '5% 95%', transform: 'rotate(-30deg)' }} />
        <div style={{ position: 'absolute', top: '65%', right: '5%', width: '90px', height: '140px', background: '#2E7D32', opacity: 0.07, borderRadius: '95% 5%', transform: 'rotate(25deg)' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-heavy { font-weight: 900; text-transform: uppercase; letter-spacing: -0.8px; }
        .glass-box { background: rgba(255,255,255,0.75); backdrop-filter: blur(15px); border: 1px solid rgba(0,0,0,0.04); border-radius: 35px; padding: 35px; }
        .product-card { background: white; border: 1px solid #F2F2F2; border-radius: 40px; padding: 40px 25px; transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-align: center; }
        .product-card:hover { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0,0,0,0.06); }
        .featured-border { border: 3px solid #E91E63; position: relative; }
        .side-cart-fixed { position: fixed; right: 0; top: 0; width: 360px; height: 100vh; background: #FFF; z-index: 2000; box-shadow: -25px 0 60px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.7s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .whatsapp-footer { padding: 30px; border-top: 1px solid #F5F5F5; background: #FFF; }
        @media (max-width: 600px) { .side-cart-fixed { width: 100%; } h1 { font-size: 2.8rem !important; } }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '18px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #F8F8F8' }}>
        <img src="1000786698.png" alt="Logo Quito Fresh" style={{ height: '48px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', borderRadius: '50px', padding: '12px 25px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
          MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ border: '2px solid #8CC63F', color: '#8CC63F', display: 'inline-block', padding: '6px 20px', borderRadius: '50px', fontWeight: '900', fontSize: '11px', marginBottom: '30px' }}>EST. 2026</div>
        <h1 className="text-heavy" style={{ fontSize: 'clamp(3.5rem, 11vw, 6rem)', lineHeight: 0.82, margin: 0 }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786704.jpg" alt="Main Brand Logo" style={{ maxWidth: '280px', margin: '45px auto', display: 'block' }} />
      </header>

      {/* CORPORATE INFO SECTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', maxWidth: '1250px', margin: '0 auto 80px' }}>
        <div className="glass-box">
          <h3 className="text-heavy" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#555', margin: 0 }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div className="glass-box" style={{ background: '#8CC63F', color: 'white' }}>
          <h3 className="text-heavy" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Desde 2026</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', margin: 0 }}>Quito Fresh nace para llevar la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div className="glass-box">
          <h3 className="text-heavy" style={{ color: '#8CC63F', fontSize: '1.2rem', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#555', margin: 0 }}>Ser la marca líder en bienestar premium en Ecuador, reconocida por la calidad inigualable de nuestros jugos con tecnología Cold Pressed.</p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-heavy" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '35px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured-border' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#BBB', fontWeight: '900', fontSize: '12px', marginBottom: '18px' }}>{p.tag}</div>
              <h3 className="text-heavy" style={{ fontSize: '2.2rem', margin: 0 }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', margin: '12px 0' }}>{p.desc}</p>
              <div style={{ fontSize: '3rem', fontWeight: '900', margin: '25px 0' }}>${p.price.toFixed(2)}</div>
              
              {p.available ? (
                <button onClick={() => addToCart(p)} style={{ width: '100%', background: p.accent, color: 'white', border: 'none', borderRadius: '50px', padding: '18px', fontWeight: '900', cursor: 'pointer', transition: '0.3s' }}>AÑADIR AL PACK</button>
              ) : (
                <div style={{ background: '#F9F9F9', color: '#CCC', borderRadius: '50px', padding: '18px', fontWeight: '900', fontSize: '14px', border: '1px solid #EEE' }}>MUY PRONTO</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TECH SPECS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>🍇</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0' }}>100% PRENSADO EN FRÍO</h4>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Conserva Máxima Nutrición y Sabor Real.</p>
          </div>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>🏔️</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0' }}>ORIGEN ANDINO</h4>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Valles Locales de Quito y Pichincha.</p>
          </div>
          <div>
            <div style={{ fontSize: '35px', marginBottom: '15px' }}>🔥</div>
            <h4 className="text-heavy" style={{ fontSize: '15px', margin: '0 0 8px 0' }}>ENERGÍA NATURAL</h4>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '90px 40px', textAlign: 'center' }}>
        <img src="1000786704.jpg" alt="Footer Logo" style={{ height: '45px', marginBottom: '25px', filter: 'brightness(1.5)' }} />
        <div className="text-heavy" style={{ fontSize: '15px', letterSpacing: '3px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
        <div style={{ marginTop: '45px', fontSize: '10px', opacity: 0.2, textTransform: 'uppercase', letterSpacing: '2px' }}>Diseñado por Ecos Branding & ORCA Studios</div>
      </footer>

      {/* SIDEBAR CART */}
      <div className="side-cart-fixed">
        <div style={{ padding: '35px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F8F8F8' }}>
          <h2 className="text-heavy" style={{ fontSize: '1.4rem', margin: 0 }}>TU SELECCIÓN</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '35px', cursor: 'pointer', color: '#DDD' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px' }}>
          {cart.map(i => (
            <div key={i.id} style={{ padding: '25px 0', borderBottom: '1px solid #FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-heavy" style={{ fontSize: '1rem' }}>{i.name}</span>
                <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>${(i.price * i.qty).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '18px' }}>
                <button onClick={() => updateQty(i.id, -1)} style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer', fontSize: '18px' }}>-</button>
                <span style={{ fontWeight: '900', fontSize: '17px' }}>{i.qty}</span>
                <button onClick={() => updateQty(i.id, 1)} style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer', fontSize: '18px' }}>+</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '120px' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px', opacity: 0.1 }}>🛒</div>
              <p style={{ color: '#BBB', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }}>Pack Vacío</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="whatsapp-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', marginBottom: '30px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '20px', borderRadius: '60px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', boxShadow: '0 12px 30px rgba(37,211,102,0.25)' }}>
              COMPLETAR EN WHATSAPP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
