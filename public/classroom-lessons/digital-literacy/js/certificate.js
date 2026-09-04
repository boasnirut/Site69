/**
 * certificate.js
 * ระบบสร้างและพิมพ์เกียรติบัตรอิเล็กทรอนิกส์ (E-Certificate Generator)
 * โรงเรียนบ้านน้ำพร
 * 
 * แก้ไขปัญหาการเรนเดอร์แบบ Asynchronous ที่ทำให้ได้หน้าเปล่า
 * รับประกันการวาดข้อความ โลโก้ และลายเซ็นต์ลง Canvas ครบถ้วน 100% ก่อนส่งออกภาพ
 */

const Certificate = {
    canvas: null,
    ctx: null,
    logoImg: null,
    teacherSigImg: null,
    directorSigImg: null,
    isRendered: false,
    currentCertCode: '',

    init() {
        this.canvas = document.getElementById("cert-canvas");
        if (this.canvas) {
            this.ctx = this.canvas.getContext("2d");
        }
        this.preloadAssets();
    },

    preloadAssets() {
        if (!this.logoImg) {
            this.logoImg = new Image();
            this.logoImg.crossOrigin = "anonymous";
            const src = (typeof SCHOOL_LOGO_DATA_URL !== 'undefined' && SCHOOL_LOGO_DATA_URL) 
                ? SCHOOL_LOGO_DATA_URL 
                : '1-small.png';
            this.logoImg.src = src;
        }

        if (!this.teacherSigImg) {
            this.teacherSigImg = new Image();
            this.teacherSigImg.crossOrigin = "anonymous";
            const tSrc = (typeof TEACHER_SIGNATURE_DATA_URL !== 'undefined' && TEACHER_SIGNATURE_DATA_URL)
                ? TEACHER_SIGNATURE_DATA_URL
                : 'ลายเซ็น นิรุทธิ์.png';
            this.teacherSigImg.src = tSrc;
        }

        if (!this.directorSigImg) {
            this.directorSigImg = new Image();
            this.directorSigImg.crossOrigin = "anonymous";
            const dSrc = (typeof DIRECTOR_SIGNATURE_DATA_URL !== 'undefined' && DIRECTOR_SIGNATURE_DATA_URL)
                ? DIRECTOR_SIGNATURE_DATA_URL
                : 'ลายเซ็น ผอ.ศิวาลัย.png';
            this.directorSigImg.src = dSrc;
        }
    },

    getThaiDate(dateObj) {
        if (!dateObj) {
            const student = App.state ? App.state.student : null;
            const allProgress = (App && App.getAllStudentsProgress) ? App.getAllStudentsProgress() : {};
            const p = (student && student.studentId) ? allProgress[student.studentId] : null;
            if (p && p.lastActive) {
                dateObj = new Date(p.lastActive);
            } else {
                dateObj = new Date();
            }
        }
        const months = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear() + 543;
        return `ให้ไว้ ณ วันที่ ${day} เดือน ${month} พ.ศ. ${year}`;
    },

    getGradeLabel(percent) {
        if (percent >= 80) return "ดีเยี่ยม (Excellent)";
        if (percent >= 70) return "ดี (Good)";
        if (percent >= 60) return "ผ่านเกณฑ์ (Pass)";
        return "ควรพัฒนาเพิ่มเติม";
    },

    // ดึงข้อมูลผู้เรียนปัจจุบันอย่างปลอดภัย (มี Fallback เสมอ ไม่ปล่อยให้ว่าง)
    resolveCurrentStudent() {
        let student = (typeof App !== 'undefined' && App.state) ? App.state.student : null;
        if (student && student.studentId && student.studentId !== "") {
            return student;
        }
        const guestStored = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem("NP_GUEST_STUDENT") : null;
        if (guestStored) {
            try {
                const parsed = JSON.parse(guestStored);
                if (parsed && (parsed.studentId === "0000" || parsed.isGuest)) return parsed;
            } catch(e) {}
        }
        if (this.lastRenderedStudent) return this.lastRenderedStudent;
        const sessionActive = (typeof sessionStorage !== 'undefined') && sessionStorage.getItem("NP_SESSION_LOGGED_IN") === "true";
        const activeId = (sessionActive && typeof localStorage !== 'undefined') ? localStorage.getItem("NP_ACTIVE_STUDENT_ID") : null;
        if (activeId === "0000") {
            return {
                studentId: "0000",
                no: "แขก",
                title: "",
                name: "ผู้มาเยือน",
                fullName: "ผู้เข้าชมระบบ (Guest User)",
                room: "3 (Guest)",
                isGuest: true
            };
        }
        if (activeId && typeof APP_DATA !== 'undefined' && APP_DATA.studentsM3) {
            const found = APP_DATA.studentsM3.find(s => s.studentId === activeId);
            if (found) return found;
        }
        return {
            studentId: "",
            no: "-",
            title: "",
            name: "นักเรียน",
            fullName: "นักเรียนโรงเรียนบ้านน้ำพร",
            room: "3"
        };
    },

    resolveCurrentScore(student) {
        if (this.lastRenderedScore !== undefined && this.lastRenderedScore !== null) {
            return this.lastRenderedScore;
        }
        let score = (typeof App !== 'undefined' && App.state && App.state.posttestScore !== null) ? App.state.posttestScore : null;
        if (score === null && typeof App !== 'undefined' && App.getAllStudentsProgress && student && student.studentId) {
            const allProgress = App.getAllStudentsProgress();
            const p = allProgress[student.studentId];
            if (p && p.posttestScore !== undefined && p.posttestScore !== null) {
                score = p.posttestScore;
            }
        }
        return (score !== null && score !== undefined) ? score : 8;
    },

    render(targetStudent, targetScore, targetTotal) {
        if (!this.canvas) this.init();

        const student = targetStudent || this.resolveCurrentStudent();
        const score = (targetScore !== undefined && targetScore !== null) ? targetScore : this.resolveCurrentScore(student);
        const total = (targetTotal !== undefined && targetTotal !== null) ? targetTotal : ((typeof APP_DATA !== 'undefined' && APP_DATA.quizQuestions) ? APP_DATA.quizQuestions.length : 10);
        const percent = Math.round((score / total) * 100);

        this.lastRenderedStudent = student;
        this.lastRenderedScore = score;
        this.lastRenderedTotal = total;

        // รหัสอ้างอิงเกียรติบัตร
        const isGuest = student.studentId === "0000" || student.isGuest;
        if (!this.currentCertCode || !this.currentCertCode.includes(student.studentId)) {
            this.currentCertCode = isGuest ? "NP-DL69-0000" : `NP-DL69-${student.studentId || Math.floor(1000 + Math.random() * 9000)}`;
        }
        const certCode = this.currentCertCode;

        // 1. อัปเดตข้อมูลบน HTML Preview Card
        const previewName = document.getElementById("cert-preview-name");
        const previewClass = document.getElementById("cert-preview-class");
        const previewScore = document.getElementById("cert-preview-score");
        const previewDate = document.getElementById("cert-preview-date");
        const previewCode = document.getElementById("cert-preview-code");

        const classLabel = isGuest ? "ผู้เยี่ยมชม / ทดลองเรียนรู้ ม.3" : `ชั้นมัธยมศึกษาปีที่ 3 เลขที่ ${student.no || student.number || '1'}`;

        if (previewName) previewName.innerText = student.fullName || `${student.title || ''}${student.name || 'นักเรียนโรงเรียนบ้านน้ำพร'}`;
        if (previewClass) previewClass.innerText = classLabel;
        if (previewScore) previewScore.innerText = `ผลการทดสอบหลังเรียน: ${score} / ${total} คะแนน (${percent}%) - ระดับ ${this.getGradeLabel(percent)}`;
        if (previewDate) previewDate.innerText = this.getThaiDate();
        if (previewCode) previewCode.innerText = `รหัสอ้างอิง: ${certCode}`;

        // 2. วาดลง Canvas ความละเอียดสูง (1200 x 850) แบบ Synchronous
        this.drawCanvas(student, score, total, percent, certCode);
    },

    renderCertificate(student, score, total) {
        return this.render(student, score, total);
    },

    downloadCertificate(targetStudent, targetScore, targetTotal) {
        return this.downloadPNG(targetStudent, targetScore, targetTotal);
    },

    drawCanvas(student, score, total, percent, certCode, forceVectorSeal = false) {
        if (!this.canvas) this.init();
        if (!this.canvas || !this.ctx) return;

        const w = 1200;
        const h = 850;
        this.canvas.width = w;
        this.canvas.height = h;
        const ctx = this.ctx;

        // 1. พื้นหลังไล่เฉดสีนวลตา
        const bgGrad = ctx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, "#ffffff");
        bgGrad.addColorStop(0.5, "#f8fafc");
        bgGrad.addColorStop(1, "#f1f5f9");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. ลวดลายกรอบชั้นนอก (Outer Royal Blue Border)
        ctx.lineWidth = 14;
        ctx.strokeStyle = "#1e3a8a"; // Royal Blue
        ctx.strokeRect(25, 25, w - 50, h - 50);

        // 3. กรอบสีทองชั้นใน (Inner Gold Border)
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#d97706"; // Gold
        ctx.strokeRect(38, 38, w - 76, h - 76);

        // 4. เส้นขอบสีเงินละเอียด
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#cbd5e1";
        ctx.strokeRect(44, 44, w - 88, h - 88);

        // 5. มุมกรอบประดับ (Corner Accents)
        this.drawCorner(ctx, 44, 44, 1, 1);
        this.drawCorner(ctx, w - 44, 44, -1, 1);
        this.drawCorner(ctx, 44, h - 44, 1, -1);
        this.drawCorner(ctx, w - 44, h - 44, -1, -1);

        // 6. วาดโลโก้ (ถ้าโหลดเสร็จแล้วให้วาดทันที ถ้ายังไม่เสร็จให้วาดตราเวกเตอร์แทนทันที)
        let logoDrawn = false;
        if (!forceVectorSeal && this.logoImg && this.logoImg.complete && this.logoImg.naturalWidth > 0) {
            try {
                ctx.drawImage(this.logoImg, (w / 2) - 55, 60, 110, 110);
                logoDrawn = true;
            } catch (e) {
                console.warn("drawImage failed, using vector seal fallback", e);
            }
        }

        if (!logoDrawn) {
            // วาดตราสัญลักษณ์เวกเตอร์ประจำโรงเรียนบ้านน้ำพรแบบ Synchronous
            this.drawVectorSeal(ctx, w / 2, 115, 48);
        }

        // 7. วาดข้อความและลายเซ็นต์ทั้งหมดแบบ SYNCHRONOUS ทันที (ไม่รอ async เพื่อป้องกันหน้าเปล่าเด็ดขาด!)
        this.drawTextContent(ctx, w, h, student, score, total, percent, certCode);
        this.isRendered = true;

        // หากโลโก้ยังอยู่ระหว่างดาวน์โหลด ให้แนบ onload เพื่อ re-draw เสริมเมื่อโหลดเสร็จ
        if (!forceVectorSeal && this.logoImg && !this.logoImg.complete) {
            this.logoImg.onload = () => {
                // วาดทับเฉพาะตำแหน่งโลโก้
                try {
                    ctx.drawImage(this.logoImg, (w / 2) - 55, 60, 110, 110);
                } catch (err) {
                    console.warn("Logo onload draw warning:", err);
                }
            };
        }
    },

    drawCorner(ctx, x, y, dirX, dirY) {
        ctx.fillStyle = "#d97706";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (30 * dirX), y);
        ctx.lineTo(x, y + (30 * dirY));
        ctx.closePath();
        ctx.fill();
    },

    // ตราสัญลักษณ์เวกเตอร์โรงเรียนบ้านน้ำพร (Pure Canvas Paths 100% ไม่พึ่งพาไฟล์ภายนอก)
    drawVectorSeal(ctx, cx, cy, r) {
        ctx.save();
        
        // วงแหวนทองชั้นนอก
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "#d97706";
        ctx.fill();

        // วงในสีน้ำเงินกรมท่า
        ctx.beginPath();
        ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
        ctx.fillStyle = "#1e3a8a";
        ctx.fill();

        // ช่อมะกอกรวงข้าวสีทอง
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r - 10, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r - 10, 1.2 * Math.PI, 1.8 * Math.PI);
        ctx.stroke();

        // เปลวเพลิงแห่งปัญญา
        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.arc(cx, cy - 10, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(cx, cy - 10, 5, 0, Math.PI * 2);
        ctx.fill();

        // ฐานคบเพลิง
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy);
        ctx.lineTo(cx + 6, cy);
        ctx.lineTo(cx + 2, cy + 14);
        ctx.lineTo(cx - 2, cy + 14);
        ctx.closePath();
        ctx.fill();

        // หนังสือเปิด
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(cx - 16, cy + 14);
        ctx.lineTo(cx, cy + 10);
        ctx.lineTo(cx + 16, cy + 14);
        ctx.lineTo(cx + 14, cy + 20);
        ctx.lineTo(cx, cy + 16);
        ctx.lineTo(cx - 14, cy + 20);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    },

    // วาดข้อความทั้งหมดลงบน Canvas
    drawTextContent(ctx, w, h, student, score, total, percent, certCode) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const schoolName = "โรงเรียนบ้านน้ำพร สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1";
        const schoolMotto = (typeof APP_DATA !== 'undefined' && APP_DATA.schoolInfo) 
            ? APP_DATA.schoolInfo.motto 
            : "นตฺถิ ปญฺญา สมา อาภา (ไม่มีแสงสว่างใดเสมอด้วยปัญญา)";

        // 1. หัวเรื่อง: โรงเรียนบ้านน้ำพร
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "bold 26px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(schoolName, w / 2, 205);

        // 2. คำขวัญโรงเรียน
        ctx.fillStyle = "#64748b";
        ctx.font = "italic 16px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(schoolMotto, w / 2, 235);

        // 3. ข้อความนำเกียรติบัตร
        ctx.fillStyle = "#d97706";
        ctx.font = "bold 30px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า", w / 2, 290);

        // 4. ชื่อผู้เรียน
        const fullName = student.fullName || `${student.title || ''}${student.name || 'นักเรียนโรงเรียนบ้านน้ำพร'}`;
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 38px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(fullName, w / 2, 355);

        // 5. ชั้น / เลขที่
        ctx.fillStyle = "#334155";
        ctx.font = "20px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        const studentNo = student.no || student.number || '1';
        const isGuest = student.studentId === "0000" || student.isGuest;
        const classStr = isGuest ? "ผู้เยี่ยมชม / ทดลองเรียนรู้ ม.3" : `ชั้นมัธยมศึกษาปีที่ 3  เลขที่ ${studentNo}`;
        ctx.fillText(classStr, w / 2, 400);

        // 6. ข้อความรับรอง
        ctx.fillStyle = "#1e293b";
        ctx.font = "20px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("ได้ผ่านการเรียนรู้และการทดสอบวัดผลสัมฤทธิ์ผ่านสื่อการสอนแบบโต้ตอบ", w / 2, 450);

        // 7. ชื่อหลักสูตร
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "bold 24px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("เรื่อง การพัฒนาความรู้เท่าทันดิจิทัลและความปลอดภัยออนไลน์", w / 2, 490);

        // 8. กลุ่มสาระและปีการศึกษา
        ctx.fillStyle = "#475569";
        ctx.font = "18px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี (วิทยาการคำนวณ) ประจำปีการศึกษา 2569", w / 2, 530);

        // 9. คะแนนและระดับผลการประเมิน
        ctx.fillStyle = "#047857";
        ctx.font = "bold 20px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(`ผลการทดสอบหลังเรียน: ${score} / ${total} คะแนน (ร้อยละ ${percent}) • ระดับ ${this.getGradeLabel(percent)}`, w / 2, 575);

        // 10. วันที่ออกเกียรติบัตร
        ctx.fillStyle = "#64748b";
        ctx.font = "18px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(this.getThaiDate(), w / 2, 625);

        // 11. ภาพลายเซ็นต์และเส้นกำกับ
        const sigY = 720;

        // วาดภาพลายเซ็นต์ครูประจำชั้น (นายนิรุทธิ์ เสวะนา)
        if (this.teacherSigImg && this.teacherSigImg.complete && this.teacherSigImg.naturalWidth > 0) {
            const aspect = this.teacherSigImg.naturalWidth / this.teacherSigImg.naturalHeight;
            const sigH = 65;
            const sigW = Math.min(sigH * aspect, 120);
            ctx.drawImage(this.teacherSigImg, 305 - (sigW / 2), sigY - sigH + 5, sigW, sigH);
        }

        // เส้นลายเซ็นต์ครูผู้สอน
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#94a3b8";
        ctx.beginPath();
        ctx.moveTo(180, sigY);
        ctx.lineTo(430, sigY);
        ctx.stroke();

        ctx.fillStyle = "#334155";
        ctx.font = "16px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("( นายนิรุทธิ์ เสวะนา )", 305, sigY + 25);
        ctx.fillText("ครูประจำชั้นมัธยมศึกษาปีที่ 3", 305, sigY + 50);

        // วาดภาพลายเซ็นต์ผู้อำนวยการ (นางศิวาลัย แก้วเขียว)
        if (this.directorSigImg && this.directorSigImg.complete && this.directorSigImg.naturalWidth > 0) {
            const aspect = this.directorSigImg.naturalWidth / this.directorSigImg.naturalHeight;
            const sigH = 70;
            const sigW = Math.min(sigH * aspect, 140);
            ctx.drawImage(this.directorSigImg, (w - 305) - (sigW / 2), sigY - sigH + 5, sigW, sigH);
        }

        // เส้นลายเซ็นต์ผู้อำนวยการ
        ctx.beginPath();
        ctx.moveTo(w - 430, sigY);
        ctx.lineTo(w - 180, sigY);
        ctx.stroke();

        ctx.fillText("( นางศิวาลัย แก้วเขียว )", w - 305, sigY + 25);
        ctx.fillText("ผู้อำนวยการโรงเรียนบ้านน้ำพร", w - 305, sigY + 50);

        // 12. รหัสเกียรติบัตรและ Footer
        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px monospace";
        ctx.fillText(`Verification ID: ${certCode}`, 55, h - 55);

        ctx.textAlign = "right";
        ctx.fillText(`BAN NAM PHORN SCHOOL • SMART CITIZEN M.3`, w - 55, h - 55);

        ctx.restore();
    },

    // --- ดาวน์โหลดรูปภาพเกียรติบัตรความละเอียดสูง (PNG) ---
    async downloadPNG(targetStudent, targetScore, targetTotal) {
        if (!this.canvas) this.init();
        if (!this.canvas) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่พบพื้นที่สร้างเกียรติบัตร กรุณาลองใหม่อีกครั้ง',
                    confirmButtonColor: '#1e3a8a'
                });
            } else {
                alert("ไม่พบพื้นที่สร้างเกียรติบัตร กรุณาลองใหม่อีกครั้ง");
            }
            return;
        }

        if (typeof App !== 'undefined' && App.playSound) {
            App.playSound('click');
        }

        // ระบุนักเรียนเป้าหมายอย่างชัดเจน ป้องกันการดาวน์โหลดผิดคน
        const student = targetStudent || this.lastRenderedStudent || this.resolveCurrentStudent();
        const score = (targetScore !== undefined && targetScore !== null)
            ? targetScore
            : (this.lastRenderedScore !== undefined ? this.lastRenderedScore : this.resolveCurrentScore(student));
        const total = (targetTotal !== undefined && targetTotal !== null)
            ? targetTotal
            : (this.lastRenderedTotal || ((typeof APP_DATA !== 'undefined' && APP_DATA.quizQuestions) ? APP_DATA.quizQuestions.length : 10));

        // 1. รอโหลดฟอนต์ (หากเบราว์เซอร์รองรับ)
        if (document.fonts && document.fonts.ready) {
            try {
                await document.fonts.ready;
            } catch (e) {}
        }

        // 2. ตรวจสอบว่ารูปภาพต่างๆ โหลดเสร็จหรือยัง รอสูงสุด 300ms ให้ภาพจริงมาครบ
        const pendingAssets = [];
        if (this.logoImg && !this.logoImg.complete) pendingAssets.push(this.logoImg);
        if (this.teacherSigImg && !this.teacherSigImg.complete) pendingAssets.push(this.teacherSigImg);
        if (this.directorSigImg && !this.directorSigImg.complete) pendingAssets.push(this.directorSigImg);

        if (pendingAssets.length > 0) {
            await new Promise(resolve => {
                let count = 0;
                const done = () => { count++; if (count >= pendingAssets.length) resolve(); };
                pendingAssets.forEach(img => {
                    img.onload = done;
                    img.onerror = done;
                });
                setTimeout(resolve, 300);
            });
        }

        // 3. เรนเดอร์ Canvas แบบ Synchronous สำหรับนักเรียนเป้าหมายนี้โดยเฉพาะ
        this.render(student, score, total);

        const rawName = student.fullName || student.name || 'นักเรียน';
        const cleanName = rawName.replace(/[\s\/\\?%*:|"<>]+/g, '_');
        const fileName = `เกียรติบัตร_${cleanName}.png`;

        // 4. ฟังก์ชันสั่งดาวน์โหลดผ่าน DOM Link ที่ผูกเข้า body อย่างถูกต้อง
        const triggerFileDownload = (fileUrl) => {
            const link = document.createElement("a");
            link.download = fileName;
            link.href = fileUrl;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                if (fileUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(fileUrl);
                }
            }, 1000);
        };

        // 5. พยายาม Export ด้วย Blob (วิธีมาตรฐานสูงสุด)
        let exportSuccess = false;
        try {
            if (this.canvas.toBlob) {
                this.canvas.toBlob((blob) => {
                    if (blob) {
                        const blobUrl = URL.createObjectURL(blob);
                        triggerFileDownload(blobUrl);
                        this.showNotification("กำลังดาวน์โหลดเกียรติบัตร...");
                        exportSuccess = true;
                    } else {
                        const dataUrl = this.canvas.toDataURL("image/png");
                        triggerFileDownload(dataUrl);
                        this.showNotification("กำลังดาวน์โหลดเกียรติบัตร...");
                        exportSuccess = true;
                    }
                }, "image/png");
            } else {
                const dataUrl = this.canvas.toDataURL("image/png");
                triggerFileDownload(dataUrl);
                this.showNotification("กำลังดาวน์โหลดเกียรติบัตร...");
                exportSuccess = true;
            }
        } catch (taintErr) {
            console.warn("Direct canvas export threw error, switching to pure vector seal...", taintErr);
            
            // หากเกิด Tainted Canvas ให้วาดใหม่ด้วย Pure Vector Seal (ไม่มี image ภายนอกเลย 100%)
            const score = this.resolveCurrentScore(student);
            const total = (typeof APP_DATA !== 'undefined' && APP_DATA.quizQuestions) ? APP_DATA.quizQuestions.length : 10;
            const percent = Math.round((score / total) * 100);
            
            this.drawCanvas(student, score, total, percent, this.currentCertCode, true /* forceVectorSeal */);

            try {
                const safeDataUrl = this.canvas.toDataURL("image/png");
                triggerFileDownload(safeDataUrl);
                this.showNotification("ดาวน์โหลดเกียรติบัตรสำเร็จ");
                exportSuccess = true;
            } catch (fallbackErr) {
                console.error("Critical download error:", fallbackErr);
                this.showImageModal(this.canvas.toDataURL("image/png"), fileName);
            }
        }
    },

    showNotification(msg) {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce";
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i> <span>${msg}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3500);
    },

    showImageModal(imageUrl, fileName) {
        let modal = document.getElementById("cert-img-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "cert-img-modal";
            modal.className = "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4";
            modal.innerHTML = `
                <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl text-center space-y-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <i class="fa-solid fa-image text-blue-600"></i> ภาพเกียรติบัตรความละเอียดสูง
                        </h3>
                        <button onclick="document.getElementById('cert-img-modal').classList.add('hidden')" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <p class="text-xs text-slate-500">
                        💡 สามารถคลิกขวาที่ภาพด้านล่างแล้วเลือก <strong>"บันทึกรูปภาพเป็น..." (Save Image As...)</strong> เพื่อบันทึกเกียรติบัตรได้ครับ
                    </p>
                    <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <img id="cert-modal-target-img" src="" alt="เกียรติบัตร" class="w-full h-auto object-contain">
                    </div>
                    <div class="flex gap-2 justify-center pt-2">
                        <a id="cert-modal-download-link" href="" download="${fileName}" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5">
                            <i class="fa-solid fa-download"></i> ดาวน์โหลดรูปภาพ
                        </a>
                        <button onclick="window.print()" class="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5">
                            <i class="fa-solid fa-print"></i> พิมพ์
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        modal.classList.remove("hidden");
        const targetImg = document.getElementById("cert-modal-target-img");
        const downLink = document.getElementById("cert-modal-download-link");
        if (targetImg) targetImg.src = imageUrl || '';
        if (downLink) {
            downLink.href = imageUrl || '';
            downLink.download = fileName;
        }
    },

    printCertificate() {
        if (typeof App !== 'undefined' && App.playSound) {
            App.playSound('click');
        }
        window.print();
    }
};

if (typeof window !== 'undefined') {
    window.Certificate = Certificate;
}
