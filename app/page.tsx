"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshFinalPro() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "Green Boost", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "100% Natural" },
    { id: 2, name: "Berry Bliss", desc: "Frutos Rojos y Mora Silvestre", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "Antioxidante" },
    { id: 3, name: "Zest Citrus", desc: "Maracuyá y Cítricos", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "Full Energía" },
    { id: 4, name: "Andina Mora", desc: "Mora de altura premium", price: 4.50, accent: "#880E4F", bg: "#FCE4EC", tag: "Hierro +" },
    { id: 5, name: "Amazon Power", desc: "Guayusa y Limón", price: 5.00, accent: "#2E7D32", bg: "#E8F5E9", tag: "Enfoque" },
    { id: 6, name: "Sunrise Mix", desc: "Zanahoria y Naranja", price: 4.75, accent: "#FB8C00", bg: "#FFF3E0", tag: "Vitamina C" },
    { id: 7, name: "Pure Water", desc: "Agua de Coco Real", price: 4.00, accent: "#03A9F4", bg: "#E1F5FE", tag: "Hidratación" },
    { id: 8, name: "Relax Blue", desc: "Lavanda y Arándanos", price: 5.50, accent: "#5E35B1", bg: "#EDE7F6", tag: "Calma" }
  ];

  const scrollToMenu = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const checkout = () => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty}`).join('%0A');
    const msg = `✨ *ORDEN QUITO FRESH* ✨%0A%0AHola! Quiero armar mi pack:%0A%0A${items}%0A%0A💰 *TOTAL:* $${total}%0A%0A📍 *Envío a domicilio en Quito.* 🏔️🍏`;
    window.open(`https://wa.me/593995849214?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: '"Montserrat", sans-serif', margin: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .btn-green:hover { background: #76A935; transform: translateY(-3px); }
        .info-box { padding: 40px; border-radius: 25px; background: #F9F9F9; flex: 1; min-width: 280px; border: 1px solid #EEE; text-align: center; }
        .qty-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid #DDD; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .remove-btn { color: #FF4444; border: none; background: none; font-size: 18px; cursor: pointer; padding: 5px; margin-left: 10px; }
        .sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 400px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s ease-in-out; padding: 30px; box-sizing: border-box; display: flex; flex-direction: column; }
      ` }} />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid #F0F0F0', boxSizing: 'border-box' }}>
        <div className="text-bold" style={{ fontSize: '18px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="btn-green" style={{ padding: '10px 20px', fontSize: '12px' }}>
          🛒 PACK ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: '140px 30px 60px 30px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="text-bold" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', lineHeight: 1, marginBottom: '20px' }}>
          TU VIDA <span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/> EMPIEZA AQUÍ.
        </h1>
        <button onClick={scrollToMenu} className="btn-green" style={{ padding: '18px 45px', fontSize: '16px' }}>
          VER NUESTRO MENÚ
        </button>
      </section>

      {/* MISION / VISION / 2026 - AHORA CENTRADOS */}
      <section style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <div className="info-box">
            <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1rem', marginBottom: '10px' }}>Misión</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Nutrir con extractos puros de la tierra para una vida consciente.</p>
          </div>
          <div className="info-box">
            <h3 className="text-bold" style={{ color: '#8CC63F', fontSize: '1rem', marginBottom: '10px' }}>Visión</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Ser el referente #1 de bienestar andino Cold Pressed en Ecuador.</p>
          </div>
          <div className="info-box" style={{ background: '#8CC63F', color: 'white' }}>
            <h3 className="text-bold" style={{ fontSize: '1rem', marginBottom: '10px' }}>Desde 2026</h3>
            <p style={{ fontSize: '14px' }}>Quito Fresh nace para eliminar ultraprocesados de tu rutina diaria.</p>
          </div>
        </div>
      </section>

      {/* CATALOGO - AJUSTADO PARA CENTRAR EN MÓVIL */}
      <main id="catalog" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="text-bold" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '50px' }}>Nuestro Surtido</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px',
          justifyContent: 'center', // <--- ESTO CENTRA LOS RECUADROS
          justifyItems: 'center'    // <--- ESTO ASEGURA QUE EL CONTENIDO ESTÉ AL MEDIO
        }}>
          {products.map(p => (
            <div key={p.id} style={{ borderRadius: '25px', padding: '40px 20px', border: `2px solid ${p.bg}`, textAlign: 'center', width: '100%', maxWidth: '320px' }}>
              <div style={{ color: p.accent, fontSize: '11px', fontWeight: 800, marginBottom: '10px' }}>{p.tag}</div>
              <h3 className="text-bold" style={{ fontSize: '1.6rem', color: '#1A1A1A', margin: '0 0 5px 0' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>{p.desc}</p>
              <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '25px' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} className="btn-green" style={{ width: '100%', padding: '15px', background: p.accent }}>
                AÑADIR AL PACK
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #EEE', background: '#FAFAFA' }}>
        <div className="text-bold" style={{ fontSize: '1.2rem' }}>QUITO FRESH</div>
        <p style={{ color: '#AAA', fontSize: '12px' }}>Quito, Ecuador • 2026</p>
        <p style={{ fontSize: '9px', fontWeight: 700, opacity: 0.3, letterSpacing: '1px', marginTop: '30px' }}>ECOS BRANDING & ORCA STUDIOS</p>
      </footer>

      {/* CARRITO SIDEBAR CON ELIMINACIÓN CLARA */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="text-bold" style={{ fontSize: '1.3rem' }}>Tu Selección</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #F5F5F5' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{i.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>${i.price.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button className="qty-btn" onClick={() => updateQty(i.id, -1)}>-</button>
                <span style={{ fontWeight: 700, minWidth: '15px', textAlign: 'center' }}>{i.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(i.id, 1)}>+</button>
              </div>
              {/* BOTÓN DE ELIMINAR MEJORADO */}
              <button className="remove-btn" onClick={() => removeItem(i.id)} title="Eliminar">×</button>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#CCC', marginTop: '50px' }}>Tu selección está vacía</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="btn-green" style={{ width: '100%', padding: '20px', background: '#25D366' }}>
              PEDIR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
