import React from 'react'

const Globe = () => {
  return (
    <>
      <style>
        {`
          @keyframes floatingAura {
            0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 25px rgba(229, 146, 71, 0.4)); }
            50% { transform: translateY(-12px) scale(1.02); filter: drop-shadow(0 0 40px rgba(229, 146, 71, 0.65)); }
          }
          @keyframes twinkling { 0%,100% { opacity:0.2; } 50% { opacity:1; } }
        `}
      </style>
      <div className="flex items-center justify-center p-4">
        <div
          className="relative flex items-center justify-center"
          style={{
            animation: 'floatingAura 6s ease-in-out infinite',
          }}
        >
          <img
            src="/boasnirut.png"
            alt="Boasnirut Hero Visual"
            style={{
              maxHeight: '460px',
              width: 'auto',
              maxWidth: '85vw',
              objectFit: 'contain',
              borderRadius: '24px',
            }}
          />
          {/* Subtle Star Particles */}
          <div className="absolute -left-6 top-4 w-2 h-2 bg-amber-300 rounded-full" style={{ animation: 'twinkling 2.5s infinite' }} />
          <div className="absolute -right-8 top-1/3 w-1.5 h-1.5 bg-amber-200 rounded-full" style={{ animation: 'twinkling 3.5s infinite 0.5s' }} />
          <div className="absolute left-1/4 -bottom-4 w-2 h-2 bg-amber-100 rounded-full" style={{ animation: 'twinkling 2s infinite 1s' }} />
        </div>
      </div>
    </>
  )
}

export default Globe
