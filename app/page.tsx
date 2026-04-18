"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function QuitoFreshUltraFresh() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; // Color exacto del fondo del logo

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    // Inyección de Meta Tags Críticos para WhatsApp
    const forceMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    forceMeta('og:title', 'Quito Fresh | Pureza Real');
    forceMeta('og:description', 'Extractos puros prensados en frío. ¡Siente la frescura!');
    forceMeta('og:image', IMAGE_URL);
    forceMeta('og:image:width', '1200');
    forceMeta('og:image:height', '630');
    forceMeta('og:type', 'website');

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const products = [
    { id: 1, name: "MARACUMORA", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "GREEN BOOST", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "BERRY BLISS", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "GOLD CITRUS", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
    { id: 5, name: "VITAL ROOTS", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
    { id: 6, name: "PURE ALOE", desc: "Aloe Vera, Pepino y Menta", price: null, accent: "#4CAF50", tag: "PRÓXIMAMENTE", available: false },
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

  const sendWhatsApp = () => {
    const message = encodeURIComponent(`Hola Quito Fresh, mi pedido es:\n${cart.map(i => `- ${i.name} (${i.qty} unid.)`).join('\n')}\nTotal: $${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}`);
    window.open(`https://wa.me/593995849214?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* FILTROS SVG PARA EFECTO GELATINA 3D (SWEET) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-melt">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="40" lightingColor="#white" result="spec">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="dilated" />
        </filter>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-gel { font-family: 'Brush Script MT', cursive; filter: url(#gel-melt); text-transform: none !important; }
        .bg-niebla { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 50; background: radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(255,255,255,0.15) 200px); }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1); background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); position: relative; z-index: 2; overflow: hidden; }
        .product-card:hover { transform: scale(1.02); border-color: ${CELESTE_LOGO}; box-shadow: 0 20px 40px rgba(0, 173, 239, 0.1); }
        .product-card:hover::after { content: '💧'; position: absolute; top: 10px; right: 10px; animation: drip 2s infinite; }
        @keyframes drip { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(20px); opacity: 0; } }
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      {/* EFECTO NIEBLA INTERACTIVA */}
      <div className="bg-niebla"></div>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(15px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', backgroundColor: '#F0F9FF' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="text-gel" style={{ fontSize: '5rem', lineHeight: 1, color: CELESTE_LOGO, margin: '0 0 20px' }}>
            Refresca <br/><span style={{ color: '#1A1A1A', filter: 'none', fontFamily: 'Inter' }}>TU VIDA</span>
          </h1>
          <p style={{ fontWeight: 800, color: CELESTE_LOGO, fontSize: '14px', letterSpacing: '2px' }}>CON EL SABOR DEL QUITO REAL</p>
          <img src="1000786698.png" alt="Hero" style={{ maxWidth: '400px', margin: '40px auto' }} />
        </div>
        {/* HIELOS PARALLAX */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '40px', transform: `translateY(${mousePos.y * 0.05}px)` }}>🧊</div>
        <div style={{ position: 'absolute', bottom: '15%', right: '10%', fontSize: '60px', transform: `translateY(${mousePos.y * -0.03}px)` }}>🧊</div>
      </header>

      {/* PRODUCTOS CON EFECTO GELATINA EN NOMBRES */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-gel" style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '70px', color: '#333' }}>Sabores Premium</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className="product-card">
              <div style={{ color: p.available ? CELESTE_LOGO : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              <h3 className="text-gel" style={{ fontSize: '2.8rem', color: p.available ? p.accent : '#999', margin: '0 0 10px' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '30px', color: '#1A1A1A' }}>${p.price.toFixed(2)}</div>}
              <button 
                onClick={() => addToCart(p)} 
                className="btn-main" 
                style={{ background: p.available ? p.accent : '#EEE', color: p.available ? 'white' : '#AAA' }}
              >
                {p.available ? "AÑADIR AL PACK" : "PRÓXIMAMENTE"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2026 EN CELESTE */}
      <section style={{ background: `linear-gradient(135deg, ${CELESTE_LOGO} 0%, #0076a3 100%)`, padding: '80px 20px', color: 'white', textAlign: 'center' }}>
        <h3 className="text-gel" style={{ fontSize: '4rem', color: 'white' }}>Pureza Real 2026</h3>
        <p style={{ maxWidth: '600px', margin: '20px auto', fontWeight: 600 }}>Llevando la frescura de los Andes directamente a tu mesa.</p>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '2px' }}>QUITO FRESH — HECHO POR ORCA STUDIOS</div>
      </footer>

      {/* CARRITO CON ACENTO CELESTE */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '380px', height: '100%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '30px', borderBottom: `1px solid ${CELESTE_LOGO}33`, display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-gel" style={{ fontSize: '1.5rem', color: CELESTE_LOGO }}>Tu Pack</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span className="text-gel" style={{ fontSize: '1.2rem', color: i.accent }}>{i.name}</span>
                <span style={{ fontWeight: 800 }}>x{i.qty}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}33` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
          </div>
        </div>
      )}
    </div>
  );
}
