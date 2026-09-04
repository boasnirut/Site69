/**
 * packaging-cert.js
 * ระบบสร้างและพิมพ์เกียรติบัตร "นวัตกรอาชีพดิจิทัล (Smart Packaging ด้วย NFC Tag)"
 * โรงเรียนบ้านน้ำพร สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1
 * 
 * รองรับเลขอาราบิก 100%, ภาพลายเซ็นจริง, และการเรนเดอร์แบบ Synchronous ป้องกันหน้าเปล่า
 */

const PackagingCert = {
    canvas: null,
    ctx: null,
    logoImg: null,
    teacherSigImg: null,
    directorSigImg: null,
    isRendered: false,
    currentCertCode: '',

    init() {
        if (!this.canvas) {
            this.canvas = document.getElementById("pkg-cert-canvas") || document.getElementById("cert-canvas");
        }
        if (!this.canvas && typeof document !== 'undefined') {
            this.canvas = document.createElement("canvas");
            this.canvas.id = "pkg-cert-canvas";
            this.canvas.width = 1200;
            this.canvas.height = 850;
        }
        if (this.canvas && !this.ctx) {
            this.ctx = this.canvas.getContext("2d");
        }
        this.preloadAssets();
    },

    preloadAssets() {
        if (!this.logoImg) {
            this.logoImg = new Image();
            const src = (typeof SCHOOL_LOGO_DATA_URL !== 'undefined' && SCHOOL_LOGO_DATA_URL) 
                ? SCHOOL_LOGO_DATA_URL 
                : '1-small.png';
            if (!src.startsWith('data:')) this.logoImg.crossOrigin = "anonymous";
            this.logoImg.src = src;
        }

        if (!this.teacherSigImg) {
            this.teacherSigImg = new Image();
            const tSrc = (typeof TEACHER_SIGNATURE_DATA_URL !== 'undefined' && TEACHER_SIGNATURE_DATA_URL)
                ? TEACHER_SIGNATURE_DATA_URL
                : 'ลายเซ็น นิรุทธิ์.png';
            if (!tSrc.startsWith('data:')) this.teacherSigImg.crossOrigin = "anonymous";
            this.teacherSigImg.src = tSrc;
        }

        if (!this.directorSigImg) {
            this.directorSigImg = new Image();
            const dSrc = (typeof DIRECTOR_SIGNATURE_DATA_URL !== 'undefined' && DIRECTOR_SIGNATURE_DATA_URL)
                ? DIRECTOR_SIGNATURE_DATA_URL
                : 'ลายเซ็น ผอ.ศิวาลัย.png';
            if (!dSrc.startsWith('data:')) this.directorSigImg.crossOrigin = "anonymous";
            this.directorSigImg.src = dSrc;
        }
    },

    getThaiDate(dateObj) {
        if (!dateObj) {
            const student = PackagingApp.state ? PackagingApp.state.student : null;
            const allProgress = (PackagingApp && PackagingApp.getAllStudentsProgress) ? PackagingApp.getAllStudentsProgress() : {};
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
        if (percent >= 80) return "ดีเยี่ยม (Excellent Innovator)";
        if (percent >= 70) return "ดี (Good Innovator)";
        if (percent >= 60) return "ผ่านเกณฑ์ (Passed)";
        return "ควรพัฒนาเพิ่มเติม";
    },

    resolveCurrentStudent() {
        let student = (typeof PackagingApp !== 'undefined' && PackagingApp.state) ? PackagingApp.state.student : null;
        if (student && student.studentId && student.studentId !== "") {
            return student;
        }
        const guestStored = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem("PKG_GUEST_STUDENT") : null;
        if (guestStored) {
            try {
                const parsed = JSON.parse(guestStored);
                if (parsed && (parsed.studentId === "0000" || parsed.isGuest)) return parsed;
            } catch(e) {}
        }
        if (this.lastRenderedStudent) return this.lastRenderedStudent;
        const sessionActive = (typeof sessionStorage !== 'undefined') && sessionStorage.getItem("PKG_SESSION_LOGGED_IN") === "true";
        const activeId = (sessionActive && typeof localStorage !== 'undefined') ? localStorage.getItem("PKG_ACTIVE_STUDENT_ID") : null;
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
        if (activeId && typeof PACKAGING_DATA !== 'undefined' && PACKAGING_DATA.studentsM3) {
            const found = PACKAGING_DATA.studentsM3.find(s => s.studentId === activeId);
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
        const sid = student ? student.studentId : (typeof PackagingApp !== 'undefined' && PackagingApp.state && PackagingApp.state.student ? PackagingApp.state.student.studentId : null);
        let score = null;
        if (sid && typeof PackagingApp !== 'undefined' && PackagingApp.getAllStudentsProgress) {
            const allProgress = PackagingApp.getAllStudentsProgress();
            const p = allProgress[sid];
            if (p && p.posttestScore !== undefined && p.posttestScore !== null) {
                score = p.posttestScore;
            }
        }
        if (score === null && sid && typeof DEMO_PACKAGING_PROGRESS !== 'undefined') {
            if (DEMO_PACKAGING_PROGRESS[sid] && DEMO_PACKAGING_PROGRESS[sid].posttestScore !== undefined) {
                score = DEMO_PACKAGING_PROGRESS[sid].posttestScore;
            }
        }
        if (score === null && typeof PackagingApp !== 'undefined' && PackagingApp.state) {
            if (PackagingApp.state.posttestScore !== null && PackagingApp.state.posttestScore !== undefined) {
                score = PackagingApp.state.posttestScore;
            } else if (PackagingApp.state.progress && PackagingApp.state.progress.posttestScore !== null && PackagingApp.state.progress.posttestScore !== undefined) {
                score = PackagingApp.state.progress.posttestScore;
            }
        }
        return (score !== null && score !== undefined) ? score : 8;
    },

    render(targetStudent, targetScore, targetTotal) {
        if (!this.canvas) this.init();

        const student = targetStudent || this.resolveCurrentStudent();
        const score = (targetScore !== undefined && targetScore !== null) ? targetScore : this.resolveCurrentScore(student);
        const total = (targetTotal !== undefined && targetTotal !== null) ? targetTotal : ((typeof PACKAGING_DATA !== 'undefined' && PACKAGING_DATA.quizQuestions) ? PACKAGING_DATA.quizQuestions.length : 10);
        const percent = Math.round((score / total) * 100);
        this.lastRenderedStudent = student;
        this.lastRenderedScore = score;
        this.lastRenderedTotal = total;

        const isGuest = student.studentId === "0000" || student.isGuest;
        const certCode = isGuest ? "NP-NFC69-0000" : `NP-NFC69-${student.studentId || Math.floor(1000 + Math.random() * 9000)}`;
        this.currentCertCode = certCode;

        // Preview DOM update (รองรับทั้ง pkg-cert-preview-* และ cert-preview-*)
        const nameEls = [document.getElementById("pkg-cert-preview-name"), document.getElementById("cert-preview-name")];
        const classEls = [document.getElementById("pkg-cert-preview-class"), document.getElementById("cert-preview-class")];
        const scoreEls = [document.getElementById("pkg-cert-preview-score"), document.getElementById("cert-preview-score")];
        const dateEls = [document.getElementById("pkg-cert-preview-date"), document.getElementById("cert-preview-date")];
        const codeEls = [document.getElementById("pkg-cert-preview-code"), document.getElementById("cert-preview-code")];

        const fullStudentName = student.fullName || `${student.title || ''}${student.name || 'นักเรียนโรงเรียนบ้านน้ำพร'}`;
        const studentNo = student.no || student.number || '1';
        const gradeText = this.getGradeLabel(percent);
        const dateText = this.getThaiDate();

        nameEls.forEach(el => { if (el) el.innerText = fullStudentName; });
        const classLabel = isGuest ? "แขก / ห้องเรียน ม.3" : `มัธยมศึกษาปีที่ 3 เลขที่ ${studentNo}`;
        classEls.forEach(el => { if (el) el.innerText = classLabel; });
        scoreEls.forEach(el => { if (el) el.innerText = `ผลการประเมินนวัตกร: ${score} / ${total} คะแนน (${percent}%) - ระดับ ${gradeText}`; });
        dateEls.forEach(el => { if (el) el.innerText = dateText; });
        codeEls.forEach(el => { if (el) el.innerText = `รหัสอ้างอิง: ${certCode}`; });

        // Render Canvas Synchronously
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

        // 1. Background
        const bgGrad = ctx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, "#ffffff");
        bgGrad.addColorStop(0.5, "#f0fdf4"); // Emerald tint
        bgGrad.addColorStop(1, "#f8fafc");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. Borders
        ctx.lineWidth = 14;
        ctx.strokeStyle = "#065f46"; // Dark Emerald
        ctx.strokeRect(25, 25, w - 50, h - 50);

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#d97706"; // Gold
        ctx.strokeRect(38, 38, w - 76, h - 76);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#cbd5e1";
        ctx.strokeRect(44, 44, w - 88, h - 88);

        // 3. Corners
        this.drawCorner(ctx, 44, 44, 1, 1);
        this.drawCorner(ctx, w - 44, 44, -1, 1);
        this.drawCorner(ctx, 44, h - 44, 1, -1);
        this.drawCorner(ctx, w - 44, h - 44, -1, -1);

        // 4. Logo
        let logoDrawn = false;
        if (!forceVectorSeal && this.logoImg && this.logoImg.complete && this.logoImg.naturalWidth > 0) {
            try {
                ctx.drawImage(this.logoImg, (w / 2) - 55, 55, 110, 110);
                logoDrawn = true;
            } catch (e) {}
        }
        if (!logoDrawn) {
            this.drawVectorSeal(ctx, w / 2, 110, 48);
        }

        // 5. Draw text content synchronously
        this.drawTextContent(ctx, w, h, student, score, total, percent, certCode);
        this.isRendered = true;
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

    drawVectorSeal(ctx, cx, cy, r) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "#d97706";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
        ctx.fillStyle = "#065f46";
        ctx.fill();

        // Laurel
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r - 10, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r - 10, 1.2 * Math.PI, 1.8 * Math.PI);
        ctx.stroke();

        // NFC waves in center
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, -0.3 * Math.PI, 0.3 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 22, -0.3 * Math.PI, 0.3 * Math.PI);
        ctx.stroke();

        ctx.restore();
    },

    drawTextContent(ctx, w, h, student, score, total, percent, certCode) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const schoolName = "โรงเรียนบ้านน้ำพร สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1";
        const motto = "นตฺถิ ปญฺญา สมา อาภา (ไม่มีแสงสว่างใดเสมอด้วยปัญญา)";

        // 1. School & Service Area
        ctx.fillStyle = "#065f46";
        ctx.font = "bold 24px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(schoolName, w / 2, 195);

        // 2. Motto
        ctx.fillStyle = "#64748b";
        ctx.font = "italic 15px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(motto, w / 2, 225);

        // 3. Title
        ctx.fillStyle = "#d97706";
        ctx.font = "bold 28px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("ประกาศนียบัตรนวัตกรอาชีพดิจิทัล (Digital Career Innovator)", w / 2, 275);

        ctx.fillStyle = "#475569";
        ctx.font = "18px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("ให้ไว้เพื่อแสดงว่า", w / 2, 310);

        // 4. Student Full Name
        const fullName = student.fullName || `${student.title || ''}${student.name || 'นักเรียนโรงเรียนบ้านน้ำพร'}`;
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 38px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(fullName, w / 2, 360);

        // 5. Class & Student No (Arabic numbers 100%)
        ctx.fillStyle = "#334155";
        ctx.font = "20px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        const studentNo = student.no || student.number || '1';
        const isGuestCanvas = student.studentId === "0000" || student.isGuest;
        const classCanvasStr = isGuestCanvas ? "ผู้เยี่ยมชม / ทดลองเรียนรู้ ม.3" : `ชั้นมัธยมศึกษาปีที่ 3  เลขที่ ${studentNo}`;
        ctx.fillText(classCanvasStr, w / 2, 405);

        // 6. Certification Text
        ctx.fillStyle = "#1e293b";
        ctx.font = "20px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("ได้ผ่านการเรียนรู้และการพัฒนาทักษะนวัตกรอาชีพดิจิทัล", w / 2, 450);

        // 7. Course Subject
        ctx.fillStyle = "#065f46";
        ctx.font = "bold 23px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("ผ่านการสร้างสรรค์ \"บรรจุภัณฑ์อัจฉริยะ (Smart Packaging)\" ด้วยเทคโนโลยี NFC Tag เชื่อมโยงผลิตภัณฑ์ชุมชน", w / 2, 490);

        // 8. Department
        ctx.fillStyle = "#475569";
        ctx.font = "17px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText("กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี (การออกแบบและเทคโนโลยี) ประจำปีการศึกษา 2569", w / 2, 530);

        // 9. Score & Evaluation
        ctx.fillStyle = "#047857";
        ctx.font = "bold 20px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(`ผลการประเมิน: ${score} / ${total} คะแนน (ร้อยละ ${percent}) • ระดับ ${this.getGradeLabel(percent)}`, w / 2, 575);

        // 10. Date
        ctx.fillStyle = "#64748b";
        ctx.font = "17px 'Prompt', 'Kanit', 'Sarabun', sans-serif";
        ctx.fillText(this.getThaiDate(), w / 2, 620);

        // 11. Signatures
        const sigY = 715;

        // Teacher signature
        if (this.teacherSigImg && this.teacherSigImg.complete && this.teacherSigImg.naturalWidth > 0) {
            const aspect = this.teacherSigImg.naturalWidth / this.teacherSigImg.naturalHeight;
            const sigH = 65;
            const sigW = Math.min(sigH * aspect, 120);
            ctx.drawImage(this.teacherSigImg, 305 - (sigW / 2), sigY - sigH + 5, sigW, sigH);
        }

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

        // Director signature
        if (this.directorSigImg && this.directorSigImg.complete && this.directorSigImg.naturalWidth > 0) {
            const aspect = this.directorSigImg.naturalWidth / this.directorSigImg.naturalHeight;
            const sigH = 70;
            const sigW = Math.min(sigH * aspect, 140);
            ctx.drawImage(this.directorSigImg, (w - 305) - (sigW / 2), sigY - sigH + 5, sigW, sigH);
        }

        ctx.beginPath();
        ctx.moveTo(w - 430, sigY);
        ctx.lineTo(w - 180, sigY);
        ctx.stroke();

        ctx.fillText("( นางศิวาลัย แก้วเขียว )", w - 305, sigY + 25);
        ctx.fillText("ผู้อำนวยการโรงเรียนบ้านน้ำพร", w - 305, sigY + 50);

        // 12. Verification & Footer
        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px monospace";
        ctx.fillText(`Verification ID: ${certCode}`, 55, h - 55);

        ctx.textAlign = "right";
        ctx.fillText(`BAN NAM PHORN SCHOOL • DIGITAL CAREER INNOVATOR M.3`, w - 55, h - 55);

        ctx.restore();
    },

    async downloadPNG(targetStudent, targetScore, targetTotal) {
        if (!this.canvas) this.init();
        if (!this.canvas) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่พบพื้นที่สร้างเกียรติบัตร กรุณาลองใหม่อีกครั้ง',
                    confirmButtonColor: '#065f46'
                });
            } else {
                alert("ไม่พบพื้นที่สร้างเกียรติบัตร กรุณาลองใหม่อีกครั้ง");
            }
            return;
        }

        if (typeof PackagingApp !== 'undefined' && PackagingApp.playSound) {
            PackagingApp.playSound('click');
        }

        const student = targetStudent || this.lastRenderedStudent || this.resolveCurrentStudent();
        const score = (targetScore !== undefined && targetScore !== null)
            ? targetScore
            : (this.lastRenderedScore !== undefined ? this.lastRenderedScore : this.resolveCurrentScore(student));
        const total = (targetTotal !== undefined && targetTotal !== null)
            ? targetTotal
            : (this.lastRenderedTotal || 10);
        const percent = Math.round((score / total) * 100);

        if (document.fonts && document.fonts.ready) {
            try { await document.fonts.ready; } catch (e) {}
        }

        const pending = [];
        if (this.logoImg && !this.logoImg.complete) pending.push(this.logoImg);
        if (this.teacherSigImg && !this.teacherSigImg.complete) pending.push(this.teacherSigImg);
        if (this.directorSigImg && !this.directorSigImg.complete) pending.push(this.directorSigImg);

        if (pending.length > 0) {
            await new Promise(resolve => {
                let count = 0;
                const done = () => { count++; if (count >= pending.length) resolve(); };
                pending.forEach(img => { img.onload = done; img.onerror = done; });
                setTimeout(resolve, 300);
            });
        }

        this.render(student, score, total);

        const rawName = student.fullName || student.name || 'นักเรียน';
        const cleanName = rawName.replace(/[\s\/\\?%*:|"<>]+/g, '_');
        const fileName = `เกียรติบัตรนวัตกรNFC_${cleanName}.png`;

        const triggerDownload = (fileUrl) => {
            const link = document.createElement("a");
            link.download = fileName;
            link.href = fileUrl;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                if (fileUrl.startsWith("blob:")) URL.revokeObjectURL(fileUrl);
            }, 1000);
        };

        const doVectorFallback = () => {
            try {
                this.drawCanvas(student, score, total, percent, this.currentCertCode, true);
                if (this.canvas.toBlob) {
                    this.canvas.toBlob((b) => {
                        if (b) {
                            triggerDownload(URL.createObjectURL(b));
                            this.showNotification("ดาวน์โหลดเกียรติบัตรสำเร็จ");
                        } else {
                            triggerDownload(this.canvas.toDataURL("image/png"));
                            this.showNotification("ดาวน์โหลดเกียรติบัตรสำเร็จ");
                        }
                    }, "image/png");
                } else {
                    triggerDownload(this.canvas.toDataURL("image/png"));
                    this.showNotification("ดาวน์โหลดเกียรติบัตรสำเร็จ");
                }
            } catch (fallbackErr) {
                console.error("Vector fallback export failed, opening image modal", fallbackErr);
                try {
                    this.showImageModal(this.canvas.toDataURL("image/png"), fileName);
                } catch(e) {}
            }
        };

        try {
            if (this.canvas.toBlob) {
                this.canvas.toBlob((blob) => {
                    try {
                        if (blob) {
                            triggerDownload(URL.createObjectURL(blob));
                            this.showNotification("กำลังดาวน์โหลดเกียรติบัตร...");
                        } else {
                            triggerDownload(this.canvas.toDataURL("image/png"));
                            this.showNotification("กำลังดาวน์โหลดเกียรติบัตร...");
                        }
                    } catch (errInside) {
                        console.warn("toBlob export failed, trying vector seal fallback", errInside);
                        doVectorFallback();
                    }
                }, "image/png");
            } else {
                triggerDownload(this.canvas.toDataURL("image/png"));
                this.showNotification("กำลังดาวน์โหลดเกียรติบัตร...");
            }
        } catch (errOutside) {
            console.warn("Direct export failed, trying vector seal fallback", errOutside);
            doVectorFallback();
        }
    },

    showNotification(msg) {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce";
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i> <span>${msg}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    },

    showImageModal(imageUrl, fileName) {
        let modal = document.getElementById("pkg-cert-img-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "pkg-cert-img-modal";
            modal.className = "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4";
            modal.innerHTML = `
                <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl text-center space-y-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h3 class="font-bold text-slate-900 text-sm">เกียรติบัตรนวัตกรอาชีพดิจิทัล</h3>
                        <button onclick="document.getElementById('pkg-cert-img-modal').classList.add('hidden')" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <img id="pkg-modal-img" src="${imageUrl}" alt="เกียรติบัตร" class="w-full h-auto rounded-xl border">
                    <div class="flex justify-center gap-2 pt-2">
                        <a id="pkg-modal-link" href="${imageUrl}" download="${fileName}" class="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow">
                            <i class="fa-solid fa-download"></i> ดาวน์โหลดรูปภาพ
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        modal.classList.remove("hidden");
    },

    printCertificate() {
        if (typeof PackagingApp !== 'undefined' && PackagingApp.playSound) {
            PackagingApp.playSound('click');
        }
        window.print();
    }
};

if (typeof window !== 'undefined') {
    window.PackagingCert = PackagingCert;
}
