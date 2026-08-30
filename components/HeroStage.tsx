import Link from "next/link";
import { Camera, MonitorPlay, Sparkles } from "lucide-react";

export function HeroStage() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent border-0 p-0 shadow-none">
      {/* Container: Borderless, Full Aspect Ratio 3:2 matching 46.png (1536x1024) */}
      <div className="relative w-full aspect-[3/2] min-h-[460px] sm:min-h-[520px] md:min-h-[600px] rounded-3xl overflow-hidden flex items-center bg-[#070707]">
        
        {/* Full Uncropped Image: 46.png */}
        <img 
          src="/46.png" 
          alt="เว็บไซต์ครูนิรุทธิ์ เสวะนา" 
          className="absolute inset-0 w-full h-full object-contain object-right transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Soft Smooth Left-to-Right Fade Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/85 to-transparent w-full md:w-[65%] z-10 pointer-events-none" />

        {/* Soft Top & Bottom Vignette for Seamless Background Integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 z-10 pointer-events-none" />

        {/* Top Right Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg text-xs font-semibold text-white/90">
          <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span>Nirut Sewana Digital Learning</span>
        </div>

        {/* Content Section (Left-aligned) */}
        <div className="relative z-20 max-w-2xl px-6 py-8 md:px-12 md:py-12 flex flex-col justify-center gap-4 text-left">
          
          {/* Logo Row */}
          <div className="flex items-center">
            <img 
              src="/8045-transparent.png" 
              alt="Logo" 
              className="w-36 sm:w-44 md:w-52 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,138,31,0.5)]" 
            />
          </div>

          {/* Title Group */}
          <div className="flex flex-col gap-1 text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              เว็บไซต์ครูนิรุทธิ์ เสวะนา
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400 tracking-wide drop-shadow">
              Welcome to website
            </h2>
          </div>

          {/* Tagline */}
          <p className="flex flex-col gap-1 text-sm sm:text-base text-slate-300 max-w-xl font-medium leading-relaxed drop-shadow text-left">
            <span className="text-white/90 font-semibold">Empower Your Future with Digital Learning</span>
            <span className="text-slate-300">เสริมพลังอนาคตของคุณ ด้วยการเรียนรู้แบบดิจิทัล</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <Link 
              className="button primary shadow-xl backdrop-blur-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95" 
              href="/classroom"
            >
              <MonitorPlay aria-hidden="true" className="w-5 h-5 fill-black/20" />
              <span>ห้องเรียนออนไลน์</span>
            </Link>
            <Link 
              className="button secondary dark shadow-xl backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95" 
              href="/activities"
            >
              <Camera aria-hidden="true" className="w-5 h-5 text-amber-400" />
              <span>ภาพกิจกรรม</span>
            </Link>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-lg shadow-sm">
              Digital Learning
            </span>
            <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-lg shadow-sm">
              Student Care
            </span>
            <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-lg shadow-sm">
              PA
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
