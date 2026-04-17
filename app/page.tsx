"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshFinalPremium() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // CAMBIA ESTO cuando tengas tu dominio real (ejemplo: https://quitofresh.com)
  const SITE_URL = "https://tu-dominio-aqui.com"; 

  useEffect(() => {
    setMounted(true);
    
    const metaData = [
      { property: 'og:title', content: 'Quito Fresh — Pureza Real' },
      { property: 'og:description', content: 'Extractos puros prensados en frío. ¡Pide tu pack saludable ahora!' },
      { property: 'og:image', content: `${SITE_URL}/1000786992.jpg` }, // URL Completa para WhatsApp
      { property: 'og:url', content: SITE_URL },
      { property: 'og:type', content: 'website' }
    ];

    metaData.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
  }, [SITE_URL]);

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
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; position: relative; z-index: 2; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .bg-accent { position: absolute; pointer-events: none; z-index: 0; opacity: 0.6; }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #EEE' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden', backgroundColor: '#FDFDFD' }}>
        <img src="1000786975.png" className="bg-accent" style={{ top: '-50px', right: '-100px', width: '400px', transform: 'rotate(15deg)' }} />
        <img src="1000786976.png" className="bg-accent" style={{ top: '20px', left: '-50px', width: '250px', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontWeight: 900, fontSize: '12px', color: '#8CC63F', marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* SECCIONES INTERMEDIAS IGUALES ... */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '60px 20px', flexWrap: 'wrap', borderBottom: '1px solid #F5F5F5' }}>
        {["100% PRENSADO EN FRÍO", "ORIGEN ANDINO", "ENERGÍA NATURAL"].map((text, i) => (
          <div key={i} style={{ textAlign: 'center', maxWidth: '140px' }}>
            <div style={{ fontSize: '32px' }}>{i === 0 ? "⚙️" : i === 1 ? "🏔️" : "⚡"}</div>
            <div className="text-bold" style={{ fontSize: '10px', marginTop: '12px', color: '#666' }}>{text}</div>
          </div>
        ))}
      </section>

      {/* SURTIDO */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '70px' }}>NUESTRO SURTIDO</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '2.2rem', margin: '0 0 10px' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>${p.price.toFixed(2)}</div>}
              {p.available ? (
                <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
              ) : (
                <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '18px', borderRadius: '50px', fontWeight: 900, width: '100%' }}>PRÓXIMAMENTE</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div className="text-bold" style={{ fontSize: '12px', letterSpacing: '4px', opacity: 0.8, marginBottom: '15px' }}>QUITO FRESH — PUREZA REAL</div>
        <div style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Hecho por <span style={{ fontWeight: 800 }}>ECOS Branding</span> & <span style={{ fontWeight: 800 }}>ORCA Studios</span> © 2026. Todos los derechos reservados.
        </div>
      </footer>

      {/* CARRITO */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">TU SELECCIÓN</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#CCC', fontWeight: 800 }}>TU PACK ESTÁ VACÍO</div>
            ) : (
              cart.map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #F9F9F9' }}>
                  <div style={{ flex: 1 }}>
                    <div className="text-bold" style={{ fontSize: '14px' }}>{i.name}</div>
                    <div style={{ fontSize: '13px', color: '#8CC63F', fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 900, width: '20px', textAlign: 'center' }}>{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>+</button>
                    <button onClick={() => removeItem(i.id)} style={{ marginLeft: '10px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer' }}>❌</button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
                <span>TOTAL</span>
                <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', fontWeight: 800, fontSize: '11px', marginBottom: '15px', cursor: 'pointer' }}>VACIAR TODO EL PACK</button>
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span>PEDIR POR WHATSAPP 📲</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
