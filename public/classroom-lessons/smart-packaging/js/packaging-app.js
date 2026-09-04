/**
 * packaging-app.js
 * แอปพลิเคชันควบคุมหลัก (Application Controller)
 * โครงการพัฒนาทักษะนวัตกรอาชีพดิจิทัล (Digital Career Innovator)
 * ผ่านการสร้างสรรค์บรรจุภัณฑ์อัจฉริยะ (Smart Packaging) ด้วยเทคโนโลยี NFC Tag
 * โรงเรียนบ้านน้ำพร สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1
 */

const PackagingApp = {
    state: {
        student: null,
        progress: null,
        soundEnabled: true,
        activeSection: 'home',
        activeLab: 'writer',
        teacherUnlocked: false,
        audioCtx: null
    },


    // =========================================================================
    // On-page Student Login Controls (Section 1 Card)
    // =========================================================================
    populateStudentDropdown() {
        // ผูก Event ให้กล่องค้นหาเลขประจำตัว (ID-only login)
        const input = document.getElementById('login-student-id');
        if (input) {
            if (this.state.student) {
                input.value = this.state.student.studentId;
                this.onStudentIdInput(this.state.student.studentId);
            }
            input.addEventListener('input', (e) => this.onStudentIdInput(e.target.value.trim()));
        }
    },

    onStudentSelectChange(val) {
        if (!val) return;
        const input = document.getElementById('login-student-id');
        if (input) input.value = val;
        this.onStudentIdInput(val);
    },

    onStudentIdInput(val) {
        const preview = document.getElementById('login-student-preview');
        const submitBtn = document.getElementById('btn-login-submit');
        if (!preview) return;

        if (val === '0000') {
            preview.classList.remove('hidden');
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
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">โหมดทดลองใช้</span>
                    </div>
                </div>
            `;
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        const found = PACKAGING_DATA.studentsM3.find(s => s.studentId === val);
        if (found) {
            const allProgress = this.getAllStudentsProgress();
            const studentRecord = allProgress[found.studentId] || {};
            const isCompleted = studentRecord.posttestScore !== null && studentRecord.posttestScore !== undefined;
            const hasStarted = studentRecord.pretestScore !== null && studentRecord.pretestScore !== undefined;

            let statusBadge = '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">ยังไม่เริ่มเรียน</span>';
            if (isCompleted) {
                statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">🎉 เรียนจบแล้ว (${studentRecord.posttestScore}/10)</span>`;
            } else if (hasStarted) {
                statusBadge = `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">กำลังศึกษา (Pre-test: ${studentRecord.pretestScore}/10)</span>`;
            }

            preview.classList.remove('hidden');
            preview.innerHTML = `
                <div class="p-3.5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-400 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-2xl bg-white text-emerald-700 flex items-center justify-center text-xl font-bold border border-emerald-200 shadow-sm">
                            <i class="fa-solid fa-user-graduate text-lg text-emerald-600"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-900 text-xs sm:text-sm">${found.fullName}</span>
                                <span class="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-md font-semibold">เลขที่ ${found.no}</span>
                            </div>
                            <div class="text-[11px] text-slate-500 mt-0.5">ชั้นมัธยมศึกษาปีที่ 3 • รหัส: ${found.studentId}</div>
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
                preview.classList.remove('hidden');
                preview.innerHTML = `
                    <div class="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-rose-500 text-base"></i>
                        <span>ไม่พบเลขประจำตัว <strong>${val}</strong> ในบัญชีรายชื่อ ม.3 โรงเรียนบ้านน้ำพร</span>
                    </div>
                `;
            } else {
                preview.classList.add('hidden');
            }
        }
    },

    setAvatar(avatar) {
        // Avatars removed per requirement
    },

    // --- ระบบผู้เยี่ยมชม (Guest Login 0000) ---
    openGuestNameModal() {
        const modal = document.getElementById('guest-name-modal');
        const input = document.getElementById('guest-name-input');
        if (modal) modal.classList.remove('hidden');
        if (input) {
            input.value = '';
            input.focus();
        }
    },

    closeGuestNameModal() {
        const modal = document.getElementById('guest-name-modal');
        if (modal) modal.classList.add('hidden');
    },

    submitGuestLogin(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('guest-name-input');
        const rawName = input ? input.value.trim() : '';
        if (!rawName || rawName.length < 2) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรุณากรอกชื่อ-นามสกุล',
                    text: 'กรุณากรอกชื่อ-นามสกุลของคุณสำหรับการทดลองใช้งานครับ',
                    confirmButtonColor: '#065f46'
                });
            } else {
                alert('กรุณากรอกชื่อ-นามสกุลของคุณสำหรับการทดลองใช้งานครับ');
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
            sessionStorage.setItem('PKG_SESSION_LOGGED_IN', 'true');
            sessionStorage.setItem('PKG_GUEST_STUDENT', JSON.stringify(guestStudent));
            localStorage.setItem('PKG_ACTIVE_STUDENT_ID', '0000');
        } catch (err) {}

        this.state.student = guestStudent;
        this.state.progress = {
            studentId: "0000",
            no: "แขก",
            title: "",
            name: rawName,
            fullName: rawName,
            room: "3 (Guest)",
            avatar: "",
            pretestScore: null,
            posttestScore: null,
            completedUnits: [],
            completedLabs: [],
            unlockedBadges: [],
            lastActive: new Date().toISOString()
        };

        this.closeGuestNameModal();
        this.updateHeaderProfile();
        this.updatePills();
        this.playSound('success');
        this.navigateTo('pretest');
    },

    loginWithStudentId(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('login-student-id');
        const sid = input ? input.value.trim() : '';

        if (sid === '0000') {
            this.openGuestNameModal();
            return;
        }

        const s = PACKAGING_DATA.studentsM3.find(x => x.studentId === sid);
        if (!s) {
            if (typeof Swal !== 'undefined') { Swal.fire({ icon: 'error', title: 'ไม่พบรหัสนักเรียน', text: 'กรุณากรอกเลขประจำตัวนักเรียน 4 หลักให้ถูกต้อง หรือรหัส 0000 สำหรับผู้เยี่ยมชม', confirmButtonText: 'ตกลง', confirmButtonColor: '#065f46' }); } else { alert('กรุณากรอกเลขประจำตัวนักเรียนชั้น ม.3 ให้ถูกต้องครับ'); }
            if (input) input.focus();
            return;
        }

        this.loginStudent(s.studentId);
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'เข้าสู่ระบบสำเร็จ',
                text: `ยินดีต้อนรับ ${s.fullName} (เลขที่ ${s.no})`,
                timer: 1500,
                showConfirmButton: false
            });
        }
        if (this.state.progress.pretestScore === null) {
            this.navigateTo('pretest');
        } else if (this.state.progress.posttestScore !== null) {
            this.navigateTo('cert');
        } else {
            this.navigateTo('units');
        }
    },

    
    showStudentCertModal(studentId) {
        const student = (typeof PACKAGING_DATA !== 'undefined' && PACKAGING_DATA.studentsM3)
            ? PACKAGING_DATA.studentsM3.find(s => s.studentId === studentId)
            : null;
        if (!student) return;
        const allProgress = this.getAllStudentsProgress();
        const p = allProgress[studentId] || {};
        const score = (p.posttestScore !== undefined && p.posttestScore !== null) ? p.posttestScore : 8;

        if (typeof PackagingCert !== 'undefined') {
            if (PackagingCert.renderCertificate) {
                PackagingCert.renderCertificate(student, score, 10);
            } else if (PackagingCert.render) {
                PackagingCert.render(student, score, 10);
            }
        }

        let certImg = "";
        try {
            if (PackagingCert && PackagingCert.canvas) {
                certImg = PackagingCert.canvas.toDataURL("image/png");
            }
        } catch(e) {
            console.warn("Could not get canvas dataURL for modal preview, trying pure vector fallback", e);
            try {
                if (PackagingCert && PackagingCert.drawCanvas) {
                    PackagingCert.drawCanvas(student, score, 10, Math.round((score / 10) * 100), PackagingCert.currentCertCode, true);
                    certImg = PackagingCert.canvas.toDataURL("image/png");
                }
            } catch(e2) {}
        }

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: `ประกาศนียบัตร: ${student.fullName}`,
                html: `
                    <p class="text-xs text-slate-500 mb-2">
                        รหัสประจำตัว: <strong>${student.studentId}</strong> • คะแนนหลังเรียน: <strong class="text-emerald-600 font-mono text-sm">${score}/10</strong> (ผ่านเกณฑ์)
                    </p>
                    <div class="border rounded-2xl overflow-hidden shadow-inner bg-slate-50 p-2 mb-3">
                        ${certImg ? `<img src="${certImg}" class="w-full rounded-xl shadow" alt="ประกาศนียบัตร">` : `<div class="p-8 text-center text-slate-500 font-semibold">พร้อมดาวน์โหลดเกียรติบัตร</div>`}
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: '<i class="fa-solid fa-download mr-1"></i> ดาวน์โหลด PNG (1200x850)',
                cancelButtonText: 'ปิด',
                confirmButtonColor: '#065f46',
                width: '850px'
            }).then((res) => {
                if (res.isConfirmed && typeof PackagingCert !== 'undefined') {
                    if (PackagingCert.downloadPNG) {
                        PackagingCert.downloadPNG(student, score, 10);
                    } else if (PackagingCert.downloadCertificate) {
                        PackagingCert.downloadCertificate(student, score, 10);
                    }
                }
            });
        } else {
            this.state.student = student;
            if (!this.state.progress) this.state.progress = {};
            this.state.progress.posttestScore = score;
            this.navigateTo('cert');
        }
    },

    init() {
        // เคลียร์ค่าล็อกอินค้างเก่า หากไม่ได้ล็อกอินจริงใน session นี้
        const sessionActive = (typeof sessionStorage !== "undefined") && sessionStorage.getItem("PKG_SESSION_LOGGED_IN") === "true";
        if (!sessionActive) {
            try {
                localStorage.removeItem("PKG_ACTIVE_STUDENT_ID");
                sessionStorage.removeItem("PKG_GUEST_STUDENT");
            } catch(e) {}
        }

        // โหลดความก้าวหน้าทั้งหมด
        let allProg = this.getAllStudentsProgress();
        
        // ตรวจสอบนักเรียนที่ใช้งาน
        let activeId = sessionActive ? localStorage.getItem("PKG_ACTIVE_STUDENT_ID") : null;
        if (activeId === "0000") {
            const guestRaw = (typeof sessionStorage !== "undefined") ? sessionStorage.getItem("PKG_GUEST_STUDENT") : null;
            if (guestRaw) {
                try {
                    const guest = JSON.parse(guestRaw);
                    if (guest && guest.fullName) {
                        this.state.student = guest;
                        this.state.progress = this.createDefaultProgress(guest);
                    }
                } catch(e) {}
            }
        } else if (activeId && allProg[activeId]) {
            const studentMeta = PACKAGING_DATA.studentsM3.find(s => s.studentId === activeId);
            if (studentMeta) {
                this.state.student = studentMeta;
                this.state.progress = allProg[activeId] || this.createDefaultProgress(studentMeta);
            } else {
                this.state.student = null;
                this.state.progress = null;
            }
        } else {
            this.state.student = null;
            this.state.progress = null;
        }
        const savedSound = localStorage.getItem('PKG_AUDIO_ENABLED');
        this.state.soundEnabled = savedSound !== 'false';
        this.updateSoundIcon();

        // เริ่มการทำงานระบบจำลองและเกียรติบัตร
        if (typeof PackagingSim !== 'undefined' && PackagingSim.init) {
            PackagingSim.init();
        }
        if (typeof PackagingCert !== 'undefined' && PackagingCert.init) {
            PackagingCert.init();
        }

        // อัปเดต UI ส่วนหัว
        this.updateHeaderProfile();
        this.renderUnitsList();
        this.updatePills();

        // เติมตัวเลือกรายชื่อนักเรียนในหน้าแรก
        // เคลียร์ช่องล็อกอินหน้าแรกให้สะอาด
        const loginInput = document.getElementById("login-student-id");
        if (loginInput && !this.state.student) {
            loginInput.value = "";
        }
        const preview = document.getElementById("login-student-preview");
        if (preview && !this.state.student) {
            preview.classList.add("hidden");
            preview.innerHTML = "";
        }

        this.populateStudentDropdown();

        // ผูก Event ค้นหาใน Dashboard
        const searchInput = document.getElementById('dash-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.renderDashboardTable());
        }
        const statusFilter = document.getElementById('dash-status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.renderDashboardTable());
        }

        // เริ่มต้นแสดงหน้าแรก (หรือหน้าที่ระบุใน URL hash)
        const hash = window.location.hash.replace('#', '');
        if (['home', 'pretest', 'units', 'labs', 'posttest', 'cert', 'dashboard'].includes(hash)) {
            this.navigateTo(hash);
        } else {
            this.navigateTo('home');
        }
    },

    // =========================================================================
    // Web Audio API Sound Synthesizer (ทำงานออฟไลน์ 100% ไม่ต้องพึ่งพาไฟล์เสียงภายนอก)
    // =========================================================================
    getAudioContext() {
        if (!this.state.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.state.audioCtx = new AudioContext();
            }
        }
        if (this.state.audioCtx && this.state.audioCtx.state === 'suspended') {
            this.state.audioCtx.resume();
        }
        return this.state.audioCtx;
    },

    playSound(type) {
        if (!this.state.soundEnabled) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'success') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'fanfare') {
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                notes.forEach((freq, idx) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'sine';
                    o.frequency.setValueAtTime(freq, now + idx * 0.09);
                    g.gain.setValueAtTime(0.25, now + idx * 0.09);
                    g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.09 + 0.25);
                    o.start(now + idx * 0.09);
                    o.stop(now + idx * 0.09 + 0.25);
                });
            } else if (type === 'error') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.setValueAtTime(160, now + 0.12);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        } catch (e) {
            console.warn('Audio play error:', e);
        }
    },

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        localStorage.setItem('PKG_AUDIO_ENABLED', this.state.soundEnabled);
        this.updateSoundIcon();
        if (this.state.soundEnabled) this.playSound('click');
    },

    updateSoundIcon() {
        const icon = document.getElementById('sound-toggle-icon');
        if (icon) {
            if (this.state.soundEnabled) {
                icon.className = 'fa-solid fa-volume-high text-emerald-600 text-base';
            } else {
                icon.className = 'fa-solid fa-volume-xmark text-slate-400 text-base';
            }
        }
    },

    // =========================================================================
    // การจัดการความก้าวหน้า (Progress & LocalStorage Data)
    // =========================================================================
    createDefaultProgress(student) {
        return {
            studentId: student.studentId,
            no: student.no,
            title: student.title,
            name: student.name,
            fullName: student.fullName,
            room: '3',
            avatar: '',
            pretestScore: null,
            posttestScore: null,
            completedUnits: [],
            completedLabs: [],
            unlockedBadges: [],
            lastActive: new Date().toISOString()
        };
    },

    getAllStudentsProgress() {
        let data = {};
        try {
            const raw = localStorage.getItem('PKG_STUDENTS_PROGRESS');
            if (raw) data = JSON.parse(raw);
        } catch (e) {
            console.warn('Error reading PKG_STUDENTS_PROGRESS:', e);
        }

        const isDataEmpty = Object.keys(data).length === 0;

        // หากยังไม่มีข้อมูล ให้โหลดข้อมูลความก้าวหน้าจริงจาก DEMO_PACKAGING_PROGRESS
        if (isDataEmpty && typeof DEMO_PACKAGING_PROGRESS !== 'undefined') {
            data = JSON.parse(JSON.stringify(DEMO_PACKAGING_PROGRESS));
            try {
                localStorage.setItem('PKG_STUDENTS_PROGRESS', JSON.stringify(data));
            } catch (e) {}
        }

        // ตรวจสอบว่าครบทั้ง 20 คนหรือไม่
        PACKAGING_DATA.studentsM3.forEach(s => {
            if (!data[s.studentId]) {
                if (typeof DEMO_PACKAGING_PROGRESS !== 'undefined' && DEMO_PACKAGING_PROGRESS[s.studentId]) {
                    data[s.studentId] = JSON.parse(JSON.stringify(DEMO_PACKAGING_PROGRESS[s.studentId]));
                } else {
                    data[s.studentId] = this.createDefaultProgress(s);
                }
            }
        });
        return data;
    },

    saveAllStudentsProgress(allProg) {
        try {
            localStorage.setItem('PKG_STUDENTS_PROGRESS', JSON.stringify(allProg));
        } catch (e) {
            console.error('Error saving PKG_STUDENTS_PROGRESS:', e);
        }
    },

    saveCurrentStudentProgress() {
        if (!this.state.student || !this.state.progress) return;
        const all = this.getAllStudentsProgress();
        this.state.progress.lastActive = new Date().toISOString();
        all[this.state.student.studentId] = this.state.progress;
        this.saveAllStudentsProgress(all);
        this.updatePills();
    },

    // =========================================================================
    // การยืนยันตัวตนและการเลือกผู้เรียน (Student Authentication - ID Only)
    // =========================================================================
    updateHeaderProfile() {
        const nameEl = document.getElementById('header-student-name');
        const avatarEl = document.getElementById('header-avatar-display');
        const logoutBtn = document.getElementById('header-logout-btn');
        if (nameEl && this.state.student) {
            if (this.state.student.studentId === '0000' || this.state.student.isGuest) {
                nameEl.innerText = `${this.state.student.fullName} (ผู้เยี่ยมชม / Guest)`;
            } else {
                nameEl.innerText = `${this.state.student.fullName} (เลขที่ ${this.state.student.no})`;
            }
        } else if (nameEl) {
            nameEl.innerText = "ยังไม่ได้เข้าสู่ระบบ";
        }
        if (avatarEl) {
            if (this.state.student) {
                avatarEl.innerHTML = (this.state.student.studentId === '0000' || this.state.student.isGuest)
                    ? '<i class="fa-solid fa-user-tag text-emerald-600"></i>'
                    : '<i class="fa-solid fa-circle-user text-emerald-600"></i>';
            } else {
                avatarEl.innerHTML = '<i class="fa-solid fa-user-lock text-slate-400"></i>';
            }
        }
        if (logoutBtn) {
            if (this.state.student) {
                logoutBtn.classList.remove('hidden');
            } else {
                logoutBtn.classList.add('hidden');
            }
        }
    },

    loginStudent(studentId) {
        const s = PACKAGING_DATA.studentsM3.find(x => x.studentId === studentId);
        if (!s) return;

        this.state.student = s;
        const all = this.getAllStudentsProgress();
        this.state.progress = all[studentId] || this.createDefaultProgress(s);
        try { sessionStorage.setItem('PKG_SESSION_LOGGED_IN', 'true'); } catch(e) {}
        localStorage.setItem('PKG_ACTIVE_STUDENT_ID', studentId);

        this.playSound('success');
        this.updateHeaderProfile();
        this.updatePills();
        this.renderUnitsList();
        this.closeLoginModal();
        this.navigateTo('home');
    },

    openLoginModal() {
        this.navigateTo('home');
        const input = document.getElementById('login-student-id');
        if (input) {
            input.focus();
            input.select();
        }
    },

    closeLoginModal() {
        const modal = document.getElementById('pkg-login-modal');
        if (modal) modal.classList.add('hidden');
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
            if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
                this.doLogout();
            }
        }
    },

    doLogout() {
        try {
            localStorage.removeItem('PKG_ACTIVE_STUDENT_ID');
            sessionStorage.removeItem('PKG_SESSION_LOGGED_IN');
            sessionStorage.removeItem('PKG_GUEST_STUDENT');
        } catch(e) {}
        this.state.student = null;
        this.state.progress = null;
        this.updateHeaderProfile();
        this.updatePills();
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

    // =========================================================================
    // การนำทางและเมนูด้านบน (Navigation & Sections)
    // =========================================================================
    navigateTo(sectionId) {
        // หากยังไม่ล็อกอินและพยายามเข้าหน้าอื่นที่ไม่ใช่ home หรือ dashboard
        if (!this.state.student && sectionId !== 'home' && sectionId !== 'dashboard') {
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'กรุณาเข้าสู่ระบบ',
                text: 'กรุณาเข้าสู่ระบบด้วยเลขประจำตัวนักเรียนก่อนนะครับ',
                confirmButtonColor: '#065f46'
            });
        } else {
            alert("กรุณาเข้าสู่ระบบด้วยเลขประจำตัวนักเรียนก่อนนะครับ");
        }
            this.navigateTo('home');
            return;
        }

        this.state.activeSection = sectionId;
        window.location.hash = sectionId;

        // รองรับทั้ง results และ cert
        if (sectionId === 'results') sectionId = 'cert';

        // ซ่อนทุก Section
        const sections = ['home', 'pretest', 'units', 'labs', 'posttest', 'cert', 'dashboard', 'results'];
        sections.forEach(id => {
            const el = document.getElementById(`section-${id}`);
            if (el) {
                if (id === sectionId) {
                    el.classList.remove('hidden');
                    el.classList.add('animate-fadeIn');
                } else {
                    el.classList.add('hidden');
                }
            }
        });

        // ดำเนินการเฉพาะแต่ละ Section
        if (sectionId === 'pretest') {
            this.renderQuiz('pretest');
        } else if (sectionId === 'posttest') {
            this.renderQuiz('posttest');
        } else if (sectionId === 'labs') {
            this.switchLabTab(this.state.activeLab || 'writer');
        } else if (sectionId === 'cert') {
            this.renderCertificateView();
        } else if (sectionId === 'dashboard') {
            this.renderDashboard();
        }

        this.updatePills();
        this.playSound('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    updatePills() {
        const p = this.state.progress;

        const updatePill = (id, isActive, isDone) => {
            const el1 = document.getElementById(`pill-${id}`);
            const el2 = document.getElementById(`step-nav-${id}`);
            const cls = 'step-pill ' + (isActive ? 'active' : (isDone ? 'completed' : 'pending'));
            if (el1) el1.className = cls;
            if (el2) el2.className = cls;
        };

        updatePill('home', this.state.activeSection === 'home', true);
        if (!p) {
            updatePill('pretest', false, false);
            updatePill('units', false, false);
            updatePill('labs', false, false);
            updatePill('posttest', false, false);
            updatePill('cert', false, false);
            updatePill('results', false, false);
            updatePill('dashboard', this.state.activeSection === 'dashboard', false);
            return;
        }

        updatePill('pretest', this.state.activeSection === 'pretest', p.pretestScore !== null);
        updatePill('units', this.state.activeSection === 'units', (p.completedUnits && p.completedUnits.length >= 4));
        updatePill('labs', this.state.activeSection === 'labs', (p.completedLabs && p.completedLabs.length >= 4));
        updatePill('posttest', this.state.activeSection === 'posttest', p.posttestScore !== null);
        updatePill('cert', this.state.activeSection === 'cert', (p.posttestScore !== null && p.posttestScore >= 7));
        updatePill('results', this.state.activeSection === 'cert', (p.posttestScore !== null && p.posttestScore >= 7));
        updatePill('dashboard', this.state.activeSection === 'dashboard', false);
    },

    // =========================================================================
    // หน่วยการเรียนรู้ 4 หน่วย (Learning Units Reader & Modals)
    // =========================================================================
    renderUnitsList() {
        const container = document.getElementById('units-cards-container');
        if (!container) return;

        const units = PACKAGING_DATA.units;
        const p = this.state.progress || {};
        const completed = p.completedUnits || [];

        container.innerHTML = units.map(u => {
            const isDone = completed.includes(u.id);
            return `
                <div class="bg-white rounded-3xl p-6 border ${isDone ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'} shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="w-12 h-12 rounded-2xl ${isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center text-xl shadow-sm">
                                <i class="fa-solid ${u.icon}"></i>
                            </span>
                            <span class="px-3 py-1 rounded-full text-[11px] font-bold ${isDone ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                                ${isDone ? '✅ เรียนจบแล้ว' : '📖 ยังไม่ได้อ่าน'}
                            </span>
                        </div>
                        <h4 class="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-emerald-700 transition">
                            ${u.title}
                        </h4>
                        <p class="text-xs text-emerald-900 font-semibold mb-2">${u.subtitle}</p>
                        <p class="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                            ${u.summary}
                        </p>
                    </div>

                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-[11px] text-slate-400 font-medium">
                            <i class="fa-regular fa-clock"></i> ${u.readTime}
                        </span>
                        <button onclick="PackagingApp.openUnitModal(${u.id})" class="px-4 py-2 ${isDone ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5">
                            <span>${isDone ? 'ทบทวนเนื้อหา' : 'เริ่มเรียนรู้'}</span>
                            <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    openUnitModal(unitId) {
        const u = PACKAGING_DATA.units.find(x => x.id === unitId);
        if (!u) return;

        let modal = document.getElementById('pkg-unit-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'pkg-unit-modal';
            modal.className = 'fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
                <!-- Modal Header -->
                <div class="flex items-start justify-between pb-4 border-b border-slate-200">
                    <div>
                        <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">${u.subtitle}</span>
                        <h3 class="text-base md:text-lg font-bold text-slate-900 mt-1">${u.title}</h3>
                    </div>
                    <button onclick="PackagingApp.closeUnitModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                        <i class="fa-solid fa-xmark text-sm"></i>
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
                    ${u.topics.map(t => `
                        <div class="bg-slate-50/80 p-4 md:p-5 rounded-2xl border border-slate-200 space-y-2">
                            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <i class="fa-solid fa-bookmark text-emerald-600"></i> ${t.title}
                            </h4>
                            <div class="text-xs md:text-sm text-slate-600">${t.content}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Modal Action -->
                <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span class="text-xs text-slate-400">
                        <i class="fa-solid fa-award text-amber-500"></i> สะสมทักษะนวัตกรดิจิทัล ม.3
                    </span>
                    <button onclick="PackagingApp.completeUnit(${u.id})" class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>ทำความเข้าใจครบถ้วนแล้ว (บันทึกหน่วยเรียน)</span>
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        this.playSound('click');
    },

    closeUnitModal() {
        const modal = document.getElementById('pkg-unit-modal');
        if (modal) modal.classList.add('hidden');
    },

    completeUnit(unitId) {
        if (!this.state.progress.completedUnits) this.state.progress.completedUnits = [];
        if (!this.state.progress.completedUnits.includes(unitId)) {
            this.state.progress.completedUnits.push(unitId);
        }
        this.saveCurrentStudentProgress();
        this.playSound('success');
        this.closeUnitModal();
        this.renderUnitsList();
        this.updatePills();

        if (this.state.progress.completedUnits.length >= 4) {
            if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 60 });
        }
    },

    // =========================================================================
    // ฐานปฏิบัติการจำลองเสมือนจริง 4 ฐาน (Virtual Labs Controller)
    // =========================================================================
    switchLabTab(labId) {
        this.state.activeLab = labId;

        const labs = ['writer', 'tap', 'builder', 'roi'];
        labs.forEach(id => {
            const btn = document.getElementById(`lab-tab-${id}`);
            const panel = document.getElementById(`lab-panel-${id}`);
            if (btn) {
                btn.className = (id === labId) ? 'lab-tab-btn active' : 'lab-tab-btn inactive';
            }
            if (panel) {
                if (id === labId) {
                    panel.classList.remove('hidden');
                    panel.classList.add('animate-fadeIn');
                } else {
                    panel.classList.add('hidden');
                }
            }
        });

        this.playSound('click');
    },

    completeLabMission(labKey) {
        if (!this.state.progress.completedLabs) this.state.progress.completedLabs = [];
        if (!this.state.progress.completedLabs.includes(labKey)) {
            this.state.progress.completedLabs.push(labKey);
        }
        this.saveCurrentStudentProgress();
        this.updatePills();

        if (this.state.progress.completedLabs.length >= 4) {
            if (typeof confetti === 'function') {
                confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            }
        }
    },

    // =========================================================================
    // ระบบแบบทดสอบ (Quiz Engine: Pre-test & Post-test)
    // =========================================================================
    renderQuiz(quizType) {
        const isPre = quizType === 'pretest';
        const container = document.getElementById(`${quizType}-questions-container`);
        if (!container) return;

        const questions = PACKAGING_DATA.quizQuestions;
        const currentScore = isPre ? this.state.progress.pretestScore : this.state.progress.posttestScore;

        container.innerHTML = `
            <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <!-- Header Status -->
                <div class="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <h3 class="font-bold text-slate-900 text-base">
                            ${isPre ? '📝 แบบทดสอบวัดความรู้พื้นฐานก่อนเรียน (Pre-test)' : '🎯 แบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนหลังเรียน (Post-test)'}
                        </h3>
                        <p class="text-xs text-slate-500">จำนวน 10 ข้อ • ข้อละ 1 คะแนน • เกณฑ์ผ่านเกียรติบัตร 70% (7 คะแนนขึ้นไป)</p>
                    </div>
                    ${currentScore !== null ? `
                        <div class="px-4 py-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                            <span>คะแนนที่ได้: <strong>${currentScore} / 10</strong></span>
                            ${currentScore >= 7 ? '<span class="text-emerald-600 font-bold">✅ ผ่านเกณฑ์</span>' : '<span class="text-amber-600 font-bold">⚠️ ยังไม่ผ่าน</span>'}
                        </div>
                    ` : ''}
                </div>

                <!-- Questions List -->
                <form id="${quizType}-form" class="space-y-6">
                    ${questions.map((q, idx) => `
                        <div class="p-4 md:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                            <div class="font-bold text-xs md:text-sm text-slate-900 flex items-start gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                                    ${idx + 1}
                                </span>
                                <span>${q.question}</span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                                ${q.options.map((opt, optIdx) => `
                                    <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-emerald-50/50 cursor-pointer transition text-xs text-slate-700">
                                        <input type="radio" name="q_${idx}" value="${optIdx}" class="text-emerald-600 focus:ring-emerald-500">
                                        <span>${opt}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}

                    <div class="pt-4 border-t border-slate-200 text-right">
                        <button type="button" onclick="PackagingApp.submitQuiz('${quizType}')" class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition">
                            <i class="fa-solid fa-paper-plane"></i> ส่งคำตอบและประมวลผล
                        </button>
                    </div>
                </form>

                <!-- Feedback Area -->
                <div id="${quizType}-feedback-area" class="hidden"></div>
            </div>
        `;
    },

    submitQuiz(quizType) {
        const isPre = quizType === 'pretest';
        const questions = PACKAGING_DATA.quizQuestions;
        let score = 0;
        let unanswered = 0;

        questions.forEach((q, idx) => {
            const radios = document.getElementsByName(`q_${idx}`);
            let answered = false;
            for (const r of radios) {
                if (r.checked) {
                    answered = true;
                    if (parseInt(r.value, 10) === q.answer) {
                        score++;
                    }
                    break;
                }
            }
            if (!answered) unanswered++;
        });

        if (unanswered > 0) {
            if (!confirm(`คุณยังไม่ได้ตอบคำถาม ${unanswered} ข้อ ต้องการส่งคำตอบหรือไม่?`)) {
                return;
            }
        }

        if (isPre) {
            this.state.pretestScore = score;
            if (this.state.progress) this.state.progress.pretestScore = score;
        } else {
            this.state.posttestScore = score;
            if (this.state.progress) this.state.progress.posttestScore = score;
        }
        this.saveCurrentStudentProgress();

        this.playSound(score >= 7 ? 'success' : 'click');
        if (score >= 7 && !isPre && typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        }

        // แสดงกล่องผลคะแนน
        const feedback = document.getElementById(`${quizType}-feedback-area`);
        if (feedback) {
            feedback.classList.remove('hidden');
            feedback.innerHTML = `
                <div class="p-6 rounded-3xl ${score >= 7 ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-amber-50 border border-amber-200 text-amber-900'} space-y-4 animate-fadeIn">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="w-12 h-12 rounded-2xl ${score >= 7 ? 'bg-emerald-600' : 'bg-amber-600'} text-white flex items-center justify-center text-xl font-bold">
                                ${score}/10
                            </span>
                            <div>
                                <h4 class="font-bold text-sm">
                                    ${score >= 7 ? '🎉 ยอดเยี่ยมมาก! คุณผ่านเกณฑ์การทดสอบ' : '💡 พยายามอีกนิด! คะแนนยังไม่ถึงเกณฑ์ 70%'}
                                </h4>
                                <p class="text-xs ${score >= 7 ? 'text-emerald-700' : 'text-amber-700'}">
                                    ${isPre ? 'บันทึกคะแนนก่อนเรียนเรียบร้อยแล้ว ก้าวสู่การเรียนรู้หน่วยถัดไป' : (score >= 7 ? 'คุณสามารถเปิดดูและดาวน์โหลดเกียรติบัตรนวัตกรอาชีพดิจิทัลได้ทันที' : 'สามารถทบทวนเนื้อหา 4 หน่วยและ 4 แล็บ แล้วสอบใหม่อีกครั้ง')}
                                </p>
                            </div>
                        </div>

                        ${(!isPre && score >= 7) ? `
                            <button onclick="PackagingApp.navigateTo('cert')" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5">
                                <i class="fa-solid fa-award"></i> ดูเกียรติบัตรของคุณ
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            feedback.scrollIntoView({ behavior: 'smooth' });
        }

        this.updatePills();
    },

    // =========================================================================
    // การแสดงผลเกียรติบัตร & สรุปผล (Certificate & Results View)
    // =========================================================================
    renderResults() {
        this.renderCertificateView();
    },

    renderCertificateView() {
        const student = this.state.student || (PACKAGING_DATA && PACKAGING_DATA.studentsM3 ? PACKAGING_DATA.studentsM3[0] : null);
        const allProg = this.getAllStudentsProgress();
        const p = (student && student.studentId && allProg[student.studentId]) ? allProg[student.studentId] : (this.state.progress || {});

        const total = (typeof PACKAGING_DATA !== 'undefined' && PACKAGING_DATA.quizQuestions) ? PACKAGING_DATA.quizQuestions.length : 10;

        let pre = (this.state.pretestScore !== null && this.state.pretestScore !== undefined)
            ? this.state.pretestScore
            : ((p.pretestScore !== null && p.pretestScore !== undefined) ? p.pretestScore : 4);

        let post = (this.state.posttestScore !== null && this.state.posttestScore !== undefined)
            ? this.state.posttestScore
            : ((p.posttestScore !== null && p.posttestScore !== undefined) ? p.posttestScore : 8);

        const gain = post - pre;

        // อัปเดตการ์ดสรุปคะแนน
        const preEl = document.getElementById("res-pre-score");
        const postEl = document.getElementById("res-post-score");
        const gainEl = document.getElementById("res-gain-score");
        const gainText = document.getElementById("res-gain-text");

        if (preEl) preEl.innerText = `${pre} / ${total}`;
        if (postEl) postEl.innerText = `${post} / ${total}`;
        if (gainEl) {
            gainEl.innerText = `${gain >= 0 ? '+' : ''}${gain}`;
            gainEl.className = `text-3xl font-extrabold ${gain > 0 ? 'text-emerald-700' : 'text-slate-600'}`;
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

        const box = document.getElementById('cert-status-notice');
        const passAction = document.getElementById('cert-action-buttons');
        if (box) box.innerHTML = '';
        if (passAction) passAction.classList.remove('hidden');

        // สั่งวาดเกียรติบัตรทันที (ทั้ง Canvas และ HTML Preview)
        if (typeof PackagingCert !== 'undefined') {
            if (PackagingCert.renderCertificate) {
                PackagingCert.renderCertificate(student, post, total);
            } else if (PackagingCert.render) {
                PackagingCert.render(student, post, total);
            }
        }
    },

    downloadCertificate(targetStudent, targetScore, targetTotal) {
        if (typeof PackagingCert !== 'undefined') {
            if (PackagingCert.downloadPNG) {
                PackagingCert.downloadPNG(targetStudent, targetScore, targetTotal);
            } else if (PackagingCert.downloadCertificate) {
                PackagingCert.downloadCertificate(targetStudent, targetScore, targetTotal);
            }
        }
    },

    printCertificate() {
        if (typeof PackagingCert !== 'undefined' && PackagingCert.printCertificate) {
            PackagingCert.printCertificate();
        } else {
            window.print();
        }
    },

    // =========================================================================
    // แดชบอร์ดความก้าวหน้ารายชั้นเรียน ม.3 (Class Progress Dashboard)
    // =========================================================================
    renderClassProgressDashboard() {
        this.renderDashboard();
    },

    renderDashboard() {
        const allProg = this.getAllStudentsProgress();
        const students = PACKAGING_DATA.studentsM3;
        let startedCount = 0;
        let completedCount = 0;
        let totalPre = 0;
        let countPre = 0;
        let totalPost = 0;
        let countPost = 0;
        let totalGain = 0;
        let countGain = 0;

        students.forEach(s => {
            const p = allProg[s.studentId] || {};
            const hasPre = p.pretestScore !== null && p.pretestScore !== undefined;
            const hasPost = p.posttestScore !== null && p.posttestScore !== undefined;
            const unitsDone = (p.completedUnits || []).length;

            if (hasPost) {
                completedCount++;
            } else if (hasPre || unitsDone > 0) {
                startedCount++;
            }

            if (hasPre) {
                totalPre += p.pretestScore;
                countPre++;
            }
            if (hasPost) {
                totalPost += p.posttestScore;
                countPost++;
            }
            if (hasPre && hasPost) {
                totalGain += (p.posttestScore - p.pretestScore);
                countGain++;
            }
        });

        const activeCount = startedCount + completedCount;
        const avgPre = countPre > 0 ? (totalPre / countPre).toFixed(1) : '-';
        const avgPost = countPost > 0 ? (totalPost / countPost).toFixed(1) : '-';
        const avgGain = countGain > 0 ? `+${(totalGain / countGain).toFixed(1)}` : '-';

        // อัปเดต 6 KPI cards (รองรับทั้ง Unit 1 และ Unit 2 DOM IDs)
        const elTotal = document.getElementById('dash-kpi-total') || document.getElementById('dash-stat-total');
        const elActive = document.getElementById('dash-kpi-active');
        const elCompleted = document.getElementById('dash-kpi-completed') || document.getElementById('dash-stat-passed');
        const elAvgPre = document.getElementById('dash-kpi-avg-pre') || document.getElementById('dash-stat-avgpre');
        const elAvgPost = document.getElementById('dash-kpi-avg-post') || document.getElementById('dash-stat-avgpost') || document.getElementById('dash-stat-avg');
        const elAvgGain = document.getElementById('dash-kpi-avg-gain') || document.getElementById('dash-stat-gain');

        if (elTotal) elTotal.innerText = `${students.length} คน`;
        if (elActive) elActive.innerText = `${activeCount} / ${students.length} (${Math.round((activeCount / students.length) * 100)}%)`;
        if (elCompleted) elCompleted.innerText = `${completedCount} คน (${Math.round((completedCount / students.length) * 100)}%)`;
        if (elAvgPre) elAvgPre.innerText = avgPre !== '-' ? `${avgPre} / 10` : '-';
        if (elAvgPost) elAvgPost.innerText = avgPost !== '-' ? `${avgPost} / 10` : '-';
        if (elAvgGain) elAvgGain.innerText = avgGain;

        const elLabs = document.getElementById('dash-stat-labs');
        if (elLabs) elLabs.innerText = '4 / 4 ฐาน';

        this.renderDashboardTable();
    },

    setDashboardFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.dash-filter-btn').forEach(btn => {
            const isActive = (btn.getAttribute('data-filter') === filter);
            btn.className = `dash-filter-btn px-3 py-1.5 rounded-xl text-xs ${isActive ? 'font-bold bg-emerald-700 text-white shadow-sm' : 'font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'} transition`;
        });
        const select = document.getElementById('dash-status-filter');
        if (select) select.value = filter;
        this.renderDashboardTable();
    },

    renderDashboardTable() {
        const grid = document.getElementById('dash-student-grid');
        const tbody1 = document.getElementById('dash-matrix-tbody');
        const tbody2 = document.getElementById('dash-table-body');
        const tbodies = [tbody1, tbody2].filter(Boolean);
        if (!grid && tbodies.length === 0) return;

        const allProg = this.getAllStudentsProgress();
        const searchInput = document.getElementById('dash-search-input');
        const query = (searchInput ? searchInput.value : (this.searchQuery || '')).trim().toLowerCase();
        const filterVal = this.currentFilter || (document.getElementById('dash-status-filter') ? document.getElementById('dash-status-filter').value : 'all');

        const list = PACKAGING_DATA.studentsM3.filter(s => {
            const p = allProg[s.studentId] || {};
            const hasPre = p.pretestScore !== null && p.pretestScore !== undefined;
            const hasPost = p.posttestScore !== null && p.posttestScore !== undefined;
            const unitsDone = (p.completedUnits || []).length;

            let status = 'not_started';
            if (hasPost) status = 'completed';
            else if (hasPre || unitsDone > 0) status = 'in_progress';

            if (filterVal === 'completed' || filterVal === 'passed' || filterVal === 'pass') {
                if (status !== 'completed') return false;
            } else if (filterVal === 'in_progress' || filterVal === 'studying' || filterVal === 'learning') {
                if (status !== 'in_progress') return false;
            } else if (filterVal === 'not_started') {
                if (status !== 'not_started') return false;
            }

            if (!query) return true;
            return s.fullName.toLowerCase().includes(query) ||
                   s.studentId.includes(query) ||
                   String(s.no).includes(query);
        });

        if (list.length === 0) {
            const noDataGrid = '<div class="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</div>';
            const noDataTable = '<tr><td colspan="9" class="text-center py-8 text-slate-400 text-xs">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</td></tr>';
            if (grid) grid.innerHTML = noDataGrid;
            tbodies.forEach(tb => tb.innerHTML = noDataTable);
            return;
        }

        let cardsHtml = '';
        let tableRowsHtml = '';

        list.forEach(s => {
            const p = allProg[s.studentId] || {};
            const isCurrentStudent = this.state.student && this.state.student.studentId === s.studentId;
            const hasPre = p.pretestScore !== null && p.pretestScore !== undefined;
            const hasPost = p.posttestScore !== null && p.posttestScore !== undefined;
            const unitsDone = (p.completedUnits || []).length;
            const gain = (hasPre && hasPost) ? (p.posttestScore - p.pretestScore) : null;
            const isPassed = (typeof p.posttestScore === 'number' && p.posttestScore >= 7) || (hasPost && p.posttestScore >= 7);

            let status = 'not_started';
            if (hasPost) status = 'completed';
            else if (hasPre || unitsDone > 0) status = 'in_progress';

            let statusBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">ยังไม่เริ่ม</span>';
            if (status === 'completed') {
                statusBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap inline-flex items-center gap-1">✅ สำเร็จหลักสูตร</span>';
            } else if (status === 'in_progress') {
                statusBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-300 whitespace-nowrap inline-flex items-center gap-1">⏳ กำลังศึกษา</span>';
            }

            const unitPercent = Math.round((unitsDone / 4) * 100);
            const lastActiveStr = p.lastActive ? new Date(p.lastActive).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

            // Individual Card Layout for Grid
            cardsHtml += `
                <div class="bg-white rounded-2xl p-5 border ${isPassed ? 'border-emerald-200 shadow-sm' : 'border-slate-200'} flex flex-col justify-between transition hover:shadow-md relative overflow-hidden">
                    <div>
                        <!-- Top Header: No, ID, Status -->
                        <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center">${s.no}</span>
                                <span class="text-xs font-mono font-bold text-emerald-800">รหัส ${s.studentId}</span>
                            </div>
                            <div class="shrink-0">
                                ${statusBadge}
                            </div>
                        </div>

                        <!-- Student Name -->
                        <div class="pt-3 pb-2">
                            <div class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <span>${s.fullName}</span>
                                ${isCurrentStudent ? '<span class="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">ฉัน</span>' : ''}
                            </div>
                            <div class="text-[11px] text-slate-400 mt-0.5">นักเรียนชั้น ม.3 โรงเรียนบ้านน้ำพร</div>
                        </div>

                        <!-- Score Metrics: Pre, Post, Gain -->
                        <div class="grid grid-cols-3 gap-1.5 py-2.5 bg-slate-50 rounded-xl px-2 my-2 border border-slate-100 text-center">
                            <div>
                                <div class="text-[10px] text-slate-400 font-medium">ก่อนเรียน</div>
                                <div class="font-mono font-bold text-xs ${hasPre ? 'text-emerald-700' : 'text-slate-400'} mt-0.5">
                                    ${hasPre ? p.pretestScore + '/10' : '-'}
                                </div>
                            </div>
                            <div>
                                <div class="text-[10px] text-slate-400 font-medium">หลังเรียน</div>
                                <div class="font-mono font-bold text-xs ${hasPost ? 'text-emerald-700' : 'text-slate-400'} mt-0.5">
                                    ${hasPost ? p.posttestScore + '/10' : '-'}
                                </div>
                            </div>
                            <div>
                                <div class="text-[10px] text-slate-400 font-medium">พัฒนาการ</div>
                                <div class="font-mono font-bold text-xs ${typeof gain === 'number' && gain > 0 ? 'text-amber-600' : 'text-slate-400'} mt-0.5">
                                    ${typeof gain === 'number' && gain > 0 ? '+' + gain : (gain !== null ? gain : '-')}
                                </div>
                            </div>
                        </div>

                        <!-- Lesson Progress Bar -->
                        <div class="py-1">
                            <div class="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
                                <span>ความคืบหน้าบทเรียน:</span>
                                <span class="font-bold text-slate-700">${unitsDone}/4</span>
                            </div>
                            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                                <div class="bg-emerald-600 h-full transition-all duration-300" style="width: ${unitPercent}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Button: ดู/ดาวน์โหลดประกาศนียบัตร -->
                    <div class="pt-4 mt-2 border-t border-slate-100">
                        ${isPassed ? `
                            <button onclick="PackagingApp.showStudentCertModal('${s.studentId}')" class="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition duration-200">
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

            // Table Row Layout (Fallback / Export preview)
            tableRowsHtml += `
                <tr class="border-b border-slate-100 hover:bg-emerald-50/40 transition text-xs ${isCurrentStudent ? 'bg-amber-50/60 font-medium' : ''}">
                    <td class="py-3 px-3 text-center font-semibold text-slate-500">${s.no}</td>
                    <td class="py-3 px-3 font-mono font-bold text-emerald-800 text-center">${s.studentId}</td>
                    <td class="py-3 px-3 font-semibold text-slate-900">
                        <div class="flex items-center gap-2">
                            <span>${s.fullName}</span>
                            ${isCurrentStudent ? '<span class="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">ฉัน</span>' : ''}
                        </div>
                    </td>
                    <td class="py-3 px-3 text-center">${statusBadge}</td>
                    <td class="py-3 px-3 text-center font-mono font-bold ${hasPre ? 'text-emerald-700' : 'text-slate-300'}">
                        ${hasPre ? p.pretestScore + '/10' : '-'}
                    </td>
                    <td class="py-3 px-3 text-center">
                        <div class="flex items-center justify-center gap-2">
                            <div class="w-16 bg-slate-200 h-2 rounded-full overflow-hidden shrink-0">
                                <div class="bg-emerald-600 h-full" style="width: ${unitPercent}%"></div>
                            </div>
                            <span class="text-xs font-semibold ${unitsDone === 4 ? 'text-emerald-700 font-bold' : 'text-slate-600'}">${unitsDone}/4</span>
                        </div>
                    </td>
                    <td class="py-3 px-3 text-center font-mono font-bold ${hasPost ? 'text-emerald-700' : 'text-slate-300'}">
                        ${hasPost ? p.posttestScore + '/10' : '-'}
                    </td>
                    <td class="py-3 px-3 text-center font-mono font-bold ${gain !== null && gain > 0 ? 'text-emerald-600' : 'text-slate-400'}">
                        ${gain !== null ? (gain > 0 ? '+' + gain : gain) : '-'}
                    </td>
                    <td class="py-3 px-3 text-center text-slate-400 font-mono text-[11px]">${lastActiveStr}</td>
                </tr>
            `;
        });

        if (grid) grid.innerHTML = cardsHtml;
        tbodies.forEach(tb => tb.innerHTML = tableRowsHtml);
    },

    viewStudentCert(studentId) {
        this.loginStudent(studentId);
        this.navigateTo('cert');
    },

    exportCSV() {
        this.exportClassProgressCSV();
    },

    exportClassProgressCSV() {
        const all = this.getAllStudentsProgress();
        const rows = [
            ['เลขที่', 'เลขประจำตัว', 'คำนำหน้า', 'ชื่อ-สกุล', 'สถานะ', 'คะแนนก่อนเรียน (10)', 'หน่วยเรียนจบ (4)', 'แล็บเสร็จ (4)', 'คะแนนหลังเรียน (10)', 'พัฒนาการ (Gain)', 'วันที่เข้าใช้ล่าสุด']
        ];

        PACKAGING_DATA.studentsM3.forEach(s => {
            const p = all[s.studentId] || {};
            const isPass = (p.posttestScore !== null && p.posttestScore >= 7) ? 'ผ่านเกณฑ์' : 'กำลังเรียน';
            const pre = p.pretestScore !== null && p.pretestScore !== undefined ? p.pretestScore : '';
            const post = p.posttestScore !== null && p.posttestScore !== undefined ? p.posttestScore : '';
            const gain = (pre !== '' && post !== '') ? (post - pre) : '';
            const units = p.completedUnits ? p.completedUnits.length : 0;
            const labs = p.completedLabs ? p.completedLabs.length : 0;
            const dateStr = p.lastActive ? new Date(p.lastActive).toLocaleDateString('th-TH') : '';

            rows.push([s.no, s.studentId, s.title, s.fullName, isPass, pre, units, labs, post, gain, dateStr]);
        });

        const csvContent = '\uFEFF' + rows.map(e => e.map(item => `"${item}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'รายงานผลสัมฤทธิ์_บรรจุภัณฑ์อัจฉริยะ_ม3_บ้านน้ำพร.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.playSound('success');
    },

    // =========================================================================
    // โหมดครูผู้สอน (Teacher Mode)
    // =========================================================================
    openTeacherMode() {
        const pwd = prompt('กรุณาระบุรหัสผ่านครูผู้สอน (Teacher Password):');
        if (pwd === null) return;
        if (pwd.trim() !== '42010113') {
            this.playSound('error');
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'error',
                title: 'รหัสผ่านไม่ถูกต้อง',
                text: 'กรุณากรอกรหัสผ่านครูผู้สอนให้ถูกต้อง',
                confirmButtonColor: '#065f46'
            });
        } else {
            alert('รหัสผ่านไม่ถูกต้อง');
        }
            return;
        }

        this.playSound('success');
        this.showTeacherControlsModal();
    },

    showTeacherControlsModal() {
        let modal = document.getElementById('pkg-teacher-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'pkg-teacher-modal';
            modal.className = 'fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-fadeIn">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div class="flex items-center gap-2">
                        <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                            <i class="fa-solid fa-chalkboard-user"></i>
                        </span>
                        <div>
                            <h3 class="font-bold text-slate-900 text-sm">แผงควบคุมครูผู้สอน</h3>
                            <p class="text-[11px] text-slate-500">นายนิรุทธิ์ เสวะนา • ครูประจำชั้น ม.3</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('pkg-teacher-modal').classList.add('hidden')" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="space-y-2 text-xs">
                    <button onclick="PackagingApp.teacherBulkPass()" class="w-full p-3 rounded-2xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 font-bold flex items-center gap-2 transition text-left">
                        <i class="fa-solid fa-graduation-cap text-base text-emerald-600"></i>
                        <div>
                            <div>ปรับให้ทุกคนผ่านเกณฑ์และมีผลงานครบ 100%</div>
                            <div class="text-[10px] text-emerald-700 font-normal">บันทึกผลการประเมินผ่านเกณฑ์ตามทะเบียนผลการเรียน</div>
                        </div>
                    </button>

                    <button onclick="PackagingApp.teacherResetAll()" class="w-full p-3 rounded-2xl bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200 font-bold flex items-center gap-2 transition text-left">
                        <i class="fa-solid fa-trash-can text-base text-rose-600"></i>
                        <div>
                            <div>ล้างข้อมูลการเรียนรู้ทั้งหมด (Reset All Data)</div>
                            <div class="text-[10px] text-rose-700 font-normal">รีเซ็ตข้อมูลผลการประเมินเพื่อเตรียมจัดการเรียนการสอนรุ่นใหม่</div>
                        </div>
                    </button>

                    <button onclick="PackagingApp.exportCSV()" class="w-full p-3 rounded-2xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 font-bold flex items-center gap-2 transition text-left">
                        <i class="fa-solid fa-file-excel text-base text-emerald-600"></i>
                        <div>
                            <div>ดาวน์โหลดรายงานสรุป CSV (Excel)</div>
                            <div class="text-[10px] text-emerald-700 font-normal">ส่งออกสถิติความก้าวหน้าทั้งชั้นเรียน</div>
                        </div>
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    },

    teacherBulkPass() {
        if (typeof DEMO_PACKAGING_PROGRESS !== 'undefined') {
            this.saveAllStudentsProgress(DEMO_PACKAGING_PROGRESS);
            this.state.progress = (this.state.student && DEMO_PACKAGING_PROGRESS[this.state.student.studentId]) ? DEMO_PACKAGING_PROGRESS[this.state.student.studentId] : null;
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'อัปเดตข้อมูลสำเร็จ',
                text: 'อัปเดตข้อมูลนักเรียนทั้ง 20 คนผ่านเกณฑ์เรียบร้อยแล้ว!',
                confirmButtonColor: '#065f46'
            });
        } else {
            alert('อัปเดตข้อมูลนักเรียนทั้ง 20 คนผ่านเกณฑ์เรียบร้อยแล้ว!');
        }
            document.getElementById('pkg-teacher-modal').classList.add('hidden');
            this.updateHeaderProfile();
            this.updatePills();
            this.renderUnitsList();
            this.renderDashboard();
            this.playSound('fanfare');
        } else {
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'แจ้งเตือน',
                text: 'ไม่พบข้อมูล DEMO_PACKAGING_PROGRESS',
                confirmButtonColor: '#065f46'
            });
        } else {
            alert('ไม่พบข้อมูล DEMO_PACKAGING_PROGRESS');
        }
        }
    },

    teacherResetAll() {
        if (!confirm('คำเตือน: คุณต้องการล้างความก้าวหน้าของนักเรียนทุกคนใช่หรือไม่?')) return;
        localStorage.removeItem('PKG_STUDENTS_PROGRESS');
        this.state.progress = this.createDefaultProgress(this.state.student);
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'ล้างข้อมูลเรียบร้อยแล้ว',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            alert('ล้างข้อมูลเรียบร้อยแล้ว');
        }
        document.getElementById('pkg-teacher-modal').classList.add('hidden');
        this.updatePills();
        this.renderUnitsList();
        this.renderDashboard();
        this.playSound('success');
    }
};

// เริ่มต้นระบบเมื่อโหลดหน้าเว็บ
window.addEventListener('DOMContentLoaded', () => {
    PackagingApp.init();
});
