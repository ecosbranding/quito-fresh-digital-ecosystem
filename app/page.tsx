"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshEstructuraLimpia() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Catálogo: Solo Maracumora tiene precio. Los otros 7 son "Próximamente" sin valor.
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
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-main:hover { transform: translateY(-3px); }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderBottom: '1px solid #EEE' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '40px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '10px 20px', fontSize: '12px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* --- NUEVA ESTRUCTURA DEL HERO: ORDENADA Y LIMPIA ---
         Aquí arreglamos el caos visual. El logo central es el protagonista.
      */}
      <header style={{ textAlign: 'center', padding: '100px 20px', position: 'relative', zIndex: 1, backgroundColor: '#FAFAFA' }}>
        <div style={{ fontWeight: 900, fontSize: '12px', color: '#8CC63F', marginBottom: '20px' }}>EST. 2026</div>
        <h1 className="text-bold" style={{ fontSize: '3.8rem', lineHeight: 0.8, margin: '0 0 50px' }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* El Logo es el centro de atención */}
          <img src="1000786698.png" alt="Logo Central" style={{ maxWidth: '300px', margin: '0 auto', display: 'block', position: 'relative', zIndex: 2 }} />
          
          {/* SOLO 2 Splashes, configurados con sutileza DETRÁS del logo:
             Splash de Maracuyá (superior derecha)
             Splash de Mora (inferior izquierda)
          */}
          <img src="1000786829.png" style={{ position: 'absolute', top: '-60px', right: '-100px', width: '250px', zIndex: 1, opacity: 0.25 }} alt="" />
          <img src="1000786831.png" style={{ position: 'absolute', bottom: '-50px', left: '-120px', width: '300px', zIndex: 1, opacity: 0.2 }} alt="" />
        </div>
      </header>

      {/* ICONS */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '50px 20px', flexWrap: 'wrap', position: 'relative', zIndex: 1, backgroundColor: 'white' }}>
        <div style={{ textAlign: 'center', maxWidth: '160px' }}>
          <div style={{ fontSize: '35px' }}>⚙️</div>
          <div className="text-bold" style={{ fontSize: '11px', marginTop: '12px', lineHeight: '1.3' }}>100% PRENSADO EN FRÍO</div>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '160px' }}>
          <div style={{ fontSize: '35px' }}>🏔️</div>
          <div className="text-bold" style={{ fontSize: '11px', marginTop: '12px', lineHeight: '1.3' }}>ORIGEN ANDINO</div>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '160px' }}>
          <div style={{ fontSize: '35px' }}>⚡</div>
          <div className="text-bold" style={{ fontSize: '11px', marginTop: '12px', lineHeight: '1.3' }}>ENERGÍA NATURAL</div>
        </div>
      </section>

      {/* CORPORATE INFO */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', position: 'relative', zIndex: 1 }}>
        <div style={{ background: '#F9F9F9', padding: '45px', borderRadius: '35px' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.3rem', marginBottom: '18px' }}>Nuestra Misión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
        </div>
        <div style={{ background: '#8CC63F', padding: '45px', borderRadius: '35px', color: 'white', boxShadow: '0 15px 30px rgba(140,198,63,0.1)' }}>
          <h3 className="text-bold" style={{ fontSize: '1.3rem', marginBottom: '18px' }}>Llevando Felicidad</h3>
          <p style={{ fontSize: '14.5px', lineHeight: 1.7, margin: 0 }}>Llevamos la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
        </div>
        <div style={{ background: '#F9F9F9', padding: '45px', borderRadius: '35px' }}>
          <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1.3rem', marginBottom: '18px' }}>Nuestra Visión</h3>
          <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>Ser líderes en bienestar premium en Ecuador, reconocidos por la calidad inigualable Cold Pressed.</p>
        </div>
      </section>

      {/* SURTIDO */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '2.8rem', marginBottom: '60px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div>
                <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
                <h3 className="text-bold" style={{ fontSize: '2rem', margin: '0 0 12px' }}>{p.name}</h3>
                <p style={{ fontSize: '13.5px', color: '#888', marginBottom: '25px', lineHeight: '1.5' }}>{p.desc}</p>
              </div>
              <div>
                {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px' }}>${p.price.toFixed(2)}</div>}
                {p.available ? (
                  <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
                ) : (
                  <button disabled style={{ background: '#F0F0F0', color: '#BBB', border: 'none', padding: '16px', borderRadius: '50px', fontWeight: 900, width: '100%', cursor: 'not-allowed', fontSize: '13px' }}>PRÓXIMAMENTE</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '35px', marginBottom: '25px', filter: 'brightness(2)' }} />
        <div className="text-bold" style={{ fontSize: '13px', letterSpacing: '3px', opacity: 0.8 }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO (MANTENIDO EXACTAMENTE IGUAL) */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100dvh', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0F0F0' }}>
            <span className="text-bold" style={{ fontSize: '1rem' }}>TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '28px', cursor: 'pointer', color: '#CCC' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '20px 30px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #F9F9F9' }}>
                <div style={{ flex: 1, marginRight: '15px' }}>
                  <div className="text-bold" style={{ fontSize: '14px' }}>{i.name}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white' }}>+</button>
                  <button onClick={() => removeItem(i.id)} style={{ marginLeft: '10px', border: 'none', background: 'none' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: '1px solid #F0F0F0', background: '#FFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.7rem', fontWeight: 900, marginBottom: '25px' }}>
                <span>TOTAL</span>
                <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #E91E63', color: '#E91E63', padding: '12px', borderRadius: '50px', fontWeight: 900, marginBottom: '15px' }}>VACIAR PACK</button>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span>PEDIR POR WHATSAPP📱</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
