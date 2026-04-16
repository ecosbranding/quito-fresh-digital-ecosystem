"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshVersionFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
    { id: 5, name: "VITAL ROOTS", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
    { id: 6, name: "PURE ALOE", desc: "Aloe Vera, Pepino y Menta", price: null, accent: "#4CAF50", tag: "PRÓXIMAMENTE", available: false },
    { id: 7, name: "AMAZON VIBE", desc: "Guayusa, Limón y Panela Natural", price: null, accent: "#1B5E20", tag: "PRÓXIMAMENTE", available: false },
    { id: 8, name: "TROPIC GLOW", desc: "Piña, Coco y Cúrcuma", price: null, accent: "#FFD600", tag: "PRÓXIMAMENTE", available: false },
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const sendWhatsApp = () => {
    const message = encodeURIComponent(`Hola Quito Fresh, mi pedido es:\n${cart.map(i => `- ${i.name} (${i.qty} unid.)`).join('\n')}\nTotal: $${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}`);
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float3D { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(2deg); } }
        @keyframes sway { 0%, 100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
        
        .floating-element { position: absolute; pointer-events: none; z-index: 0; }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); position: relative; z-index: 2; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; }
      ` }} />

      {/* ELEMENTOS DECORATIVOS USANDO TUS ARCHIVOS */}
      {/* Splash Rosa de Maracumora (superior derecha) */}
      <img src="1000786726.jpg" className="floating-element" style={{ top: '5%', right: '-10%', width: '400px', opacity: 0.3, animation: 'float3D 10s infinite' }} />
      
      {/* Hojas Reales (izquierda) */}
      <img src="1000786829.png" className="floating-element" style={{ top: '25%', left: '-150px', width: '500px', opacity: 0.25, animation: 'sway 8s infinite ease-in-out' }} />

      {/* Splash Azul/Lila (inferior izquierda) */}
      <img src="1000786728.jpg" className="floating-element" style={{ bottom: '10%', left: '-5%', width: '450px', opacity: 0.2, animation: 'float3D 12s infinite reverse' }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '40px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '10px 20px', fontSize: '12px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO (Restaurado Logo Centralizado) */}
      <header style={{ textAlign: 'center', padding: '60px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontWeight: 900, fontSize: '12px', color: '#8CC63F', marginBottom: '15px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 0.8, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Hero Logo" style={{ maxWidth: '300px', margin: '0 auto' }} />
      </header>

      {/* ICONS */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '40px 20px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '150px' }}>
          <div style={{ fontSize: '30px' }}>⚙️</div>
          <div className="text-bold" style={{ fontSize: '11px', marginTop: '10px' }}>100% PRENSADO EN FRÍO</div>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '150px' }}>
          <div style={{ fontSize: '30px' }}>🏔️</div>
          <div className="text-bold" style={{ fontSize: '11px', marginTop: '10px' }}>ORIGEN ANDINO</div>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '150px' }}>
          <div style={{ fontSize: '30px' }}>⚡</div>
          <div className="text-bold" style={{ fontSize: '11px', marginTop: '10px' }}>ENERGÍA NATURAL</div>
        </div>
      </section>

      {/* CORPORATE INFO */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', position: 'relative', zIndex: 2 }}>
        <div style={{ background: '#F9F9F9', padding: '40px', borderRadius: '30px' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#555' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div style={{ background: '#8CC63F', padding: '40px', borderRadius: '30px', color: white }}>
          <h3 className="text-bold" style={{ marginBottom: '15px' }}>Llevando Felicidad</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6 }}>Llevamos la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div style={{ background: '#F9F9F9', padding: '40px', borderRadius: '30px' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#555' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable Cold Pressed.</p>
        </div>
      </section>

      {/* SURTIDO */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '10px', marginBottom: '10px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '1.8rem', margin: '0 0 10px' }}>{p.name}</h3>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px' }}>${p.price.toFixed(2)}</div>}
              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <button disabled style={{ background: '#F0F0F0', color: '#BBB', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: 900, width: '100%' }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '35px', marginBottom: '20px', filter: 'brightness(2)' }} />
        <div className="text-bold" style={{ fontSize: '12px', letterSpacing: '2px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO SIDEBAR (TU LÓGICA SAGRADA) */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '350px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-5px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div className="text-bold" style={{ fontSize: '14px' }}>{i.name}</div>
                  <div style={{ fontSize: '12px' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                  <button onClick={() => removeItem(i.id)} style={{ marginLeft: '10px', border: 'none', background: 'none', cursor: 'pointer' }}>❌</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900, marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #E91E63', color: '#E91E63', padding: '10px', borderRadius: '50px', fontWeight: 900, marginBottom: '10px' }}>VACIAR PACK</button>
            <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
}
