"use client";

/**
 * QUITO FRESH - MAESTRO FINAL V3.0
 * Desarrollado para: Víctor Carvajal / ORCA Studios
 * Concepto: Pureza Real, Frescura Sensorial y Experiencia Cold Pressed.
 * * Estructura: Next.js + Tailwind CSS (Inline) + Framer Motion-like logic.
 */

import React, { useState, useEffect, useCallback } from 'react';

export default function QuitoFreshMaestroFinal() {
  // --- ESTADOS GLOBALES ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fogParticles, setFogParticles] = useState([]); // Sistema de partículas de escarcha

  // --- CONFIGURACIÓN DE BRANDING ---
  const BRAND = {
    name: "Quito Fresh",
    tagline: "Pureza Real de los Andes",
    colors: {
      celeste: "#00ADEF",      // Celeste Tropical (Logo)
      magenta: "#E91E63",     // Maracumora Accent
      dark: "#1A1A1A",
      whatsapp: "#25D366"
    },
    contact: "+593995849214",
    urls: {
      site: "https://quitofresh.vercel.app",
      preview: "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg"
    }
  };

  // --- LÓGICA DE MONTAJE Y METADATOS ---
  useEffect(() => {
    setMounted(true);
    
    // Inyección de Meta Tags para optimización en WhatsApp/Redes
    const updateMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('og:title', `${BRAND.name} | ${BRAND.tagline}`);
    updateMeta('og:description', 'Extractos puros prensados en frío. Siente la frescura de los Andes en cada sorbo.');
    updateMeta('og:image', BRAND.urls.preview);
    updateMeta('og:url', BRAND.urls.site);
    updateMeta('og:type', 'website');
  }, []);

  // --- SISTEMA INTERACTIVO DE NIEBLA (FOG SYSTEM) ---
  const triggerFog = useCallback((e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (!x || !y) return;

    const id = Math.random().toString(36).substr(2, 9);
    setFogParticles(prev => [...prev.slice(-15), { id, x, y }]); // Limitamos a 15 para performance

    setTimeout(() => {
      setFogParticles(prev => prev.filter(p => p.id !== id));
    }, 1500);
  }, []);

  // --- BASE DE DATOS DE PRODUCTOS ---
  const products = [
    { 
      id: 1, 
      name: "Maracumora", 
      desc: "Maracuyá real y mora silvestre seleccionada.", 
      price: 1.00, 
      accent: BRAND.colors.magenta, 
      tag: "SABOR ESTRELLA", 
      available: true 
    },
    { 
      id: 2, 
      name: "Green Boost", 
      desc: "Manzana verde, apio, espinaca y un toque de jengibre.", 
      price: null, 
      accent: "#8CC63F", 
      tag: "PRÓXIMAMENTE", 
      available: false 
    },
    { 
      id: 3, 
      name: "Vital Roots", 
      desc: "Remolacha, zanahoria y naranja premium.", 
      price: null, 
      accent: "#D32F2F", 
      tag: "PROXIMAMENTE", 
      available: false 
    },
    { 
      id: 4, 
      name: "Pure Aloe", 
      desc: "Aloe vera natural con pepino y menta fresca.", 
      price: null, 
      accent: "#4CAF50", 
      tag: "PROXIMAMENTE", 
      available: false 
    }
  ];

  // --- ACCIONES DEL CARRITO ---
  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  // --- WHATSAPP BUSINESS ENGINE ---
  const sendWhatsAppOrder = () => {
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0).toFixed(2);
    const header = `*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n\n`;
    const intro = `Hola, quiero elevar mi energía con la pureza de los Andes. Este es mi Pack Saludable:\n\n`;
    const items = cart.map(i => `🥤 *${i.name.toUpperCase()}* \n   ${i.qty} unidades — Subtotal: $${(i.price * i.qty).toFixed(2)}`).join('\n\n');
    const footer = `\n\n*────────────────────*\n💰 *VALOR TOTAL: $${total}*\n*────────────────────*\n\n📍 *Dirección de Envío:* \n_(Escribe aquí tu ubicación)_\n\n✨ _Orden generada desde quitofresh.app_`;
    
    const fullMessage = encodeURIComponent(header + intro + items + footer);
    window.open(`https://wa.me/${BRAND.contact.replace('+', '')}?text=${fullMessage}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div 
      onMouseMove={triggerFog}
      onTouchMove={triggerFog}
      style={{ 
        backgroundColor: '#FFFFFF', 
        color: BRAND.colors.dark, 
        fontFamily: 'Inter, sans-serif', 
        position: 'relative', 
        overflowX: 'hidden',
        minHeight: '100vh'
      }}
    >
      {/* INYECCIÓN DE ESTILOS Y FILTROS PROFESIONALES */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="premium-gel">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="6" specularConstant="1.2" specularExponent="35" lightingColor="#FFFFFF" result="spec">
            <fePointLight x="-5000" y="-10000" z="10000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Inter:wght@400;700;900&display=swap');

        /* EFECTO CARAMELO LEGIBLE (Víctor Style) */
        .text-caramelo-premium {
          font-family: 'Titan One', cursive;
          color: white;
          text-shadow: 
            2px 2px 0px rgba(0,0,0,0.03),
            0px 0px 15px ${BRAND.colors.celeste}88,
            0px 0px 30px ${BRAND.colors.celeste}44;
          filter: url(#premium-gel);
          line-height: 1.1;
          letter-spacing: 1px;
        }

        /* NIEBLA SENSORIAL DINÁMICA */
        .fog-drop {
          position: fixed;
          pointer-events: none;
          background: radial-gradient(circle, rgba(200, 240, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 9999;
          filter: blur(25px);
          animation: particleFade 1.8s ease-out forwards;
        }
        @keyframes particleFade {
          0% { opacity: 0; transform: scale(0.2) translate(0, 0); }
          20% { opacity: 0.6; }
          100% { opacity: 0; transform: scale(2.5) translate(20px, -40px); }
        }

        .ambient-breathe {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 50% 50%, transparent 50%, ${BRAND.colors.celeste}08 100%);
          pointer-events: none; z-index: 1;
          animation: breatheEffect 12s infinite alternate;
        }
        @keyframes breatheEffect { from { opacity: 0.3; } to { opacity: 0.7; } }

        /* COMPONENTES */
        .btn-celeste {
          background: ${BRAND.colors.celeste};
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 900;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 15px ${BRAND.colors.celeste}44;
        }
        .btn-celeste:hover { transform: scale(1.03); box-shadow: 0 8px 25px ${BRAND.colors.celeste}66; }

        .card-glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 40px;
          transition: 0.4s;
        }
        .card-glass:hover { transform: translateY(-10px); border-color: ${BRAND.colors.celeste}44; }
      ` }} />

      {/* CAPA SENSORIAL */}
      <div className="ambient-breathe" />
      {fogParticles.map(p => (
        <div key={p.id} className="fog-drop" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
      ))}

      {/* NAVEGACIÓN PRO */}
      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 1000, 
        padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(15px)',
        borderBottom: `1px solid ${BRAND.colors.celeste}22`
      }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '55px' }} />
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="btn-celeste" 
            style={{ padding: '12px 25px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            🛒 MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})
          </button>
        </div>
      </nav>

      {/* HERO SECTION - IMPACTO VISUAL */}
      <header style={{ 
        position: 'relative', padding: '120px 5%', textAlign: 'center', 
        overflow: 'hidden', background: 'radial-gradient(circle at top, #FDFDFD 0%, #FFFFFF 100%)' 
      }}>
        {/* Elementos de decoración (Andinos/Frutales) */}
        <img src="1000786975.png" style={{ position: 'absolute', top: '-20px', right: '-50px', width: '350px', opacity: 0.6, transform: 'rotate(10deg)' }} />
        <img src="1000786976.png" style={{ position: 'absolute', bottom: '20px', left: '-50px', width: '250px', opacity: 0.4 }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontWeight: 900, fontSize: '14px', color: BRAND.colors.celeste, letterSpacing: '5px', marginBottom: '25px' }}>
            PUREZA REAL · COLD PRESSED
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 0.85, margin: '0 auto 50px', maxWidth: '900px' }}>
            Siente el <br/> 
            <span className="text-caramelo-premium" style={{ fontSize: '1.2em' }}>FRÍO PURO</span> <br/>
            de los Andes.
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
             <img src="1000786698.png" alt="Hero Bottle" style={{ width: '400px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} />
          </div>
        </div>
      </header>

      {/* SECCIÓN PRODUCTOS - GRID PROFESIONAL */}
      <main style={{ padding: '80px 5%', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="text-caramelo-premium" style={{ fontSize: '3.5rem', color: BRAND.colors.dark }}>Elige tu energía</h2>
          <p style={{ color: '#666', fontSize: '18px', marginTop: '10px' }}>Sin azúcar añadida, sin conservantes. Solo fruta.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px' 
        }}>
          {products.map(p => (
            <div key={p.id} className="card-glass" style={{ 
              padding: '50px 40px', textAlign: 'center',
              boxShadow: p.available ? `0 20px 40px ${p.accent}15` : 'none',
              opacity: p.available ? 1 : 0.7
            }}>
              <div style={{ 
                background: p.available ? `${p.accent}15` : '#F5F5F5',
                color: p.available ? p.accent : '#999',
                display: 'inline-block', padding: '6px 15px', borderRadius: '20px',
                fontSize: '11px', fontWeight: 900, marginBottom: '20px'
              }}>
                {p.tag}
              </div>
              
              <h3 className="text-caramelo-premium" style={{ 
                fontSize: '3rem', color: p.available ? p.accent : '#CCC',
                marginBottom: '15px'
              }}>
                {p.name}
              </h3>
              
              <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.6, marginBottom: '30px', minHeight: '50px' }}>
                {p.desc}
              </p>

              {p.price && (
                <div style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: '30px', letterSpacing: '-2px' }}>
                  <span style={{ fontSize: '20px', verticalAlign: 'top', marginRight: '5px' }}>$</span>
                  {p.price.toFixed(2)}
                </div>
              )}

              {p.available ? (
                <button 
                  onClick={() => addToCart(p)}
                  className="btn-celeste" 
                  style={{ background: p.accent, width: '100%', padding: '20px' }}
                >
                  AÑADIR AL PACK
                </button>
              ) : (
                <div style={{ 
                  background: '#F9F9F9', color: '#BBB', 
                  padding: '20px', borderRadius: '50px', fontWeight: 900 
                }}>
                  MUY PRONTO
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER CORPORATIVO */}
      <footer style={{ background: '#000', color: 'white', padding: '100px 5% 40px', textAlign: 'center' }}>
        <img src="1000786698.png" alt="Footer Logo" style={{ height: '60px', marginBottom: '40px', filter: 'brightness(0) invert(1)' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {['Instagram', 'WhatsApp', 'Ubicación'].map(link => (
            <a key={link} href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '2px' }}>{link.toUpperCase()}</a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #222', paddingTop: '40px', fontSize: '11px', opacity: 0.5, letterSpacing: '1px' }}>
          © 2026 QUITO FRESH S.A. | ECOS BRANDING & ORCA STUDIOS | PUREZA REAL DESDE EL CORAZÓN DE LOS ANDES.
        </div>
      </footer>

      {/* MODAL CARRITO ELITE */}
      {isCartOpen && (
        <div style={{ 
          position: 'fixed', top: 0, right: 0, width: 'clamp(320px, 90vw, 420px)', height: '100%', 
          background: 'white', zIndex: 2000, boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column', animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }` }} />
          
          <div style={{ padding: '40px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0' }}>
            <span style={{ fontWeight: 900, fontSize: '20px' }}>TU PACK SALUDABLE</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: '#F5F5F5', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}></div>
                <p style={{ fontWeight: 800, color: '#CCC' }}>COMIENZA TU PACK</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #FAFAFA' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, color: item.accent, fontSize: '18px' }}>{item.name}</div>
                    <div style={{ color: BRAND.colors.celeste, fontWeight: 700, fontSize: '14px' }}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#F5F5F5', borderRadius: '30px', padding: '5px 15px', gap: '15px' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 900 }}>-</button>
                    <span style={{ fontWeight: 900 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 900 }}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '40px 30px', background: '#FDFDFD', borderTop: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                <span style={{ fontWeight: 900, opacity: 0.5 }}>TOTAL</span>
                <span style={{ fontWeight: 900, fontSize: '2.5rem', color: BRAND.colors.celeste }}>
                  ${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={sendWhatsAppOrder}
                className="btn-celeste" 
                style={{ 
                  background: BRAND.colors.whatsapp, 
                  width: '100%', padding: '22px', fontSize: '14px',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                }}
              >
                CONFIRMAR PEDIDO <span>🚀</span>
              </button>
              
              <button 
                onClick={() => setCart([])}
                style={{ width: '100%', background: 'none', border: 'none', color: '#AAA', marginTop: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                VACIAR CARRITO
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

