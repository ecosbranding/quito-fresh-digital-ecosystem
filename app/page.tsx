"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshMaestroFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // NUEVO: Estado para rastrear el cursor (para la niebla de "respiración")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Enlaces de alta prioridad para Meta y WhatsApp
  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
  const CELESTE_LOGO = "#00ADEF"; // Color Celeste Tropical exacto del logo

  useEffect(() => {
    setMounted(true);
    
    // NUEVO: Listener para interacción de frescura (Niebla Atmosférica)
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Inyección de Meta Tags Críticos para WhatsApp (Intacto)
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
    forceMeta('og:description', 'Extractos puros prensados en frío de los Andes. ¡Pide tu pack saludable!');
    forceMeta('og:image', IMAGE_URL);
    forceMeta('og:image:secure_url', IMAGE_URL);
    forceMeta('og:image:width', '1200');
    forceMeta('og:image:height', '630');
    forceMeta('og:type', 'website');
    forceMeta('og:url', SITE_URL);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const products = [
    { id: 1, name: "Maracumora", desc: "La fusión perfecta: Maracuyá y Mora", price: 1.00, accent: "#E91E63", tag: "SABOR ESTRELLA", available: true },
    { id: 2, name: "Green Boost", desc: "Manzana, Apio, Espinaca y Jengibre", price: null, accent: "#8CC63F", tag: "PRÓXIMAMENTE", available: false },
    { id: 3, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: null, accent: "#E91E63", tag: "PRÓXIMAMENTE", available: false },
    { id: 4, name: "Gold Citrus", desc: "Maracuyá & Cítricos", price: null, accent: "#FFB300", tag: "PRÓXIMAMENTE", available: false },
    { id: 5, name: "Vital Roots", desc: "Remolacha, Zanahoria y Naranja", price: null, accent: "#D32F2F", tag: "PRÓXIMAMENTE", available: false },
    { id: 6, name: "Pure Aloe", desc: "Aloe Vera, Pepino y Menta", price: null, accent: "#4CAF50", tag: "PRÓXIMAMENTE", available: false },
    { id: 7, name: "Amazon Vibe", desc: "Guayusa, Limón y Panela Natural", price: null, accent: "#1B5E20", tag: "PRÓXIMAMENTE", available: false },
    { id: 8, name: "Tropic Glow", desc: "Piña, Coco y Cúrcuma", price: null, accent: "#FFD600", tag: "PRÓXIMAMENTE", available: false },
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
      
      {/* NUEVO: SVG Filters y Fuentes Premium para los efectos visuales avanzados */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gel-viscosity">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="30" lightingColor="#CEE9F2" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Poiret+One&display=swap');

        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        
        /* ESTILO GEL-CARAMELO PREMIUM: Con difuminado celeste tropical integrado */
        .text-gel-caramelo-premium {
          font-family: 'Titan One', cursive; /* Titan One para la base redonda y orgánica que complementa al bold sans-serif */
          position: relative;
          color: white; /* Color base blanco para que el color de acento se difumine */
          mix-blend-mode: color-burn; /* Para que el color de acento se mezcle con la gelatina */
          text-shadow: 
            /* Sombra interna para volumen (Viscosidad) */
            inset 0 4px 6px rgba(255, 255, 255, 0.6),
            /* Sombras externas para volumen 3D */
            0px 4px 0px rgba(0,0,0,0.1), 
            0px 8px 15px rgba(0,0,0,0.1),
            /* NUEVO: Difuminado Celeste Tropical integrado alrededor y debajo del caramelo */
            0px 0px 30px ${CELESTE_LOGO},
            0px 0px 50px ${CELESTE_LOGO}99;
          filter: url(#gel-viscosity);
          line-height: 1.1;
        }

        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); position: relative; z-index: 2; overflow: hidden; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }
        .product-card:hover::after { content: ''; position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: ${CELESTE_LOGO}; border-radius: 50%; filter: blur(100px); opacity: 0.1; }
        .featured { border: 4px solid #E91E63; }
        
        /* BOTÓN PRINCIPAL AHORA EN CELESTE TROPICAL */
        .btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
        .btn-main:hover { transform: scale(1.02); box-shadow: 0 5px 15px ${CELESTE_LOGO}33; }
        
        .bg-accent { position: absolute; pointer-events: none; z-index: 0; opacity: 0.6; }
        
        /* CORRECCIÓN: Niebla Interactiva reemplazada por Niebla Sensorial de "Respiración" */
        .sensory-fog-layer {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 10;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.4) 100%);
          animation: fogBreathe 8s ease-in-out infinite; /* Respiración lenta y constante */
        }

        @keyframes fogBreathe {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); } /* La niebla se vuelve más densa y se expande, como un suspiro de frío */
        }
      ` }} />

      {/* EFECTO NIEBLA SENSORIAL DE RESPIRACIÓN */}
      <div className="sensory-fog-layer"></div>

      {/* NAVEGACIÓN */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
      </nav>

      {/* HERO SECTION CON IMÁGENES DE FONDO INTÁCTO, SOLO ACENTOS EN CELESTE */}
      <header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden', backgroundColor: '#FDFDFD' }}>
        <img src="1000786975.png" className="bg-accent" style={{ top: '-50px', right: '-100px', width: '400px', transform: 'rotate(15deg)' }} />
        <img src="1000786976.png" className="bg-accent" style={{ top: '20px', left: '-50px', width: '250px', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* NUEVO: Título Hero a juego con la fuente 'Poiret One' y efecto Caramelo */}
          <div style={{ fontWeight: 900, fontSize: '12px', color: CELESTE_LOGO, marginBottom: '20px' }}>FRESCURA PURA</div>
          <h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
          <img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
        </div>
      </header>

      {/* BENEFICIOS: Intácto, solo acentos en Celeste */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '60px 20px', flexWrap: 'wrap', borderBottom: '1px solid #F5F5F5', position: 'relative', zIndex: 2 }}>
        {["100% PRENSADO EN FRÍO", "ORIGEN ANDINO", "ENERGÍA NATURAL"].map((text, i) => (
          <div key={i} style={{ textAlign: 'center', maxWidth: '140px' }}>
            <div style={{ fontSize: '32px' }}>{i === 0 ? "⚙️" : i === 1 ? "🏔️" : "⚡"}</div>
            <div className="text-bold" style={{ fontSize: '10px', marginTop: '12px', color: CELESTE_LOGO }}>{text}</div>
          </div>
        ))}
      </section>

      {/* SOBRE NOSOTROS: Intácto, solo acentos en Celeste */}
      <section style={{ position: 'relative', padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <img src="1000786977.png" className="bg-accent" style={{ bottom: '0', right: '-150px', width: '500px', opacity: 0.15 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', position: 'relative', zIndex: 2 }}>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            {/* NUEVO: Título 'Sobre Nosotros' con efecto Caramelo y fuente Poiret One a juego */}
            <h3 className="text-gel-caramelo-premium" style={{ color: CELESTE_LOGO, marginBottom: '20px', fontSize: '1.5rem' }}>Nuestra Misión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina, fomentando un estilo de vida consciente, natural y lleno de energía vital.</p>
          </div>
          <div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
            <h3 className="text-gel-caramelo-premium" style={{ color: CELESTE_LOGO, marginBottom: '20px', fontSize: '1.5rem' }}>Nuestra Visión</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador, reconocidos por nuestra calidad inigualable Cold Pressed.</p>
          </div>
          {/* NUEVO: Tarjeta '2026' ahora con fondo Celeste Tropical */}
          <div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="text-bold" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Llevando Felicidad</h3>
            <div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '15px' }}>2026</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8 }}>Llevamos la frescura absoluta del campo directamente a tu mano, sin aditivos, sin engaños, solo fruta pura.</p>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Título de Sección con efecto Caramelo */}
        <h2 className="text-gel-caramelo-premium" style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '70px', color: '#1A1A1A' }}>NUESTRO SURTIDO PREMIUM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
              <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '15px' }}>{p.tag}</div>
              
              {/* NUEVO: Nombres de Sabores con efecto Caramelo Gelatina y difuminado celeste tropical */}
              <h3 className="text-gel-caramelo-premium" style={{ fontSize: '2.5rem', margin: '0 0 10px', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
              
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

      {/* MODAL CARRITO CORREGIDO: Solución para la captura image_15.png */}
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
                    {/* CORRECCIÓN: Nombres de sabor en carrito ahora legibles, sin efecto caramelo que "dañaba" la sección */}
                    <div className="text-bold" style={{ fontSize: '1.2rem', color: i.accent, textTransform: 'uppercase' }}>{i.name}</div>
                    {/* Precios en carrito ahora en Celeste Tropical */}
                    <div style={{ fontSize: '13px', color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
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
            <div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}22` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
                <span>TOTAL</span>
                {/* Total ahora en Celeste Tropical */}
                <span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
              <button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', fontWeight: 800, fontSize: '11px', marginBottom: '15px', cursor: 'pointer' }}>VACIAR TODO EL PACK</button>
              {/* Botón WhatsApp intácto y funcional */}
              <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP 📲</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
