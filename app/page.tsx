"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMaestroFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Enlaces de alta prioridad para Meta y WhatsApp
  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; // Color Celeste exacto del fondo del logo

  useEffect(() => {
    setMounted(true);
    
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
    forceMeta('og:description', 'Extractos puros prensados en frío de los Andes. ¡Siente la frescura!');
    forceMeta('og:image', IMAGE_URL);
    forceMeta('og:image:secure_url', IMAGE_URL);
    forceMeta('og:image:width', '1200');
    forceMeta('og:image:height', '630');
    forceMeta('og:type', 'website');
    forceMeta('og:url', SITE_URL);
  }, []);

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
      
      {/* Importación de fuentes Google Titan One */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');

        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        .text-gel-3d {
          font-family: 'Titan One', cursive;
          text-transform: capitalize !important; 
          position: relative;
          text-shadow: 
            0px 4px 0px rgba(0,0,0,0.1), 
            0px 8px 15px rgba(0,0,0,0.1),
            inset 0px 4px 6px rgba(255,255,255,0.7);
          line-height: 1.1;
        }

        /* Se eliminó el pseudo-elemento ::after que creaba las gotas de agua falsas */

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); position: relative; z-index: 2; overflow: hidden; }
        .featured { border: 4px solid #E91E63; }
        
        /* BOTÓN PRINCIPAL AHORA EN CELESTE TROPICAL */
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        
        .bg-accent { position: absolute; pointer-events: none; z-index: 0; opacity: 0.6; }
        
        /* CORRECCIÓN: Niebla Interactiva reemplazada por Niebla Sensorial de "Respiración" */
        .interactive-fog {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 10;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.4) 100%);
          animation: fogBreathe 10s ease-in-out infinite; /* Respiración lenta y constante */
        }

        @keyframes fogBreathe {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; } /* La niebla se vuelve más densa, como un suspiro de frío */
        }
      ` }} />

      {/* EFECTO NIEBLA SENSORIAL DE RESPIRACIÓN */}
      <div className="interactive-fog"></div>

      {/* NAVEGACIÓN */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION - SE ELIMINARON LOS HIELOS FALSOS */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden', backgroundColor: '#FDFDFD' }}>
        <img src="1000786975.png" className="bg-accent" style={{ top: '-50px', right: '-100px', width: '400px', transform: 'rotate(15deg)' }} />
        <img src="1000786976.png" className="bg-accent" style={{ top: '20px', left: '-50px', width: '250px', opacity: 0.4 }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* ACENTO DE TÍTULO AHORA EN CELESTE TROPICAL */}
          <div style={{ fontWeight: 900, fontSize: '12px', color: CELESTE_LOGO, marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* BENEFICIOS - ICONOS AHORA EN CELESTE TROPICAL */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '60px 20px', flexWrap: 'wrap', borderBottom: '1px solid #F5F5F5', position: 'relative', zIndex: 2 }}>
        {["100% PRENSADO EN FRÍO", "ORIGEN ANDINO", "ENERGÍA NATURAL"].map((text, i) => (
          <div key={i} style={{ textAlign: 'center', maxWidth: '140px' }}>
            <div style={{ fontSize: '32px' }}>{i === 0 ? "⚙️" : i === 1 ? "🏔️" : "⚡"}</div>
            <div className="text-bold" style={{ fontSize: '10px', marginTop: '12px', color: CELESTE_LOGO }}>{text}</div>
          </div>
        ))}
      </section>

      {/* SOBRE NOSOTROS - TÍTULOS EN CELESTE */}
      <section style={{ position: 'relative', padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <img src="1000786977.png" className="bg-accent" style={{ bottom: '0', right: '-150px', width: '500px', opacity: 0.15 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', position: 'relative', zIndex: 2 }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-bold" style={{ color: CELESTE_LOGO, marginBottom: '20px' }}>Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
          </div>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-bold" style={{ color: CELESTE_LOGO, marginBottom: '20px' }}>Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por nuestra calidad inigualable Cold Pressed.</p>
          </div>
          {/* TARJETA 2026 AHORA CON FONDO CELESTE TROPICAL */}
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="text-bold" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Llevando Felicidad</h3>
            <div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '15px' }}>2026</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8 }}>Llevamos la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
          </div>
        </div>
      </section>

      {/* PRODUCTOS - SE ELIMINARON LOS HIELOS FALSOS */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        
        <h2 className="text-gel-3d" style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '70px', color: '#1A1A1A' }}>Nuestro Surtido Premium</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              {/* ETIQUETAS DE TAG AHORA EN CELESTE TROPICAL */}
              <div style={{ color: p.available ? CELESTE_LOGO : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              
              <h3 className="text-gel-3d" style={{ fontSize: '2.5rem', margin: '0 0 10px', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
              
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>{p.desc}</p>
              {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px', color: '#1A1A1A' }}>${p.price.toFixed(2)}</div>}
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
      <footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 20 }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
        <div className="text-bold" style={{ fontSize: '12px', letterSpacing: '4px', opacity: 0.8, marginBottom: '15px' }}>QUITO FRESH — PUREZA REAL</div>
        <div style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Hecho por <span style={{ fontWeight: 800 }}>ECOS Branding</span> & <span style={{ fontWeight: 800 }}>ORCA Studios</span> © 2026. Todos los derechos reservados.
        </div>
      </footer>

      {/* MODAL CARRITO CON ACENTOS CELESTE TROPICAL */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
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
                    <div className="text-gel-3d" style={{ fontSize: '1.2rem', color: i.accent }}>{i.name}</div>
                    {/* PRECIOS AHORA EN CELESTE TROPICAL */}
                    <div style={{ fontSize: '13px', color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 900, width: '20px', textAlign: 'center' }}>{i.qty}</span>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', background: 'white', cursor: 'pointer' }}>+</button>
                    <button style={{ marginLeft: '10px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer' }}>❌</button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}22` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
                <span>TOTAL</span>
                {/* TOTAL AHORA EN CELESTE TROPICAL */}
                <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', fontWeight: 800, fontSize: '11px', marginBottom: '15px', cursor: 'pointer' }}>VACIAR TODO EL PACK</button>
              {/* BOTÓN WHATSAPP MANTIENE SU COLOR DE MARCA PARA CONFIANZA */}
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
