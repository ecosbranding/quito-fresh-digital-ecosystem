"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshFinalCorregido() {
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
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; position: relative; z-index: 2; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .bg-accent { position: absolute; pointer-events: none; z-index: 0; opacity: 0.6; }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #EEE' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '40px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '10px 20px', fontSize: '12px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden', backgroundColor: '#FDFDFD' }}>
        <img src="1000786975.png" className="bg-accent" style={{ top: '-50px', right: '-100px', width: '400px', transform: 'rotate(15deg)' }} />
        <img src="1000786976.png" className="bg-accent" style={{ top: '20px', left: '-50px', width: '250px', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontWeight: 900, fontSize: '12px', color: '#8CC63F', marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '280px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* ICONOS TÉCNICOS */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '60px 20px', flexWrap: 'wrap', borderBottom: '1px solid #F5F5F5' }}>
        {["100% PRENSADO EN FRÍO", "ORIGEN ANDINO", "ENERGÍA NATURAL"].map((text, i) => (
          <div key={i} style={{ textAlign: 'center', maxWidth: '140px' }}>
            <div style={{ fontSize: '32px' }}>{i === 0 ? "⚙️" : i === 1 ? "🏔️" : "⚡"}</div>
            <div className="text-bold" style={{ fontSize: '10px', marginTop: '12px', color: '#666' }}>{text}</div>
          </div>
        ))}
      </section>

      {/* INFO CORPORATIVA REORGANIZADA (Misión -> Visión -> Año 2026) */}
      <section style={{ position: 'relative', padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <img src="1000786977.png" className="bg-accent" style={{ bottom: '0', right: '-150px', width: '500px', opacity: 0.15 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', position: 'relative', zIndex: 2 }}>
          {/* 1. MISIÓN */}
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '20px' }}>Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
          </div>
          
          {/* 2. VISIÓN */}
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-bold" style={{ color: '#8CC63F', marginBottom: '20px' }}>Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por nuestra calidad inigualable en procesos de extracción en frío.</p>
          </div>

          {/* 3. TARJETA MARCA - AHORA 2026 */}
          <div style={{ background: '#8CC63F', padding: '50px', borderRadius: '40px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="text-bold" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Pura Frescura</h3>
            <div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '15px' }}>2026</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8 }}>Frescura absoluta del campo directamente a tu mano, sin aditivos, solo la verdad de la fruta.</p>
          </div>
        </div>
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
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '35px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div className="text-bold" style={{ fontSize: '12px', letterSpacing: '4px', opacity: 0.6 }}>QUITO FRESH © 2026 — PUREZA REAL</div>
      </footer>

      {/* CARRITO */}
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
                  <div className="text-bold" style={{ fontSize: '14px' }}>{i.name}</div>
                  <div style={{ fontSize: '13px' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>-</button>
                  <span style={{ fontWeight: 900 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '30px', borderTop: '1px solid #EEE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP📱</button>
          </div>
        </div>
      )}
    </div>
  );
}
