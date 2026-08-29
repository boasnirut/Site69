import React, { useState, useEffect } from 'react'
import {
  Home,
  Laptop,
  Users,
  Trophy,
  Images,
  FileCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Download,
  Calendar,
  Award,
  Search,
} from 'lucide-react'
import './styles.css'

const menuTabs = [
  { id: 'home', label: 'หน้าหลัก', href: '/', icon: Home },
  { id: 'classroom', label: 'ห้องเรียนออนไลน์', href: '/classroom', icon: Laptop },
  { id: 'homeroom', label: 'งานประจำชั้น', href: '/homeroom', icon: Users },
  { id: 'achievements', label: 'ผลงาน/รางวัล', href: '/achievements', icon: Trophy },
  { id: 'activities', label: 'ภาพกิจกรรม', href: '/activities', icon: Images },
  { id: 'pa', label: 'ข้อตกลงในการพัฒนางาน (PA)', href: '/pa', icon: FileCheck },
]

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (path, e) => {
    if (e) e.preventDefault()
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getActiveTab = () => {
    if (currentPath === '/classroom') return 'classroom'
    if (currentPath === '/homeroom') return 'homeroom'
    if (currentPath === '/achievements') return 'achievements'
    if (currentPath === '/activities') return 'activities'
    if (currentPath === '/pa') return 'pa'
    return 'home'
  }

  const activeTab = getActiveTab()

  return (
    <div className="app-root">
      {/* Header with Animated Tab Bar */}
      <header className="site-header">
        <div className="container site-header__inner">
          <a
            className="brand"
            href="/"
            onClick={(e) => navigateTo('/', e)}
            aria-label="Nirut Sewana หน้าหลัก"
          >
            <span className="brand__logo">
              <img src="/8045.png" alt="Nirut Sewana Logo" />
            </span>
            <span className="brand__text">
              <strong>นิรุทธิ์ เสวะนา</strong>
              <small>Nirut Sewana</small>
            </span>
          </a>

          {/* Navigation Tab Bar */}
          <nav className="tab-bar-nav" aria-label="เมนูหลัก">
            {menuTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => navigateTo(tab.href, e)}
                  className={`tab-bar-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Areas */}
      <main>
        {activeTab === 'home' && <HomeView navigateTo={navigateTo} />}
        {activeTab === 'classroom' && <ClassroomView />}
        {activeTab === 'homeroom' && <HomeroomView />}
        {activeTab === 'achievements' && <AchievementsView />}
        {activeTab === 'activities' && <ActivitiesView />}
        {activeTab === 'pa' && <PaView />}
      </main>

      {/* Footer */}
      <footer className="site-footer" style={{ padding: '24px 0', marginTop: '60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p>© {new Date().getFullYear()} นิรุทธิ์ เสวะนา | Nirut Sewana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

/* 1. HOME VIEW */
function HomeView({ navigateTo }) {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <div className="hero__badge">
              <Sparkles size={16} />
              ศูนย์รวมการจัดการเรียนรู้ดิจิทัล
            </div>
            <h1 className="hero__title">
              นิรุทธิ์ เสวะนา <br />
              <span>Nirut Sewana</span>
            </h1>
            <p className="hero__subtitle">
              ยินดีต้อนรับสู่พอร์ตโฟลิโอส่วนตัว คลังบทเรียนดิจิทัล สื่อวิทยาการคำนวณ
              ระบบดูแลช่วยเหลือนักเรียนรายบุคคล และรายงานผลการพัฒนางานตามข้อตกลง (PA)
            </p>
            <div className="hero__actions">
              <a
                className="btn btn-primary"
                href="/achievements"
                onClick={(e) => navigateTo('/achievements', e)}
              >
                🏆 ผลงานและรางวัล
                <ArrowRight size={18} />
              </a>
              <a
                className="btn btn-outline"
                href="/activities"
                onClick={(e) => navigateTo('/activities', e)}
              >
                📸 ภาพกิจกรรม
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <img src="/boasnirut.png" alt="นิรุทธิ์ เสวะนา" />
          </div>
        </div>
      </section>

      {/* Section 1: ผลงานและรางวัล */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>🏆 ผลงานและรางวัล (Achievements & Awards)</h2>
            <p>ความภาคภูมิใจ นวัตกรรมการจัดการเรียนรู้ Active Learning และรางวัลเกียรติยศ</p>
          </div>

          <div className="card-grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <Award size={24} />
              </div>
              <h3>รางวัลนวัตกรรมการจัดการเรียนรู้ Active Learning</h3>
              <p>รางวัลยกย่องเชิดชูเกียรติด้านการสร้างสรรค์สื่อและการจัดการเรียนรู้ดิจิทัล</p>
              <a
                href="/achievements"
                onClick={(e) => navigateTo('/achievements', e)}
                className="feature-card__link"
              >
                ดูผลงานทั้งหมด <ArrowRight size={16} />
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <Trophy size={24} />
              </div>
              <h3>รางวัลการแข่งขันของนักเรียน</h3>
              <p>ผลงานการส่งเสริมและฝึกหัดนักเรียนเข้าร่วมการแข่งขันระดับเขตและระดับภาค</p>
              <a
                href="/achievements"
                onClick={(e) => navigateTo('/achievements', e)}
                className="feature-card__link"
              >
                ดูผลงานทั้งหมด <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: ภาพกิจกรรม */}
      <section className="section" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div className="section-title">
            <h2>📸 ภาพกิจกรรม (Activity Gallery)</h2>
            <p>ภาพบรรยากาศการเรียนรู้ กิจกรรมพัฒนาผู้เรียน และการทำงานร่วมกับชุมชน</p>
          </div>

          <div className="card-grid">
            <div className="feature-card">
              <img src="/B1.jpg" alt="ภาพกิจกรรม" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', height: '200px', objectFit: 'cover' }} />
              <h3>กิจกรรมการเรียนรู้ Active Learning</h3>
              <p>บรรยากาศการลงมือปฏิบัติจริงและการนำเสนอผลงานของนักเรียนในชั้นเรียน</p>
              <a
                href="/activities"
                onClick={(e) => navigateTo('/activities', e)}
                className="feature-card__link"
              >
                ดูภาพกิจกรรมทั้งหมด <ArrowRight size={16} />
              </a>
            </div>

            <div className="feature-card">
              <img src="/B2.jpg" alt="ภาพกิจกรรม" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', height: '200px', objectFit: 'cover' }} />
              <h3>กิจกรรมส่งเสริมทักษะดิจิทัล</h3>
              <p>การฝึกทักษะคอมพิวเตอร์และการใช้งานเทคโนโลยีเพื่อการเรียนรู้</p>
              <a
                href="/activities"
                onClick={(e) => navigateTo('/activities', e)}
                className="feature-card__link"
              >
                ดูภาพกิจกรรมทั้งหมด <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* 2. CLASSROOM VIEW */
function ClassroomView() {
  return (
    <div className="container section">
      <div className="section-title">
        <h2>💻 ห้องเรียนออนไลน์ & สื่อการเรียนรู้</h2>
        <p>ศูนย์รวมสื่อดิจิทัล สื่อวิทยาการคำนวณ และแบบทดสอบย่อยออนไลน์ 24 ชม.</p>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <div className="feature-card__icon">
            <BookOpen size={24} />
          </div>
          <h3>สื่อการสอนวิทยาการคำนวณ</h3>
          <p>บทเรียนการเขียนโปรแกรม อัลกอริทึม และทักษะดิจิทัลสำหรับนักเรียนทุกระดับชั้น</p>
          <a href="#" className="feature-card__link">
            เข้าสู่บทเรียน <ArrowRight size={16} />
          </a>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <CheckCircle2 size={24} />
          </div>
          <h3>คลังข้อสอบ & ควิซย่อยออนไลน์</h3>
          <p>ระบบประเมินผลการเรียนรู้ออนไลน์ ตรวจผลอัตโนมัติ 24 ชั่วโมง</p>
          <a href="#" className="feature-card__link">
            ทำแบบทดสอบ <ArrowRight size={16} />
          </a>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <Download size={24} />
          </div>
          <h3>ดาวน์โหลดใบงาน & สื่อการเรียน</h3>
          <p>เอกสารใบงาน แบบฝึกหัด และสื่อประกอบการสอนดิจิทัลครบครัน</p>
          <a href="#" className="feature-card__link">
            ดาวน์โหลดสื่อ <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

/* 3. HOMEROOM VIEW */
function HomeroomView() {
  return (
    <div className="container section">
      <div className="section-title">
        <h2>🏫 งานประจำชั้น & ดูแลช่วยเหลือนักเรียน</h2>
        <p>ระบบคัดกรองนักเรียนรายบุคคล การประเมินพฤติกรรม SDQ และบันทึกเยี่ยมบ้าน GPS</p>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <div className="feature-card__icon">
            <Users size={24} />
          </div>
          <h3>ระบบคัดกรองนักเรียนรายบุคคล</h3>
          <p>บันทึกและวิเคราะห์ข้อมูลความต้องการของนักเรียนประจำชั้น 100%</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <CheckCircle2 size={24} />
          </div>
          <h3>แบบประเมินพฤติกรรม SDQ</h3>
          <p>ประเมินพฤติกรรม 5 ด้าน สรุปผลวิเคราะห์ความเสี่ยงและแนวทางการช่วยเหลือ</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <Search size={24} />
          </div>
          <h3>บันทึกเยี่ยมบ้านพิกัด GPS</h3>
          <p>จัดเก็บพิกัดแผนที่ รูปภาพ และสรุปสภาพความเป็นอยู่รายครอบครัว</p>
        </div>
      </div>
    </div>
  )
}

/* 4. ACHIEVEMENTS VIEW */
function AchievementsView() {
  return (
    <div className="container section">
      <div className="section-title">
        <h2>🏆 ผลงาน & รางวัลเกียรติยศ</h2>
        <p>รวบรวมรางวัลเกียรติยศ นวัตกรรมการสอน และความภาคภูมิใจในวิชาชีพ</p>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <div className="feature-card__icon">
            <Award size={24} />
          </div>
          <h3>รางวัลนวัตกรรมการจัดการเรียนรู้ Active Learning</h3>
          <p>รางวัลยกย่องเชิดชูเกียรติด้านการสร้างสรรค์สื่อและการจัดการเรียนรู้ดิจิทัล</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <Trophy size={24} />
          </div>
          <h3>รางวัลการแข่งขันของนักเรียน</h3>
          <p>ผลงานการส่งเสริมและฝึกหัดนักเรียนเข้าร่วมการแข่งขันระดับเขตและระดับภาค</p>
        </div>
      </div>
    </div>
  )
}

/* 5. ACTIVITIES VIEW */
function ActivitiesView() {
  return (
    <div className="container section">
      <div className="section-title">
        <h2>📸 ภาพกิจกรรม & บรรยากาศการเรียนรู้</h2>
        <p>ประมวลภาพกิจกรรมพัฒนาผู้เรียน การจัดการเรียนรู้ และงานชุมชน</p>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <img src="/B1.jpg" alt="ภาพกิจกรรม" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', height: '200px', objectFit: 'cover' }} />
          <h3>กิจกรรมการเรียนรู้ Active Learning</h3>
          <p>บรรยากาศการลงมือปฏิบัติจริงและการนำเสนอผลงานของนักเรียนในชั้นเรียน</p>
        </div>

        <div className="feature-card">
          <img src="/B2.jpg" alt="ภาพกิจกรรม" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', height: '200px', objectFit: 'cover' }} />
          <h3>กิจกรรมส่งเสริมทักษะดิจิทัล</h3>
          <p>การฝึกทักษะคอมพิวเตอร์และการใช้งานเทคโนโลยีเพื่อการเรียนรู้</p>
        </div>
      </div>
    </div>
  )
}

/* 6. PA VIEW */
function PaView() {
  return (
    <div className="container section">
      <div className="section-title">
        <h2>📋 ข้อตกลงในการพัฒนางาน (PA)</h2>
        <p>สรุปผลการพัฒนางานตามข้อตกลงสำหรับข้าราชการครู เอกสารร่องรอย และวิดีโอคลิปการสอน</p>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <div className="feature-card__icon">
            <FileCheck size={24} />
          </div>
          <h3>รายงาน PA ประจำปีงบประมาณ 2569</h3>
          <p>สรุปผลการปฏิบัติตามข้อตกลงในการพัฒนางาน ทั้ง 2 ส่วน พร้อมเอกสารหลักฐาน</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <BookOpen size={24} />
          </div>
          <h3>แผนการจัดการเรียนรู้ & คลิปการสอน</h3>
          <p>วิดีโอบันทึกการสอน บันทึกหลังการสอน และประเด็นท้าทายเพื่อพัฒนาผู้เรียน</p>
        </div>
      </div>
    </div>
  )
}
