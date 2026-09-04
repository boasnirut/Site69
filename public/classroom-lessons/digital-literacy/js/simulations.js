/**
 * simulations.js
 * ลอจิกการทำงานของห้องปฏิบัติการจำลอง (Interactive Labs)
 * โรงเรียนบ้านน้ำพร
 */

const Simulations = {
    // --- LAB 1: Phishing Detective ---
    phishing: {
        currentIndex: 0,
        score: 0,
        answered: false,

        init() {
            this.currentIndex = 0;
            this.score = 0;
            this.answered = false;
            this.render();
        },

        render() {
            const container = document.getElementById("phishing-lab-content");
            if (!container) return;

            const items = APP_DATA.labs.phishing;
            const item = items[this.currentIndex];
            this.answered = false;

            const channelIcons = {
                sms: '<i class="fa-solid fa-comment-sms text-sky-500 mr-2"></i> ข้อความ SMS',
                email: '<i class="fa-solid fa-envelope text-amber-500 mr-2"></i> จดหมายอีเมล',
                chat: '<i class="fa-brands fa-line text-emerald-500 mr-2"></i> แอปพลิเคชันแชท'
            };

            container.innerHTML = `
                <div class="max-w-xl mx-auto">
                    <!-- Progress & Counter -->
                    <div class="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                        <span>คดีที่ ${this.currentIndex + 1} จาก ${items.length}</span>
                        <span class="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-bold">
                            คะแนนนักสืบ: ${this.score} / ${items.length}
                        </span>
                    </div>

                    <!-- Phone Frame Mockup -->
                    <div class="bg-slate-900 p-4 rounded-3xl shadow-2xl border-4 border-slate-700">
                        <!-- Phone Screen Header -->
                        <div class="bg-slate-800 rounded-t-2xl p-3 text-white flex items-center justify-between text-xs border-b border-slate-700">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                <span class="font-bold">${channelIcons[item.channel] || 'ข้อความแจ้งเตือน'}</span>
                            </div>
                            <span class="text-slate-400 font-mono">${item.time}</span>
                        </div>

                        <!-- Message Body inside phone -->
                        <div class="bg-slate-100 p-4 min-h-[160px] flex flex-col justify-between">
                            <div>
                                <div class="text-xs font-semibold text-slate-500 mb-1">
                                    ผู้ส่ง: <span class="text-slate-800">${item.sender}</span>
                                </div>
                                <div class="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-md text-slate-800 text-sm leading-relaxed border border-slate-200">
                                    ${item.message}
                                </div>
                            </div>
                            <div class="text-[11px] text-slate-400 text-right mt-2">
                                <i class="fa-solid fa-clock"></i> ได้รับเมื่อสักครู่
                            </div>
                        </div>

                        <!-- Action Choice Buttons -->
                        <div id="phishing-actions" class="bg-slate-800 p-3 rounded-b-2xl grid grid-cols-2 gap-3">
                            <button onclick="Simulations.phishing.checkAnswer(false)" class="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition">
                                <i class="fa-solid fa-shield-check"></i> ปลอดภัย (ของจริง)
                            </button>
                            <button onclick="Simulations.phishing.checkAnswer(true)" class="py-2.5 px-3 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition">
                                <i class="fa-solid fa-triangle-exclamation"></i> ฟิชชิ่ง / มิจฉาชีพ!
                            </button>
                        </div>
                    </div>

                    <!-- Detective Analysis Result Box (Hidden until answer) -->
                    <div id="phishing-result" class="hidden mt-4 transition-all"></div>
                </div>
            `;
        },

        checkAnswer(userChoiceIsScam) {
            if (this.answered) return;
            this.answered = true;

            const items = APP_DATA.labs.phishing;
            const item = items[this.currentIndex];
            const isCorrect = userChoiceIsScam === item.isScam;

            if (isCorrect) {
                this.score++;
                App.playSound('success');
            } else {
                App.playSound('error');
            }

            // Disable buttons
            const actions = document.getElementById("phishing-actions");
            if (actions) {
                actions.querySelectorAll("button").forEach(b => b.disabled = true);
                actions.classList.add("opacity-50");
            }

            const resultBox = document.getElementById("phishing-result");
            resultBox.classList.remove("hidden");

            const isLast = this.currentIndex === items.length - 1;

            resultBox.innerHTML = `
                <div class="p-4 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-rose-50 border-rose-400 text-rose-950'} shadow-md">
                    <div class="flex items-center gap-2 font-bold text-base mb-2">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'} text-xl"></i>
                        ${isCorrect ? 'วิเคราะห์ได้ถูกต้องยอดเยี่ยม!' : 'ยังไม่ถูกต้อง สังเกตดีๆ นะ!'}
                    </div>
                    <p class="text-xs mb-3 leading-relaxed">${item.explanation}</p>
                    
                    <div class="bg-white/80 p-3 rounded-xl border border-slate-200">
                        <div class="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                            <i class="fa-solid fa-magnifying-glass text-blue-600"></i> จุดสังเกตของนักสืบ (Clues):
                        </div>
                        <ul class="text-[11px] text-slate-700 list-disc list-inside space-y-1">
                            ${item.clues.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="mt-4 flex justify-end">
                        ${isLast ? `
                            <button onclick="Simulations.phishing.finish()" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2">
                                <i class="fa-solid fa-award"></i> ดูสรุปผลการไขคดี
                            </button>
                        ` : `
                            <button onclick="Simulations.phishing.next()" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2">
                                คดีถัดไป <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        `}
                    </div>
                </div>
            `;
        },

        next() {
            if (this.currentIndex < APP_DATA.labs.phishing.length - 1) {
                this.currentIndex++;
                this.render();
            }
        },

        finish() {
            const container = document.getElementById("phishing-lab-content");
            const total = APP_DATA.labs.phishing.length;
            const passed = this.score >= 3;

            if (passed) {
                App.playSound('fanfare');
                App.unlockBadge('phishing_master', 'นักสืบไซเบอร์ทองคำ');
            }

            container.innerHTML = `
                <div class="max-w-md mx-auto text-center p-6 bg-white rounded-3xl shadow-xl border border-slate-200">
                    <div class="w-20 h-20 mx-auto rounded-full ${passed ? 'bg-amber-100 text-amber-500' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-4xl mb-4">
                        <i class="fa-solid ${passed ? 'fa-shield-halved' : 'fa-rotate-right'}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-1">
                        ${passed ? 'ยินดีด้วย! คุณคือสุดยอดนักสืบฟิชชิ่ง' : 'เกือบผ่านแล้ว ลองทบทวนอีกนิดนะ'}
                    </h3>
                    <p class="text-xs text-slate-500 mb-4">
                        คุณไขคดีได้ถูกต้อง <strong>${this.score} จาก ${total} คดี</strong>
                    </p>
                    <div class="p-3 bg-blue-50 text-blue-900 rounded-xl text-xs text-left mb-5">
                        <i class="fa-solid fa-lightbulb text-blue-600 mr-1"></i> <strong>ข้อคิดเตือนใจ:</strong> <em>"ไม่เชื่อ ไม่รีบ ไม่โอน ไม่กดลิงก์แปลกปลอม"</em> คือเกราะป้องกันฟิชชิ่งที่ดีที่สุดของนักเรียนโรงเรียนบ้านน้ำพร
                    </div>
                    <div class="flex gap-2 justify-center">
                        <button onclick="Simulations.phishing.init()" class="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition">
                            <i class="fa-solid fa-rotate-left mr-1"></i> เล่นใหม่อีกครั้ง
                        </button>
                        <button onclick="App.switchLabTab('password')" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow">
                            ไปต่อ: ฐานทดสอบรหัสผ่าน <i class="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    },

    // --- LAB 2: Password Strength Analyzer ---
    password: {
        init() {
            const input = document.getElementById("pwd-lab-input");
            if (input) {
                input.addEventListener("input", () => this.analyze(input.value));
                this.analyze(input.value || "Namphorn2569!");
            }
        },

        setPreset(pwd) {
            const input = document.getElementById("pwd-lab-input");
            if (input) {
                input.value = pwd;
                this.analyze(pwd);
                App.playSound('click');
            }
        },

        toggleVisibility() {
            const input = document.getElementById("pwd-lab-input");
            const icon = document.getElementById("pwd-eye-icon");
            if (!input) return;
            if (input.type === "password") {
                input.type = "text";
                if (icon) icon.className = "fa-solid fa-eye-slash";
            } else {
                input.type = "password";
                if (icon) icon.className = "fa-solid fa-eye";
            }
        },

        generateSecurePassword() {
            const words = ["Namphorn", "Phitsanulok", "Cyber", "Safe", "Shield", "Smart", "Future", "Banyan"];
            const special = ["#", "!", "@", "$", "%", "&", "*"];
            const randomWord1 = words[Math.floor(Math.random() * words.length)];
            const randomWord2 = words[Math.floor(Math.random() * words.length)];
            const randomYear = Math.floor(Math.random() * 900) + 2100;
            const randomSymbol = special[Math.floor(Math.random() * special.length)];

            const newPwd = `${randomWord1}${randomSymbol}${randomWord2}${randomYear}!`;
            this.setPreset(newPwd);
            App.playSound('success');
            App.unlockBadge('pass_master', 'ผู้เชี่ยวชาญรหัสผ่านปลอดภัย');
        },

        analyze(pwd) {
            const length = pwd.length;
            const hasUpper = /[A-Z]/.test(pwd);
            const hasLower = /[a-z]/.test(pwd);
            const hasNumber = /[0-9]/.test(pwd);
            const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

            // คำนวณคะแนน
            let score = 0;
            if (length >= 6) score += 10;
            if (length >= 8) score += 15;
            if (length >= 12) score += 25;
            if (length >= 16) score += 15;
            if (hasUpper) score += 10;
            if (hasLower) score += 10;
            if (hasNumber) score += 15;
            if (hasSpecial) score += 15;

            // ตรวจสอบคำต้องห้าม / ง่ายเกิน
            const weakPresets = ["123456", "password", "qwerty", "admin", "111111", "namphorn"];
            if (weakPresets.includes(pwd.toLowerCase())) {
                score = 5;
            }

            score = Math.min(100, Math.max(5, score));

            // แสดงสถานะเช็คลิสต์
            this.updateCheckItem("check-len", length >= 12, `ความยาวอย่างน้อย 12 ตัวอักษร (ปัจจุบัน: ${length})`);
            this.updateCheckItem("check-upper", hasUpper, "มีตัวพิมพ์ใหญ่ (A-Z)");
            this.updateCheckItem("check-lower", hasLower, "มีตัวพิมพ์เล็ก (a-z)");
            this.updateCheckItem("check-num", hasNumber, "มีตัวเลข (0-9)");
            this.updateCheckItem("check-spec", hasSpecial, "มีอักขระพิเศษ (!@#$%^&*)");

            // อัปเดต Strength Bar และ Crack Time
            const bar = document.getElementById("pwd-strength-bar");
            const label = document.getElementById("pwd-strength-label");
            const timeSpan = document.getElementById("pwd-crack-time");
            const feedback = document.getElementById("pwd-feedback-text");

            let crackTime = "ทันที (0.001 วินาที)";
            let levelLabel = "เสี่ยงสูงมาก (อันตราย)";
            let barColor = "bg-rose-500";

            if (score < 25) {
                crackTime = "เสี้ยววินาที (Instant)";
                levelLabel = "อ่อนแอมาก (Very Weak)";
                barColor = "bg-rose-500";
                if (feedback) feedback.innerHTML = "❌ รหัสผ่านนี้แฮกเกอร์ใช้เครื่องมือสุ่มเดาได้ทันที ควรเพิ่มความยาวและผสมอักขระพิเศษ";
            } else if (score < 50) {
                crackTime = "ไม่กี่วินาทีถึงไม่กี่นาที";
                levelLabel = "อ่อนแอ (Weak)";
                barColor = "bg-amber-500";
                if (feedback) feedback.innerHTML = "⚠️ ยังคาดเดาได้ง่าย เพิ่มความยาวให้เกิน 12 ตัวอักษรจะช่วยได้มาก";
            } else if (score < 75) {
                crackTime = "ประมาณ 3 เดือน - 2 ปี";
                levelLabel = "ปานกลาง (Fair)";
                barColor = "bg-yellow-500";
                if (feedback) feedback.innerHTML = "⚡ ระดับปลอดภัยพอสมควร แต่ยังเพิ่มตัวพิมพ์ใหญ่และอักขระพิเศษเพื่อความอุ่นใจ";
            } else if (score < 90) {
                crackTime = "ประมาณ 200 ปี - 5,000 ปี";
                levelLabel = "แข็งแกร่ง (Strong)";
                barColor = "bg-emerald-500";
                if (feedback) feedback.innerHTML = "✅ ยอดเยี่ยม! รหัสผ่านนี้ปลอดภัยจากการโจมตีด้วยซูเปอร์คอมพิวเตอร์ทั่วไป";
            } else {
                crackTime = "มากกว่า 2,000,000 ปี!";
                levelLabel = "ปลอดภัยระดับสูงสุด (Military Grade)";
                barColor = "bg-indigo-600";
                if (feedback) feedback.innerHTML = '<i class="fa-solid fa-shield-halved text-emerald-600 mr-1"></i> สมบูรณ์แบบ! ปลอดภัยสูงมาก ต้องใช้เวลาหลายล้านปีในการแคร็กด้วย Brute Force';
            }

            if (bar) {
                bar.style.width = `${score}%`;
                bar.className = `h-full rounded-full transition-all duration-300 ${barColor}`;
            }
            if (label) {
                label.innerText = `${levelLabel} (${score}%)`;
            }
            if (timeSpan) {
                timeSpan.innerText = crackTime;
            }
        },

        updateCheckItem(id, passed, text) {
            const el = document.getElementById(id);
            if (!el) return;
            el.innerHTML = `
                <i class="fa-solid ${passed ? 'fa-check text-emerald-500' : 'fa-xmark text-slate-400'} mr-1.5"></i>
                <span class="${passed ? 'text-slate-800 font-medium' : 'text-slate-400'}">${text}</span>
            `;
        }
    },

    // --- LAB 3: Fact or Fake Social Feed ---
    factCheck: {
        currentIndex: 0,
        score: 0,
        answered: false,

        init() {
            this.currentIndex = 0;
            this.score = 0;
            this.answered = false;
            this.render();
        },

        render() {
            const container = document.getElementById("fact-lab-content");
            if (!container) return;

            const items = APP_DATA.labs.factCheck;
            const item = items[this.currentIndex];
            this.answered = false;

            container.innerHTML = `
                <div class="max-w-xl mx-auto">
                    <div class="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                        <span>ข่าวที่ ${this.currentIndex + 1} จาก ${items.length}</span>
                        <span class="bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-bold">
                            คะแนนคัดกรอง: ${this.score} / ${items.length}
                        </span>
                    </div>

                    <!-- Social Post Card Mockup -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <!-- Post Author Header -->
                        <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                    <i class="fa-solid ${item.imagePlaceholder}"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-800 text-sm leading-tight">${item.source}</h4>
                                    <span class="text-[11px] text-slate-400">${item.publishedDate} • <i class="fa-solid fa-earth-americas"></i> สาธารณะ</span>
                                </div>
                            </div>
                            <button class="text-slate-400 hover:text-slate-600 text-xs">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                        </div>

                        <!-- Post Content Body -->
                        <div class="p-5">
                            <h3 class="font-bold text-slate-900 text-base leading-snug mb-3">
                                ${item.title}
                            </h3>
                            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 text-3xl">
                                <i class="fa-solid ${item.imagePlaceholder}"></i>
                            </div>
                        </div>

                        <!-- Engagement Mockup -->
                        <div class="px-5 py-2 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
                            <span>👍 ถูกใจ 1.8k</span>
                            <span>ความคิดเห็น 342 รายการ • แชร์ 987 ครั้ง</span>
                        </div>

                        <!-- Action Decision Buttons -->
                        <div id="fact-actions" class="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-3">
                            <button onclick="Simulations.factCheck.checkAnswer(false)" class="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition active:scale-95">
                                <i class="fa-solid fa-check-circle"></i> ข่าวจริง / น่าเชื่อถือ
                            </button>
                            <button onclick="Simulations.factCheck.checkAnswer(true)" class="py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition active:scale-95">
                                <i class="fa-solid fa-triangle-exclamation"></i> ข่าวปลอม / บิดเบือน!
                            </button>
                        </div>
                    </div>

                    <!-- Result Panel -->
                    <div id="fact-result" class="hidden mt-4"></div>
                </div>
            `;
        },

        checkAnswer(userChoiceIsFake) {
            if (this.answered) return;
            this.answered = true;

            const items = APP_DATA.labs.factCheck;
            const item = items[this.currentIndex];
            const isCorrect = userChoiceIsFake === item.isFake;

            if (isCorrect) {
                this.score++;
                App.playSound('success');
            } else {
                App.playSound('error');
            }

            const actions = document.getElementById("fact-actions");
            if (actions) {
                actions.querySelectorAll("button").forEach(b => b.disabled = true);
                actions.classList.add("opacity-50");
            }

            const resultBox = document.getElementById("fact-result");
            resultBox.classList.remove("hidden");

            const isLast = this.currentIndex === items.length - 1;

            resultBox.innerHTML = `
                <div class="p-4 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-rose-50 border-rose-400 text-rose-950'} shadow-md">
                    <div class="flex items-center gap-2 font-bold text-sm mb-2">
                        <i class="fa-solid ${isCorrect ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'} text-lg"></i>
                        ${isCorrect ? 'ตัดสินใจได้ถูกต้องเยี่มยอด!' : 'ยังไม่ถูกต้อง สังเกตแหล่งข่าวดีๆ นะ'}
                        <span class="ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${item.isFake ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'}">
                            ${item.isFake ? 'เฉลย: ข่าวปลอม (Fake News)' : 'เฉลย: ข่าวจริง (Real News)'}
                        </span>
                    </div>

                    <div class="bg-white/90 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                        <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                            <i class="fa-solid fa-list-check text-blue-600"></i> ข้อเท็จจริงและการตรวจสอบ:
                        </div>
                        <ul class="list-disc list-inside space-y-1">
                            ${item.verificationPoints.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="mt-4 flex justify-end">
                        ${isLast ? `
                            <button onclick="Simulations.factCheck.finish()" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition">
                                ดูสรุปผลการคัดกรองข่าว <i class="fa-solid fa-award ml-1"></i>
                            </button>
                        ` : `
                            <button onclick="Simulations.factCheck.next()" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition">
                                ข่าวถัดไป <i class="fa-solid fa-arrow-right ml-1"></i>
                            </button>
                        `}
                    </div>
                </div>
            `;
        },

        next() {
            if (this.currentIndex < APP_DATA.labs.factCheck.length - 1) {
                this.currentIndex++;
                this.render();
            }
        },

        finish() {
            const container = document.getElementById("fact-lab-content");
            const total = APP_DATA.labs.factCheck.length;
            const passed = this.score >= 3;

            if (passed) {
                App.playSound('fanfare');
                App.unlockBadge('fact_checker', 'นักแยกแยะข่าวกรองไซเบอร์');
            }

            container.innerHTML = `
                <div class="max-w-md mx-auto text-center p-6 bg-white rounded-3xl shadow-xl border border-slate-200">
                    <div class="w-20 h-20 mx-auto rounded-full ${passed ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-4xl mb-4">
                        <i class="fa-solid ${passed ? 'fa-circle-check' : 'fa-rotate-right'}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-1">
                        ${passed ? 'ยอดเยี่ยม! ทักษะการคัดกรองข่าวผ่านเกณฑ์' : 'ลองฝึกวิเคราะห์อีกสักรอบนะ'}
                    </h3>
                    <p class="text-xs text-slate-500 mb-4">
                        คุณแยกแยะข่าวได้ถูกต้อง <strong>${this.score} จาก ${total} ข่าว</strong>
                    </p>
                    <div class="p-3 bg-indigo-50 text-indigo-900 rounded-xl text-xs text-left mb-5">
                        <i class="fa-solid fa-newspaper text-indigo-600 mr-1"></i> <strong>หลักคิดสำคัญ:</strong> <em>"ชัวร์ก่อนแชร์ ค้นกูเกิลหาที่มา และดูโดเมนทางการ (.go.th, .or.th, .ac.th)"</em> จะช่วยให้นักเรียน ม.3 ไม่ตกเป็นเหยื่อข่าวปลอม
                    </div>
                    <div class="flex gap-2 justify-center">
                        <button onclick="Simulations.factCheck.init()" class="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition">
                            <i class="fa-solid fa-rotate-left mr-1"></i> เล่นใหม่
                        </button>
                        <button onclick="App.switchLabTab('scenario')" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition shadow">
                            ไปต่อ: สถานการณ์หยุดบูลลี่ <i class="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    },

    // --- LAB 4: Scenario Choice / Dilemma ---
    scenario: {
        currentIndex: 0,
        score: 0,
        answered: false,

        init() {
            this.currentIndex = 0;
            this.score = 0;
            this.answered = false;
            this.render();
        },

        render() {
            const container = document.getElementById("scenario-lab-content");
            if (!container) return;

            const items = APP_DATA.labs.scenarios;
            const item = items[this.currentIndex];
            this.answered = false;

            container.innerHTML = `
                <div class="max-w-xl mx-auto">
                    <div class="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                        <span>สถานการณ์ที่ ${this.currentIndex + 1} จาก ${items.length}</span>
                        <span class="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold">
                            แต้มจริยธรรม: ${this.score} แต้ม
                        </span>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div class="bg-amber-500 p-4 text-white">
                            <h3 class="font-bold text-base flex items-center gap-2">
                                <i class="fa-solid fa-comments"></i> ${item.title}
                            </h3>
                        </div>

                        <div class="p-5">
                            <div class="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-xl text-slate-800 text-sm leading-relaxed mb-4">
                                ${item.context}
                            </div>
                            <h4 class="font-bold text-slate-900 text-sm mb-3">
                                <i class="fa-solid fa-circle-question text-amber-600 mr-1"></i> ${item.question}
                            </h4>

                            <div class="space-y-2.5" id="scenario-choices">
                                ${item.choices.map((c, idx) => `
                                    <button onclick="Simulations.scenario.choose(${idx})" class="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/60 active:scale-[0.99] transition text-xs text-slate-800 flex items-start gap-2.5">
                                        <span class="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center font-bold shrink-0 text-[11px]">
                                            ${String.fromCharCode(65 + idx)}
                                        </span>
                                        <span class="pt-0.5 leading-relaxed">${c.text}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div id="scenario-result" class="hidden mt-4"></div>
                </div>
            `;
        },

        choose(choiceIdx) {
            if (this.answered) return;
            this.answered = true;

            const items = APP_DATA.labs.scenarios;
            const item = items[this.currentIndex];
            const choice = item.choices[choiceIdx];

            this.score += choice.score;
            if (choice.score >= 80) {
                App.playSound('success');
            } else {
                App.playSound('error');
            }

            const choicesDiv = document.getElementById("scenario-choices");
            if (choicesDiv) {
                choicesDiv.querySelectorAll("button").forEach((btn, idx) => {
                    btn.disabled = true;
                    if (idx === choiceIdx) {
                        btn.classList.add(choice.score >= 80 ? "border-emerald-500" : "border-rose-500", "bg-slate-50");
                    } else {
                        btn.classList.add("opacity-40");
                    }
                });
            }

            const resultBox = document.getElementById("scenario-result");
            resultBox.classList.remove("hidden");

            const isLast = this.currentIndex === items.length - 1;

            resultBox.innerHTML = `
                <div class="p-4 rounded-2xl border-2 ${choice.score >= 80 ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-rose-50 border-rose-400 text-rose-950'} shadow-md">
                    <p class="text-xs font-semibold leading-relaxed mb-3">${choice.feedback}</p>
                    <div class="flex justify-end">
                        ${isLast ? `
                            <button onclick="Simulations.scenario.finish()" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow transition">
                                ดูสรุปผลภารกิจ <i class="fa-solid fa-award ml-1"></i>
                            </button>
                        ` : `
                            <button onclick="Simulations.scenario.next()" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow transition">
                                สถานการณ์ถัดไป <i class="fa-solid fa-arrow-right ml-1"></i>
                            </button>
                        `}
                    </div>
                </div>
            `;
        },

        next() {
            if (this.currentIndex < APP_DATA.labs.scenarios.length - 1) {
                this.currentIndex++;
                this.render();
            }
        },

        finish() {
            const container = document.getElementById("scenario-lab-content");
            const passed = this.score >= 150;

            if (passed) {
                App.playSound('fanfare');
                App.unlockBadge('upstander', 'ฮีโร่ผู้พิทักษ์เพื่อนไซเบอร์');
            }

            container.innerHTML = `
                <div class="max-w-md mx-auto text-center p-6 bg-white rounded-3xl shadow-xl border border-slate-200">
                    <div class="w-20 h-20 mx-auto rounded-full ${passed ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-4xl mb-4">
                        <i class="fa-solid ${passed ? 'fa-heart-circle-check' : 'fa-rotate-right'}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-1">
                        ${passed ? 'ขอชื่นชม! คุณมีจิตสำนึกพลเมืองดิจิทัลชั้นยอด' : 'ลองฝึกตัดสินใจอีกครั้งนะ'}
                    </h3>
                    <p class="text-xs text-slate-500 mb-4">
                        คะแนนจิตสำนึกทางดิจิทัล: <strong>${this.score} แต้ม</strong>
                    </p>
                    <div class="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs text-left mb-5">
                        <i class="fa-solid fa-hand-holding-heart text-amber-600 mr-1"></i> <strong>คติประจำใจนักเรียนบ้านน้ำพร:</strong> <em>"การไม่ร่วมมือกับการบูลลี่ และกล้าที่จะช่วยเหลือเพื่อน (Upstander) คือพลังสร้างสังคมออนไลน์ที่น่าอยู่"</em>
                    </div>
                    <div class="flex gap-2 justify-center">
                        <button onclick="Simulations.scenario.init()" class="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition">
                            <i class="fa-solid fa-rotate-left mr-1"></i> ลองใหม่
                        </button>
                        <button onclick="App.navigateTo('posttest')" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow">
                            ไปทำแบบทดสอบหลังเรียน (Post-test) <i class="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    }
};
