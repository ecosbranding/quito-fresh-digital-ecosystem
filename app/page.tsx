"use client";
import React, { useState, useEffect } from 'react';

export default function QuitoFreshInteractive() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const products = [
    { id: 1, name: "Green Boost", desc: "Manzana, Apio, Espinaca", price: 4.50, accent: "#8CC63F", bg: "#F1F8E9", tag: "100% Natural" },
    { id: 2, name: "Berry Bliss", desc: "Frutos Rojas y Mora Silvestre", price: 4.50, accent: "#E64A19", bg: "#FFEBEE", tag: "Antioxidante" },
    { id: 3, name: "Zest Citrus", desc: "Maracuyá y Cítricos", price: 4.50, accent: "#FFB300", bg: "#FFFDE7", tag: "Full Energía" },
    { id: 4, name: "Andina Mora", desc: "Mora de altura premium", price: 4.50, accent: "#880E4F", bg: "#FCE4EC", tag: "Hierro +" },
    { id: 5, name: "Amazon Power", desc: "Guayusa y Limón", price: 5.00, accent: "#2E7D32", bg: "#E8F5E9", tag: "Enfoque" },
    { id: 6, name: "Sunrise Mix", desc: "Zanahoria y Naranja", price: 4.75, accent: "#FB8C00", bg: "#FFF3E0", tag: "Vitamina C" },
    { id: 7, name: "Pure Water", desc: "Agua de Coco Real", price: 4.00, accent: "#03A9F4", bg: "#E1F5FE", tag: "Hidratación" },
    { id: 8, name: "Relax Blue", desc: "Lavanda y Arándanos", price: 5.50, accent: "#5E35B1", bg: "#EDE7F6", tag: "Calma" }
  ];

  // Funciones de Carrito Mejoradas
  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
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

  const checkout = () => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2);
    const items = cart.map(i => `🥤 *${i.name}* x${i.qty}`).join('%0A');
    const msg = `✨ *ORDEN QUITO FRESH* ✨%0A%0A¡Hola! Quiero mi pack:%0A%0A${items}%0A%0A💰 *TOTAL:* $${total}%0A%0A📍 *¿Cuál es el tiempo estimado?* 🍏`;
    window.open(`https://wa.me/593995849214?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: '"Montserrat", sans-serif', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        .text-bold { font-weight: 900; text-transform: uppercase; }
        .btn-green { background: #8CC63F; color: white; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .btn-qty { background: #F5F5F5; border: none; width: 30px; height: 30px; border-radius: 50%; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .btn-qty:hover { background: #EEE; }
        .cart-sidebar { position: fixed; right: 0; top: 0; width: 100%; max-width: 400px; height: 100%; background: #fff; z-index: 1000; box-shadow: -10px 0 50px rgba(0,0,0,0.1); transform: translateX(${isCartOpen ? '0' : '100%'}); transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; }
      ` }} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', zIndex: 100, boxSizing: 'border-box', borderBottom: '1px solid #F0F0F0' }}>
        <div className="text-bold" style={{ fontSize: '22px', letterSpacing: '-1px' }}>QUITO FRESH</div>
        <button onClick={() => setIsCartOpen(true)} className="btn-green" style={{ padding: '10px 25px', fontSize: '14px' }}>
          CARRITO ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </nav>

      {/* HERO SECTION */}
      <section style={{ padding: '140px 40px 80px 40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 className="text-bold" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1, marginBottom: '20px' }}>
            TU VIDA <br/><span style={{ color: '#8CC63F' }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#666', marginBottom: '30px', maxWidth: '450px' }}>
            Jugos 100% orgánicos, prensados en frío para que tú y tu familia disfruten de la pureza de los Andes.
          </p>
          <button className="btn-green" style={{ padding: '18px 40px', fontSize: '16px' }}>VER NUESTRO MENÚ</button>
        </div>
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
          <div style={{ width: '100%', maxWidth: '450px', aspectRatio: '1/1', background: '#F1F8E9', borderRadius: '50%', margin: '0 auto', overflow: 'hidden' }}>
             <img src="/api/placeholder/400/600" alt="Botellas" style={{ width: '80%', marginTop: '40px' }} />
          </div>
        </div>
      </section>

      {/* CATALOGO */}
      <main style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="text-bold" style={{ fontSize: '3rem' }}>Nuestro Surtido</h2>
          <p style={{ color: '#888' }}>Prensado en frío. Sin azúcar añadida. Cero conservantes.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {products.map(p => (
            <div key={p.id} style={{ borderRadius: '25px', padding: '40px 20px', border: `2px solid ${p.bg}`, textAlign: 'center' }}>
              <h3 className="text-bold" style={{ fontSize: '1.8rem', color: p.accent, margin: '0 0 10px 0' }}>{p.name}</h3>
              <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>{p.desc}</p>
              <div style={{ display: 'inline-block', padding: '5px 15px', borderRadius: '20px', backgroundColor: p.bg, color: p.accent, fontSize: '12px', fontWeight: 700, marginBottom: '20px' }}>
                {p.tag}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '25px' }}>${p.price.toFixed(2)}</div>
              <button onClick={() => addToCart(p)} className="btn-green" style={{ width: '100%', padding: '15px', background: p.accent }}>
                SELECCIONAR
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* SIDEBAR DEL CARRITO INTERACTIVO */}
      <div className="cart-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-bold" style={{ fontSize: '1.5rem' }}>Tu Selección</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', margin: '30px 0' }}>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F5F5F5' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>{i.name}</div>
                <div style={{ fontSize: '14px', color: '#888' }}>${i.price.toFixed(2)} c/u</div>
              </div>
              
              {/* CONTROLES DE CANTIDAD */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 15px' }}>
                <button className="btn-qty" onClick={() => updateQty(i.id, -1)}>-</button>
                <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{i.qty}</span>
                <button className="btn-qty" onClick={() => updateQty(i.id, 1)}>+</button>
              </div>

              <div style={{ textAlign: 'right', minWidth: '70px' }}>
                <div style={{ fontWeight: 900 }}>${(i.price * i.qty).toFixed(2)}</div>
                <button onClick={() => removeItem(i.id)} style={{ border: 'none', background: 'none', color: '#FF4444', fontSize: '12px', cursor: 'pointer', padding: '5px 0' }}>ELIMINAR</button>
              </div>
            </div>
          ))}
          {cart.length === 0 && <p style={{ textAlign: 'center', color: '#AAA', marginTop: '40px' }}>Tu selección está vacía</p>}
        </div>

        {cart.length > 0 && (
          <div style={{ paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 900, marginBottom: '25px' }}>
              <span>TOTAL</span>
              <span>${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="btn-green" style={{ width: '100%', padding: '20px', fontSize: '16px', background: '#25D366' }}>
              ORDENAR POR WHATSAPP 📱
            </button>
          </div>
        )}
      </div>

      <footer style={{ padding: '60px 40px', textAlign: 'center', background: '#F9F9F9' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, opacity: 0.4, letterSpacing: '1px' }}>DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS © 2026</p>
      </footer>
    </div>
  );
}
