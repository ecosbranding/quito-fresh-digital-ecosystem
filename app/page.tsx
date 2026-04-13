"use client";

export default function QuitoFreshUltimate() {
  const whatsappLink = "https://wa.me/593995849214?text=Hola%20Quito%20Fresh%2C%20deseo%20el%20Pack%20Premium.%20Solicito%20asesor%C3%ADa%20sobre%20la%20disponibilidad%20de%20sabores.";

  const flavors = [
    { name: "Mora Silvestre", desc: "Antioxidante natural de altura.", color: "#4A0E0E" },
    { name: "Frutos Rojos", desc: "Mix vital de fresas y arándanos.", color: "#8B0000" },
    { name: "Verde Detox", desc: "Manzana verde, apio y espinaca.", color: "#1A2F1A" },
    { name: "Maracuyá Real", desc: "Energía tropical pura.", color: "#B8860B" }
  ];

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', fontFamily: '"Inter", sans-serif', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,700&family=Inter:wght@200;400;700&display=swap');
        
        body { margin: 0; background: #050505; overflow-x: hidden; }
        .font-luxury { font-family: 'Cormorant Garamond', serif; }
        .text-gold { color: #D4AF37; }
        .text-red { color: #D32F2F; }
        
        .hero-container { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; }
        .main-title { font-size: 16vw; line-height: 0.8; letter-spacing: -2px; margin: 0; }
        
        .floating-bottle {
          width: 85%; max-width: 480px; z-index: 10;
          filter: drop-shadow(0 20px 50px rgba(211,47,47,0.3));
          animation: hoverEffect 5s ease-in-out infinite;
          margin: -80px 0;
        }

        @keyframes hoverEffect {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }

        .cta-button {
          background: #fff; color: #000; padding: 22px 50px; border-radius: 100px;
          font-weight: 700; text-decoration: none; text-transform: uppercase;
          letter-spacing: 3px; font-size: 12px; transition: 0.4s;
          box-shadow: 0 10px 30px rgba(255,255,255,0.1); display: inline-block;
        }
        .cta-button:hover { transform: scale(1.05); background: #D32F2F; color: #fff; }

        .flavor-card {
          background: #0A0A0A; border: 1px solid #1A1A1A; padding: 30px;
          border-radius: 24px; transition: 0.4s; text-align: left;
        }
        .flavor-card:hover { border-color: #D32F2F; background: #0F0F0F; }

        .section-padding { padding: 100px 24px; max-width: 1200px; margin: 0 auto; }
      ` }} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '30px', boxSizing: 'border-box', zIndex: 100, display: 'flex', justifyContent: 'space-between', backdropFilter: 'blur(10px)' }}>
        <div className="font-luxury" style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-1px' }}>QUITO FRESH</div>
        <a href={whatsappLink} style={{ color: '#fff', textDecoration: 'none', fontSize: '10px', border: '1px solid #333', padding: '10px 20px', borderRadius: '50px', letterSpacing: '2px' }}>CONCIERGE</a>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-container">
        <h1 className="font-luxury main-title" style={{ opacity: 0.1, position: 'absolute', top: '15%' }}>PREMIUM</h1>
        <h1 className="font-luxury main-title">QUITO <br/> <span className="text-red">FRESH</span></h1>
        
        <img src="/botella-hero.png" className="floating-bottle" alt="Quito Fresh Bottle" />

        <div style={{ zIndex: 20 }}>
          <p className="font-luxury" style={{ fontSize: '24px', fontStyle: 'italic', marginBottom: '30px', opacity: 0.8 }}>
            "La esencia de la tierra, servida en cristal."
          </p>
          <a href={whatsappLink} className="cta-button">ADQUIRIR EXPERIENCIA</a>
        </div>
      </section>

      {/* SECCIÓN SABORES - ALTA GAMA */}
      <section className="section-padding">
        <h2 className="font-luxury" style={{ fontSize: '50px', marginBottom: '60px', textAlign: 'center' }}>
          Colección de <span className="text-red">Temporada</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {flavors.map((f, i) => (
            <div key={i} className="flavor-card">
              <div style={{ width: '40px', height: '40px', backgroundColor: f.color, borderRadius: '50%', marginBottom: '20px', boxShadow: `0 0 15px ${f.color}` }}></div>
              <h3 className="font-luxury" style={{ fontSize: '28px', margin: '0 0 10px 0' }}>{f.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
              <div style={{ marginTop: '20px', fontSize: '10px', letterSpacing: '2px', color: '#D32F2F', fontWeight: '700' }}>DISPONIBLE</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN MANIFIESTO */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <LeafIcon />
          <h2 className="font-luxury" style={{ fontSize: '40px', marginTop: '30px' }}>Prensado en Frío, <br/> Sin Concesiones.</h2>
          <p style={{ color: '#555', lineHeight: '2', fontSize: '16px', marginTop: '20px' }}>
            En **ORCA Studios** entendemos que el lujo es pureza. Quito Fresh no es solo jugo; es un sistema de nutrición diseñado para el alto rendimiento y el bienestar absoluto.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 24px', textAlign: 'center', borderTop: '1px solid #111' }}>
        <div className="font-luxury" style={{ fontSize: '20px', marginBottom: '20px' }}>QUITO FRESH</div>
        <p style={{ fontSize: '10px', letterSpacing: '3px', color: '#333' }}>
          ESTRATÉGICAMENTE DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS
        </p>
      </footer>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C10 14.52 12 13 13 12"></path>
    </svg>
  );
}
