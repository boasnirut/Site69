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
  BookOpen,
  Download,
  Award,
  Search,
  User,
  GraduationCap,
  School,
  FileText,
  Lock,
  LogIn,
  LogOut,
  PlusCircle,
  Trash2,
  ShieldCheck,
  ArrowLeft,
  LayoutGrid,
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

// 1. Added "ทั้งหมด" (All) tab to Achievements sub-menu
const achievementSubTabs = [
  { id: 'all', label: 'ทั้งหมด', icon: LayoutGrid },
  { id: 'teacher', label: 'ครู', icon: User },
  { id: 'student', label: 'นักเรียน', icon: GraduationCap },
  { id: 'school', label: 'สถานศึกษา', icon: School },
  { id: 'academic', label: 'งานวิชาการ', icon: FileText },
]

// Initial Default Data
const initialAchievements = [
  {
    id: 1,
    category: 'teacher',
    title: 'รางวัลนวัตกรรมการจัดการเรียนรู้ Active Learning',
    description: 'รางวัลยกย่องเชิดชูเกียรติด้านการสร้างสรรค์สื่อและการจัดการเรียนรู้ดิจิทัลระดับจังหวัด',
    iconName: 'Award',
  },
  {
    id: 2,
    category: 'teacher',
    title: 'ครูผู้สอนดีเด่นกลุ่มสาระวิทยาศาสตร์และเทคโนโลยี',
    description: 'ผลงานการพัฒนาแผนการจัดการเรียนรู้บูรณาการวิทยาการคำนวณดีเด่น',
    iconName: 'User',
  },
  {
    id: 3,
    category: 'student',
    title: 'รางวัลเหรียญทอง การแข่งขันเขียนโปรแกรมคอมพิวเตอร์',
    description: 'ส่งเสริมและฝึกหัดนักเรียนเข้าแข่งขันงานศิลปหัตถกรรมนักเรียน ระดับเขตพื้นที่การศึกษา',
    iconName: 'GraduationCap',
  },
  {
    id: 4,
    category: 'student',
    title: 'รางวัลชนะเลิศ กิจกรรมโครงงานคุณธรรมผู้เรียน',
    description: 'นักเรียนแกนนำนำเสนอโครงงานคุณธรรมการใช้งานเทคโนโลยีอย่างปลอดภัย',
    iconName: 'Trophy',
  },
  {
    id: 5,
    category: 'school',
    title: 'สถานศึกษาปลอดภัย และมีผลการประเมินคุณภาพระดับดีเยี่ยม',
    description: 'รางวัลการบริหารจัดการสถานศึกษาและส่งเสริมสภาพแวดล้อมเพื่อการเรียนรู้ดิจิทัล',
    iconName: 'School',
  },
  {
    id: 6,
    category: 'academic',
    title: 'ผลงานวิจัยในชั้นเรียน เรื่องการใช้สื่อดิจิทัลพัฒนาทักษะคิดวิเคราะห์',
    description: 'การเผยแพร่ผลงานทางวิชาการและคู่มือการใช้สื่อดิจิทัลวิทยาการคำนวณ',
    iconName: 'FileText',
  },
]

const initialActivities = [
  {
    id: 1,
    title: 'กิจกรรมการเรียนรู้ Active Learning',
    description: 'บรรยากาศการลงมือปฏิบัติจริงและการนำเสนอผลงานของนักเรียนในชั้นเรียน',
    image: '/B1.jpg',
  },
  {
    id: 2,
    title: 'กิจกรรมส่งเสริมทักษะดิจิทัล',
    description: 'การฝึกทักษะคอมพิวเตอร์และการใช้งานเทคโนโลยีเพื่อการเรียนรู้',
    image: '/B2.jpg',
  },
]

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Custom Data States with LocalStorage Persistence
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('site_achievements')
    return saved ? JSON.parse(saved) : initialAchievements
  })

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('site_activities')
    return saved ? JSON.parse(saved) : initialActivities
  })

  useEffect(() => {
    const auth = localStorage.getItem('site_admin_auth')
    if (auth === 'true') {
      setIsLoggedIn(true)
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    localStorage.setItem('site_achievements', JSON.stringify(achievements))
  }, [achievements])

  useEffect(() => {
    localStorage.setItem('site_activities', JSON.stringify(activities))
  }, [activities])

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
    if (currentPath === '/admin') return 'admin'
    return 'home'
  }

  const activeTab = getActiveTab()

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('site_admin_auth')
    navigateTo('/admin')
  }

  return (
    <div className="app-root">
      {/* Header Navigation Bar */}
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

          {/* Clean Animated Tab Bar Navigation */}
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

          {/* 3. Standalone Icon-Only Login / Admin Link on Far Right (Same Header Row) */}
          <div className="header-actions">
            {isLoggedIn ? (
              <a
                href="/admin"
                onClick={(e) => navigateTo('/admin', e)}
                className={`header-icon-btn ${activeTab === 'admin' ? 'active' : ''}`}
                title="ระบบหลังบ้านแอดมิน (boasnirut)"
                aria-label="ระบบหลังบ้านแอดมิน"
              >
                <ShieldCheck size={20} />
              </a>
            ) : (
              <a
                href="/admin"
                onClick={(e) => navigateTo('/admin', e)}
                className={`header-icon-btn ${activeTab === 'admin' ? 'active' : ''}`}
                title="เข้าสู่ระบบแอดมิน"
                aria-label="เข้าสู่ระบบแอดมิน"
              >
                <LogIn size={20} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Views */}
      <main>
        {activeTab === 'home' && (
          <HomeView
            navigateTo={navigateTo}
            achievements={achievements}
            activities={activities}
          />
        )}
        {activeTab === 'classroom' && <ClassroomView />}
        {activeTab === 'homeroom' && <HomeroomView />}
        {activeTab === 'achievements' && (
          <AchievementsView
            achievements={achievements}
            isLoggedIn={isLoggedIn}
            setAchievements={setAchievements}
          />
        )}
        {activeTab === 'activities' && (
          <ActivitiesView
            activities={activities}
            isLoggedIn={isLoggedIn}
            setActivities={setActivities}
          />
        )}
        {activeTab === 'pa' && <PaView />}
        {activeTab === 'admin' && (
          <DedicatedAdminPage
            isLoggedIn={isLoggedIn}
            onLoginSuccess={() => {
              setIsLoggedIn(true)
              localStorage.setItem('site_admin_auth', 'true')
            }}
            onLogout={handleLogout}
            achievements={achievements}
            setAchievements={setAchievements}
            activities={activities}
            setActivities={setActivities}
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* 4. Footer 50% Narrower */}
      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} นิรุทธิ์ เสวะนา | Nirut Sewana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

/* 1. HOME VIEW */
function HomeView({ navigateTo, achievements, activities }) {
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
            {achievements.slice(0, 3).map((item) => (
              <div key={item.id} className="feature-card">
                {/* 2. Vector Monochrome Icon */}
                <div className="feature-card__icon">
                  <Award size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a
                  href="/achievements"
                  onClick={(e) => navigateTo('/achievements', e)}
                  className="feature-card__link"
                >
                  ดูผลงานทั้งหมด <ArrowRight size={16} />
                </a>
              </div>
            ))}
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
            {activities.map((item) => (
              <div key={item.id} className="feature-card">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', height: '200px', objectFit: 'cover' }}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a
                  href="/activities"
                  onClick={(e) => navigateTo('/activities', e)}
                  className="feature-card__link"
                >
                  ดูภาพกิจกรรมทั้งหมด <ArrowRight size={16} />
                </a>
              </div>
            ))}
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
            <BookOpen size={32} />
          </div>
          <h3>สื่อการสอนวิทยาการคำนวณ</h3>
          <p>บทเรียนการเขียนโปรแกรม อัลกอริทึม และทักษะดิจิทัลสำหรับนักเรียนทุกระดับชั้น</p>
          <a href="#" className="feature-card__link">
            เข้าสู่บทเรียน <ArrowRight size={16} />
          </a>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <CheckCircle2 size={32} />
          </div>
          <h3>คลังข้อสอบ & ควิซย่อยออนไลน์</h3>
          <p>ระบบประเมินผลการเรียนรู้ออนไลน์ ตรวจผลอัตโนมัติ 24 ชั่วโมง</p>
          <a href="#" className="feature-card__link">
            ทำแบบทดสอบ <ArrowRight size={16} />
          </a>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <Download size={32} />
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
            <Users size={32} />
          </div>
          <h3>ระบบคัดกรองนักเรียนรายบุคคล</h3>
          <p>บันทึกและวิเคราะห์ข้อมูลความต้องการของนักเรียนประจำชั้น 100%</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <CheckCircle2 size={32} />
          </div>
          <h3>แบบประเมินพฤติกรรม SDQ</h3>
          <p>ประเมินพฤติกรรม 5 ด้าน สรุปผลวิเคราะห์ความเสี่ยงและแนวทางการช่วยเหลือ</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <Search size={32} />
          </div>
          <h3>บันทึกเยี่ยมบ้านพิกัด GPS</h3>
          <p>จัดเก็บพิกัดแผนที่ รูปภาพ และสรุปสภาพความเป็นอยู่รายครอบครัว</p>
        </div>
      </div>
    </div>
  )
}

/* 4. ACHIEVEMENTS VIEW WITH "ทั้งหมด" & SUB-MENU TABS */
function AchievementsView({ achievements, isLoggedIn, setAchievements }) {
  // Initial active sub-tab set to "all" (ทั้งหมด)
  const [activeSubTab, setActiveSubTab] = useState('all')

  const filteredAchievements =
    activeSubTab === 'all'
      ? achievements
      : achievements.filter((item) => item.category === activeSubTab)

  const handleDelete = (id) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="container section">
      <div className="section-title">
        <h2>🏆 ผลงานและรางวัล (Achievements & Awards)</h2>
        <p>เลือกดูรายการผลงานในหมวดทั้งหมด, ครู, นักเรียน, สถานศึกษา หรือ งานวิชาการ</p>
      </div>

      {/* Sub-Menu Glow Navigation Bar with "ทั้งหมด" */}
      <div className="sub-glow-container">
        <nav className="sub-glow-nav" aria-label="หมวดหมู่ผลงาน">
          {achievementSubTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeSubTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                className={`sub-glow-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSubTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Achievement Content Display */}
      {filteredAchievements.length > 0 ? (
        <div className="card-grid">
          {filteredAchievements.map((item) => (
            <div key={item.id} className="feature-card">
              {isLoggedIn && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                  title="ลบรายการนี้"
                >
                  <Trash2 size={16} />
                </button>
              )}
              {/* 2. Vector Monochrome Icon */}
              <div className="feature-card__icon">
                <Award size={32} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          <p>ยังไม่มีรายการในหมวดหมู่นี้</p>
        </div>
      )}
    </div>
  )
}

/* 5. ACTIVITIES VIEW */
function ActivitiesView({ activities, isLoggedIn, setActivities }) {
  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="container section">
      <div className="section-title">
        <h2>📸 ภาพกิจกรรม & บรรยากาศการเรียนรู้</h2>
        <p>ประมวลภาพกิจกรรมพัฒนาผู้เรียน การจัดการเรียนรู้ และงานชุมชน</p>
      </div>

      <div className="card-grid">
        {activities.map((item) => (
          <div key={item.id} className="feature-card">
            {isLoggedIn && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
                title="ลบภาพนี้"
              >
                <Trash2 size={16} />
              </button>
            )}
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', height: '200px', objectFit: 'cover' }}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
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
            <FileCheck size={32} />
          </div>
          <h3>รายงาน PA ประจำปีงบประมาณ 2569</h3>
          <p>สรุปผลการปฏิบัติตามข้อตกลงในการพัฒนางาน ทั้ง 2 ส่วน พร้อมเอกสารหลักฐาน</p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">
            <BookOpen size={32} />
          </div>
          <h3>แผนการจัดการเรียนรู้ & คลิปการสอน</h3>
          <p>วิดีโอบันทึกการสอน บันทึกหลังการสอน และประเด็นท้าทายเพื่อพัฒนาผู้เรียน</p>
        </div>
      </div>
    </div>
  )
}

/* DEDICATED ADMIN PAGE (หน้าแยกสำหรับระบบหลังบ้าน) */
function DedicatedAdminPage({
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  achievements,
  setAchievements,
  activities,
  setActivities,
  navigateTo,
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Admin Management Tabs
  const [adminTab, setAdminTab] = useState('add_achievement')
  const [achCategory, setAchCategory] = useState('teacher')
  const [achTitle, setAchTitle] = useState('')
  const [achDesc, setAchDesc] = useState('')

  const [actTitle, setActTitle] = useState('')
  const [actDesc, setActDesc] = useState('')
  const [actImg, setActImg] = useState('/B1.jpg')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (username === 'boasnirut' && password === '42010113') {
      onLoginSuccess()
    } else {
      setError('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!')
    }
  }

  const handleAddAchievement = (e) => {
    e.preventDefault()
    if (!achTitle) return
    const newItem = {
      id: Date.now(),
      category: achCategory,
      title: achTitle,
      description: achDesc || 'รายละเอียดผลงานและรางวัล',
      iconName: 'Award',
    }
    setAchievements((prev) => [newItem, ...prev])
    setAchTitle('')
    setAchDesc('')
    alert('เพิ่มผลงานเรียบร้อยแล้ว!')
  }

  const handleAddActivity = (e) => {
    e.preventDefault()
    if (!actTitle) return
    const newItem = {
      id: Date.now(),
      title: actTitle,
      description: actDesc || 'รายละเอียดภาพกิจกรรม',
      image: actImg || '/B1.jpg',
    }
    setActivities((prev) => [newItem, ...prev])
    setActTitle('')
    setActDesc('')
    alert('เพิ่มภาพกิจกรรมเรียบร้อยแล้ว!')
  }

  if (!isLoggedIn) {
    return (
      <div className="container section">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div className="admin-page-card">
            <div className="admin-page-card__title" style={{ marginBottom: '24px' }}>
              <Lock size={28} color="var(--accent-gold-dark)" />
              เข้าสู่ระบบหลังบ้าน (Admin)
            </div>

            <form onSubmit={handleLoginSubmit}>
              {error && <div className="admin-error">{error}</div>}

              <div className="admin-form-group">
                <label>ชื่อผู้ใช้งาน (User):</label>
                <input
                  type="text"
                  className="admin-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="กรอกชื่อผู้ใช้..."
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>รหัสผ่าน (Pass):</label>
                <input
                  type="password"
                  className="admin-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '14px', justifyContent: 'center' }}
              >
                <LogIn size={18} />
                เข้าสู่ระบบ
              </button>

              <button
                type="button"
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}
                onClick={(e) => navigateTo('/', e)}
              >
                <ArrowLeft size={18} />
                กลับสู่หน้าหลักเว็บไซต์
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container section">
      <div className="admin-page-card">
        <div className="admin-page-card__header">
          <div className="admin-page-card__title">
            <ShieldCheck size={32} color="var(--accent-gold-dark)" />
            ระบบจัดการหลังบ้านแอดมิน (Admin Dashboard)
          </div>
          <button
            type="button"
            className="btn btn-outline"
            style={{ color: '#ef4444', borderColor: '#ef4444' }}
            onClick={onLogout}
          >
            <LogOut size={16} /> ออกจากระบบ
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn ${adminTab === 'add_achievement' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setAdminTab('add_achievement')}
          >
            <PlusCircle size={16} /> เพิ่มผลงาน / รางวัล
          </button>
          <button
            type="button"
            className={`btn ${adminTab === 'add_activity' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setAdminTab('add_activity')}
          >
            <PlusCircle size={16} /> เพิ่มภาพกิจกรรม
          </button>
        </div>

        {adminTab === 'add_achievement' && (
          <form onSubmit={handleAddAchievement} style={{ maxWidth: '600px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>
              🏆 เพิ่มข้อมูลผลงานและรางวัลใหม่
            </h3>
            
            <div className="admin-form-group">
              <label>หมวดหมู่ผลงาน:</label>
              <select
                className="admin-input"
                value={achCategory}
                onChange={(e) => setAchCategory(e.target.value)}
              >
                <option value="teacher">ครู</option>
                <option value="student">นักเรียน</option>
                <option value="school">สถานศึกษา</option>
                <option value="academic">งานวิชาการ</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>ชื่อผลงาน / รางวัล:</label>
              <input
                type="text"
                className="admin-input"
                value={achTitle}
                onChange={(e) => setAchTitle(e.target.value)}
                placeholder="เช่น รางวัลครูดีเด่น..."
                required
              />
            </div>

            <div className="admin-form-group">
              <label>รายละเอียด:</label>
              <textarea
                className="admin-input"
                style={{ height: '90px', resize: 'vertical' }}
                value={achDesc}
                onChange={(e) => setAchDesc(e.target.value)}
                placeholder="กรอกรายละเอียดผลงาน..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <PlusCircle size={18} />
              บันทึกผลงานลงระบบ
            </button>
          </form>
        )}

        {adminTab === 'add_activity' && (
          <form onSubmit={handleAddActivity} style={{ maxWidth: '600px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>
              📸 เพิ่มภาพกิจกรรมใหม่
            </h3>

            <div className="admin-form-group">
              <label>ชื่อกิจกรรม / คำอธิบายภาพ:</label>
              <input
                type="text"
                className="admin-input"
                value={actTitle}
                onChange={(e) => setActTitle(e.target.value)}
                placeholder="เช่น กิจกรรมเรียนรู้คอมพิวเตอร์..."
                required
              />
            </div>

            <div className="admin-form-group">
              <label>รายละเอียดกิจกรรม:</label>
              <textarea
                className="admin-input"
                style={{ height: '90px', resize: 'vertical' }}
                value={actDesc}
                onChange={(e) => setActDesc(e.target.value)}
                placeholder="กรอกรายละเอียด..."
              />
            </div>

            <div className="admin-form-group">
              <label>เลือกภาพประกอบ (หรือใช้ URL):</label>
              <input
                type="text"
                className="admin-input"
                value={actImg}
                onChange={(e) => setActImg(e.target.value)}
                placeholder="/B1.jpg หรือ URL รูปภาพ"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <PlusCircle size={18} />
              บันทึกภาพกิจกรรมลงระบบ
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
