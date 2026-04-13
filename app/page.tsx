"use client";

export default function QuitoFreshCleanJuiceStyle() {
  const whatsappLink = "https://wa.me/593995849214?text=Hola%20Quito%20Fresh%2C%20quiero%20mi%20pack%20saludable.";

  return (
    <div style={{ backgroundColor: '#FAFAFA', color: '#2D3748', fontFamily: '"Poppins", sans-serif', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;900&display=swap');
        
        body { margin: 0; background-color: #FAFAFA; }
        
        /* Animación flotante para la botella */
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .btn-primary {
          background-color: #8BC34A; color: white; padding: 15px 40px; border-radius: 50px;
          text-decoration: none; font-weight: 700; font-size: 1.1rem; letter-spacing: 1px;
          transition: all 0.3s ease; display: inline-block; box-shadow: 0 10px 20px rgba(139, 195, 74, 0.3);
        }
        .btn-primary:hover { transform: translateY(-3px); background-color: #7CB342; box-shadow: 0 15px 25px rgba(139, 195, 74, 0.4); }

        .blob-shape {
          position: absolute; z-index: 0; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: morph 8s ease-in-out infinite both alternate;
        }

        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);
          border-radius: 30px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          text-align: center; transition: all 0.3s;
        }
        .glass-card:hover { transform: translateY(-10px); }
      ` }} />

      {/* HEADER TIPO CLEAN JUICE */}
      <nav style={{ padding: '20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', position: 'fixed', width: '100%', top: 0, zIndex: 100, boxSizing: 'border-box', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <div style={{ fontWeight: 900, fontSize: '28px', color: '#2D3748', letterSpacing: '-1px' }}>
          QUITO <span style={{ color: '#8BC34A' }}>FRESH</span>
        </div>
        <a href={whatsappLink} style={{ color: '#2D3748', textDecoration: 'none', fontWeight: 700, fontSize: '14px', backgroundColor: '#F0F4F8', padding: '10px 25px', borderRadius: '50px' }}>ORDENAR AHORA</a>
      </nav>

      {/* HERO SECTION VIBRANTE */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingTop: '80px', padding: '0 5vw', overflow: 'hidden' }}>
        
        {/* Formas abstractas de fondo (estilo Eco Fruits) */}
        <div className="blob-shape" style={{ width: '600px', height: '600px', background: 'linear-gradient(135deg, #FFEB3B 0%, #FFC107 100%)', top: '-10%', right: '-5%', opacity: 0.2 }}></div>
        <div className="blob-shape" style={{ width: '400px', height: '400px', background: 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)', bottom: '10%', left: '-10%', opacity: 0.15, animationDelay: '2s' }}></div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%', maxWidth: '1200px', zIndex: 10 }}>
          
          {/* Textos Izquierda */}
          <div style={{ flex: '1 1 500px', padding: '20px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', color: '#1A202C' }}>
              TU VIDA <br/>
              <span style={{ color: '#8BC34A' }}>SALUDABLE</span> <br/>
              EMPIEZA AQUÍ.
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#718096', marginBottom: '40px', maxWidth: '400px', lineHeight: 1.6, fontWeight: 300 }}>
              Jugos 100% orgánicos, prensados en frío para que tú y tu familia disfruten de la pureza de los Andes en cada trago.
            </p>
            <a href={whatsappLink} className="btn-primary">VER NUESTRO MENÚ</a>
          </div>

          {/* Imagen Derecha con Fondo Destacado */}
          <div style={{ flex: '1 1 400px', position: 'relative', display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div style={{ position: 'absolute', width: '350px', height: '350px', backgroundColor: '#8BC34A', borderRadius: '50%', zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
            <img 
              src="/botella-hero.png" 
              alt="Botellas Quito Fresh" 
              style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '320px', animation: 'float 6s ease-in-out infinite', filter: 'drop-shadow(0 30px 30px rgba(0,0,0,0.2))' }} 
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN DE SURTIDO (ESTILO ECO FRUITS) */}
      <section style={{ padding: '100px 5vw', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '10px', color: '#1A202C' }}>Nuestro Surtido</h2>
        <p style={{ color: '#718096', marginBottom: '60px', fontSize: '1.1rem' }}>Prensado en frío. Sin azúcar añadida. Cero conservantes.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Tarjeta 1 - Verde */}
          <div className="glass-card" style={{ borderTop: '8px solid #8BC34A', backgroundColor: '#F1F8E9' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#558B2F', margin: '0 0 10px 0' }}>Green Boost</h3>
            <p style={{ color: '#689F38', fontWeight: 500, marginBottom: '20px' }}>Manzana, Apio, Espinaca</p>
            <div style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: '#8BC34A', color: 'white', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700 }}>100% Natural</div>
          </div>

          {/* Tarjeta 2 - Roja */}
          <div className="glass-card" style={{ borderTop: '8px solid #E53935', backgroundColor: '#FFEBEE' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#C62828', margin: '0 0 10px 0' }}>Berry Bliss</h3>
            <p style={{ color: '#E53935', fontWeight: 500, marginBottom: '20px' }}>Frutos Rojos y Mora Silvestre</p>
            <div style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: '#E53935', color: 'white', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700 }}>Antioxidante</div>
          </div>

          {/* Tarjeta 3 - Amarilla */}
          <div className="glass-card" style={{ borderTop: '8px solid #FFCA28', backgroundColor: '#FFF8E1' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#F57F17', margin: '0 0 10px 0' }}>Zest Citrus</h3>
            <p style={{ color: '#FFB300', fontWeight: 500, marginBottom: '20px' }}>Maracuyá y Cítricos</p>
            <div style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: '#FFCA28', color: '#1A202C', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700 }}>Full Energía</div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#F0F4F8', padding: '60px 20px', textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#2D3748', marginBottom: '20px' }}>
          QUITO <span style={{ color: '#8BC34A' }}>FRESH</span>
        </h2>
        <p style={{ color: '#A0AEC0', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '1px' }}>
          DESARROLLADO POR ECOS BRANDING & ORCA STUDIOS © 2026
        </p>
      </footer>
    </div>
  );
}
