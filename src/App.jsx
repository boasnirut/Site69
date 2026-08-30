import React, { useState, useEffect, useRef } from 'react'
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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  MapPin,
  ExternalLink,
  GripVertical,
  Edit,
  ArrowUp,
  ArrowDown,
  UploadCloud,
  Save,
  Github,
  Loader2,
  Image as ImageIcon,
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

const achievementSubTabs = [
  { id: 'all', label: 'ทั้งหมด', icon: LayoutGrid },
  { id: 'teacher', label: 'ครู', icon: User },
  { id: 'student', label: 'นักเรียน', icon: GraduationCap },
  { id: 'school', label: 'สถานศึกษา', icon: School },
  { id: 'academic', label: 'งานวิชาการ', icon: FileText },
  { id: 'self_dev', label: 'การพัฒนาตนเอง', icon: Award },
]

// Default Hero Banners for All Pages
const defaultHeroBanners = {
  home: {
    badge: 'ศูนย์รวมการจัดการเรียนรู้ดิจิทัล',
    title: 'นิรุทธิ์ เสวะนา',
    subtitle: 'ยินดีต้อนรับสู่พอร์ตโฟลิโอส่วนตัว คลังบทเรียนดิจิทัล สื่อวิทยาการคำนวณ ระบบดูแลช่วยเหลือนักเรียนรายบุคคล และรายงานผลการพัฒนางานตามข้อตกลง (PA)',
    image: '/boasnirut.png',
  },
  classroom: {
    badge: 'สื่อการเรียนการสอนยุคใหม่',
    title: 'ห้องเรียนออนไลน์ & สื่อการเรียนรู้',
    subtitle: 'ศูนย์รวมสื่อดิจิทัล สื่อวิทยาการคำนวณ อัลกอริทึม คลังข้อสอบ และแบบทดสอบย่อยออนไลน์ 24 ชม.',
    image: '/B1.jpg',
  },
  homeroom: {
    badge: 'ระบบดูแลช่วยเหลือนักเรียน',
    title: 'งานประจำชั้น & ดูแลช่วยเหลือนักเรียน',
    subtitle: 'ระบบคัดกรองนักเรียนรายบุคคล การประเมินพฤติกรรม SDQ และบันทึกเยี่ยมบ้านพิกัด GPS',
    image: '/B4.jpg',
  },
  achievements: {
    badge: 'เกียรติยศและความภาคภูมิใจ',
    title: 'ผลงานและรางวัล (Achievements & Awards)',
    subtitle: 'รวบรวมรางวัลทรงคุณค่า นวัตกรรมการจัดการเรียนรู้ Active Learning ทั้งระดับครู นักเรียน สถานศึกษา และงานวิชาการ',
    image: '/B2.jpg',
  },
  activities: {
    badge: 'ภาพบรรยากาศการเรียนรู้',
    title: 'ภาพกิจกรรม & บรรยากาศการเรียนรู้',
    subtitle: 'คลังภาพบรรยากาศกิจกรรมการเรียนรู้ ซิงค์ภาพสดจาก Google Photos พร้อมระบบสไลด์ภาพอัตโนมัติ',
    image: '/B3.jpg',
  },
  pa: {
    badge: 'รายงานผลการพัฒนางานตามข้อตกลง',
    title: 'ข้อตกลงในการพัฒนางาน (PA)',
    subtitle: 'สรุปผลการพัฒนางานตามข้อตกลงสำหรับข้าราชการครู แผนการจัดการเรียนรู้ เอกสารร่องรอย และวิดีโอคลิปการสอน',
    image: '/SAR69.jpg',
  },
}

// Fallback Initial Achievements
const defaultAchievements = [
  {
    id: 1,
    owner: 'นายนิรุทธิ์ เสวะนา',
    title: 'รางวัลนวัตกรรมการจัดการเรียนรู้ Active Learning',
    level: 'ระดับจังหวัด',
    category: 'teacher',
    image: '/B1.jpg',
    description: 'รางวัลยกย่องเชิดชูเกียรติด้านการสร้างสรรค์สื่อและการจัดการเรียนรู้ดิจิทัลระดับจังหวัด',
  },
  {
    id: 2,
    owner: 'นายนิรุทธิ์ เสวะนา',
    title: 'ครูผู้สอนดีเด่นกลุ่มสาระวิทยาศาสตร์และเทคโนโลยี',
    level: 'ระดับเขตพื้นที่การศึกษา',
    category: 'teacher',
    image: '/B2.jpg',
    description: 'ผลงานการพัฒนาแผนการจัดการเรียนรู้บูรณาการวิทยาการคำนวณดีเด่น',
  },
  {
    id: 3,
    owner: 'นักเรียนแกนนำคอมพิวเตอร์',
    title: 'รางวัลเหรียญทอง การแข่งขันเขียนโปรแกรมคอมพิวเตอร์',
    level: 'เหรียญทอง ระดับเขตพื้นที่',
    category: 'student',
    image: '/B3.jpg',
    description: 'ส่งเสริมและฝึกหัดนักเรียนเข้าแข่งขันงานศิลปหัตถกรรมนักเรียน ระดับเขตพื้นที่การศึกษา',
  },
  {
    id: 4,
    owner: 'ตัวแทนนักเรียน',
    title: 'รางวัลชนะเลิศ กิจกรรมโครงงานคุณธรรมผู้เรียน',
    level: 'ชนะเลิศ ระดับจังหวัด',
    category: 'student',
    image: '/B4.jpg',
    description: 'นักเรียนแกนนำนำเสนอโครงงานคุณธรรมการใช้งานเทคโนโลยีอย่างปลอดภัย',
  },
  {
    id: 5,
    owner: 'โรงเรียนบ้านน้ำพร',
    title: 'สถานศึกษาปลอดภัย และมีผลการประเมินคุณภาพระดับดีเยี่ยม',
    level: 'ระดับประเทศ',
    category: 'school',
    image: '/TC01.png',
    description: 'รางวัลการบริหารจัดการสถานศึกษาและส่งเสริมสภาพแวดล้อมเพื่อการเรียนรู้ดิจิทัล',
  },
  {
    id: 6,
    owner: 'นายนิรุทธิ์ เสวะนา',
    title: 'ผลงานวิจัยในชั้นเรียน เรื่องการใช้สื่อดิจิทัลพัฒนาทักษะคิดวิเคราะห์',
    level: 'ผลงานวิชาการดีเด่น',
    category: 'academic',
    image: '/SAR69.jpg',
    description: 'การเผยแพร่ผลงานทางวิชาการและคู่มือการใช้สื่อดิจิทัลวิทยาการคำนวณ',
  },
]

// Fallback Initial Activities
const defaultActivities = [
  {
    id: 1,
    title: 'กิจกรรมการเรียนรู้ Active Learning วิทยาการคำนวณ',
    date: '2026-02-15',
    category: 'academic',
    location: 'ห้องปฏิบัติการคอมพิวเตอร์ โรงเรียนบ้านน้ำพร',
    albumUrl: '',
    image: '/B1.jpg',
    description: 'บรรยากาศการลงมือปฏิบัติจริงและการนำเสนอผลงานของนักเรียนในชั้นเรียน',
  },
  {
    id: 2,
    title: 'กิจกรรมส่งเสริมทักษะดิจิทัลและการโค้ดดิ้ง',
    date: '2026-01-20',
    category: 'academic',
    location: 'อาคารเรียนดิจิทัล',
    albumUrl: '',
    image: '/B2.jpg',
    description: 'การฝึกทักษะคอมพิวเตอร์และการใช้งานเทคโนโลยีเพื่อการเรียนรู้',
  },
  {
    id: 3,
    title: 'การอบรมและพัฒนาวิชาชีพครูด้านเทคโนโลยีดิจิทัล',
    date: '2025-12-10',
    category: 'development',
    location: 'หอประชุมใหญ่ เขตพื้นที่การศึกษา',
    albumUrl: '',
    image: '/B3.jpg',
    description: 'การเข้าร่วมอบรมและแบ่งปันความรู้เทคโนโลยีดิจิทัลเพื่อการศึกษา',
  },
  {
    id: 4,
    title: 'กิจกรรมแนะแนวและดูแลช่วยเหลือนักเรียนโฮมรูม',
    date: '2025-11-05',
    category: 'homeroom',
    description: 'การติดตามดูแลพฤติกรรมและการจัดกิจกรรมโฮมรูมสร้างสรรค์',
  },
]

/* PROMISE TOAST CONTAINER & MANAGER COMPONENT */
function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((item) => (
        <div key={item.id} className={`toast-item ${item.type}`}>
          <div className={`toast-icon ${item.type}`}>
            {item.type === 'success' && <CheckCircle2 size={20} />}
            {item.type === 'error' && <X size={20} />}
            {item.type === 'loading' && <Loader2 size={20} className="spin" />}
            {item.type === 'info' && <Sparkles size={20} />}
          </div>
          <div className="toast-content">
            {item.title && <div className="toast-title">{item.title}</div>}
            <div className="toast-message">{item.message}</div>
          </div>
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => onClose(item.id)}
            title="ปิดการแจ้งเตือน"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Promise-Toast Notification System State
  const [toasts, setToasts] = useState([])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const addToast = (toastObj) => {
    const id = Date.now() + Math.random()
    const newToast = { id, type: 'info', duration: 4500, ...toastObj }
    setToasts((prev) => [...prev, newToast])

    if (newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, newToast.duration)
    }
    return id
  }

  const toast = {
    success: (message, title = 'สำเร็จ') => addToast({ type: 'success', title, message }),
    error: (message, title = 'เกิดข้อผิดพลาด') => addToast({ type: 'error', title, message }),
    info: (message, title = 'แจ้งเตือน') => addToast({ type: 'info', title, message }),
    promise: async (asyncFnOrPromise, { loading = 'กำลังดำเนินการ...', success = 'สำเร็จแล้ว!', error = 'เกิดข้อผิดพลาด!' }) => {
      const loadingId = addToast({ type: 'loading', title: 'กรุณารอสักครู่', message: loading, duration: 0 })
      try {
        const res = typeof asyncFnOrPromise === 'function' ? await asyncFnOrPromise() : await asyncFnOrPromise
        removeToast(loadingId)
        const successText = typeof success === 'function' ? success(res) : success
        addToast({ type: 'success', title: 'สำเร็จ', message: successText })
        return res
      } catch (err) {
        removeToast(loadingId)
        const errorText = typeof error === 'function' ? error(err) : (err.message || error)
        addToast({ type: 'error', title: 'เกิดข้อผิดพลาด', message: errorText })
        throw err
      }
    },
  }

  const [heroBanners, setHeroBanners] = useState(() => {
    const saved = localStorage.getItem('site_hero_banners')
    return saved ? JSON.parse(saved) : defaultHeroBanners
  })

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('site_achievements')
    return saved ? JSON.parse(saved) : defaultAchievements
  })

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('site_activities')
    return saved ? JSON.parse(saved) : defaultActivities
  })

  // Load from public/data/siteData.json on startup if available
  useEffect(() => {
    fetch('/data/siteData.json')
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error('No json data')
      })
      .then((data) => {
        if (data) {
          if (data.heroBanners && !localStorage.getItem('site_hero_banners')) {
            setHeroBanners(data.heroBanners)
          }
          if (data.achievements && !localStorage.getItem('site_achievements')) {
            setAchievements(data.achievements)
          }
          if (data.activities && !localStorage.getItem('site_activities')) {
            setActivities(data.activities)
          }
        }
      })
      .catch(() => {})
  }, [])

  // Lightbox State
  const [lightboxItems, setLightboxItems] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  useEffect(() => {
    const auth = localStorage.getItem('site_admin_auth')
    if (auth === 'true') {
      setIsLoggedIn(true)
    }

    const handlePathSync = () => {
      setCurrentPath(window.location.pathname)
    }

    handlePathSync()
    window.addEventListener('popstate', handlePathSync)
    return () => window.removeEventListener('popstate', handlePathSync)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('site_hero_banners', JSON.stringify(heroBanners))
    } catch (e) {
      console.warn('localStorage save warning (site_hero_banners):', e)
    }
  }, [heroBanners])

  useEffect(() => {
    try {
      localStorage.setItem('site_achievements', JSON.stringify(achievements))
    } catch (e) {
      console.warn('localStorage save warning (site_achievements):', e)
    }
  }, [achievements])

  useEffect(() => {
    try {
      localStorage.setItem('site_activities', JSON.stringify(activities))
    } catch (e) {
      console.warn('localStorage save warning (site_activities):', e)
    }
  }, [activities])

  const navigateTo = (path, e) => {
    if (e) e.preventDefault()
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getActiveTab = () => {
    const rawPath = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '') || '/'
    const cleanPath = rawPath.toLowerCase().trim().split('?')[0].replace(/\/+$/, '') || '/'

    if (cleanPath === '/classroom' || cleanPath.startsWith('/classroom/')) return 'classroom'
    if (cleanPath === '/homeroom' || cleanPath.startsWith('/homeroom/')) return 'homeroom'
    if (cleanPath === '/achievements' || cleanPath.startsWith('/achievements/')) return 'achievements'
    if (cleanPath === '/activities' || cleanPath.startsWith('/activities/')) return 'activities'
    if (cleanPath === '/pa' || cleanPath.startsWith('/pa/')) return 'pa'
    if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) return 'admin'
    return 'home'
  }

  const activeTab = getActiveTab()

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('site_admin_auth')
    navigateTo('/admin')
  }

  const openLightbox = (itemsList, index) => {
    setLightboxItems(itemsList)
    setLightboxIndex(index)
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

          {/* Standalone Icon-Only Login / Admin Link on Far Right */}
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
            hero={heroBanners.home}
            navigateTo={navigateTo}
            achievements={achievements}
            activities={activities}
            openLightbox={openLightbox}
          />
        )}
        {activeTab === 'classroom' && (
          <ClassroomView hero={heroBanners.classroom} navigateTo={navigateTo} />
        )}
        {activeTab === 'homeroom' && (
          <HomeroomView hero={heroBanners.homeroom} navigateTo={navigateTo} />
        )}
        {activeTab === 'achievements' && (
          <AchievementsView
            hero={heroBanners.achievements}
            achievements={achievements}
            isLoggedIn={isLoggedIn}
            setAchievements={setAchievements}
            openLightbox={openLightbox}
          />
        )}
        {activeTab === 'activities' && (
          <ActivitiesView
            hero={heroBanners.activities}
            activities={activities}
            isLoggedIn={isLoggedIn}
            setActivities={setActivities}
            openLightbox={openLightbox}
          />
        )}
        {activeTab === 'pa' && <PaView hero={heroBanners.pa} navigateTo={navigateTo} />}
        {activeTab === 'admin' && (
          <DedicatedAdminPage
            isLoggedIn={isLoggedIn}
            onLoginSuccess={() => {
              setIsLoggedIn(true)
              localStorage.setItem('site_admin_auth', 'true')
              toast.success('ยินดีต้อนรับเข้าสู่ระบบหลังบ้านแอดมิน', 'เข้าสู่ระบบสำเร็จ')
            }}
            onLogout={handleLogout}
            heroBanners={heroBanners}
            setHeroBanners={setHeroBanners}
            achievements={achievements}
            setAchievements={setAchievements}
            activities={activities}
            setActivities={setActivities}
            navigateTo={navigateTo}
            toast={toast}
          />
        )}
      </main>

      {/* Footer 50% Narrower */}
      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} นิรุทธิ์ เสวะนา | Nirut Sewana. All rights reserved.</p>
        </div>
      </footer>

      {/* Interactive Image Lightbox Modal with Zoom & Pan */}
      {lightboxIndex >= 0 && (
        <ImageLightboxModal
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onIndexChange={(newIndex) => setLightboxIndex(newIndex)}
        />
      )}

      {/* Promise-Toast Notification System Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}

/* REUSABLE PAGE HERO BANNER COMPONENT */
function PageHeroBanner({ banner, navigateTo, isHomePage = false }) {
  if (!banner) return null
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div>
          {banner.badge && (
            <div className="hero__badge">
              <Sparkles size={16} />
              {banner.badge}
            </div>
          )}
          <h1 className="hero__title">
            {banner.title}
          </h1>
          {banner.subtitle && <p className="hero__subtitle">{banner.subtitle}</p>}

          {isHomePage && (
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
          )}
        </div>

        <div className="hero__visual" style={{ background: 'transparent', padding: 0, border: 'none', boxShadow: 'none' }}>
          <img
            src={banner.image || '/boasnirut.png'}
            alt={banner.title || 'ภาพปก'}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 'none',
              objectFit: 'contain',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              borderRadius: '0',
            }}
          />
        </div>
      </div>
    </section>
  )
}

/* 1. HOME VIEW */
function HomeView({ hero, navigateTo, achievements, activities, openLightbox }) {
  // Category Definitions for Achievements
  const achievementCats = [
    { id: 'teacher', title: '👨‍🏫 ผลงาน/รางวัลครูผู้สอน', label: 'ครูผู้สอน' },
    { id: 'student', title: '🎓 ผลงาน/รางวัลนักเรียน', label: 'นักเรียน' },
    { id: 'school', title: '🏫 ผลงาน/รางวัลสถานศึกษา', label: 'สถานศึกษา' },
    { id: 'academic', title: '📄 ผลงานวิชาการ & วิจัย', label: 'งานวิชาการ' },
    { id: 'self_dev', title: '💡 การพัฒนาตนเอง & อบรมสัมมนา', label: 'พัฒนาตนเอง' },
  ]

  // Category Definitions for Activities
  const activityCats = [
    { id: 'academic', title: '💻 กิจกรรมการเรียนรู้ & สื่อดิจิทัล' },
    { id: 'homeroom', title: '🏡 กิจกรรมประจำชั้น & ดูแลช่วยเหลือนักเรียน' },
    { id: 'development', title: '🎓 กิจกรรมพัฒนาผู้เรียน & อบรมวิชาชีพ' },
    { id: 'general', title: '📸 กิจกรรมทั่วไป & ภาพบรรยากาศ' },
  ]

  return (
    <>
      <PageHeroBanner banner={hero} navigateTo={navigateTo} isHomePage={true} />

      {/* Section 1: ผลงานและรางวัล Cards (Grouped by Category) */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>🏆 ผลงานและรางวัล (Achievements & Awards)</h2>
            <p>ความภาคภูมิใจ นวัตกรรมการจัดการเรียนรู้ Active Learning และรางวัลเกียรติยศ</p>
          </div>

          {achievementCats.map((cat) => {
            const catItems = achievements.filter((item) => item.category === cat.id)
            if (catItems.length === 0) return null

            return (
              <div key={cat.id} style={{ marginBottom: '40px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid var(--border-color)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'var(--primary-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      margin: 0,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'var(--bg-subtle)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {catItems.length} รายการ
                  </span>
                </div>

                <div className="media-card-grid">
                  {catItems.map((item) => {
                    const globalIndex = achievements.findIndex((a) => a.id === item.id)
                    return (
                      <div key={item.id} className="media-card">
                        <div
                          className="media-card__img-box"
                          onClick={() => openLightbox(achievements, globalIndex >= 0 ? globalIndex : 0)}
                        >
                          <img
                            src={item.image || '/B1.jpg'}
                            alt={item.title}
                            className="media-card__img-original"
                          />
                          <div className="media-card__zoom-badge">
                            <Maximize2 size={16} />
                          </div>
                        </div>

                        <div className="media-card__body">
                          <span className="media-card__category">
                            {item.level || cat.label}
                          </span>
                          <h3 className="media-card__title">{item.title}</h3>
                          {item.description && <p className="media-card__desc">{item.description}</p>}
                          <div className="media-card__meta">
                            {item.owner && (
                              <span>
                                <User size={13} /> {item.owner}
                              </span>
                            )}
                          </div>
                          <div className="media-card__action">
                            <button
                              type="button"
                              className="media-card__btn"
                              onClick={() => openLightbox(achievements, globalIndex >= 0 ? globalIndex : 0)}
                            >
                              ขยายภาพ <Maximize2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 2: ภาพกิจกรรม Cards (Grouped by Category) */}
      <section className="section" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="container">
          <div className="section-title">
            <h2>📸 ภาพกิจกรรม & บรรยากาศการเรียนรู้ (Activity Gallery)</h2>
            <p>ประมวลภาพกิจกรรมการจัดการเรียนรู้ การดูแลช่วยเหลือนักเรียน และกิจกรรมพัฒนาผู้เรียน</p>
          </div>

          {activityCats.map((cat) => {
            const catItems = activities.filter((item) => (item.category || 'academic') === cat.id)
            if (catItems.length === 0) return null

            return (
              <div key={cat.id} style={{ marginBottom: '40px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid var(--border-color)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'var(--primary-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      margin: 0,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'var(--bg-card)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {catItems.length} รายการ
                  </span>
                </div>

                <div className="media-card-grid">
                  {catItems.map((item) => {
                    const globalIndex = activities.findIndex((a) => a.id === item.id)
                    return (
                      <ActivityCardWithCarousel
                        key={item.id}
                        item={item}
                        index={globalIndex >= 0 ? globalIndex : 0}
                        allActivities={activities}
                        openLightbox={openLightbox}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

/* 2. CLASSROOM VIEW */
function ClassroomView({ hero, navigateTo }) {
  return (
    <>
      <PageHeroBanner banner={hero} navigateTo={navigateTo} />

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
    </>
  )
}

/* 3. HOMEROOM VIEW */
function HomeroomView({ hero, navigateTo }) {
  return (
    <>
      <PageHeroBanner banner={hero} navigateTo={navigateTo} />

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
    </>
  )
}

/* 4. ACHIEVEMENTS VIEW */
function AchievementsView({ hero, achievements, isLoggedIn, setAchievements, openLightbox }) {
  const [activeSubTab, setActiveSubTab] = useState('all')

  const filteredAchievements =
    activeSubTab === 'all'
      ? achievements
      : achievements.filter((item) => item.category === activeSubTab)

  return (
    <>
      <PageHeroBanner banner={hero} />

      <div className="container section">
        <div className="section-title">
          <h2>🏆 ผลงานและรางวัล (Achievements & Awards)</h2>
          <p>รายละเอียดข้อความอยู่ใต้ภาพ / ภาพคงอัตราส่วนตามต้นฉบับ คลิกภาพเพื่อขยายเต็มจอ</p>
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

        {/* Media Card Grid */}
        {filteredAchievements.length > 0 ? (
          <div className="media-card-grid">
            {filteredAchievements.map((item, index) => (
              <div key={item.id} className="media-card">
                {/* Image Box */}
                <div
                  className="media-card__img-box"
                  onClick={() => openLightbox(filteredAchievements, index)}
                >
                  <img
                    src={item.image || '/B1.jpg'}
                    alt={item.title}
                    className="media-card__img-original"
                  />
                  <div className="media-card__zoom-badge">
                    <Maximize2 size={16} />
                  </div>
                </div>

                {/* Text Details Section UNDERNEATH */}
                <div className="media-card__body">
                  <span className="media-card__category">
                    {item.level || (item.category === 'teacher' ? 'ครู' : item.category === 'student' ? 'นักเรียน' : item.category === 'school' ? 'สถานศึกษา' : item.category === 'self_dev' ? 'การพัฒนาตนเอง' : 'งานวิชาการ')}
                  </span>
                  <h3 className="media-card__title">{item.title}</h3>
                  {item.description && <p className="media-card__desc">{item.description}</p>}
                  
                  <div className="media-card__meta">
                    {item.owner && (
                      <span>
                        <User size={13} /> {item.owner}
                      </span>
                    )}
                  </div>

                  <div className="media-card__action">
                    <button
                      type="button"
                      className="media-card__btn"
                      onClick={() => openLightbox(filteredAchievements, index)}
                    >
                      ขยายภาพ <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <p>ยังไม่มีรายการในหมวดหมู่นี้</p>
          </div>
        )}
      </div>
    </>
  )
}

/* 5. ACTIVITIES VIEW (Details UNDERNEATH, 4:3 for Google Photos, 5-Second Slideshow with Real Auto Extraction) */
function ActivitiesView({ hero, activities, isLoggedIn, setActivities, openLightbox }) {
  return (
    <>
      <PageHeroBanner banner={hero} />

      <div className="container section">
        <div className="section-title">
          <h2>📸 ภาพกิจกรรม & บรรยากาศการเรียนรู้</h2>
          <p>ซิงค์ภาพจาก Google Photos สไลด์หมุนอัตโนมัติทุก 5 วินาที พร้อมลูกศรซ้าย/ขวา ให้กดเลื่อนเองได้</p>
        </div>

        <div className="media-card-grid">
          {activities.map((item, index) => (
            <ActivityCardWithCarousel
              key={item.id}
              item={item}
              index={index}
              allActivities={activities}
              openLightbox={openLightbox}
            />
          ))}
        </div>
      </div>
    </>
  )
}

/* CAROUSEL CARD COMPONENT WITH REAL DYNAMIC GOOGLE PHOTOS ALBUM EXTRACTION */
function ActivityCardWithCarousel({ item, index, allActivities, openLightbox }) {
  const isGPhotos = Boolean(item.albumUrl && item.albumUrl.trim().length > 0 && !item.albumUrl.includes('example'))
  
  const [gphotosImages, setGphotosImages] = useState(() => item.images || [])
  const [isLoadingGPhotos, setIsLoadingGPhotos] = useState(false)
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  // Dynamically extract photos from Google Photos album URL using Vercel api/gphotos endpoint
  useEffect(() => {
    if (!isGPhotos) return

    let isMounted = true
    setIsLoadingGPhotos(true)

    const extractPhotos = async () => {
      try {
        const apiRes = await fetch(`/api/gphotos?url=${encodeURIComponent(item.albumUrl)}`)
        if (apiRes.ok) {
          const data = await apiRes.json()
          if (isMounted && data.images && data.images.length > 0) {
            setGphotosImages(data.images)
            setIsLoadingGPhotos(false)
            return
          }
        }
      } catch (e) {
        console.warn('API fetch error:', e)
      } finally {
        if (isMounted) setIsLoadingGPhotos(false)
      }
    }

    extractPhotos()

    return () => {
      isMounted = false
    }
  }, [item.albumUrl, isGPhotos])

  // Effective gallery images list
  const activeGallery =
    gphotosImages.length > 0
      ? gphotosImages
      : item.images && item.images.length > 0
      ? item.images
      : [item.image || '/B1.jpg']

  // 5-Second Auto-Slideshow Timer
  useEffect(() => {
    if (activeGallery.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % activeGallery.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeGallery.length])

  const handlePrevClick = (e) => {
    e.stopPropagation()
    setCurrentImgIndex((prev) => (prev === 0 ? activeGallery.length - 1 : prev - 1))
  }

  const handleNextClick = (e) => {
    e.stopPropagation()
    setCurrentImgIndex((prev) => (prev + 1) % activeGallery.length)
  }

  const activeImg = activeGallery[currentImgIndex % activeGallery.length] || item.image || '/B1.jpg'

  return (
    <div className="media-card">
      {/* 4:3 Image Container with Overlaid Left/Right Arrows */}
      <div
        className="media-card__img-box"
        onClick={() => {
          const activeItemForLightbox = { ...item, image: activeImg }
          const updatedList = [...allActivities]
          updatedList[index] = activeItemForLightbox
          openLightbox(updatedList, index)
        }}
      >
        <img
          src={activeImg}
          alt={item.title}
          className={isGPhotos ? 'media-card__img-gphotos' : 'media-card__img-original'}
        />

        {/* Counter Badge / Loading Status */}
        {isGPhotos && (
          <div className="media-card__counter">
            {isLoadingGPhotos ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Loader2 size={12} className="spin" /> ซิงค์ Google Photos...
              </span>
            ) : (
              <span>
                <Images size={12} /> {currentImgIndex + 1} / {activeGallery.length}
              </span>
            )}
          </div>
        )}

        {/* Left Arrow Button */}
        {isGPhotos && activeGallery.length > 1 && (
          <button
            type="button"
            className="media-card__nav-btn prev"
            onClick={handlePrevClick}
            title="ภาพก่อนหน้า"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow Button */}
        {isGPhotos && activeGallery.length > 1 && (
          <button
            type="button"
            className="media-card__nav-btn next"
            onClick={handleNextClick}
            title="ภาพถัดไป"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Dot Indicators */}
        {isGPhotos && activeGallery.length > 1 && (
          <div className="media-card__dots">
            {activeGallery.slice(0, 10).map((_, i) => (
              <span
                key={i}
                className={`media-card__dot ${i === currentImgIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImgIndex(i)
                }}
              />
            ))}
          </div>
        )}

        {/* Hover Zoom Icon Badge */}
        <div className="media-card__zoom-badge">
          <Maximize2 size={16} />
        </div>
      </div>

      {/* Details Section UNDERNEATH */}
      <div className="media-card__body">
        <span className="media-card__category">
          {isGPhotos ? '📸 Google Photos ซิงค์ภาพสด (4:3)' : 'กิจกรรม'}
        </span>
        <h3 className="media-card__title">{item.title}</h3>
        {item.description && <p className="media-card__desc">{item.description}</p>}

        <div className="media-card__meta">
          {item.date && (
            <span>
              <Calendar size={13} /> {item.date}
            </span>
          )}
          {item.location && (
            <span>
              <MapPin size={13} /> {item.location}
            </span>
          )}
        </div>

        <div className="media-card__action">
          {isGPhotos ? (
            <a
              href={item.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="media-card__btn"
            >
              <ExternalLink size={14} /> เปิดอัลบั้ม Google Photos
            </a>
          ) : (
            <button
              type="button"
              className="media-card__btn"
              onClick={() => openLightbox(allActivities, index)}
            >
              ขยายภาพ <Maximize2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* 6. PA VIEW */
function PaView({ hero, navigateTo }) {
  return (
    <>
      <PageHeroBanner banner={hero} navigateTo={navigateTo} />

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
    </>
  )
}

/* DEDICATED ADMIN PAGE (Includes Hero Banners Management System & Promise-Toast) */
function DedicatedAdminPage({
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  heroBanners,
  setHeroBanners,
  achievements,
  setAchievements,
  activities,
  setActivities,
  navigateTo,
  toast,
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [adminTab, setAdminTab] = useState('hero_banners')

  // Selected Page Key for Hero Banner Editing
  const [selectedHeroPage, setSelectedHeroPage] = useState('home')
  const [heroBadge, setHeroBadge] = useState('')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [heroImage, setHeroImage] = useState('')

  // Load selected hero banner data into form
  useEffect(() => {
    const currentBanner = heroBanners[selectedHeroPage] || {}
    setHeroBadge(currentBanner.badge || '')
    setHeroTitle(currentBanner.title || '')
    setHeroSubtitle(currentBanner.subtitle || '')
    setHeroImage(currentBanner.image || '')
  }, [selectedHeroPage, heroBanners])

  const [editingAchId, setEditingAchId] = useState(null)
  const [achOwner, setAchOwner] = useState('นายนิรุทธิ์ เสวะนา')
  const [achTitle, setAchTitle] = useState('')
  const [achLevel, setAchLevel] = useState('ระดับเขตพื้นที่การศึกษา')
  const [achCategory, setAchCategory] = useState('teacher')
  const [achDesc, setAchDesc] = useState('')
  const [achImg, setAchImg] = useState('/B1.jpg')

  const [editingActId, setEditingActId] = useState(null)
  const [actTitle, setActTitle] = useState('')
  const [actCategory, setActCategory] = useState('academic')
  const [actDate, setActDate] = useState(new Date().toISOString().split('T')[0])
  const [actLocation, setActLocation] = useState('โรงเรียนบ้านน้ำพร')
  const [actAlbumUrl, setActAlbumUrl] = useState('')
  const [actDesc, setActDesc] = useState('')
  const [actImg, setActImg] = useState('/B1.jpg')

  const [ghToken, setGhToken] = useState(() => localStorage.getItem('gh_sync_token') || '')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  const [draggedIndex, setDraggedIndex] = useState(null)

  // Upload Status Feedback State per form (hero, achievement, activity)
  const [uploadStatuses, setUploadStatuses] = useState({
    hero: null,
    achievement: null,
    activity: null,
  })

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (username === 'boasnirut' && password === '42010113') {
      onLoginSuccess()
    } else {
      setError('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!')
      if (toast) toast.error('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!', 'เข้าสู่ระบบไม่สำเร็จ')
    }
  }

  const handleImageFileUpload = (e, setImgCallback, formKey) => {
    const file = e.target.files[0]
    if (!file) return

    const filename = file.name
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)

    // Check 1: File must be an image
    if (!file.type.startsWith('image/')) {
      const errorMsg = `❌ อัปโหลดไฟล์ "${filename}" ไม่สำเร็จ! เนื่องจากไฟล์ที่เลือกไม่ใช่ไฟล์รูปภาพที่ถูกต้อง (ชนิดไฟล์: ${file.type || 'ไม่ทราบชนิด'})`
      setUploadStatuses((prev) => ({
        ...prev,
        [formKey]: { success: false, message: errorMsg, filename },
      }))
      if (toast) toast.error(errorMsg, 'อัปโหลดภาพไม่สำเร็จ')
      e.target.value = null
      return
    }

    // Check 2: File size limit 10MB
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = `❌ อัปโหลดไฟล์ "${filename}" ไม่สำเร็จ! เนื่องจากไฟล์มีขนาดใหญ่เกินไป (${fileSizeMB} MB) เกินโควตาขนาดสูงสุดที่กำหนด 10 MB`
      setUploadStatuses((prev) => ({
        ...prev,
        [formKey]: { success: false, message: errorMsg, filename },
      }))
      if (toast) toast.error(`ไฟล์ "${filename}" ขนาดใหญ่เกิน 10MB (${fileSizeMB} MB)`, 'ขนาดไฟล์เกินโควตา')
      e.target.value = null
      return
    }

    // Compress and Read Image File
    const reader = new FileReader()
    reader.onload = (event) => {
      const rawDataUrl = event.target.result
      const img = new Image()
      img.onload = () => {
        const maxWidth = 1200
        const maxHeight = 1200
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82)
        setImgCallback(compressedDataUrl)

        const successMsg = `✅ อัปโหลดและปรับขนาดไฟล์ "${filename}" (${fileSizeMB} MB ➔ คมชัดเรียบร้อย) สำเร็จ!`
        setUploadStatuses((prev) => ({
          ...prev,
          [formKey]: { success: true, message: successMsg, filename, sizeStr: `${fileSizeMB} MB` },
        }))
        if (toast) toast.success(`ไฟล์ภาพ "${filename}" พร้อมใช้งานแล้ว`, 'อัปโหลดภาพสำเร็จ')
      }
      img.onerror = () => {
        setImgCallback(rawDataUrl)
      }
      img.src = rawDataUrl
    }
    reader.onerror = () => {
      const errorMsg = `❌ อัปโหลดไฟล์ "${filename}" ไม่สำเร็จ! เนื่องจากเกิดข้อผิดพลาดระบบขณะอ่านข้อมูลไฟล์`
      setUploadStatuses((prev) => ({
        ...prev,
        [formKey]: { success: false, message: errorMsg, filename },
      }))
      if (toast) toast.error(errorMsg, 'เกิดข้อผิดพลาดขณะอ่านไฟล์')
    }
    reader.readAsDataURL(file)
  }

  const handleSaveHeroBanner = (e) => {
    e.preventDefault()
    setHeroBanners((prev) => ({
      ...prev,
      [selectedHeroPage]: {
        badge: heroBadge,
        title: heroTitle,
        subtitle: heroSubtitle,
        image: heroImage,
      },
    }))
    setUploadStatuses((prev) => ({ ...prev, hero: null }))
    const msg = `✅ บันทึกภาพปกและข้อความสำหรับหน้า "${selectedHeroPage}" เรียบร้อยแล้ว!`
    setSyncMessage(msg)
    if (toast) toast.success(`ภาพปกและข้อความสำหรับหน้า "${selectedHeroPage}" ถูกอัปเดตแล้ว`, 'บันทึกภาพปกสำเร็จ')
    setAdminTab('hero_banners')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaveAchievement = (e) => {
    e.preventDefault()
    if (!achTitle) return

    if (editingAchId) {
      setAchievements((prev) =>
        prev.map((item) =>
          item.id === editingAchId
            ? {
                ...item,
                owner: achOwner,
                title: achTitle,
                level: achLevel,
                category: achCategory,
                description: achDesc,
                image: achImg,
              }
            : item
        )
      )
      setEditingAchId(null)
      setSyncMessage('✅ อัปเดตข้อมูลผลงานและรางวัลเรียบร้อยแล้ว!')
      if (toast) toast.success('อัปเดตข้อมูลผลงานและรางวัลเรียบร้อยแล้ว', 'บันทึกสำเร็จ')
    } else {
      const newItem = {
        id: Date.now(),
        owner: achOwner || 'นายนิรุทธิ์ เสวะนา',
        title: achTitle,
        level: achLevel || 'ระดับรางวัล',
        category: achCategory,
        description: achDesc || 'รายละเอียดผลงานและรางวัล',
        image: achImg || '/B1.jpg',
      }
      setAchievements((prev) => [newItem, ...prev])
      setSyncMessage('✅ เพิ่มผลงานและรางวัลใหม่เรียบร้อยแล้ว!')
      if (toast) toast.success('เพิ่มผลงานและรางวัลใหม่เข้าสู่ระบบเรียบร้อยแล้ว', 'เพิ่มผลงานสำเร็จ')
    }

    setAchTitle('')
    setAchDesc('')
    setAchImg('/B1.jpg')
    setUploadStatuses((prev) => ({ ...prev, achievement: null }))
    setAdminTab('achievements_list')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startEditAchievement = (item) => {
    setEditingAchId(item.id)
    setAchOwner(item.owner || 'นายนิรุทธิ์ เสวะนา')
    setAchTitle(item.title || '')
    setAchLevel(item.level || '')
    setAchCategory(item.category || 'teacher')
    setAchDesc(item.description || '')
    setAchImg(item.image || '/B1.jpg')
    setUploadStatuses((prev) => ({ ...prev, achievement: null }))
    setAdminTab('add_achievement')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteAchievement = (id) => {
    if (window.confirm('คุณต้องการลบผลงานนี้ใช่หรือไม่?')) {
      setAchievements((prev) => prev.filter((item) => item.id !== id))
      setSyncMessage('🗑️ ลบผลงานเรียบร้อยแล้ว!')
      if (toast) toast.info('ลบรายการผลงานออกจากระบบเรียบร้อยแล้ว', 'ลบผลงาน')
    }
  }

  const moveAchievement = (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= achievements.length) return
    const newItems = [...achievements]
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp
    setAchievements(newItems)
  }

  const handleSaveActivity = (e) => {
    e.preventDefault()
    if (!actTitle) return

    if (editingActId) {
      setActivities((prev) =>
        prev.map((item) =>
          item.id === editingActId
            ? {
                ...item,
                title: actTitle,
                category: actCategory || 'academic',
                date: actDate,
                location: actLocation,
                albumUrl: actAlbumUrl,
                description: actDesc,
                image: actImg,
              }
            : item
        )
      )
      setEditingActId(null)
      setSyncMessage('✅ อัปเดตข้อมูลภาพกิจกรรมเรียบร้อยแล้ว!')
      if (toast) toast.success('อัปเดตข้อมูลภาพกิจกรรมเรียบร้อยแล้ว', 'บันทึกสำเร็จ')
    } else {
      const newItem = {
        id: Date.now(),
        title: actTitle,
        category: actCategory || 'academic',
        date: actDate,
        location: actLocation,
        albumUrl: actAlbumUrl,
        description: actDesc || 'รายละเอียดภาพกิจกรรม',
        image: actImg || '/B1.jpg',
      }
      setActivities((prev) => [newItem, ...prev])
      setSyncMessage('✅ เพิ่มภาพกิจกรรมใหม่เรียบร้อยแล้ว!')
      if (toast) toast.success('เพิ่มภาพกิจกรรมใหม่เข้าสู่ระบบเรียบร้อยแล้ว', 'เพิ่มกิจกรรมสำเร็จ')
    }

    setActTitle('')
    setActCategory('academic')
    setActDesc('')
    setActAlbumUrl('')
    setActImg('/B1.jpg')
    setUploadStatuses((prev) => ({ ...prev, activity: null }))
    setAdminTab('activities_list')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startEditActivity = (item) => {
    setEditingActId(item.id)
    setActTitle(item.title || '')
    setActCategory(item.category || 'academic')
    setActDate(item.date || '')
    setActLocation(item.location || '')
    setActAlbumUrl(item.albumUrl || '')
    setActDesc(item.description || '')
    setActImg(item.image || '/B1.jpg')
    setUploadStatuses((prev) => ({ ...prev, activity: null }))
    setAdminTab('add_activity')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteActivity = (id) => {
    if (window.confirm('คุณต้องการลบภาพกิจกรรมนี้ใช่หรือไม่?')) {
      setActivities((prev) => prev.filter((item) => item.id !== id))
      setSyncMessage('🗑️ ลบภาพกิจกรรมเรียบร้อยแล้ว!')
      if (toast) toast.info('ลบภาพกิจกรรมออกจากระบบเรียบร้อยแล้ว', 'ลบภาพกิจกรรม')
    }
  }

  const moveActivity = (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= activities.length) return
    const newItems = [...activities]
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp
    setActivities(newItems)
  }

  const handleGitHubSync = async () => {
    setIsSyncing(true)
    setSyncMessage('')

    // 1. Always update LocalStorage & React State instantly
    localStorage.setItem('site_hero_banners', JSON.stringify(heroBanners))
    localStorage.setItem('site_achievements', JSON.stringify(achievements))
    localStorage.setItem('site_activities', JSON.stringify(activities))

    const fullData = {
      heroBanners,
      achievements,
      activities,
    }

    if (toast) {
      await toast.promise(
        async () => {
          // 2. Call Vercel Serverless Sync API (/api/sync-data)
          try {
            const apiRes = await fetch('/api/sync-data', {
              method: 'POST',
              headers: { 'Content-Type': 'application.json' },
              body: JSON.stringify(fullData),
            })

            if (apiRes.ok) {
              const apiJson = await apiRes.json()
              const okMsg = '✅ บันทึกและซิงค์ข้อมูลตรงสู่ GitHub & Vercel สำเร็จเรียบร้อย!'
              setSyncMessage(okMsg)
              return okMsg
            }
          } catch (err) {
            console.log('Serverless sync API fallback to local sync', err)
          }

          // Fallback if client token is saved
          const tokenToUse = (ghToken || '').trim()
          if (tokenToUse) {
            const repo = 'boasnirut/Site69'
            const filePath = 'public/data/siteData.json'
            const url = `https://api.github.com/repos/${repo}/contents/${filePath}`
            const authHeader = tokenToUse.startsWith('github_pat_') || tokenToUse.startsWith('ghp_')
              ? `Bearer ${tokenToUse}`
              : `token ${tokenToUse}`

            const getFile = await fetch(url, {
              headers: {
                Authorization: authHeader,
                Accept: 'application/vnd.github.v3+json',
              },
            })

            let sha = ''
            if (getFile.ok) {
              const fileData = await getFile.json()
              sha = fileData.sha
            }

            const contentEncoded = btoa(unescape(encodeURIComponent(JSON.stringify(fullData, null, 2))))
            const putRes = await fetch(url, {
              method: 'PUT',
              headers: {
                Authorization: authHeader,
                'Content-Type': 'application.json',
                Accept: 'application/vnd.github.v3+json',
              },
              body: JSON.stringify({
                message: 'data: update siteData.json via Admin Portal',
                content: contentEncoded,
                sha: sha || undefined,
                branch: 'main',
              }),
            })

            if (putRes.ok) {
              const okMsg = '✅ บันทึกและซิงค์ข้อมูลตรงสู่ GitHub (boasnirut/Site69) และ Vercel สำเร็จเรียบร้อย!'
              setSyncMessage(okMsg)
              return okMsg
            }
          }

          const okMsg = '✅ บันทึกข้อมูลและอัปเดตการแสดงผลบนเว็บไซต์สำเร็จเรียบร้อยแล้ว!'
          setSyncMessage(okMsg)
          return okMsg
        },
        {
          loading: 'กำลังซิงค์และอัปโหลดข้อมูลส่งตรงไปยัง GitHub & Vercel...',
          success: (res) => res,
          error: (err) => err.message || 'เกิดข้อผิดพลาดในการซิงค์ข้อมูล',
        }
      )
    }

    setIsSyncing(false)
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

        {/* Sync & Direct GitHub Commit Notification Container */}
        <div
          style={{
            background: 'var(--accent-cream)',
            border: '1px solid var(--border-amber)',
            padding: '18px 24px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div>
            <strong style={{ color: 'var(--primary-navy)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Github size={20} /> ระบบซิงค์ข้อมูลตรงสู่ GitHub & Vercel
            </strong>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              เมื่อกดบันทึกหรือกดปุ่มซิงค์ ข้อมูลภาพปก ผลงาน และกิจกรรมจะถูกส่งตรงไปที่ GitHub และสั่ง Deploy บน Vercel แสดงผลทันที
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGitHubSync}
            disabled={isSyncing}
            style={{ minWidth: '200px', justifyContent: 'center' }}
          >
            <UploadCloud size={18} />
            {isSyncing ? 'กำลังซิงค์...' : 'ซิงค์ & บันทึกสู่ GitHub'}
          </button>
        </div>

        {syncMessage && (
          <div
            style={{
              background: syncMessage.includes('❌') || syncMessage.includes('⚠️') ? '#fef2f2' : '#f0fdf4',
              color: syncMessage.includes('❌') || syncMessage.includes('⚠️') ? '#dc2626' : '#15803d',
              border: `1px solid ${syncMessage.includes('❌') || syncMessage.includes('⚠️') ? '#fca5a5' : '#86efac'}`,
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              marginBottom: '20px',
              fontSize: '0.9rem',
            }}
          >
            {syncMessage}
          </div>
        )}

        {/* Navigation Tabs for Admin */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn ${adminTab === 'hero_banners' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setAdminTab('hero_banners')}
          >
            <ImageIcon size={16} /> จัดการภาพปก (Hero Banners)
          </button>
          <button
            type="button"
            className={`btn ${adminTab === 'achievements_list' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setAdminTab('achievements_list')}
          >
            <Trophy size={16} /> จัดการรายการผลงาน ({achievements.length})
          </button>
          <button
            type="button"
            className={`btn ${adminTab === 'activities_list' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setAdminTab('activities_list')}
          >
            <Images size={16} /> จัดการภาพกิจกรรม ({activities.length})
          </button>
          <button
            type="button"
            className={`btn ${adminTab === 'add_achievement' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              setEditingAchId(null)
              setAchTitle('')
              setAchDesc('')
              setAdminTab('add_achievement')
            }}
          >
            <PlusCircle size={16} /> เพิ่มผลงานใหม่
          </button>
          <button
            type="button"
            className={`btn ${adminTab === 'add_activity' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              setEditingActId(null)
              setActTitle('')
              setActDesc('')
              setAdminTab('add_activity')
            }}
          >
            <PlusCircle size={16} /> เพิ่มกิจกรรมใหม่
          </button>
        </div>

        {/* 1. Manage Hero Banners Section */}
        {adminTab === 'hero_banners' && (
          <div style={{ maxWidth: '800px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🖼️ จัดการภาพปก (Hero Banner) และข้อความในหน้าต่าง ๆ
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              เลือกหน้าที่ต้องการแก้ไขภาพปก แล้วปรับเปลี่ยนป้ายข้อความ หัวข้อ ข้อความอธิบาย และอัปโหลดภาพปกใหม่ได้ทันที
            </p>

            {/* Sub-tab selection for Page selection */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {[
                { key: 'home', label: '🏠 หน้าหลัก' },
                { key: 'classroom', label: '💻 ห้องเรียนออนไลน์' },
                { key: 'homeroom', label: '🏫 งานประจำชั้น' },
                { key: 'achievements', label: '🏆 ผลงาน/รางวัล' },
                { key: 'activities', label: '📸 ภาพกิจกรรม' },
                { key: 'pa', label: '📋 ข้อตกลง PA' },
              ].map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`btn ${selectedHeroPage === p.key ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '8px 16px', fontSize: '0.88rem' }}
                  onClick={() => setSelectedHeroPage(p.key)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveHeroBanner}>
              <div className="admin-form-group">
                <label>ป้ายข้อความย่อย (Hero Badge):</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  placeholder="เช่น ศูนย์รวมการจัดการเรียนรู้ดิจิทัล..."
                />
              </div>

              <div className="admin-form-group">
                <label>หัวข้อหน้าปก (Hero Title):</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="เช่น นิรุทธิ์ เสวะนา..."
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>ข้อความอธิบายหน้าปก (Hero Subtitle):</label>
                <textarea
                  className="admin-input"
                  style={{ height: '90px', resize: 'vertical' }}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="กรอกข้อความอธิบายหน้าปก..."
                />
              </div>

              <div className="admin-form-group">
                <label>อัปโหลดภาพปกใหม่ (จำกัดขนาดไฟล์ไม่เกิน 10MB):</label>
                <input
                  type="file"
                  accept="image/*"
                  className="admin-input"
                  onChange={(e) => handleImageFileUpload(e, setHeroImage, 'hero')}
                />

                {/* Upload Status Notification Badge */}
                {uploadStatuses.hero && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: uploadStatuses.hero.success ? '#f0fdf4' : '#fef2f2',
                      border: uploadStatuses.hero.success ? '1px solid #bbf7d0' : '1px solid #fecaca',
                      color: uploadStatuses.hero.success ? '#15803d' : '#dc2626',
                    }}
                  >
                    {uploadStatuses.hero.success ? <CheckCircle2 size={18} /> : <X size={18} />}
                    <span>{uploadStatuses.hero.message}</span>
                  </div>
                )}

                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  หรือกรอก Path/URL รูปภาพ:
                </div>
                <input
                  type="text"
                  className="admin-input"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="/boasnirut.png หรือ URL รูปภาพ"
                />

                {/* Live Preview Box */}
                {heroImage && (
                  <div style={{ marginTop: '16px', padding: '16px', border: '1px dashed var(--border-amber)', borderRadius: '12px', background: '#fafafa' }}>
                    <strong style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--primary-navy)' }}>
                      🔍 พรีวิวภาพปกที่เลือก:
                    </strong>
                    <img
                      src={heroImage}
                      alt="Hero Preview"
                      style={{ maxHeight: '160px', borderRadius: '8px', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                <Save size={18} />
                บันทึกการแก้ไขภาพปกหน้า {selectedHeroPage}
              </button>
            </form>
          </div>
        )}

        {/* 2. Achievements List & Drag Reordering */}
        {adminTab === 'achievements_list' && (
          <div>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>
              🏆 รายการผลงาน/รางวัล (ลากสลับตำแหน่ง หรือ กดปุ่มเลื่อนเพื่อจัดลำดับ)
            </h3>

            <div className="admin-item-list">
              {achievements.map((item, index) => (
                <div
                  key={item.id}
                  className="admin-item-row"
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedIndex !== null && draggedIndex !== index) {
                      const newArr = [...achievements]
                      const draggedItem = newArr[draggedIndex]
                      newArr.splice(draggedIndex, 1)
                      newArr.splice(index, 0, draggedItem)
                      setAchievements(newArr)
                      setDraggedIndex(null)
                    }
                  }}
                >
                  <div className="admin-item-row__info">
                    <span className="admin-item-row__drag" title="ลากสลับลำดับ">
                      <GripVertical size={20} />
                    </span>
                    <img
                      src={item.image || '/B1.jpg'}
                      alt={item.title}
                      className="admin-item-row__img"
                    />
                    <div className="admin-item-row__text">
                      <strong>{item.title}</strong>
                      <small>
                        ผู้ได้รับ: {item.owner || 'นายนิรุทธิ์ เสวะนา'} | ระดับ: {item.level || 'รางวัล'} | หมวด: {item.category}
                      </small>
                    </div>
                  </div>

                  <div className="admin-item-row__actions">
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => moveAchievement(index, -1)}
                      disabled={index === 0}
                      title="เลื่อนขึ้น"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => moveAchievement(index, 1)}
                      disabled={index === achievements.length - 1}
                      title="เลื่อนลง"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => startEditAchievement(item)}
                    >
                      <Edit size={14} /> แก้ไข
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn delete"
                      onClick={() => deleteAchievement(item.id)}
                    >
                      <Trash2 size={14} /> ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Activities List & Drag Reordering */}
        {adminTab === 'activities_list' && (
          <div>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>
              📸 รายการภาพกิจกรรม (ลากสลับตำแหน่ง หรือ กดปุ่มเลื่อนเพื่อจัดลำดับ)
            </h3>

            <div className="admin-item-list">
              {activities.map((item, index) => (
                <div
                  key={item.id}
                  className="admin-item-row"
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedIndex !== null && draggedIndex !== index) {
                      const newArr = [...activities]
                      const draggedItem = newArr[draggedIndex]
                      newArr.splice(draggedIndex, 1)
                      newArr.splice(index, 0, draggedItem)
                      setActivities(newArr)
                      setDraggedIndex(null)
                    }
                  }}
                >
                  <div className="admin-item-row__info">
                    <span className="admin-item-row__drag" title="ลากสลับลำดับ">
                      <GripVertical size={20} />
                    </span>
                    <img
                      src={item.image || '/B1.jpg'}
                      alt={item.title}
                      className="admin-item-row__img"
                    />
                    <div className="admin-item-row__text">
                      <strong>{item.title}</strong>
                      <small>
                        วันที่: {item.date || '-'} | สถานที่: {item.location || '-'} {item.albumUrl ? '| Google Photos (4:3 ซิงค์สด)' : ''}
                      </small>
                    </div>
                  </div>

                  <div className="admin-item-row__actions">
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => moveActivity(index, -1)}
                      disabled={index === 0}
                      title="เลื่อนขึ้น"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => moveActivity(index, 1)}
                      disabled={index === activities.length - 1}
                      title="เลื่อนลง"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => startEditActivity(item)}
                    >
                      <Edit size={14} /> แก้ไข
                    </button>
                    <button
                      type="button"
                      className="admin-action-btn delete"
                      onClick={() => deleteActivity(item.id)}
                    >
                      <Trash2 size={14} /> ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Add / Edit Achievement Form */}
        {adminTab === 'add_achievement' && (
          <form onSubmit={handleSaveAchievement} style={{ maxWidth: '650px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>
              {editingAchId ? '✏️ แก้ไขข้อมูลผลงานและรางวัล' : '🏆 เพิ่มข้อมูลผลงานและรางวัลใหม่'}
            </h3>

            <div className="admin-form-group">
              <label>ผู้ได้รับรางวัล / เจ้าของผลงาน:</label>
              <input
                type="text"
                className="admin-input"
                value={achOwner}
                onChange={(e) => setAchOwner(e.target.value)}
                placeholder="เช่น นายนิรุทธิ์ เสวะนา..."
                required
              />
            </div>

            <div className="admin-form-group">
              <label>ชื่อผลงานหรือรางวัล:</label>
              <input
                type="text"
                className="admin-input"
                value={achTitle}
                onChange={(e) => setAchTitle(e.target.value)}
                placeholder="เช่น รางวัลนวัตกรรมการจัดการเรียนรู้ Active Learning..."
                required
              />
            </div>

            <div className="admin-form-group">
              <label>ระดับรางวัล / ประเภทผลงาน:</label>
              <input
                type="text"
                className="admin-input"
                value={achLevel}
                onChange={(e) => setAchLevel(e.target.value)}
                placeholder="เช่น ระดับประเทศ / เหรียญทอง ระดับเขตพื้นที่..."
              />
            </div>

            <div className="admin-form-group">
              <label>ประเภทผลงานและรางวัล (ดรอปดาวน์หมวดหมู่):</label>
              <select
                className="admin-input"
                value={achCategory}
                onChange={(e) => setAchCategory(e.target.value)}
              >
                <option value="teacher">ครู</option>
                <option value="student">นักเรียน</option>
                <option value="school">สถานศึกษา</option>
                <option value="academic">งานวิชาการ</option>
                <option value="self_dev">การพัฒนาตนเอง</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>อัปโหลดภาพประกอบ (ยึดอัตราส่วนภาพต้นฉบับ - จำกัดไม่เกิน 10MB):</label>
              <input
                type="file"
                accept="image/*"
                className="admin-input"
                onChange={(e) => handleImageFileUpload(e, setAchImg, 'achievement')}
              />

              {/* Upload Status Notification Badge */}
              {uploadStatuses.achievement && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: uploadStatuses.achievement.success ? '#f0fdf4' : '#fef2f2',
                    border: uploadStatuses.achievement.success ? '1px solid #bbf7d0' : '1px solid #fecaca',
                    color: uploadStatuses.achievement.success ? '#15803d' : '#dc2626',
                  }}
                >
                  {uploadStatuses.achievement.success ? <CheckCircle2 size={18} /> : <X size={18} />}
                  <span>{uploadStatuses.achievement.message}</span>
                </div>
              )}

              {achImg && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={achImg}
                    alt="Preview"
                    style={{ height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label>รายละเอียดเพิ่มเติม:</label>
              <textarea
                className="admin-input"
                style={{ height: '80px', resize: 'vertical' }}
                value={achDesc}
                onChange={(e) => setAchDesc(e.target.value)}
                placeholder="กรอกรายละเอียด..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Save size={18} />
              {editingAchId ? 'บันทึกการแก้ไข' : 'บันทึกผลงานลงในระบบ'}
            </button>
          </form>
        )}

        {/* 5. Add / Edit Activity Form */}
        {adminTab === 'add_activity' && (
          <form onSubmit={handleSaveActivity} style={{ maxWidth: '650px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>
              {editingActId ? '✏️ แก้ไขข้อมูลภาพกิจกรรม' : '📸 เพิ่มภาพกิจกรรมใหม่'}
            </h3>

            <div className="admin-form-group">
              <label>ชื่อกิจกรรม:</label>
              <input
                type="text"
                className="admin-input"
                value={actTitle}
                onChange={(e) => setActTitle(e.target.value)}
                placeholder="เช่น กิจกรรมการเรียนรู้ Active Learning..."
                required
              />
            </div>

            <div className="admin-form-group">
              <label>หมวดหมู่กิจกรรม:</label>
              <select
                className="admin-input"
                value={actCategory}
                onChange={(e) => setActCategory(e.target.value)}
              >
                <option value="academic">💻 กิจกรรมการเรียนรู้ & สื่อดิจิทัล</option>
                <option value="homeroom">🏡 กิจกรรมประจำชั้น & ดูแลช่วยเหลือนักเรียน</option>
                <option value="development">🎓 กิจกรรมพัฒนาผู้เรียน & อบรมวิชาชีพ</option>
                <option value="general">📸 กิจกรรมทั่วไป & ภาพบรรยากาศ</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>วันที่ (เลือกในปฏิทิน):</label>
              <input
                type="date"
                className="admin-input"
                value={actDate}
                onChange={(e) => setActDate(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>สถานที่:</label>
              <input
                type="text"
                className="admin-input"
                value={actLocation}
                onChange={(e) => setActLocation(e.target.value)}
                placeholder="เช่น ห้องปฏิบัติการคอมพิวเตอร์..."
              />
            </div>

            <div className="admin-form-group">
              <label>ลิงก์ไฟล์แนบ / Google Photos Album URL (ระบบจะดึงภาพจาก Google Photos อัตโนมัติ):</label>
              <input
                type="url"
                className="admin-input"
                value={actAlbumUrl}
                onChange={(e) => setActAlbumUrl(e.target.value)}
                placeholder="https://photos.app.goo.gl/..."
              />
            </div>

            <div className="admin-form-group">
              <label>อัปโหลดภาพปกกิจกรรม (จำกัดขนาดไฟล์ไม่เกิน 10MB):</label>
              <input
                type="file"
                accept="image/*"
                className="admin-input"
                onChange={(e) => handleImageFileUpload(e, setActImg, 'activity')}
              />

              {/* Upload Status Notification Badge */}
              {uploadStatuses.activity && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: uploadStatuses.activity.success ? '#f0fdf4' : '#fef2f2',
                    border: uploadStatuses.activity.success ? '1px solid #bbf7d0' : '1px solid #fecaca',
                    color: uploadStatuses.activity.success ? '#15803d' : '#dc2626',
                  }}
                >
                  {uploadStatuses.activity.success ? <CheckCircle2 size={18} /> : <X size={18} />}
                  <span>{uploadStatuses.activity.message}</span>
                </div>
              )}
              {actImg && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={actImg}
                    alt="Preview"
                    style={{ height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label>รายละเอียดกิจกรรม:</label>
              <textarea
                className="admin-input"
                style={{ height: '80px', resize: 'vertical' }}
                value={actDesc}
                onChange={(e) => setActDesc(e.target.value)}
                placeholder="กรอกรายละเอียด..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Save size={18} />
              {editingActId ? 'บันทึกการแก้ไข' : 'บันทึกภาพกิจกรรมลงในระบบ'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* INTERACTIVE FULLSCREEN LIGHTBOX MODAL */
function ImageLightboxModal({ items, currentIndex, onClose, onIndexChange }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const currentItem = items[currentIndex] || {}

  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) onIndexChange(currentIndex + 1)
      if (e.key === 'ArrowLeft' && currentIndex > 0) onIndexChange(currentIndex - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, items.length, onClose, onIndexChange])

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4))
  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }

  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.25, 4))
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.25, 1)
        if (next === 1) setPosition({ x: 0, y: 0 })
        return next
      })
    }
  }

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-title-box">
          <h3>{currentItem.title}</h3>
          {currentItem.owner && <p>ผู้ได้รับ: {currentItem.owner}</p>}
        </div>

        <div className="lightbox-controls">
          <button type="button" className="lightbox-btn" onClick={handleZoomIn} title="ซูมขยาย (+)">
            <ZoomIn size={20} />
          </button>
          <button type="button" className="lightbox-btn" onClick={handleZoomOut} title="ย่อขนาด (-)">
            <ZoomOut size={20} />
          </button>
          <button type="button" className="lightbox-btn" onClick={handleResetZoom} title="รีเซ็ตขนาด (1:1)">
            <RotateCcw size={18} />
          </button>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '0 8px' }}>
            {currentIndex + 1} / {items.length}
          </span>
          <button type="button" className="lightbox-btn" onClick={onClose} title="ปิดหน้าต่าง">
            <X size={22} />
          </button>
        </div>
      </div>

      <div
        className="lightbox-body"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {currentIndex > 0 && (
          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={() => onIndexChange(currentIndex - 1)}
            title="ภาพก่อนหน้า"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <div
          className="lightbox-img-wrapper"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <img
            src={currentItem.image || '/B1.jpg'}
            alt={currentItem.title}
            className="lightbox-img"
            draggable={false}
          />
        </div>

        {currentIndex < items.length - 1 && (
          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={() => onIndexChange(currentIndex + 1)}
            title="ภาพถัดไป"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', paddingBottom: '10px' }}>
        💡 คำแนะนำ: ใช้ล้อเมาส์ scroll เพื่อซูมเข้า/ออก และลากเมาส์เพื่อเลื่อนดูภาพขนาดเต็ม
      </div>
    </div>
  )
}
