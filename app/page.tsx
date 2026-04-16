"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshEmpresarialPro() {
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
    <div style={{ backgroundColor: '#FDFDFD', color: '#1A1A1A', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', margin: 0, overflowX: 'hidden' }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway { 0%, 100% { transform: rotate(-3deg) translate(0,0); } 50% { transform: rotate(3deg) translate(5px,-5px); } }
        .leaf-decor { position: absolute; width: 70px; height: 100px; opacity: 0.1; z-index: 0; animation: wind-sway 5s infinite ease-in-out; }
        .flower-decor { position: absolute; width: 35px; height: 35px; border: 2px solid #E91E63; border-radius: 50%; opacity: 0.08; animation: wind-sway 7s infinite linear; }
        .text-heavy { font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
        .featured-card { border: 3px solid #E91E63 !important; transform: scale(1.02); z-index: 10; box-shadow: 0 10px 30px rgba(233,30,99,0.1); }
        .card { padding: 25px; border-radius: 30px; border: 1px solid #f2f2f2; background: #fff; text-align: center; position: relative; }
        .side-cart { position: fixed; right: 0; top: 0; width: 100%; max-width: 350px; height: 100dvh; background: white; z-index: 2000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); display: flex; flex-direction: column; box-shadow: -5px 0 15px rgba(0,0,0,0.05); }
        .cart-items { flex: 1; overflow-y: auto; padding: 15px; }
        .cart-footer { padding: 15px; border-top: 1px solid #eee; background: white; flex-shrink: 0; }
        .btn-main { background: #E91E63; color: white; border: none; padding: 12px; border-radius: 50px; font-weight: 900; width: 100%; cursor: pointer; font-size: 0.9rem; }
        .btn-disabled { background: #F0F0F0; color: #AAA; border: none; padding: 12px; border-radius: 50px; font-weight: bold; width: 100%; font-size: 0.8rem; }
        .btn-whatsapp { background: #25D366; color: white; border: none; padding: 15px; border-radius: 50px; font-weight: 900; width: 100%; cursor: pointer; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(37,211,102,0.2); }
        @media (max-width: 600px) { h1 { font-size: 2.2rem !important; } .product-card { margin-bottom: 20px; } .side-cart { max-width: 100%; } }
      ` }} />

      {/* --- ELEMENTOS DECORATIVOS --- */}
      <div className="leaf-decor" style={{ top: '12%', left: '5%', background: '#8CC63F', borderRadius: '5% 95%' }} />
      <div className="leaf-decor" style={{ top: '50%', right: '5%', background: '#2E7D32', borderRadius: '95% 5%', animationDelay: '1s' }} />
      <div className="flower-decor" style={{ top: '22%', right: '12%' }} />

      {/* --- NAV --- */}
      <nav style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', position: 'sticky', top: 0, zIndex: 1500, borderBottom: '1px solid #eee' }}>
        <img src="1000786704.jpg" alt="Logo Quito Fresh" style={{ height: '38px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '50px', fontWeight: '900', fontSize: '0.75rem' }}>MI PACK ({cart.length})</button>
      </nav>

      {/* --- HERO --- */}
      <header style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1 className="text-heavy" style={{ fontSize: '3rem', lineHeight: 0.9, margin: 0 }}>TU VIDA SALUDABLE.<br/><span style={{ color: '#8CC63F' }}>EMPIEZA AQUÍ.</span></h1>
        <img src="1000786704.jpg" alt="Quito Fresh Central" style={{ maxWidth: '240px', margin: '30px auto', display: 'block' }} />
      </header>

      {/* --- MISION & VISION --- */}
      <div className="card" style={{ margin: '0 20px 20px' }}>
        <h2 className="text-heavy" style={{ color: '#8CC63F', fontSize: '1.2rem', margin: '0 0 10px 0' }}>NUESTRA MISIÓN</h2>
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', margin: 0 }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital para el día a día.</p>
      </div>

      <div className="card" style={{ backgroundColor: '#8CC63F', color: 'white', margin: '0 20px 20px' }}>
        <h2 className="text-heavy" style={{ fontSize: '1.2rem', margin: '0 0 10px 0' }}>DESDE 2026</h2>
        <p style={{ fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>Quito Fresh nace con la promesa inquebrantable de llevar la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
      </div>

      <div className="card" style={{ margin: '0 20px 60px' }}>
        <h2 className="text-heavy" style={{ color: '#8CC63F', fontSize: '1.2rem', margin: '0 0 10px 0' }}>NUESTRA VISIÓN</h2>
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', margin: 0 }}>Ser la marca líder en bienestar premium en Ecuador, reconocida por la calidad inigualable de nuestros jugos Cold Pressed y nuestro compromiso con la salud pura.</p>
      </div>

      {/* --- SURTIDO --- */}
      <h2 className="text-heavy" style={{ textAlign: 'center', fontSize: '2.2rem', margin: '0 0 40px 0' }}>NUESTRO SURTIDO</h2>
      <div style={{ padding: '0 20px 60px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {products.map(p => (
          <div key={p.id} className={`card ${p.available ? 'featured' : ''}`}>
            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: p.available ? p.accent : '#CCC' }}>{p.tag}</span>
            <h3 className="text-heavy" style={{ fontSize: '1.8rem', margin: '15px 0' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#666', height: '35px', margin: '0 0 15px 0' }}>{p.desc}</p>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 15px 0' }}>${p.price.toFixed(2)}</div>
            {p.available ? (
              <button className="btn-main" onClick={() => addToCart(p)}>AÑADIR AL PACK</button>
            ) : (
              <button className="btn-disabled">PRÓXIMAMENTE</button>
            )}
          </div>
        ))}
      </div>

      {/* --- ATRIBUTOS --- */}
      <div style={{ padding: '0 20px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h4 className="text-heavy" style={{ fontSize: '1rem', margin: '0 0 5px 0' }}>100% PRENSADO EN FRÍO</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Conserva Máxima Nutrición y Sabor Real.</p>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <h4 className="text-heavy" style={{ fontSize: '1rem', margin: '0 0 5px 0' }}>ORIGEN ANDINO</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Valles Locales de Quito y Pichincha.</p>
        </div>
        <div>
          <h4 className="text-heavy" style={{ fontSize: '1rem', margin: '0 0 5px 0' }}>ENERGÍA NATURAL</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer style={{ background: '#000', color: '#fff', padding: '50px 20px', textAlign: 'center' }}>
        <img src="1000786704.jpg" alt="Footer Logo" style={{ height: '35px', filter: 'brightness(1.5)', marginBottom: '15px' }} />
        <p className="text-heavy" style={{ fontSize: '0.75rem', letterSpacing: '1px', margin: 0 }}>QUITO FRESH © 2026 - PUREZA REAL</p>
      </footer>

      {/* --- CARRITO --- */}
      <div className="side-cart">
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-heavy" style={{ fontSize: '1rem' }}>MI SELECCIÓN</span>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f8f8f8' }}>
              <div>
                <div style={{ fontWeight: '900', fontSize: '0.8rem' }}>{i.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#777' }}>x{i.qty} unidad(es)</div>
              </div>
              <div style={{ fontWeight: '900', fontSize: '0.85rem' }}>${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#AAA', fontSize: '0.8rem', marginTop: '50px' }}>Tu pack está vacío.</p>}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '900', marginBottom: '15px' }}>
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
