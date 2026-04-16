"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshEmpresarial() {
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
    <div style={{ backgroundColor: '#F9F9F9', color: '#1A1A1A', fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind-sway { 0%, 100% { transform: rotate(-3deg) translate(0,0); } 50% { transform: rotate(3deg) translate(5px,-5px); } }
        .leaf { position: absolute; width: 80px; height: 110px; opacity: 0.1; z-index: 0; animation: wind-sway 6s infinite ease-in-out; }
        .flower { position: absolute; width: 40px; height: 40px; border: 2px solid #E91E63; border-radius: 50%; opacity: 0.08; animation: wind-sway 8s infinite linear; }
        .section-card { background: white; border-radius: 25px; padding: 30px; margin: 20px auto; max-width: 500px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .featured { border: 3px solid #E91E63 !important; transform: scale(1.02); }
        .btn-main { background: #E91E63; color: white; border: none; padding: 12px; border-radius: 50px; font-weight: bold; width: 100%; cursor: pointer; }
        .btn-disabled { background: #F0F0F0; color: #AAA; border: none; padding: 12px; border-radius: 50px; font-weight: bold; width: 100%; }
        .side-cart { position: fixed; right: 0; top: 0; width: 100%; max-width: 350px; height: 100dvh; background: white; z-index: 1000; transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.3s ease-in-out; display: flex; flex-direction: column; box-shadow: -5px 0 15px rgba(0,0,0,0.1); }
      ` }} />

      {/* NAV */}
      <nav style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
        <img src="1000786704.png" alt="Logo" style={{ height: '35px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: '#8CC63F', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '50px', fontWeight: 'bold' }}>MI PACK ({cart.length})</button>
      </nav>

      {/* HERO */}
      <header style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>TU VIDA SALUDABLE. <br/><span style={{ color: '#8CC63F' }}>EMPIEZA AQUÍ.</span></h1>
        <img src="1000786704.png" alt="Hero Logo" style={{ maxWidth: '200px', margin: '20px auto' }} />
      </header>

      {/* MISION & VISION */}
      <div className="section-card">
        <h2 style={{ color: '#8CC63F', fontSize: '1.2rem' }}>NUESTRA MISIÓN</h2>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital para el día a día.</p>
      </div>

      <div className="section-card" style={{ backgroundColor: '#8CC63F', color: 'white' }}>
        <h2 style={{ fontSize: '1.2rem' }}>DESDE 2026</h2>
        <p style={{ fontSize: '0.9rem' }}>Quito Fresh nace con la promesa inquebrantable de llevar la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
      </div>

      <div className="section-card">
        <h2 style={{ color: '#8CC63F', fontSize: '1.2rem' }}>NUESTRA VISIÓN</h2>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>Ser la marca líder en bienestar premium en Ecuador, reconocida por la calidad inigualable de nuestros jugos Cold Pressed y nuestro compromiso con la salud pura.</p>
      </div>

      {/* SURTIDO */}
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', marginTop: '40px' }}>NUESTRO SURTIDO</h2>
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {products.map(p => (
          <div key={p.id} className={`section-card ${p.available ? 'featured' : ''}`} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: p.available ? p.accent : '#CCC' }}>{p.tag}</span>
            <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#777' }}>{p.desc}</p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '15px 0' }}>${p.price.toFixed(2)}</div>
            {p.available ? (
              <button className="btn-main" onClick={() => addToCart(p)}>AÑADIR AL PACK</button>
            ) : (
              <button className="btn-disabled">MUY PRONTO</button>
            )}
          </div>
        ))}
      </div>

      {/* ATRIBUTOS */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ margin: 0 }}>100% PRENSADO EN FRÍO</h4>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Conserva Máxima Nutrición y Sabor Real.</p>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ margin: 0 }}>ORIGEN ANDINO</h4>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Valles Locales de Quito y Pichincha.</p>
        </div>
        <div>
          <h4 style={{ margin: 0 }}>ENERGÍA NATURAL</h4>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Sin Azúcar Añadida, Solo Fruta Real.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'black', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <img src="1000786704.png" alt="Footer Logo" style={{ height: '30px', filter: 'brightness(1.5)', marginBottom: '10px' }} />
        <p style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>QUITO FRESH © 2026 - PUREZA REAL</p>
      </footer>

      {/* CARRITO */}
      <div className="side-cart">
        <div style={{ padding: '20px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold' }}>TU PACK</span>
          <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px' }}>&times;</button>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{item.name} x{item.qty}</span>
              <span style={{ fontWeight: 'bold' }}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid #EEE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button style={{ background: '#25D366', color: 'white', border: 'none', width: '100%', padding: '15px', borderRadius: '50px', fontWeight: 'bold' }}>PEDIR POR WHATSAPP 📱</button>
          </div>
        )}
      </div>
    </div>
  );
}
