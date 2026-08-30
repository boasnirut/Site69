import { Sparkles } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <div className="relative w-full max-w-[1180px] mx-auto overflow-hidden bg-transparent border-0 p-0 shadow-none my-4">
      {/* Container: Borderless, Full Aspect Ratio matching Home Hero style */}
      <div className="relative w-full min-h-[320px] sm:min-h-[380px] md:min-h-[440px] rounded-3xl overflow-hidden flex items-center bg-[#070707]">
        
        {/* Background Banner Image */}
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-contain object-right transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Soft Smooth Left-to-Right Dark Gradient Fade Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/85 to-transparent w-full md:w-[65%] z-10 pointer-events-none" />

        {/* Soft Top & Bottom Vignette for Seamless Integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 z-10 pointer-events-none" />

        {/* Top Right Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg text-xs font-semibold text-white/90">
          <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>

        {/* Content Section (Left-aligned) */}
        <div className="relative z-20 max-w-2xl px-6 py-8 md:px-12 md:py-12 flex flex-col justify-center gap-3 text-left">
          
          {/* Eyebrow Pill */}
          <div>
            <span className="inline-block px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-lg shadow-sm">
              {eyebrow}
            </span>
          </div>

          {/* Title Group */}
          <div className="flex flex-col gap-1 text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {title}
            </h1>
          </div>

          {/* Tagline / Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-medium leading-relaxed drop-shadow text-left">
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}
