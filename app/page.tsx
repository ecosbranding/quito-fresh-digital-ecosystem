"use client";
import React, { useState, useEffect } from 'react';
export default function QuitoFreshElite() {
const [cart, setCart] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
const [fogParticles, setFogParticles] = useState([]);
// ESTADO AÑADIDO SOLO PARA EL CLICK
const [activeProductId, setActiveProductId] = useState(null);

const SITE_URL = "https://quitofresh.vercel.app"; 
const IMAGE_URL = "https://i.postimg.cc/mD4X574X/Preview-WhatsApp-Quito-Fresh.jpg";
const CELESTE_LOGO = "#00ADEF"; 
// RUTA DE LA IMAGEN GENERADA CON GOTAS
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
window.addEventListener('touchmove', handleInteraction);

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
forceMeta('og:description', 'Extractos puros prensados en frío de los Andes.');
forceMeta('og:image', IMAGE_URL);
forceMeta('og:url', SITE_URL);
forceMeta('og:type', 'website');
forceMeta('twitter:card', 'summary_large_image');

return () => {
window.removeEventListener('mousemove', handleInteraction);
window.removeEventListener('touchmove', handleInteraction);
};

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
const total = cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
const itemsText = cart.map(i => `🥤 *${i.name.toUpperCase()}* — (${i.qty} unid.)`).join('\n');
const message = encodeURIComponent(
`*🏔️ ¡NUEVO PEDIDO QUITO FRESH! 🍃*\n` +
`*────────────────────*\n\n` +
`Hola, quiero elevar mi energía con el siguiente Pack:\n\n` +
`${itemsText}\n\n` +
`*────────────────────*\n` +
`💰 *TOTAL A PAGAR: $${total}*\n` +
`*────────────────────*\n\n` +
`📍 _Por favor, confírmenme el tiempo de entrega para disfrutar de mi extracto 100% puro._`
);
window.open(`https://wa.me/593995849214?text=${message}`, '_blank');

};
if (!mounted) return null;
return (
<div style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'hidden' }}>
<svg style={{ position: 'absolute', width: 0, height: 0 }}>
<filter id="gel-viscosity">
<feGaussianBlur stdDeviation="1.2" result="blur" />
<feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.1" specularExponent="35" lightingColor="#FFFFFF" result="spec">
<fePointLight x="-5000" y="-10000" z="10000" />
</feSpecularLighting>
<feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
<feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
</filter>
</svg>

<style dangerouslySetInnerHTML={{ __html: `
@import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Poiret+One&display=swap');

.text-bold { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }

.text-surtido-gel {
font-family: 'Titan One', cursive;
color: ${CELESTE_LOGO};
text-align: center;
font-size: 4rem;
margin-bottom: 20px;
line-height: 1.1;
filter: url(#gel-viscosity);
text-shadow: none;
}

.titulo-seccion-gel {
font-family: 'Titan One', cursive;
color: ${CELESTE_LOGO};
margin-bottom: 20px;
font-size: 1.8rem;
text-transform: uppercase;
filter: url(#gel-viscosity);
text-shadow: none;
}

.text-gel-caramelo-premium {
font-family: 'Titan One', cursive;
position: relative;
mix-blend-mode: normal;
filter: url(#gel-viscosity);
line-height: 1.1;
text-shadow: none;
}

.fog-puff {
position: fixed; pointer-events: none; z-index: 9999;
background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
border-radius: 50%; filter: blur(15px);
animation: puffOut 1.2s ease-out forwards;
}
@keyframes puffOut {
0% { opacity: 0.6; transform: scale(0.3) translateY(0); }
100% { opacity: 0; transform: scale(2.5) translateY(-20px); }
}

.product-card { border: 1.5px solid #EEE; border-radius: 40px; padding: 40px; text-align: center; transition: 0.4s; background: white; position: relative; z-index: 2; overflow: visible; }
.product-card:hover { transform: translateY(-5px); }
.featured { border: 4px solid #E91E63; }

/* ADICIÓN DE BOTELLA FLOTANTE */
.bottle-ultra-fresh {
position: absolute;
top: -85px;
right: -15px;
width: 185px;
filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
z-index: 10;
pointer-events: none;
transition: transform 0.5s ease;
}
.product-card:hover .bottle-ultra-fresh {
transform: translateY(-10px) rotate(5deg) scale(1.05);
}

.btn-main { background: ${CELESTE_LOGO}; color: white; border: none; border-radius: 50px; padding: 15px; font-weight: 900; cursor: pointer; width: 100%; transition: 0.3s; }
.btn-main:active { transform: scale(0.95); }

.sensory-fog-layer {
position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
pointer-events: none; z-index: 10;
background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(240, 248, 255, 0.4) 100%);
animation: fogBreathe 8s ease-in-out infinite;
}
@keyframes fogBreathe {
0%, 100% { opacity: 0.1; transform: scale(1); }
50% { opacity: 0.5; transform: scale(1.05); }
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: ${CELESTE_LOGO}; border-radius: 10px; }

/* NUEVOS ESTILOS PARA EL SLIDER Y CLICK (AÑADIDOS AL FINAL) */
.wheel-scroll-wrapper { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 60px; padding: 50px 10% 250px 10%; scrollbar-width: none; -ms-overflow-style: none; align-items: center; }
.wheel-scroll-wrapper::-webkit-scrollbar { display: none; }
.product-wheel-item { flex: 0 0 280px; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center; position: relative; }
.vertical-label { position: absolute; left: -100px; top: 50%; transform: rotate(-90deg) translateY(-50%); font-family: 'Titan One', cursive; font-size: 4rem; white-space: nowrap; transition: 0.3s; pointer-events: none; z-index: 1; text-shadow: none; }
.bottle-focus { width: 100%; max-width: 220px; transition: 0.3s ease; z-index: 2; cursor: pointer; }
.bottle-focus:hover { transform: scale(1.05); }
.info-panel-pop { position: absolute; bottom: -200px; left: 50%; transform: translateX(-50%) translateY(20px); opacity: 0; pointer-events: none; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); background: white; border: 1.5px solid #F0F0F0; width: 320px; border-radius: 35px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.1); z-index: 100; padding: 30px; }
.info-panel-pop.active { transform: translateX(-50%) translateY(0); opacity: 1; pointer-events: auto; }
` }} />

{fogParticles.map(p => (
<div key={p.id} className="fog-puff" style={{ left: p.x - 50, top: p.y - 50, width: '100px', height: '100px' }} />
))}

<div className="sensory-fog-layer"></div>

<nav style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
<img src="1000786698.png" alt="Logo" style={{ height: '60px' }} />
<button onClick={() => setIsCartOpen(true)} className="btn-main" style={{ width: 'auto', padding: '12px 25px', fontSize: '13px' }}>MI PACK ({cart.reduce((a, b) => a + b.qty, 0)})</button>
</nav>

<header style={{ position: 'relative', padding: '100px 20px', textAlign: 'center', overflow: 'hidden', backgroundColor: '#FDFDFD' }}>
<div style={{ position: 'relative', zIndex: 2 }}>
<div style={{ fontWeight: 900, fontSize: '12px', color: CELESTE_LOGO, marginBottom: '20px' }}>FRESCURA PURA</div>
<h1 className="text-bold" style={{ fontSize: '4rem', lineHeight: 0.9, margin: '0 0 40px' }}>TU VIDA <br/><span style={{ color: CELESTE_LOGO }}>SALUDABLE</span> <br/>EMPIEZA AQUÍ.</h1>
<img src="1000786698.png" alt="Logo Hero" style={{ maxWidth: '380px', margin: '0 auto', display: 'block' }} />
</div>
</header>

<section style={{ position: 'relative', padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', position: 'relative', zIndex: 2 }}>
<div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
<h3 className="titulo-seccion-gel">Nuestra Misión</h3>
<p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Nutrir a nuestra comunidad con extractos puros de la tierra andina.</p>
</div>
<div style={{ background: '#F9F9F9', padding: '50px', borderRadius: '40px' }}>
<h3 className="titulo-seccion-gel">Nuestra Visión</h3>
<p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>Ser líderes en bienestar premium en Ecuador.</p>
</div>
<div style={{ background: CELESTE_LOGO, padding: '50px', borderRadius: '40px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
<h3 className="text-bold" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Llevando Felicidad</h3>
<div className="text-bold" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '15px' }}>2026</div>
<p style={{ fontSize: '15px', lineHeight: 1.8 }}>Frescura absoluta del campo directamente a tu mano.</p>
</div>
</div>
</section>

{/* SECCIÓN REEMPLAZADA CON EL SLIDER Y EL CLICK */}
<section style={{ padding: '80px 0', position: 'relative' }}>
<h2 className="text-surtido-gel">NUESTROS EXTRACTOS</h2>
<div style={{ textAlign: 'center', color: '#999', fontSize: '14px', marginBottom: '40px' }}>Desliza y toca la botella para conocer más</div>

<div className="wheel-scroll-wrapper">
{products.map(p => (
<div key={p.id} className="product-wheel-item">
    <div className="vertical-label" style={{
        color: p.available ? p.accent : '#CCC',
        opacity: activeProductId === p.id ? 1 : 0.2,
        filter: activeProductId === p.id ? 'url(#gel-viscosity)' : 'none'
    }}>
        {p.name}
    </div>

    <img
        src={BOTELLA_MARACUMORA_ASSET}
        alt={p.name}
        className="bottle-focus"
        onClick={() => setActiveProductId(activeProductId === p.id ? null : p.id)}
        style={{ filter: !p.available ? 'grayscale(0.8) opacity(0.6)' : 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}
    />

    <div className={`info-panel-pop ${activeProductId === p.id ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div style={{ color: p.available ? p.accent : '#CCC', fontWeight: 900, fontSize: '11px', marginBottom: '10px' }}>{p.tag}</div>
        <h3 className="text-gel-caramelo-premium" style={{ fontSize: '2.2rem', margin: '0 0 10px', color: p.available ? p.accent : '#999' }}>{p.name}</h3>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '25px', maxWidth: '100%', margin: '0 auto 25px' }}>{p.desc}</p>
        {p.price && <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '25px', color: '#1A1A1A' }}>${p.price.toFixed(2)}</div>}
        {p.available ? (
            <button onClick={() => addToCart(p)} className="btn-main" style={{ background: p.accent }}>AÑADIR AL PACK</button>
        ) : (
            <button disabled style={{ background: '#F5F5F5', color: '#BBB', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: 900, width: '100%' }}>PRÓXIMAMENTE</button>
        )}
    </div>
</div>
))}
</div>
</section>

<footer style={{ background: '#000', color: 'white', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 20 }}>
<img src="1000786698.png" alt="Footer Logo" style={{ height: '55px', marginBottom: '30px', filter: 'brightness(2)' }} />
<div style={{ fontSize: '10px', opacity: 0.4, letterSpacing: '1px', textTransform: 'uppercase' }}>
Hecho por <span style={{ fontWeight: 800 }}>ECOS Branding</span> & <span style={{ fontWeight: 800 }}>ORCA Studios</span> © 2026.
</div>
</footer>

{isCartOpen && (
<div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', background: 'white', zIndex: 2000, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
<div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${CELESTE_LOGO}22` }}>
<span className="text-bold">TU SELECCIÓN</span>
<button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
</div>
<div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
{cart.map(i => (
<div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
<div style={{ flex: 1 }}>
<div className="text-bold" style={{ fontSize: '1.2rem', color: i.accent }}>{i.name}</div>
<div style={{ fontSize: '13px', color: CELESTE_LOGO, fontWeight: 700 }}>${(i.price * i.qty).toFixed(2)}</div>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<button onClick={() => updateQty(i.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', cursor: 'pointer' }}>-</button>
<span style={{ fontWeight: 900 }}>{i.qty}</span>
<button onClick={() => updateQty(i.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #EEE', cursor: 'pointer' }}>+</button>
<button onClick={() => removeItem(i.id)} style={{ marginLeft: '5px', border: 'none', background: 'none', cursor: 'pointer' }}>❌</button>
</div>
</div>
))}
</div>
{cart.length > 0 && (
<div style={{ padding: '30px', borderTop: `1px solid ${CELESTE_LOGO}22` }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '25px' }}>
<span>TOTAL</span>
<span style={{ color: CELESTE_LOGO }}>${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
</div>
<button onClick={clearCart} style={{ width: '100%', background: 'none', border: '1px solid #DDD', color: '#999', padding: '12px', borderRadius: '50px', fontWeight: 800, fontSize: '11px', marginBottom: '15px', cursor: 'pointer' }}>VACIAR TODO EL PACK</button>
<button onClick={sendWhatsApp} className="btn-main" style={{ background: '#25D366' }}>PEDIR POR WHATSAPP</button>
</div>
)}
</div>
)}
</div>

);
}
