import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { navigation } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/8045-transparent.png" alt="" />
        <div>
          <strong>Nirut Sewana</strong>
          <p>ครูนิรุทธิ์ เสวะนา | Digital Learning Portfolio</p>
        </div>
      </div>

      <div className="footer-links">
        <span>เมนูเว็บไซต์</span>
        <nav aria-label="เมนูท้ายเว็บไซต์">
          {navigation.slice(1).map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-contact">
        <span>
          <MapPin aria-hidden="true" />
          โรงเรียนบ้านน้ำพร
        </span>
        <span>
          <Mail aria-hidden="true" />
          Online Learning Hub
        </span>
        <span>
          <Sparkles aria-hidden="true" />
          Empower Your Future with Digital Learning
        </span>
      </div>
    </footer>
  );
}
