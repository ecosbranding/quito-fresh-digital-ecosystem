"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshIntegracionTotal() {
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
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Arial, sans-serif', margin: 0, overflowX: 'hidden', minHeight: '100vh' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway {
          0%, 100% { transform: rotate(-4deg) translate(0, 0); }
          50% { transform: rotate(4deg) translate(8px, -8px); }
        }
        .leaf- Quito { position: absolute; width: 65px; height: 95px; opacity: 0.15; z-index: 0; animation: wind-sway 5s infinite ease-in-out; }
        .flower-Quito { position: absolute; width: 40px; height: 40px; border: 3px double #E91E63; border-radius: 50%; opacity: 0.1; animation: wind-sway 7s infinite linear; }
        .text-black { font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
        .featured-card { border: 3px solid #E91E63 !important; transform: scale(1.02); z-index: 10; box-shadow: 0 12px 30px rgba(233, 30, 99, 0.08); }
        .card { padding: 25px 20px; border-radius: 35px; border: 1px solid #f0f0f0; background: #fff; text-align: center; position: relative; }
        .side-panel { position: fixed; right: 0; top: 0; width: 100%; max-width: 340px; height: 100dvh; background: #fff; z-index: 1000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .cart-content { flex: 1; overflow-y: auto; padding: 15px 20px; }
        .cart-footer { padding: 20px; border-top: 1px solid #f0f0f0; background: #fff; }
        .btn-whatsapp { background: #25D366; color: white; border: none; padding: 14px; border-radius: 50px; font-weight: 900; width: 100%; font-size: 0.85rem; cursor: pointer; }
        @media (max-width: 600px) { 
          h1 { font-size: 2.2rem !important; } 
          .card { margin: 10px 0; }
          .side-panel { max-width: 100%; }
        }
      ` }} />

      {/* --- DECORACIONES --- */}
      <div className="leaf-Quito" style={{ top: '10%', left: '4%', background: '#8CC63F', borderRadius: '5% 95%' }} />
      <div className="leaf-Quito" style={{ top: '50%', right: '4%', background: '#2E7D32', borderRadius: '95% 5%', animationDelay: '1.5s' }} />
      <div className="flower-Quito" style={{ top: '22%', right: '15%' }} />

      {/* --- NAVBAR --- */}
      <nav style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <img src="1000786704.png" alt="Quito Fresh Logo" style={{ height: '38px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '50px', fontWeight: '900', fontSize: '0.75rem' }}>
          MI PACK ({cart.length})
        </button>
      </nav>

      {/* --- HERO --- */}
      <header style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1 className="text-black" style={{ fontSize: '3.2rem', lineHeight: 0.9, margin: 0 }}>
          SABORES <br/><span style={{ color: '#8CC63F' }}>NATURALES</span>
        </h1>
        <img src="1000786704.png" alt="Hero Logo" style={{ maxWidth: '240px', margin: '30px auto', display: 'block' }} />
      </header>

      {/* --- SURTIDO --- */}
      <section style={{ padding: '0 20px 50px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} className={`card ${p.available ? 'featured-card' : ''}`}>
            <span style={{ fontSize: '0.65rem', fontWeight: '900', color: p.available ? p.accent : '#CCC' }}>{p.tag}</span>
            <h3 className="text-black" style={{ margin: '10px 0', fontSize: '1.6rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#777', height: '35px', margin: 0 }}>{p.desc}</p>
            
            {p.available ? (
              <>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', margin: '15px 0' }}>${p.price.toFixed(2)}</div>
                <button onClick={() => addToCart(p)} style={{ background: p.accent, color: '#fff', border: 'none', width: '100%', padding: '14px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }}>AÑADIR AL PACK</button>
              </>
            ) : (
              <div style={{ padding: '12px', background: '#fcfcfc', borderRadius: '50px', color: '#AAA', fontWeight: '900', fontSize: '0.7rem', border: '1px solid #eee', marginTop: '15px' }}>PRÓXIMAMENTE</div>
            )}
          </div>
        ))}
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: '50px 20px', textAlign: 'center', background: '#000', color: '#fff' }}>
        <img src="1000786704.png" alt="Footer Logo" style={{ height: '35px', marginBottom: '15px', filter: 'brightness(1.5)' }} />
        <p className="text-black" style={{ fontSize: '0.7rem', opacity: 0.7 }}>QUITO FRESH © 2026</p>
      </footer>

      {/* --- CARRITO --- */}
      <div className="side-panel">
        <div style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <span className="text-black" style={{ fontSize: '0.9rem' }}>TU SELECCIÓN</span>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '22px', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <div className="cart-content">
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f9f9f9' }}>
              <div>
                <div style={{ fontWeight: '900', fontSize: '0.75rem' }}>{i.name}</div>
                <div style={{ fontSize: '0.65rem', color: '#999' }}>{i.qty} unidad(es)</div>
              </div>
              <div style={{ fontWeight: '900', fontSize: '0.85rem' }}>${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#AAA', fontSize: '0.75rem', marginTop: '40px' }}>Tu pack está vacío.</p>}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900', marginBottom: '15px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button className="btn-whatsapp">PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>
    </div>
  );
}
