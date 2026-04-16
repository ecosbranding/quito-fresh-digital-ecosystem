"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshDefinitivo() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: 4.50, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
  ];

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
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'sans-serif', margin: 0, overflowX: 'hidden', minHeight: '100vh' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway {
          0%, 100% { transform: rotate(-5deg) translate(0, 0); }
          50% { transform: rotate(5deg) translate(10px, -10px); }
        }
        .leaf- Quito { position: absolute; width: 70px; height: 100px; opacity: 0.12; z-index: 0; animation: wind-sway 5s infinite ease-in-out; }
        .flower-Quito { position: absolute; width: 45px; height: 45px; border: 3px double #E91E63; border-radius: 50%; opacity: 0.1; animation: wind-sway 7s infinite linear; }
        .text-heavy { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .featured-card { border: 4px solid #E91E63 !important; transform: scale(1.03); z-index: 10; box-shadow: 0 15px 40px rgba(233, 30, 99, 0.1); }
        .card { padding: 30px 20px; border-radius: 35px; border: 1px solid #f0f0f0; background: #fff; text-align: center; position: relative; }
        .side-panel { position: fixed; right: 0; top: 0; width: 100%; max-width: 360px; height: 100dvh; background: #fff; z-index: 1000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .cart-body { flex: 1; overflow-y: auto; padding: 20px; }
        .cart-footer { padding: 20px 25px; border-top: 1px solid #eee; background: #fff; }
        .btn-wa { background: #25D366; color: white; border: none; padding: 16px; border-radius: 50px; font-weight: 900; width: 100%; font-size: 0.9rem; cursor: pointer; }
        @media (max-width: 600px) { 
          h1 { font-size: 2.3rem !important; } 
          .card { margin: 10px 0; }
          .side-panel { max-width: 100%; }
        }
      ` }} />

      {/* --- DECORACIONES (HOJAS Y FLORES DEL LOGO) --- */}
      <div className="leaf-Quito" style={{ top: '12%', left: '3%', background: '#8CC63F', borderRadius: '5% 95%' }} />
      <div className="leaf-Quito" style={{ top: '45%', right: '4%', background: '#2E7D32', borderRadius: '95% 5%', animationDelay: '1s' }} />
      <div className="flower-Quito" style={{ top: '25%', right: '12%' }} />
      <div className="flower-Quito" style={{ bottom: '15%', left: '8%', borderColor: '#8CC63F', animationDelay: '2s' }} />

      {/* --- NAVEGACIÓN --- */}
      <nav style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f5f5f5', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <img src="1000786704.png" alt="Quito Fresh" style={{ height: '42px', objectFit: 'contain' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: '900', fontSize: '0.8rem' }}>
          PACK ({cart.length})
        </button>
      </nav>

      {/* --- CABECERA --- */}
      <header style={{ textAlign: 'center', padding: '50px 20px', position: 'relative', zIndex: 10 }}>
        <h1 className="text-heavy" style={{ fontSize: '3.5rem', lineHeight: 0.85, margin: 0 }}>
          SABORES <br/><span style={{ color: '#8CC63F' }}>NATURALES</span>
        </h1>
        <img src="1000786704.png" alt="Logo Quito Fresh" style={{ maxWidth: '260px', margin: '35px auto', display: 'block' }} />
      </header>

      {/* --- SECCIÓN DE PRODUCTOS --- */}
      <section style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', position: 'relative', zIndex: 10 }}>
        {products.map(p => (
          <div key={p.id} className={`card ${p.available ? 'featured-card' : ''}`}>
            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: p.available ? p.accent : '#BBB' }}>{p.tag}</span>
            <h3 className="text-heavy" style={{ margin: '12px 0', fontSize: '1.7rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px', lineHeight: '1.4' }}>{p.desc}</p>
            
            {p.available ? (
              <>
                <div style={{ fontSize: '2.4rem', fontWeight: '900', marginBottom: '15px' }}>${p.price.toFixed(2)}</div>
                <button onClick={() => addToCart(p)} style={{ background: p.accent, color: '#fff', border: 'none', width: '100%', padding: '15px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }}>AÑADIR AL PACK</button>
              </>
            ) : (
              <div style={{ padding: '15px', background: '#fcfcfc', borderRadius: '50px', color: '#AAA', fontWeight: '900', fontSize: '0.75rem', border: '1px dashed #ddd' }}>PRÓXIMAMENTE</div>
            )}
          </div>
        ))}
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', background: '#000', color: '#fff', marginTop: '50px' }}>
        <img src="1000786704.png" alt="Quito Fresh Footer" style={{ height: '40px', marginBottom: '20px', filter: 'brightness(1.5)' }} />
        <p className="text-heavy" style={{ fontSize: '0.75rem', letterSpacing: '2px', opacity: 0.8 }}>QUITO FRESH © 2026</p>
      </footer>

      {/* --- CARRITO (FIXED FRAME) --- */}
      <div className="side-panel">
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <span className="text-heavy" style={{ fontSize: '1rem' }}>TU SELECCIÓN</span>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '26px', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <div className="cart-body">
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f9f9f9' }}>
              <div>
                <div style={{ fontWeight: '900', fontSize: '0.8rem' }}>{i.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>{i.qty} unidad(es)</div>
              </div>
              <div style={{ fontWeight: '900', fontSize: '0.9rem' }}>${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#999', fontSize: '0.8rem', marginTop: '50px' }}>Selecciona tu sabor estrella.</p>}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '900', marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button className="btn-wa">PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>
    </div>
  );
}
