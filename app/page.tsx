"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshVersionFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // --- LÓGICA DE NEGOCIO (SIN CAMBIOS) ---
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
        @keyframes float3D { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(3deg); } }
        @keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes drift { 0% { transform: translateX(0); } 100% { transform: translateX(30px); } }
        
        .layer-bg { position: fixed; pointer-events: none; z-index: 0; filter: drop-shadow(15px 15px 30px rgba(0,0,0,0.08)); }
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); position: relative; z-index: 2; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      {/* --- NUEVOS ACTIVOS INTEGRADOS --- */}
      
      {/* Splash Maracuyá Realista (Superior Derecha) */}
      <img src="1000786975.png" className="layer-bg" style={{ top: '-5%', right: '-10%', width: '500px', animation: 'float3D 12s infinite ease-in-out' }} />
      
      {/* Hojas Verdes Realistas (Izquierda Hero) */}
      <img src="1000786976.png" className="layer-bg" style={{ top: '15%', left: '-100px', width: '400px', animation: 'sway 8s infinite ease-in-out', opacity: 0.9 }} />

      {/* Splash de Moras y Frutas Mixtas (Centro Derecha) */}
      <img src="1000786977.png" className="layer-bg" style={{ top: '40%', right: '-50px', width: '450px', animation: 'float3D 10s infinite reverse' }} />

      {/* Fruta de Maracuyá Cortada (Centro Izquierda) */}
      <img src="1000786978.png" className="layer-bg" style={{ top: '55%', left: '2%', width: '220px', animation: 'sway 10s infinite ease-in-out' }} />

      {/* Splash de Jugo Cayendo (Inferior Derecha) */}
      <img src="1000786979.png" className="layer-bg" style={{ bottom: '5%', right: '-20px', width: '380px', animation: 'float3D 14s infinite' }} />

      {/* Hoja Individual Detallada (Inferior Izquierda) */}
      <img src="1000786982.png" className="layer-bg" style={{ bottom: '15%', left: '-50px', width: '300px', transform: 'rotate(45deg)', opacity: 0.8 }} />

      {/* --- ESTRUCTURA WEB --- */}

      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '40px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '10px 20px', fontSize: '12px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      <header style={{ textAlign: 'center', padding: '80px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontWeight: 900, fontSize: '12px', color: '#8CC63F', marginBottom: '15px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: '3.8rem', lineHeight: 0.8, margin: '0 0 50px' }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <img src="1000786698.png" alt="Hero Logo" style={{ maxWidth: '320px', margin: '0 auto', display: 'block' }} />
      </header>

      {/* INFO SECTIONS */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', position: 'relative', zIndex: 2 }}>
        <div style={{ background: 'rgba(249,249,249,0.9)', padding: '45px', borderRadius: '35px' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente.</p>
        </div>
        <div style={{ background: '#8CC63F', padding: '45px', borderRadius: '35px', color: 'white' }}>
          <h3 className="text-bold" style={{ marginBottom: '15px' }}>Llevando Felicidad</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.7 }}>Frescura absoluta del campo directamente a tu mano, sin aditivos, solo fruta pura.</p>
        </div>
        <div style={{ background: 'rgba(249,249,249,0.9)', padding: '45px', borderRadius: '35px' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '15px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad Cold Pressed.</p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2.2rem', margin: '0 0 10px' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '25px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px' }}>${p.price.toFixed(2)}</div>}
              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: 900, width: '100%' }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '35px', marginBottom: '25px', filter: 'brightness(2)' }} />
        <div className="text-bold" style={{ fontSize: '13px', letterSpacing: '3px' }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO SIDEBAR */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <div className="text-bold" style={{ fontSize: '15px' }}>{i.name}</div>
                  <div style={{ fontSize: '13px' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
          </div>
        </div>
      )}
    </div>
  );
}
