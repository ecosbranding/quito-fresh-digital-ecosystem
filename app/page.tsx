"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshElite() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fogParticles, setFogParticles] = useState([]);
  const [activeProductId, setActiveProductId] = useState(null);

  const SITE_URL = "https://quitofresh.vercel.app"; 
  const CELESTE_LOGO = "#00ADEF"; 
  const BOTELLA_MARACUMORA_ASSET = "/1000788391.png";

  useEffect(() => {
    setMounted(true);
    const handleInteraction = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      setMousePos({ x, y });
      const id = Math.random();
      setFogParticles(prev => [...prev.slice(-15), { id, x, y }]);
      setTimeout(() => {
        setFogParticles(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };
    window.addEventListener('mousemove', handleInteraction);
    return () => window.removeEventListener('mousemove', handleInteraction);
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

  const addToCart = (p) => {
    if (!p.available) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .text-surtido-gel { font-family: 'Titan One', cursive; color: ${CELESTE_LOGO}; text-align: center; font-size: 3.5rem; margin-bottom: 50px; }
        
        /* CONTENEDOR DE LA RUEDA AJUSTADO */
        .wheel-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 80px; padding: 50px 20px 150px; scrollbar-width: none; }
        .wheel-container::-webkit-scrollbar { display: none; }
        
        .product-card { 
          flex: 0 0 300px; 
          scroll-snap-align: center; 
          position: relative; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center;
        }

        /* NOMBRE VERTICAL: No se tapa, centrado con la botella */
        .vertical-name { 
          position: absolute; 
          left: 0; 
          font-family: 'Titan One', cursive; 
          font-size: 3.5rem; 
          transform: rotate(-90deg) translateX(-50%); 
          transform-origin: left;
          z-index: 1;
          transition: 0.5s;
        }

        .bottle-img { 
          width: 180px; /* Tamaño controlado */
          z-index: 2; 
          cursor: pointer; 
          transition: transform 0.3s; 
        }
        .bottle-img:hover { transform: scale(1.05); }
        .bottle-blur { filter: blur(4px) grayscale(0.5); opacity: 0.7; }

        /* CUADRO DE INFORMACIÓN CENTRADO AL CLICK */
        .info-modal { 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%) scale(0.8); 
          width: 320px; 
          background: white; 
          border-radius: 30px; 
          padding: 30px; 
          box-shadow: 0 20px 50px rgba(0,0,0,0.15); 
          z-index: 100; 
          opacity: 0; 
          pointer-events: none; 
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #f0f0f0;
        }
        .info-modal.active { opacity: 1; transform: translate(-50%, -50%) scale(1); pointer-events: auto; }
        
        .btn-add { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 12px; font-weight: 900; width: 100%; cursor: pointer; margin-top: 15px; }
      ` }} />

      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="1000786698.png" alt="Logo" style={{ height: '50px' }} />
        <button onClick={() => setIsCartOpen(true)} style={{ background: CELESTE_LOGO, color: 'white', border: 'none', borderRadius: '20px', padding: '10px 20px', fontWeight: 800 }}>
          MI PACK ({cart.length})
        </button>
      </nav>

      <section style={{ padding: '60px 0' }}>
        <h2 className="text-surtido-gel">NUESTRO SURTIDO PREMIUM</h2>
        <div className="wheel-container">
          {products.map(p => (
            <div key={p.id} className="product-card">
              {/* Nombre difuminado si no está disponible, o sólido si sí */}
              <div className="vertical-name" style={{ 
                color: p.accent, 
                opacity: p.available ? 0.8 : 0.3,
                filter: p.available ? 'none' : 'blur(2px)'
              }}>
                {p.name}
              </div>

              <img 
                src={BOTELLA_MARACUMORA_ASSET} 
                className={`bottle-img ${!p.available ? 'bottle-blur' : ''}`}
                onClick={() => setActiveProductId(activeProductId === p.id ? null : p.id)}
              />

              {/* Ficha técnica centrada */}
              <div className={`info-modal ${activeProductId === p.id ? 'active' : ''}`}>
                <div style={{ textAlign: 'right', cursor: 'pointer', fontWeight: 900 }} onClick={() => setActiveProductId(null)}>✕</div>
                <p style={{ color: p.accent, fontSize: '10px', fontWeight: 800, margin: 0 }}>{p.tag}</p>
                <h3 style={{ fontFamily: 'Titan One', color: p.accent, fontSize: '1.8rem', margin: '5px 0' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#666' }}>{p.desc}</p>
                {p.available ? (
                  <>
                    <div style={{ fontSize: '2rem', fontWeight: 900, margin: '10px 0' }}>$1.00</div>
                    <button className="btn-add" style={{ background: p.accent }} onClick={() => addToCart(p)}>AÑADIR AL PACK</button>
                  </>
                ) : (
                  <div style={{ marginTop: '20px', color: '#999', fontWeight: 800 }}>PRÓXIMAMENTE</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* El resto de tu código (Misión, Visión, Footer) se mantiene igual abajo */}
    </div>
  );
}
