"use client";
import React, { useState, useEffect } from 'react';

// 1. CONFIGURACIÓN ESTATICA (Esto es lo que Meta lee primero)
// Si usas Next.js, esto debería ir idealmente en tu archivo layout.tsx o page.tsx
// Pero aquí lo integramos de forma que no interfiera con tu estado.

export default function QuitoFreshMaestroFinal() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Enlaces de alta prioridad
  const SITE_URL = "https://quitofresh.vercel.app"; 
  const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";

  useEffect(() => {
    setMounted(true);
    
    // Inyección forzada de Meta Tags en el HEAD para asegurar compatibilidad
    const head = document.head;
    const forceMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        head.appendChild(el);
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

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
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
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      
      {/* ESTILOS INTERNOS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
        .product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; }
        .featured { border: 4px solid #E91E63; }
        .btn-main { background: #8CC63F; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
      ` }} />

      {/* HEADER / NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '10px 20px' }}>
          PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1 }}>TU VIDA <span style={{ color: '#8CC63F' }}>SALUDABLE</span><br/>EMPIEZA AQUÍ.</h1>
        <p style={{ maxWidth: '600px', margin: '20px auto', color: '#666' }}>Jugos 100% orgánicos, prensados en frío para que tú y tu familia disfruten de la pureza de los Andes.</p>
        <img src="1000786698.png" style={{ maxWidth: '300px', marginTop: '30px' }} />
      </header>

      {/* SECCIÓN PRODUCTOS */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {products.map(p => (
          <div key={p.id} className={`product-card ${p.available ? 'featured' : ''}`}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: p.accent }}>{p.tag}</span>
            <h3 className="text-bold" style={{ fontSize: '1.8rem', margin: '10px 0' }}>{p.name}</h3>
            <p style={{ fontSize: '13px', color: '#999', minHeight: '40px' }}>{p.desc}</p>
            {p.price && <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '20px 0' }}>${p.price.toFixed(2)}</div>}
            <button 
              onClick={() => addToCart(p)} 
              disabled={!p.available}
              className="btn-main" 
              style={{ background: p.available ? p.accent : '#EEE', color: p.available ? 'white' : '#AAA' }}
            >
              {p.available ? "AÑADIR AL PACK" : "PRÓXIMAMENTE"}
            </button>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: '#FFF', padding: '60px 20px', textAlign: 'center' }}>
        <div className="text-bold" style={{ fontSize: '12px', opacity: 0.5 }}>Quito Fresh — 2026</div>
      </footer>

      {/* CARRITO LATERAL */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100%', background: 'white', zIndex: 1000, boxShadow: '-5px 0 20px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE' }}>
            <span className="text-bold">MI PEDIDO</span>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <div className="text-bold" style={{ fontSize: '12px' }}>{i.name}</div>
                  <div style={{ fontSize: '12px', color: '#8CC63F' }}>${(i.price * i.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQty(i.id, -1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #DDD' }}>-</button>
                  <span style={{ fontWeight: 800 }}>{i.qty}</span>
                  <button onClick={() => updateQty(i.id, 1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #DDD' }}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '20px', borderTop: '1px solid #EEE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900, marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>ENVIAR PEDIDO POR WA</button>
          </div>
        </div>
      )}
    </div>
  );
}
