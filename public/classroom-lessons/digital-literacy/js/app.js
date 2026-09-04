/**
 * app.js
 * แกนหลักการทำงานของเว็บแอปพลิเคชันสื่อการสอน ม.3 โรงเรียนบ้านน้ำพร
 * รองรับการเข้าสู่ระบบด้วยเลขประจำตัวนักเรียน 21 คน และ Dashboard ติดตามความก้าวหน้า
 */

const App = {
    state: {
        currentSection: 'home',
        student: {
            studentId: '',
            no: '',
            title: '',
            name: '',
            fullName: '',
            room: '3',
            avatar: ''
        },
        pretestScore: null,
        pretestAnswers: {},
        posttestScore: null,
        posttestAnswers: {},
        completedUnits: [],
        completedLabs: [],
        unlockedBadges: [],
        soundEnabled: true,
        currentUnitId: 1
    },

    currentFilter: 'all',
    searchQuery: '',
    audioCtx: null,

    init() {
        // ตรวจสอบและเคลียร์ค่าล็อกอินที่ตกค้าง หากไม่ได้ล็อกอินจริงใน session นี้
        const sessionActive = (typeof sessionStorage !== 'undefined') && sessionStorage.getItem('NP_SESSION_LOGGED_IN') === 'true';
        if (!sessionActive) {
            try {
                localStorage.removeItem('NP_ACTIVE_STUDENT_ID');
                sessionStorage.removeItem('NP_GUEST_STUDENT');
            } catch(e) {}
        }

        this.populateStudentDropdown();
        this.loadActiveStudent();
        this.initEventListeners();
        this.updateHeaderProfile();
        this.renderUnitsList();
        this.renderClassProgressDashboard();
        
        // เคลียร์ฟอร์มล็อกอินหน้าแรกให้สะอาด
        const loginInput = document.getElementById('login-student-id');
        if (loginInput && (!this.state.student || !this.state.student.studentId)) {
            loginInput.value = '';
        }
        const preview = document.getElementById('login-student-preview');
        if (preview && (!this.state.student || !this.state.student.studentId)) {
            preview.classList.add('hidden');
            preview.innerHTML = '';
        }

        // นำทางไปยังหน้า home
        this.navigateTo(this.state.currentSection || 'home');
    },

    // --- Web Audio API ระบบเสียงเอฟเฟกต์สมจริง ---
    initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
    },

    playSound(type) {
        if (!this.state.soundEnabled) return;
        this.initAudio();
        if (!this.audioCtx) return;

        const ctx = this.audioCtx;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const now = ctx.currentTime;

        if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'success') {
            const notes = [523.25, 659.25]; // C5, E5
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.08);
                gain.gain.setValueAtTime(0.2, now + i * 0.08);
                gain.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.25);
            });
        } else if (type === 'error') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.linearRampToValueAtTime(140, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'fanfare') {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.12);
                gain.gain.setValueAtTime(0.25, now + i * 0.12);
                gain.gain.linearRampToValueAtTime(0.01, now + i * 0.12 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.4);
            });
            this.triggerConfetti();
        }
    },

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        const icon = document.getElementById("sound-toggle-icon");
        if (icon) {
            icon.className = this.state.soundEnabled ? "fa-solid fa-volume-high text-emerald-600" : "fa-solid fa-volume-xmark text-slate-400";
        }
        this.saveCurrentStudentProgress();
        if (this.state.soundEnabled) this.playSound('click');
    },

    triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    },

    // --- ระบบเข้าสู่ระบบด้วยเลขประจำตัวนักเรียน (Student Authentication - ID Only) ---
    populateStudentDropdown() {
        // โหมดเข้าสู่ระบบด้วยเลขประจำตัวนักเรียนเท่านั้น เพื่อป้องกันการแอบอ้างตัวตน
    },

    onStudentSelectChange(val) {
        const input = document.getElementById("login-student-id");
        if (input) {
            input.value = val;
            this.onStudentIdInput(val);
        }
    },

    onStudentIdInput(rawVal) {
        const val = String(rawVal || '').trim();
        const preview = document.getElementById("login-student-preview");
        const submitBtn = document.getElementById("btn-login-submit");
        if (!preview) return;

        if (val === '0000') {
            preview.classList.remove("hidden");
            preview.innerHTML = `
                <div class="p-3.5 rounded-2xl bg-amber-50/90 border-2 border-amber-400 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-sm">
                            <i class="fa-solid fa-user-pen text-lg text-white"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-900 text-xs sm:text-sm">ผู้เยี่ยมชม / ทดลองใช้งาน (Guest)</span>
                                <span class="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-semibold">รหัส 0000</span>
                            </div>
                            <div class="text-[11px] text-slate-500 mt-0.5">กดเข้าสู่ระบบเพื่อระบุชื่อ-นามสกุลของคุณ</div>
                        </div>
                    </div>
                    <div>
                        <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">โหมดทดลองใช้</span>
                    </div>
                </div>
            `;
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        const found = APP_DATA.studentsM3.find(s => s.studentId === val);

        if (found) {
            // ดึงประวัติเดิมเพื่อดูความก้าวหน้า
            const allProgress = this.getAllStudentsProgress();
            const studentRecord = allProgress[found.studentId];
            const hasStarted = studentRecord && studentRecord.pretestScore !== null;
            const isCompleted = studentRecord && studentRecord.posttestScore !== null;

            let statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">ยังไม่เริ่มเรียน</span>`;
            if (isCompleted) {
                statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">🎉 เรียนจบแล้ว (${studentRecord.posttestScore}/10)</span>`;
            } else if (hasStarted) {
                statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">กำลังศึกษา (Pre-test: ${studentRecord.pretestScore}/10)</span>`;
            }

            preview.classList.remove("hidden");
            preview.innerHTML = `
                <div class="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-400 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center text-xl font-bold border border-emerald-200 shadow-sm">
                            <i class="fa-solid fa-user-graduate text-blue-700"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-900 text-sm">${found.fullName}</span>
                                <span class="text-xs bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-md font-semibold">เลขที่ ${found.no}</span>
                            </div>
                            <div class="text-xs text-slate-500 mt-0.5">ชั้นมัธยมศึกษาปีที่ 3 • รหัส: ${found.studentId}</div>
                        </div>
                    </div>
                    <div>
                        ${statusBadge}
                    </div>
                </div>
            `;
            if (submitBtn) submitBtn.disabled = false;
        } else {
            if (val.length >= 4) {
                preview.classList.remove("hidden");
                preview.innerHTML = `
                    <div class="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-rose-500 text-base"></i>
                        <span>ไม่พบเลขประจำตัว <strong>${val}</strong> ในบัญชีรายชื่อ ม.3 โรงเรียนบ้านน้ำพร</span>
                    </div>
                `;
            } else {
                preview.classList.add("hidden");
            }
        }
    },

    // --- ระบบผู้เยี่ยมชม (Guest Login 0000) ---
    openGuestNameModal() {
        const modal = document.getElementById("guest-name-modal");
        const input = document.getElementById("guest-name-input");
        if (modal) modal.classList.remove("hidden");
        if (input) {
            input.value = "";
            input.focus();
        }
    },

    closeGuestNameModal() {
        const modal = document.getElementById("guest-name-modal");
        if (modal) modal.classList.add("hidden");
    },

    submitGuestLogin(e) {
        if (e) e.preventDefault();
        const input = document.getElementById("guest-name-input");
        const rawName = input ? input.value.trim() : "";
        if (!rawName || rawName.length < 2) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรุณากรอกชื่อ-นามสกุล',
                    text: 'กรุณากรอกชื่อ-นามสกุลของคุณสำหรับการทดลองใช้งานครับ',
                    confirmButtonColor: '#1e3a8a'
                });
            } else {
                alert("กรุณากรอกชื่อ-นามสกุลของคุณสำหรับการทดลองใช้งานครับ");
            }
            if (input) input.focus();
            return;
        }

        const guestStudent = {
            studentId: "0000",
            no: "แขก",
            title: "",
            name: rawName,
            fullName: rawName,
            room: "3 (Guest)",
            avatar: "",
            isGuest: true
        };

        try {
            sessionStorage.setItem("NP_SESSION_LOGGED_IN", "true");
            sessionStorage.setItem("NP_GUEST_STUDENT", JSON.stringify(guestStudent));
            localStorage.setItem("NP_ACTIVE_STUDENT_ID", "0000");
        } catch (err) {}

        this.state.student = guestStudent;
        this.state.pretestScore = null;
        this.state.posttestScore = null;
        this.state.completedUnits = [];
        this.state.completedLabs = [];

        this.closeGuestNameModal();
        this.updateHeaderProfile();
        this.playSound('success');
        this.navigateTo('pretest');
    },

    loginWithStudentId(e) {
        if (e) e.preventDefault();
        const input = document.getElementById("login-student-id");
        const sid = input ? input.value.trim() : '';

        if (sid === '0000') {
            this.openGuestNameModal();
            return;
        }

        const student = APP_DATA.studentsM3.find(s => s.studentId === sid);
        if (!student) {
            if (typeof Swal !== 'undefined') { Swal.fire({ icon: 'error', title: 'ไม่พบรหัสนักเรียน', text: 'กรุณากรอกเลขประจำตัวนักเรียน 4 หลักให้ถูกต้อง หรือรหัส 0000 สำหรับผู้เยี่ยมชม', confirmButtonText: 'ตกลง', confirmButtonColor: '#1e3a8a' }); } else { alert('กรุณากรอกเลขประจำตัวนักเรียนชั้น ม.3 ให้ถูกต้องครับ'); }
            if (input) input.focus();
            return;
        }

        // โหลดข้อมูลความก้าวหน้าของนักเรียนคนนี้
        this.loadStudentProgress(student);
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'เข้าสู่ระบบสำเร็จ',
                text: `ยินดีต้อนรับ ${student.fullName} (เลขที่ ${student.no})`,
                timer: 1500,
                showConfirmButton: false
            });
        }
        this.updateHeaderProfile();
        this.playSound('success');

        // บันทึก active student id ลง local storage
        sessionStorage.setItem("NP_SESSION_LOGGED_IN", "true");
        localStorage.setItem("NP_ACTIVE_STUDENT_ID", student.studentId);

        // นำทาง
        if (this.state.pretestScore === null) {
            this.navigateTo('pretest');
        } else if (this.state.posttestScore !== null) {
            this.navigateTo('results');
        } else {
            this.navigateTo('units');
        }
    },

    loadActiveStudent() {
        const sessionActive = (typeof sessionStorage !== 'undefined') && sessionStorage.getItem("NP_SESSION_LOGGED_IN") === "true";
        if (!sessionActive) {
            this.state.student = {
                studentId: '',
                no: '',
                title: '',
                name: '',
                fullName: '',
                room: '3',
                avatar: ''
            };
            return;
        }

        const activeId = localStorage.getItem("NP_ACTIVE_STUDENT_ID");
        if (activeId === "0000") {
            const guestRaw = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem("NP_GUEST_STUDENT") : null;
            if (guestRaw) {
                try {
                    const guest = JSON.parse(guestRaw);
                    if (guest && guest.fullName) {
                        this.state.student = guest;
                        this.updateHeaderProfile();
                    }
                } catch(e) {}
            }
            return;
        }
        if (activeId) {
            const student = APP_DATA.studentsM3.find(s => s.studentId === activeId);
            if (student) {
                this.loadStudentProgress(student);
            }
        }
    },

    loadStudentProgress(student) {
        const allProgress = this.getAllStudentsProgress();
        const record = allProgress[student.studentId] || {};

        this.state.student = {
            studentId: student.studentId,
            no: student.no,
            title: student.title,
            name: student.name,
            fullName: student.fullName,
            room: '3',
            avatar: ''
        };

        this.state.pretestScore = record.pretestScore !== undefined ? record.pretestScore : null;
        this.state.pretestAnswers = record.pretestAnswers || {};
        this.state.posttestScore = record.posttestScore !== undefined ? record.posttestScore : null;
        this.state.posttestAnswers = record.posttestAnswers || {};
        this.state.completedUnits = record.completedUnits || [];
        this.state.completedLabs = record.completedLabs || [];
        this.state.unlockedBadges = record.unlockedBadges || [];

        // บันทึกเวลาเข้าใช้ล่าสุด
        this.saveCurrentStudentProgress();
    },

    saveCurrentStudentProgress() {
        if (!this.state.student.studentId) return;

        const sid = this.state.student.studentId;
        const allProgress = this.getAllStudentsProgress();

        allProgress[sid] = {
            studentId: sid,
            no: this.state.student.no,
            title: this.state.student.title,
            name: this.state.student.name,
            fullName: this.state.student.fullName,
            room: '3',
            avatar: this.state.student.avatar,
            pretestScore: this.state.pretestScore,
            pretestAnswers: this.state.pretestAnswers,
            posttestScore: this.state.posttestScore,
            posttestAnswers: this.state.posttestAnswers,
            completedUnits: this.state.completedUnits,
            completedLabs: this.state.completedLabs,
            unlockedBadges: this.state.unlockedBadges,
            lastActive: new Date().toISOString()
        };

        try {
            localStorage.setItem("NP_STUDENTS_PROGRESS", JSON.stringify(allProgress));
        } catch (err) {
            console.error("Save progress error:", err);
        }
    },

    getAllStudentsProgress() {
        let data = {};
        try {
            data = JSON.parse(localStorage.getItem("NP_STUDENTS_PROGRESS") || "{}");
        } catch (e) {
            data = {};
        }
        if (typeof DEMO_STUDENTS_PROGRESS !== 'undefined') {
            APP_DATA.studentsM3.forEach(s => {
                const sid = s.studentId;
                if (!data[sid] || data[sid].pretestScore === null || data[sid].pretestScore === undefined || data[sid].posttestScore === null || data[sid].posttestScore === undefined) {
                    if (DEMO_STUDENTS_PROGRESS[sid]) {
                        data[sid] = JSON.parse(JSON.stringify(DEMO_STUDENTS_PROGRESS[sid]));
                    }
                }
            });
            try {
                localStorage.setItem("NP_STUDENTS_PROGRESS", JSON.stringify(data));
            } catch (e) {}
        }
        return data;
    },

    logoutStudent() {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'ออกจากระบบ?',
                text: 'คุณต้องการออกจากระบบการเรียนใช่หรือไม่?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'ออกจากระบบ',
                cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#e11d48',
                cancelButtonColor: '#64748b'
            }).then((res) => {
                if (res.isConfirmed) {
                    this.doLogout();
                }
            });
        } else {
            if (confirm('คุณต้องการออกจากระบบการเรียนหรือไม่?')) {
                this.doLogout();
            }
        }
    },

    doLogout() {
        try {
            localStorage.removeItem('NP_ACTIVE_STUDENT_ID');
            sessionStorage.removeItem('NP_SESSION_LOGGED_IN');
            sessionStorage.removeItem('NP_GUEST_STUDENT');
        } catch(e) {}
        this.state.student = {
            studentId: '',
            no: '',
            title: '',
            name: '',
            fullName: '',
            room: '3',
            avatar: ''
        };
        this.state.pretestScore = null;
        this.state.pretestAnswers = {};
        this.state.posttestScore = null;
        this.state.posttestAnswers = {};
        this.state.completedUnits = [];
        this.state.completedLabs = [];
        this.updateHeaderProfile();
        this.navigateTo('home');
        this.playSound('click');
        const input = document.getElementById('login-student-id');
        if (input) {
            input.value = '';
            input.focus();
        }
        const preview = document.getElementById('login-student-preview');
        if (preview) {
            preview.classList.add('hidden');
            preview.innerHTML = '';
        }
    },

    setAvatar(emoji) {
        // Avatars removed per requirement
    },

    updateHeaderProfile() {
        const nameDisplay = document.getElementById("header-student-name");
        const avatarDisplay = document.getElementById("header-avatar-display");
        const logoutBtn = document.getElementById("header-logout-btn");

        if (this.state.student && this.state.student.studentId) {
            if (nameDisplay) {
                if (this.state.student.studentId === "0000" || this.state.student.isGuest) {
                    nameDisplay.innerText = `${this.state.student.fullName} (ผู้เยี่ยมชม / Guest)`;
                } else {
                    nameDisplay.innerText = `${this.state.student.fullName} (ม.3 เลขที่ ${this.state.student.no})`;
                }
            }
            if (avatarDisplay) avatarDisplay.innerHTML = '<i class="fa-solid fa-circle-user text-blue-600"></i>';
            if (logoutBtn) logoutBtn.classList.remove("hidden");
        } else {
            if (nameDisplay) nameDisplay.innerText = "ยังไม่ได้เข้าสู่ระบบ";
            if (avatarDisplay) avatarDisplay.innerHTML = '<i class="fa-solid fa-user-lock text-slate-400"></i>';
            if (logoutBtn) logoutBtn.classList.add("hidden");
        }
    },

    // --- การนำทาง (Navigation) ---
    navigateTo(sectionId) {
        // หากยังไม่ล็อกอินและพยายามเข้าหน้าอื่นที่ไม่ใช่ home หรือ dashboard
        if (!this.state.student.studentId && sectionId !== 'home' && sectionId !== 'dashboard') {
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'กรุณาเข้าสู่ระบบ',
                text: 'กรุณาเข้าสู่ระบบด้วยเลขประจำตัวนักเรียนก่อนนะครับ',
                confirmButtonColor: '#1e3a8a'
            });
        } else {
            alert("กรุณาเข้าสู่ระบบด้วยเลขประจำตัวนักเรียนก่อนนะครับ");
        }
            this.navigateTo('home');
            return;
        }

        this.playSound('click');
        if (sectionId === 'cert') sectionId = 'results';
        this.state.currentSection = sectionId;

        document.querySelectorAll(".app-section").forEach(s => s.classList.add("hidden"));

        const target = document.getElementById(`section-${sectionId}`) || (sectionId === 'results' ? document.getElementById('section-cert') : null);
        if (target) {
            target.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        this.updateStepIndicator(sectionId);

        if (sectionId === 'pretest') {
            this.renderQuiz('pretest');
        } else if (sectionId === 'posttest') {
            this.renderQuiz('posttest');
        } else if (sectionId === 'labs') {
            this.switchLabTab('phishing');
        } else if (sectionId === 'results') {
            this.renderResults();
        } else if (sectionId === 'dashboard') {
            this.renderClassProgressDashboard();
        }
    },

    updateStepIndicator(sectionId) {
        const steps = ['home', 'pretest', 'units', 'labs', 'posttest', 'results', 'dashboard'];
        steps.forEach((step, idx) => {
            const el = document.getElementById(`step-nav-${step}`);
            if (!el) return;

            const currentIdx = steps.indexOf(sectionId);
            if (step === sectionId) {
                el.className = "step-pill active";
            } else if (idx < currentIdx && step !== 'dashboard') {
                el.className = "step-pill completed";
            } else {
                el.className = "step-pill pending";
            }
        });
    },

    // --- แบบทดสอบ (Pre-test / Post-test) ---
    renderQuiz(type) {
        const isPre = type === 'pretest';
        const container = document.getElementById(`${type}-quiz-container`);
        if (!container) return;

        const questions = APP_DATA.quizQuestions;
        const savedScore = isPre ? this.state.pretestScore : this.state.posttestScore;

        if (savedScore !== null) {
            container.innerHTML = this.renderQuizSummaryCard(type, savedScore, questions.length);
            return;
        }

        let html = `
            <div class="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div class="p-6 bg-gradient-to-r ${isPre ? 'from-blue-600 to-cyan-600' : 'from-emerald-600 to-teal-600'} text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-xs uppercase tracking-wider font-semibold opacity-90">โรงเรียนบ้านน้ำพร • ชั้นมัธยมศึกษาปีที่ 3</span>
                            <h2 class="text-xl md:text-2xl font-bold mt-1">
                                <i class="fa-solid ${isPre ? 'fa-clipboard-question' : 'fa-graduation-cap'} mr-2"></i>
                                ${isPre ? 'แบบทดสอบก่อนเรียน (Pre-test)' : 'แบบทดสอบหลังเรียน (Post-test)'}
                            </h2>
                        </div>
                        <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                            จำนวน 10 ข้อ • 10 คะแนน
                        </span>
                    </div>
                    <p class="text-xs text-white/80 mt-2">
                        ผู้เข้าสอบ: <strong>${this.state.student.fullName} (เลขที่ ${this.state.student.no})</strong>
                    </p>
                </div>

                <form id="${type}-form" onsubmit="App.submitQuiz(event, '${type}')" class="p-6 space-y-6">
        `;

        questions.forEach((q, idx) => {
            html += `
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div class="flex items-start gap-2.5 font-bold text-slate-800 text-sm mb-3">
                        <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center shrink-0 mt-0.5">
                            ${idx + 1}
                        </span>
                        <span class="leading-relaxed">${q.question}</span>
                    </div>

                    <div class="space-y-2 pl-8">
                        ${q.options.map((opt, optIdx) => `
                            <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition text-xs text-slate-700">
                                <input type="radio" name="q_${type}_${idx}" value="${optIdx}" required class="w-4 h-4 text-blue-600 focus:ring-blue-500">
                                <span class="leading-relaxed">${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        html += `
                    <div class="pt-4 flex justify-between items-center border-t border-slate-200">
                        <span class="text-xs text-slate-500">ตอบให้ครบทั้ง 10 ข้อแล้วกดส่งคำตอบ</span>
                        <button type="submit" class="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-blue-500/25 transition flex items-center gap-2">
                            <i class="fa-solid fa-paper-plane"></i> ส่งคำตอบและตรวจคะแนน
                        </button>
                    </div>
                </form>
            </div>
        `;

        container.innerHTML = html;
    },

    submitQuiz(e, type) {
        if (e) e.preventDefault();
        const isPre = type === 'pretest';
        const questions = APP_DATA.quizQuestions;
        let score = 0;
        const userAnswers = {};

        const form = document.getElementById(`${type}-form`);
        if (!form) return;

        const formData = new FormData(form);

        questions.forEach((q, idx) => {
            const answer = formData.get(`q_${type}_${idx}`);
            const selectedIdx = answer !== null ? parseInt(answer, 10) : -1;
            userAnswers[idx] = selectedIdx;

            if (selectedIdx === q.correct) {
                score++;
            }
        });

        if (isPre) {
            this.state.pretestScore = score;
            this.state.pretestAnswers = userAnswers;
            this.unlockBadge('starter', 'ก้าวแรกสู่นักท่องเน็ตปลอดภัย');
        } else {
            this.state.posttestScore = score;
            this.state.posttestAnswers = userAnswers;
            this.unlockBadge('graduate', 'ผู้สำเร็จการฝึกอบรมดิจิทัล ม.3');
        }

        this.saveCurrentStudentProgress();
        this.playSound('fanfare');

        if (isPre) {
            this.renderQuiz(type);
        } else {
            this.navigateTo('results');
        }
    },

    renderQuizSummaryCard(type, score, total) {
        const isPre = type === 'pretest';
        const percent = Math.round((score / total) * 100);

        return `
            <div class="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-center p-8">
                <div class="w-20 h-20 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl mb-4">
                    <i class="fa-solid ${score >= 7 ? 'fa-trophy text-amber-500' : 'fa-clipboard-check'}"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-1">
                    ผลคะแนน${isPre ? 'ก่อนเรียน (Pre-test)' : 'หลังเรียน (Post-test)'}
                </h3>
                <p class="text-xs text-slate-500 mb-6">${this.state.student.fullName} • ม.3 เลขที่ ${this.state.student.no}</p>

                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-sm mx-auto mb-6">
                    <div class="text-5xl font-extrabold text-blue-600 mb-1">${score} <span class="text-2xl text-slate-400 font-normal">/ ${total}</span></div>
                    <div class="text-sm font-semibold text-slate-600">คิดเป็นร้อยละ ${percent}%</div>
                </div>

                <div class="flex gap-3 justify-center">
                    <button onclick="App.retakeQuiz('${type}')" class="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition">
                        <i class="fa-solid fa-rotate-left mr-1"></i> ทำใหม่
                    </button>
                    ${isPre ? `
                        <button onclick="App.navigateTo('units')" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition">
                            เข้าสู่บทเรียน 4 หน่วย <i class="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    ` : `
                        <button onclick="App.navigateTo('results')" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition">
                            ดูสรุปผล & เกียรติบัตร <i class="fa-solid fa-award ml-1"></i>
                        </button>
                    `}
                </div>
            </div>
        `;
    },

    retakeQuiz(type) {
        if (confirm("ต้องการทำแบบทดสอบใหม่อีกครั้งใช่หรือไม่?")) {
            if (type === 'pretest') {
                this.state.pretestScore = null;
                this.state.pretestAnswers = {};
            } else {
                this.state.posttestScore = null;
                this.state.posttestAnswers = {};
            }
            this.saveCurrentStudentProgress();
            this.navigateTo(type);
            this.renderQuiz(type);
        }
    },

    // --- บทเรียน (Units) ---
    renderUnitsList() {
        const container = document.getElementById("units-grid-container");
        if (!container) return;

        const units = APP_DATA.units;
        let html = '';

        units.forEach(u => {
            const isCompleted = this.state.completedUnits.includes(u.id);
            html += `
                <div class="bg-white rounded-3xl shadow-md hover:shadow-xl border border-slate-200 transition-all overflow-hidden flex flex-col justify-between">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="w-12 h-12 rounded-2xl bg-${u.color}-50 text-${u.color}-600 flex items-center justify-center text-xl shadow-sm">
                                <i class="fa-solid ${u.icon}"></i>
                            </span>
                            <span class="text-xs px-2.5 py-1 rounded-full font-bold ${isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
                                ${isCompleted ? '<i class="fa-solid fa-check mr-1"></i> จบแล้ว' : '<i class="fa-regular fa-clock mr-1"></i> ' + u.readTime}
                            </span>
                        </div>
                        <h3 class="font-bold text-slate-900 text-lg mb-1 leading-snug">${u.title}</h3>
                        <p class="text-xs text-slate-400 font-mono mb-3">${u.subtitle}</p>
                        <p class="text-xs text-slate-600 leading-relaxed">${u.summary}</p>
                    </div>

                    <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-[11px] text-slate-500 font-medium">4 หัวข้อย่อย + Mini Quiz</span>
                        <button onclick="App.openUnit(${u.id})" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5">
                            เริ่มเรียน <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    openUnit(unitId) {
        const unit = APP_DATA.units.find(u => u.id === unitId);
        if (!unit) return;

        this.state.currentUnitId = unitId;
        this.playSound('click');

        const title = document.getElementById("unit-detail-title");
        const subtitle = document.getElementById("unit-detail-subtitle");
        const content = document.getElementById("unit-detail-topics");
        const quizContainer = document.getElementById("unit-mini-quiz-container");

        if (title) title.innerText = unit.title;
        if (subtitle) subtitle.innerText = unit.subtitle;

        if (content) {
            content.innerHTML = unit.topics.map((t, idx) => `
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h4 class="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">${idx + 1}</span>
                        ${t.title}
                    </h4>
                    <div class="text-xs text-slate-700 leading-relaxed space-y-2">
                        ${t.content}
                    </div>
                </div>
            `).join('');
        }

        if (quizContainer) {
            this.renderMiniQuiz(unit);
        }

        document.querySelectorAll(".app-section").forEach(s => s.classList.add("hidden"));
        const target = document.getElementById("section-unit-detail");
        if (target) target.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderMiniQuiz(unit) {
        const container = document.getElementById("unit-mini-quiz-container");
        if (!container) return;

        let html = `
            <div class="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 mt-6">
                <div class="flex items-center gap-2 font-bold text-indigo-900 text-base mb-4">
                    <i class="fa-solid fa-vial-circle-check text-indigo-600 text-xl"></i>
                    Mini-Quiz ทบทวนความรู้ประจำหน่วย (3 ข้อ)
                </div>
                <div class="space-y-4">
        `;

        unit.miniQuiz.forEach((q, qIdx) => {
            html += `
                <div class="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm" id="mini-q-${qIdx}">
                    <div class="font-bold text-slate-800 text-xs mb-2">ข้อที่ ${qIdx + 1}: ${q.q}</div>
                    <div class="space-y-1.5">
                        ${q.options.map((opt, optIdx) => `
                            <button onclick="App.checkMiniQuizAnswer(${unit.id}, ${qIdx}, ${optIdx})" class="mini-opt-btn w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-xs text-slate-700 transition flex items-center gap-2">
                                <span class="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center font-bold">${optIdx + 1}</span>
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div id="mini-feedback-${qIdx}" class="hidden mt-2 text-xs p-2 rounded-lg"></div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="mt-6 flex justify-between items-center">
                    <button onclick="App.navigateTo('units')" class="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-white transition">
                        <i class="fa-solid fa-arrow-left mr-1"></i> กลับหน้ารวมบทเรียน
                    </button>
                    <button onclick="App.completeCurrentUnit(${unit.id})" id="btn-complete-unit" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-check"></i> ทำเครื่องหมายว่าเรียนจบหน่วยนี้
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    checkMiniQuizAnswer(unitId, qIdx, optIdx) {
        const unit = APP_DATA.units.find(u => u.id === unitId);
        if (!unit) return;

        const q = unit.miniQuiz[qIdx];
        const isCorrect = optIdx === q.ans;
        const feedbackEl = document.getElementById(`mini-feedback-${qIdx}`);

        if (isCorrect) {
            this.playSound('success');
            if (feedbackEl) {
                feedbackEl.className = "mt-2 text-xs p-2 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 block";
                feedbackEl.innerHTML = `<strong>✅ ถูกต้อง!</strong> ${q.exp}`;
            }
        } else {
            this.playSound('error');
            if (feedbackEl) {
                feedbackEl.className = "mt-2 text-xs p-2 rounded-lg bg-rose-100 text-rose-900 border border-rose-300 block";
                feedbackEl.innerHTML = `<strong>❌ ยังไม่ถูกต้อง</strong> ${q.exp}`;
            }
        }
    },

    completeCurrentUnit(unitId) {
        if (!this.state.completedUnits.includes(unitId)) {
            this.state.completedUnits.push(unitId);
        }

        this.playSound('fanfare');
        this.saveCurrentStudentProgress();
        this.renderUnitsList();
        this.renderClassProgressDashboard();

        if (this.state.completedUnits.length === APP_DATA.units.length) {
            this.unlockBadge('scholar', 'ผู้เชี่ยวชาญ 4 มิติดิจิทัล');
            alert("ยินดีด้วย! คุณเรียนครบทั้ง 4 หน่วยแล้ว ขอเชิญเข้าสู่ห้องปฏิบัติการจำลอง (Labs) เพื่อฝึกทักษะจริงครับ");
            this.navigateTo('labs');
        } else {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    text: 'บันทึกการเรียนหน่วยนี้เรียบร้อยแล้ว!',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                alert("บันทึกการเรียนหน่วยนี้เรียบร้อยแล้ว!");
            }
            this.navigateTo('units');
        }
    },

    // --- แท็บในห้องแล็บจำลอง ---
    switchLabTab(tabName) {
        this.playSound('click');
        const tabs = ['phishing', 'password', 'fact', 'scenario'];
        tabs.forEach(t => {
            const btn = document.getElementById(`lab-tab-btn-${t}`);
            const content = document.getElementById(`lab-tab-content-${t}`);
            if (btn) btn.className = t === tabName ? "lab-tab-btn active" : "lab-tab-btn inactive";
            if (content) content.classList.toggle("hidden", t !== tabName);
        });

        if (tabName === 'phishing') Simulations.phishing.init();
        if (tabName === 'password') Simulations.password.init();
        if (tabName === 'fact') Simulations.factCheck.init();
        if (tabName === 'scenario') Simulations.scenario.init();
    },

    unlockBadge(badgeId, badgeName) {
        if (this.state.unlockedBadges.includes(badgeId)) return;
        this.state.unlockedBadges.push(badgeId);
        this.saveCurrentStudentProgress();

        const toast = document.createElement("div");
        toast.className = "fixed bottom-5 right-5 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-3 animate-bounce";
        toast.innerHTML = `
            <div class="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-medal"></i>
            </div>
            <div>
                <div class="text-[10px] text-amber-300 font-bold uppercase tracking-wider">ปลดล็อกเหรียญตราใหม่!</div>
                <div class="text-xs font-bold">${badgeName}</div>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    },

    // --- ผลการเรียน & เกียรติบัตร ---
    renderCertificate() {
        this.renderResults();
    },

    downloadCertificate() {
        if (typeof Certificate !== 'undefined' && Certificate.downloadPNG) {
            Certificate.downloadPNG();
        }
    },

    printCertificate() {
        if (typeof Certificate !== 'undefined' && Certificate.printCertificate) {
            Certificate.printCertificate();
        } else {
            window.print();
        }
    },

    renderResults() {
        const pre = this.state.pretestScore || 0;
        const post = this.state.posttestScore || 0;
        const total = APP_DATA.quizQuestions.length;
        const gain = post - pre;

        const preEl = document.getElementById("res-pre-score");
        const postEl = document.getElementById("res-post-score");
        const gainEl = document.getElementById("res-gain-score");
        const gainText = document.getElementById("res-gain-text");

        if (preEl) preEl.innerText = `${pre} / ${total}`;
        if (postEl) postEl.innerText = `${post} / ${total}`;
        if (gainEl) {
            gainEl.innerText = `${gain >= 0 ? '+' : ''}${gain}`;
            gainEl.className = `text-3xl font-extrabold ${gain > 0 ? 'text-emerald-500' : 'text-slate-600'}`;
        }
        if (gainText) {
            if (gain > 0) {
                gainText.innerText = `มีพัฒนาการเพิ่มขึ้น ${Math.round((gain / total) * 100)}% ยอดเยี่ยมมาก!`;
            } else if (gain === 0) {
                gainText.innerText = "คะแนนเท่าเดิม ทบทวนบทเรียนเพิ่มเติมเพื่อคะแนนที่สูงขึ้นได้ครับ";
            } else {
                gainText.innerText = "สามารถกดทำแบบทดสอบใหม่เพื่อพัฒนาคะแนนได้ตลอดเวลาครับ";
            }
        }

        Certificate.render();
    },

    // =========================================================================
    // --- DASHBOARD ติดตามความก้าวหน้าทั้งชั้นเรียน ม.3 (21 คน) ---
    // =========================================================================
    renderClassProgressDashboard() {
        const grid = document.getElementById("dash-student-grid");
        const tbody = document.getElementById("dash-matrix-tbody");
        if (!grid && !tbody) return;

        const allProgress = this.getAllStudentsProgress();
        const students = APP_DATA.studentsM3;

        // คำนวณสถิติรวมของชั้นเรียน
        let startedCount = 0;
        let completedCount = 0;
        let totalPre = 0;
        let preCount = 0;
        let totalPost = 0;
        let postCount = 0;
        let totalGain = 0;
        let gainCount = 0;

        const studentRows = students.map(s => {
            const p = allProgress[s.studentId] || {};
            const hasPre = p.pretestScore !== undefined && p.pretestScore !== null;
            const hasPost = p.posttestScore !== undefined && p.posttestScore !== null;
            const unitsDone = (p.completedUnits || []).length;
            const labsDone = (p.completedLabs || []).length;
            const gain = (hasPre && hasPost) ? (p.posttestScore - p.pretestScore) : null;

            let status = 'not_started';
            if (hasPost) {
                status = 'completed';
                completedCount++;
            } else if (hasPre || unitsDone > 0) {
                status = 'in_progress';
                startedCount++;
            }

            if (hasPre) {
                totalPre += p.pretestScore;
                preCount++;
            }
            if (hasPost) {
                totalPost += p.posttestScore;
                postCount++;
            }
            if (gain !== null) {
                totalGain += gain;
                gainCount++;
            }

            return {
                student: s,
                progress: p,
                status,
                hasPre,
                hasPost,
                preScore: hasPre ? p.pretestScore : '-',
                postScore: hasPost ? p.posttestScore : '-',
                unitsDone,
                labsDone,
                gain: gain !== null ? gain : '-',
                lastActive: p.lastActive ? new Date(p.lastActive).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'
            };
        });

        // อัปเดตการ์ด KPI สรุปภาพรวม
        const elTotal = document.getElementById("dash-kpi-total");
        const elActive = document.getElementById("dash-kpi-active");
        const elCompleted = document.getElementById("dash-kpi-completed");
        const elAvgPre = document.getElementById("dash-kpi-avg-pre");
        const elAvgPost = document.getElementById("dash-kpi-avg-post");
        const elAvgGain = document.getElementById("dash-kpi-avg-gain");

        if (elTotal) elTotal.innerText = `${students.length} คน`;
        if (elActive) elActive.innerText = `${startedCount + completedCount} / ${students.length} (${Math.round(((startedCount + completedCount) / students.length) * 100)}%)`;
        if (elCompleted) elCompleted.innerText = `${completedCount} คน (${Math.round((completedCount / students.length) * 100)}%)`;
        if (elAvgPre) elAvgPre.innerText = preCount > 0 ? (totalPre / preCount).toFixed(1) : '-';
        if (elAvgPost) elAvgPost.innerText = postCount > 0 ? (totalPost / postCount).toFixed(1) : '-';
        if (elAvgGain) elAvgGain.innerText = gainCount > 0 ? `+${(totalGain / gainCount).toFixed(1)}` : '-';

        // กรองตามฟิลเตอร์และคำค้น
        const filtered = studentRows.filter(row => {
            if (this.currentFilter !== 'all' && row.status !== this.currentFilter) {
                return false;
            }
            if (this.searchQuery) {
                const q = this.searchQuery.toLowerCase();
                const matchName = row.student.fullName.toLowerCase().includes(q);
                const matchId = row.student.studentId.includes(q);
                const matchNo = String(row.student.no).includes(q);
                return matchName || matchId || matchNo;
            }
            return true;
        });

        // Grid and tbody already declared above

        if (filtered.length === 0) {
            const emptyMsg = '<div class="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</div>';
            if (grid) grid.innerHTML = emptyMsg;
            if (tbody) tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-slate-400 text-xs">ไม่พบข้อมูล</td></tr>';
            return;
        }

        let cardsHtml = '';
        let tableRowsHtml = '';

        filtered.forEach(r => {
            const isCurrentStudent = r.student.studentId === this.state.student.studentId;
            const isPassed = (typeof r.postScore === 'number' && r.postScore >= 7) || (r.status === 'completed');

            let statusBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">ยังไม่เริ่ม</span>';
            if (r.status === 'completed') {
                statusBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap inline-flex items-center gap-1">✅ สำเร็จหลักสูตร</span>';
            } else if (r.status === 'in_progress') {
                statusBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 whitespace-nowrap inline-flex items-center gap-1">⏳ กำลังศึกษา</span>';
            }

            // Card Layout
            cardsHtml += `
                <div class="bg-white rounded-2xl p-5 border ${isPassed ? 'border-blue-200 shadow-sm' : 'border-slate-200'} flex flex-col justify-between transition hover:shadow-md relative overflow-hidden">
                    <div>
                        <!-- Top Header: No, ID, Status -->
                        <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center">${r.student.no}</span>
                                <span class="text-xs font-mono font-bold text-blue-800">รหัส ${r.student.studentId}</span>
                            </div>
                            <div class="shrink-0">
                                ${statusBadge}
                            </div>
                        </div>

                        <!-- Student Name -->
                        <div class="pt-3 pb-2">
                            <div class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <span>${r.student.fullName}</span>
                                ${isCurrentStudent ? '<span class="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">ฉัน</span>' : ''}
                            </div>
                            <div class="text-[11px] text-slate-400 mt-0.5">นักเรียนชั้น ม.3 โรงเรียนบ้านน้ำพร</div>
                        </div>

                        <!-- Score Metrics: Pre, Post, Gain -->
                        <div class="grid grid-cols-3 gap-1.5 py-2.5 bg-slate-50 rounded-xl px-2 my-2 border border-slate-100 text-center">
                            <div>
                                <div class="text-[10px] text-slate-400 font-medium">ก่อนเรียน</div>
                                <div class="font-mono font-bold text-xs ${r.preScore !== '-' ? 'text-blue-700' : 'text-slate-400'} mt-0.5">
                                    ${r.preScore !== '-' ? r.preScore + '/10' : '-'}
                                </div>
                            </div>
                            <div>
                                <div class="text-[10px] text-slate-400 font-medium">หลังเรียน</div>
                                <div class="font-mono font-bold text-xs ${r.postScore !== '-' ? 'text-emerald-700' : 'text-slate-400'} mt-0.5">
                                    ${r.postScore !== '-' ? r.postScore + '/10' : '-'}
                                </div>
                            </div>
                            <div>
                                <div class="text-[10px] text-slate-400 font-medium">พัฒนาการ</div>
                                <div class="font-mono font-bold text-xs ${typeof r.gain === 'number' && r.gain > 0 ? 'text-amber-600' : 'text-slate-400'} mt-0.5">
                                    ${typeof r.gain === 'number' && r.gain > 0 ? '+' + r.gain : r.gain}
                                </div>
                            </div>
                        </div>

                        <!-- Lesson Progress Bar -->
                        <div class="py-1">
                            <div class="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
                                <span>ความคืบหน้าบทเรียน:</span>
                                <span class="font-bold text-slate-700">${r.unitsDone}/4</span>
                            </div>
                            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                                <div class="bg-blue-600 h-full transition-all duration-300" style="width: ${(r.unitsDone / 4) * 100}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Button: ดู/ดาวน์โหลดประกาศนียบัตร -->
                    <div class="pt-4 mt-2 border-t border-slate-100">
                        ${isPassed ? `
                            <button onclick="App.showStudentCertModal('${r.student.studentId}')" class="w-full py-2.5 px-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition duration-200">
                                <i class="fa-solid fa-award text-amber-300"></i>
                                <span>ดู/ดาวน์โหลดประกาศนียบัตร</span>
                            </button>
                        ` : `
                            <div class="py-2 text-center text-[11px] text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
                                <i class="fa-solid fa-lock text-[10px] mr-1"></i> ยังไม่ผ่านเกณฑ์ (ต้องได้ >= 7 คะแนน)
                            </div>
                        `}
                    </div>
                </div>
            `;
        });

        if (grid) grid.innerHTML = cardsHtml;
        if (tbody) tbody.innerHTML = tableRowsHtml;
    },

    setDashboardFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll(".dash-filter-btn").forEach(btn => {
            const isActive = btn.dataset.filter === filter;
            btn.className = isActive ? "dash-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition" : "dash-filter-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition";
        });
        this.renderClassProgressDashboard();
    },

    
    renderDashboard() {
        this.renderClassProgressDashboard();
    },

    showStudentCertModal(studentId) {
        const student = APP_DATA.studentsM3.find(s => s.studentId === studentId);
        if (!student) return;
        const allProgress = this.getAllStudentsProgress();
        const p = allProgress[studentId] || {};
        const score = (p.posttestScore !== undefined && p.posttestScore !== null) ? p.posttestScore : 8;

        if (typeof Certificate !== 'undefined' && Certificate.renderCertificate) {
            Certificate.renderCertificate(student, score, 10);
        }

        const certImg = (Certificate && Certificate.canvas) ? Certificate.canvas.toDataURL("image/png") : "";

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: `ประกาศนียบัตร: ${student.fullName}`,
                html: `
                    <p class="text-xs text-slate-500 mb-2">
                        รหัสประจำตัว: <strong>${student.studentId}</strong> • คะแนนหลังเรียน: <strong class="text-blue-700">${score}/10</strong>
                    </p>
                    <div class="border rounded-2xl overflow-hidden shadow-inner bg-slate-50 p-2 mb-3">
                        <img src="${certImg}" class="w-full rounded-xl shadow" alt="ประกาศนียบัตร">
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: '<i class="fa-solid fa-download mr-1"></i> ดาวน์โหลด PNG (1200x850)',
                cancelButtonText: 'ปิด',
                confirmButtonColor: '#1e3a8a',
                width: '850px'
            }).then((res) => {
                if (res.isConfirmed && typeof Certificate !== 'undefined' && Certificate.downloadPNG) {
                    Certificate.downloadPNG(student, score, 10);
                }
            });
        }
    },

    loadDemoProgress() {
        if (typeof DEMO_STUDENTS_PROGRESS !== 'undefined') {
            localStorage.setItem("NP_STUDENTS_PROGRESS", JSON.stringify(DEMO_STUDENTS_PROGRESS));
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'อัปเดตข้อมูลสำเร็จ',
                    text: 'อัปเดตข้อมูลคะแนนนักเรียนทั้ง 20 คนเรียบร้อยแล้ว!',
                    confirmButtonColor: '#1e3a8a'
                });
            } else {
                alert('อัปเดตข้อมูลคะแนนนักเรียนทั้ง 20 คนเรียบร้อยแล้ว!');
            }
            this.renderClassProgressDashboard();
        }
    },

    resetClassProgress() {
        localStorage.removeItem("NP_STUDENTS_PROGRESS");
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'ล้างข้อมูลคะแนนและโหลดคะแนนมาตรฐานเรียบร้อยแล้ว',
                timer: 1500,
                showConfirmButton: false
            });
        }
        this.renderClassProgressDashboard();
    },

    onDashboardSearch(query) {
        this.searchQuery = query;
        this.renderClassProgressDashboard();
    },

    exportClassProgressCSV() {
        const allProgress = this.getAllStudentsProgress();
        const students = APP_DATA.studentsM3;

        let csv = "\uFEFFเลขที่,เลขประจำตัว,คำนำหน้า,ชื่อ,นามสกุล,สถานะ,ก่อนเรียน (10),บทเรียน (4),หลังเรียน (10),พัฒนาการ,ใช้งานล่าสุด\n";

        students.forEach(s => {
            const p = allProgress[s.studentId] || {};
            const hasPre = p.pretestScore !== undefined && p.pretestScore !== null;
            const hasPost = p.posttestScore !== undefined && p.posttestScore !== null;
            const unitsDone = (p.completedUnits || []).length;
            const gain = (hasPre && hasPost) ? (p.posttestScore - p.pretestScore) : '-';

            let status = 'ยังไม่เริ่ม';
            if (hasPost) status = 'สำเร็จหลักสูตร';
            else if (hasPre || unitsDone > 0) status = 'กำลังศึกษา';

            const nameParts = s.name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            const lastActive = p.lastActive ? new Date(p.lastActive).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

            csv += `${s.no},"${s.studentId}","${s.title}","${firstName}","${lastName}","${status}",${hasPre ? p.pretestScore : '-'},${unitsDone},${hasPost ? p.posttestScore : '-'},${gain},"${lastActive}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `ความก้าวหน้านักเรียน_ม3_โรงเรียนบ้านน้ำพร_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // --- โหมดครูผู้สอน ---
    openTeacherMode() {
        const pass = prompt("กรุณากรอกรหัสผ่านสำหรับคุณครูผู้สอน:");
        if (pass === "42010113") {
            this.playSound('click');
            this.navigateTo('dashboard');
        } else if (pass !== null) {
            Swal.fire({ icon: "error", title: "รหัสผ่านไม่ถูกต้อง", text: "รหัสผ่านไม่ถูกต้อง" });
            this.playSound('error');
        }
    },

    initEventListeners() {
        // Live search on dashboard
        const searchInput = document.getElementById("dash-search-input");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => this.onDashboardSearch(e.target.value));
        }

        // Student ID input live recognition
        const loginInput = document.getElementById("login-student-id");
        if (loginInput) {
            loginInput.addEventListener("input", (e) => this.onStudentIdInput(e.target.value));
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
