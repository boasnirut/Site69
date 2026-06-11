import Link from "next/link";
import { Camera, MonitorPlay, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const splineScene =
  process.env.NEXT_PUBLIC_SPLINE_SCENE || "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function HeroStage() {
  return (
    <Card className="spline-hero-card" aria-label="เว็บไซต์ครูนิรุทธิ์ เสวะนา">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="spline-hero-content">
        <div className="spline-hero-copy">
          <div className="hero-copy-top">
            <span className="eyebrow dark">ยินดีต้อนรับเข้าสู่</span>
            <img className="hero-copy-logo" src="/8045-transparent.png" alt="" />
          </div>
          <div className="hero-title-group">
            <h1>เว็บไซต์ครูนิรุทธิ์ เสวะนา</h1>
            <h2>Welcome to website</h2>
          </div>
          <p className="hero-tagline">
            <span>Empower Your Future with Digital Learning</span>
            <span>เสริมพลังอนาคตของคุณ ด้วยการเรียนรู้แบบดิจิทัล</span>
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/classroom">
              <MonitorPlay aria-hidden="true" />
              ห้องเรียนออนไลน์
            </Link>
            <Link className="button secondary dark" href="/activities">
              <Camera aria-hidden="true" />
              ภาพกิจกรรม
            </Link>
          </div>

          <div className="spline-hero-badges">
            <span>Digital Learning</span>
            <span>Student Care</span>
            <span>PA</span>
          </div>
        </div>

        <div className="spline-hero-scene">
          <SplineScene scene={splineScene} className="spline-canvas" />
          <div className="scene-chip">
            <Sparkles aria-hidden="true" />
            <span>Nirut Sewana Digital Learning</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
