/**
 * packaging-sim.js
 * ฐานปฏิบัติการจำลองเสมือนจริง 4 ฐาน (Interactive Virtual Labs)
 * โครงการบรรจุภัณฑ์อัจฉริยะ (Smart Packaging) ด้วย NFC Tag
 * โรงเรียนบ้านน้ำพร สพป.เลย เขต 1
 */

const PackagingSim = {
    currentLab: 'writer',
    writtenTags: {},

    init() {
        this.renderLab1();
        this.renderLab2();
        this.renderLab3();
        this.renderLab4();
    },

    // =========================================================================
    // ฐานที่ 1: NFC Tag Programmer & Encoder Simulator
    // =========================================================================
    renderLab1() {
        const container = document.getElementById("lab-container-writer");
        if (!container) return;

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Control Panel -->
                <div class="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div class="flex items-center justify-between border-b pb-3">
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </span>
                            <div>
                                <h3 class="font-bold text-slate-900 text-sm">เครื่องจำลองการเขียนข้อมูลลงชิป NFC (NFC Encoder)</h3>
                                <p class="text-[11px] text-slate-500">บันทึกข้อมูลมาตรฐาน NDEF สู่สติกเกอร์ NTAG213</p>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px] border border-emerald-200">
                            Ready to Write
                        </span>
                    </div>

                    <!-- Select Product -->
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">1. เลือกผลิตภัณฑ์ชุมชนบ้านน้ำพร:</label>
                        <select id="writer-product-select" onchange="PackagingSim.onWriterProductChange(this.value)" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-blue-600 transition">
                            <option value="cotton">ผ้าฝ้ายทอมือย้อมสีธรรมชาติ (กลุ่มทอผ้าสตรีบ้านน้ำพร)</option>
                            <option value="macadamia">มะคาเดเมียคั่วอบธรรมชาติ (เชิงดอยภูหลวง)</option>
                            <option value="coffee">กาแฟอาราบิกาดริปดอยน้ำพร (เมล็ดกาแฟสร้างป่า)</option>
                            <option value="honey">น้ำผึ้งป่าเดือนห้าอินทรีย์ (ป่าชุมชนบ้านน้ำพร)</option>
                        </select>
                    </div>

                    <!-- NDEF Record Type -->
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">2. รูปแบบเรคคอร์ด (NDEF Type):</label>
                            <select id="writer-ndef-type" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                                <option value="uri">URI / Web URL (แนะนำสูงสุด)</option>
                                <option value="text">Plain Text (ข้อความสั้น)</option>
                                <option value="vcard">Digital Contact (vCard ผู้ผลิต)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">3. ชนิดชิป NFC (Tag IC):</label>
                            <select id="writer-ic-type" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                                <option value="ntag213">NTAG213 (144 bytes) - มาตรฐาน</option>
                                <option value="ntag215">NTAG215 (504 bytes) - ความจุกลาง</option>
                                <option value="antimetal">Anti-Metal Tag (สำหรับขวด/กระป๋อง)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Payload URL -->
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">4. ข้อมูล URL หน้าร้านดิจิทัล (Digital Landing Page):</label>
                        <div class="relative">
                            <i class="fa-solid fa-link absolute left-3 top-3 text-slate-400 text-xs"></i>
                            <input id="writer-payload-input" type="text" value="https://bannamphorn.ac.th/product/cotton-craft" class="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 font-mono text-emerald-900">
                        </div>
                    </div>

                    <!-- Security Option -->
                    <div class="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-shield-halved text-amber-600"></i>
                            <span class="text-amber-900 font-semibold">ล็อกชิปแบบอ่านอย่างเดียว (Lock Read-Only):</span>
                        </div>
                        <input id="writer-lock-checkbox" type="checkbox" class="w-4 h-4 text-amber-600 rounded">
                    </div>

                    <!-- Action Button -->
                    <button onclick="PackagingSim.executeWriteTag()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-satellite-dish animate-pulse"></i>
                        <span>เริ่มเขียนข้อมูลลงชิป NFC (Write NDEF Tag)</span>
                    </button>
                </div>

                <!-- Simulation Visualizer Card -->
                <div class="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl text-white flex flex-col justify-between shadow-xl relative overflow-hidden border border-slate-800">
                    <div class="absolute -right-8 -top-8 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none"></div>

                    <div>
                        <div class="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800 pb-2">
                            <span class="flex items-center gap-1.5"><i class="fa-solid fa-microchip text-cyan-400"></i> NFC Antenna Virtual Status</span>
                            <span id="writer-status-pill" class="text-emerald-400 font-mono font-bold">STANDBY</span>
                        </div>

                        <!-- Virtual Tag Hologram -->
                        <div class="text-center py-6">
                            <div id="virtual-nfc-chip" class="w-28 h-28 mx-auto rounded-full bg-slate-800/80 border-2 border-cyan-400/50 flex flex-col items-center justify-center relative shadow-lg shadow-cyan-500/10 transition duration-500">
                                <div id="nfc-pulse-ring" class="absolute inset-0 rounded-full border border-cyan-400 opacity-0 transition"></div>
                                <i class="fa-solid fa-wifi text-cyan-300 text-3xl rotate-90 mb-1"></i>
                                <span class="text-[10px] font-mono text-cyan-200 uppercase font-bold tracking-wider">NTAG213</span>
                                <span class="text-[9px] text-slate-400 font-mono">13.56 MHz</span>
                            </div>
                            <div id="writer-feedback-text" class="text-xs text-slate-300 mt-4 font-mono min-h-[38px] flex items-center justify-center px-4">
                                พร้อมส่งคลื่นแม่เหล็กไฟฟ้าเพื่อเบิร์นข้อมูล NDEF
                            </div>
                        </div>
                    </div>

                    <!-- Sector Logs -->
                    <div class="bg-black/50 p-3 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                        <div class="flex justify-between text-slate-500">
                            <span>UID: <span id="log-uid" class="text-cyan-300">04:8A:2F:C9:10:60:80</span></span>
                            <span>Memory: <span class="text-emerald-400">144 / 144 B</span></span>
                        </div>
                        <div class="truncate text-[10px]">
                            Payload: <span id="log-payload" class="text-slate-300">https://bannamphorn.ac.th/...</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    onWriterProductChange(productId) {
        const p = PACKAGING_DATA.communityProducts.find(x => x.id === productId);
        if (!p) return;
        const input = document.getElementById("writer-payload-input");
        if (input) input.value = p.nfcPayload;
    },

    executeWriteTag() {
        const prodSelect = document.getElementById("writer-product-select");
        const payloadInput = document.getElementById("writer-payload-input");
        const statusPill = document.getElementById("writer-status-pill");
        const feedback = document.getElementById("writer-feedback-text");
        const ring = document.getElementById("nfc-pulse-ring");
        const logPayload = document.getElementById("log-payload");

        if (!payloadInput.value) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรุณากรอก URL',
                    text: 'กรุณากรอก URL ข้อมูลสินค้าสำหรับสร้าง QR Code',
                    confirmButtonColor: '#065f46'
                });
            } else {
                alert("กรุณากรอก URL ข้อมูลสินค้า");
            }
            return;
        }

        if (typeof PackagingApp !== 'undefined') PackagingApp.playSound('click');

        // Animation write in progress
        statusPill.innerText = "WRITING...";
        statusPill.className = "text-amber-400 font-mono font-bold animate-pulse";
        feedback.innerText = "กำลังเหนี่ยวนำคลื่น 13.56 MHz เขียนบล็อก NDEF 144 bytes...";
        ring.classList.add("animate-ping", "opacity-100");

        setTimeout(() => {
            statusPill.innerText = "VERIFIED";
            statusPill.className = "text-emerald-400 font-mono font-bold";
            feedback.innerHTML = `<span class="text-emerald-400 font-bold">✅ บันทึกชิปสำเร็จเรียบร้อย!</span> พร้อมนำไปติดบนบรรจุภัณฑ์`;
            ring.classList.remove("animate-ping", "opacity-100");
            logPayload.innerText = payloadInput.value;

            this.writtenTags[prodSelect.value] = {
                url: payloadInput.value,
                time: new Date()
            };

            if (typeof PackagingApp !== 'undefined') {
                PackagingApp.completeLabMission('writer');
                PackagingApp.playSound('success');
            }
        }, 1200);
    },

    // =========================================================================
    // ฐานที่ 2: Virtual NFC Smartphone Tap & Showcase
    // =========================================================================
    renderLab2() {
        const container = document.getElementById("lab-container-tap");
        if (!container) return;

        const products = PACKAGING_DATA.communityProducts;

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Product Packages Shelf -->
                <div class="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div class="border-b pb-3">
                        <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <i class="fa-solid fa-boxes-packing text-emerald-600"></i>
                            ชั้นวางบรรจุภัณฑ์อัจฉริยะชุมชนบ้านน้ำพร (Smart Shelf)
                        </h3>
                        <p class="text-xs text-slate-500">คลิกที่จุด <strong>"NFC Tap Here"</strong> บนกล่องเพื่อจำลองการแตะด้วยสมาร์ตโฟน</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        ${products.map(p => `
                            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between group">
                                <div>
                                    <div class="flex items-center justify-between text-xs mb-2">
                                        <span class="font-bold text-emerald-950 flex items-center gap-1.5">
                                            <i class="fa-solid ${p.icon} text-emerald-600"></i> ${p.name}
                                        </span>
                                    </div>
                                    <p class="text-[11px] text-slate-500 mb-3 line-clamp-2">${p.ecoMaterial}</p>
                                    <div class="flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 p-2 rounded-xl mb-3 font-semibold">
                                        <span>ราคาเดิม: ${p.priceNormal} บ.</span>
                                        <span class="font-bold text-emerald-700">ราคา Smart: ${p.priceSmart} บ.</span>
                                    </div>
                                </div>
                                <button onclick="PackagingSim.simulateTap('${p.id}')" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 group-hover:scale-[1.02]">
                                    <i class="fa-solid fa-mobile-screen-button"></i>
                                    <span>แตะสมาร์ตโฟน (Tap NFC)</span>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Virtual Smartphone Screen Mockup -->
                <div class="lg:col-span-5 flex justify-center">
                    <div class="w-72 bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 relative">
                        <!-- Phone Notch / Camera -->
                        <div class="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <div class="w-2 h-2 rounded-full bg-slate-900"></div>
                        </div>

                        <!-- Phone Inner Screen -->
                        <div id="phone-screen-content" class="bg-white rounded-[32px] overflow-hidden min-h-[460px] flex flex-col justify-between text-slate-800">
                            <!-- Standby Screen -->
                            <div class="p-6 text-center flex flex-col items-center justify-center my-auto space-y-3">
                                <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto animate-bounce">
                                    <i class="fa-solid fa-hand-pointer"></i>
                                </div>
                                <h4 class="font-bold text-slate-800 text-xs">พร้อมอ่านข้อมูล NFC</h4>
                                <p class="text-[11px] text-slate-400">
                                    นำสมาร์ตโฟนแตะที่บรรจุภัณฑ์ด้านซ้ายเพื่อเปิด Digital Landing Page
                                </p>
                            </div>
                        </div>

                        <!-- Phone Bottom Home Bar -->
                        <div class="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>
                    </div>
                </div>
            </div>
        `;
    },

    simulateTap(productId) {
        const p = PACKAGING_DATA.communityProducts.find(x => x.id === productId);
        if (!p) return;

        if (typeof PackagingApp !== 'undefined') PackagingApp.playSound('click');

        const phone = document.getElementById("phone-screen-content");
        if (!phone) return;

        phone.innerHTML = `
            <div class="animate-fadeIn flex flex-col h-full justify-between">
                <!-- Header Banner -->
                <div class="bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-3 text-center">
                    <div class="text-[9px] uppercase tracking-wider text-cyan-300 font-bold flex items-center justify-center gap-1">
                        <i class="fa-solid fa-circle-check text-emerald-400"></i> NFC Authenticated
                    </div>
                    <h5 class="font-bold text-xs mt-0.5 text-white">${p.name}</h5>
                </div>

                <!-- Product Content -->
                <div class="p-3 text-xs space-y-2 overflow-y-auto max-h-[340px]">
                    <div class="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                        <div class="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                            <i class="fa-solid fa-location-dot"></i> แหล่งกำเนิด (Origin):
                        </div>
                        <p class="text-[11px] text-slate-700 mt-0.5 font-medium">${p.origin}</p>
                    </div>

                    <div class="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <strong>เรื่องราวชุมชน (Storytelling):</strong><br>
                        ${p.description}
                    </div>

                    <div class="p-2 bg-emerald-50 rounded-xl text-[10px] text-emerald-900 font-mono flex justify-between items-center">
                        <span>ชิป: ${p.tagType}</span>
                        <span class="text-emerald-600 font-bold">UID: 04:A2:89...</span>
                    </div>

                    <a href="${p.nfcPayload}" target="_blank" class="block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-xl font-bold text-xs transition shadow">
                        <i class="fa-solid fa-cart-shopping"></i> สั่งซื้อผลิตภัณฑ์ชุมชน
                    </a>
                </div>

                <!-- Footer info -->
                <div class="p-2 text-center text-[9px] text-slate-400 bg-slate-100 border-t">
                    โรงเรียนบ้านน้ำพร • Smart Packaging M.3
                </div>
            </div>
        `;

        if (typeof PackagingApp !== 'undefined') {
            PackagingApp.completeLabMission('tap');
            PackagingApp.playSound('success');
        }
    },

    // =========================================================================
    // ฐานที่ 3: Eco-Packaging & Label Builder
    // =========================================================================
    renderLab3() {
        const container = document.getElementById("lab-container-builder");
        if (!container) return;

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Settings Panel -->
                <div class="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div class="border-b pb-3">
                        <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <i class="fa-solid fa-wand-magic-sparkles text-amber-500"></i>
                            ออกแบบกล่องบรรจุภัณฑ์และตำแหน่งฝังชิป NFC
                        </h3>
                        <p class="text-xs text-slate-500">เลือกรูปทรง วัสดุรักษ์โลก และจุดติดตั้งชิป NFC ให้ได้คะแนนเต็ม 100</p>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">1. ประเภทรูปทรงบรรจุภัณฑ์:</label>
                        <select id="builder-shape" onchange="PackagingSim.updateBuilderPreview()" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                            <option value="box">กล่องกระดาษคราฟต์พับล็อก (Kraft Gift Box)</option>
                            <option value="pouch">ซองกระดาษซิปล็อกชีวภาพ (Bio Pouch)</option>
                            <option value="jar">ขวดแก้วรีไซเคิลพร้อมซีลฝา (Recycled Jar)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">2. องค์ประกอบฉลากอัจฉริยะ (เลือกทั้งหมดที่จำเป็น):</label>
                        <div class="space-y-1.5 text-xs text-slate-700">
                            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                                <input id="lbl-fda" type="checkbox" checked onchange="PackagingSim.updateBuilderPreview()" class="rounded text-emerald-600">
                                <span>เครื่องหมายรับรองมาตรฐาน อย. / มผช.</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                                <input id="lbl-story" type="checkbox" checked onchange="PackagingSim.updateBuilderPreview()" class="rounded text-emerald-600">
                                <span>สตอรี่ผลิตภัณฑ์และอัตลักษณ์ท้องถิ่นบ้านน้ำพร</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                                <input id="lbl-nfc-icon" type="checkbox" checked onchange="PackagingSim.updateBuilderPreview()" class="rounded text-emerald-600">
                                <span>สัญลักษณ์ไอคอน "แตะตรงนี้ (NFC Tap Here)"</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">3. ตำแหน่งฝังชิป NFC:</label>
                        <select id="builder-position" onchange="PackagingSim.updateBuilderPreview()" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                            <option value="top">บนฝากล่องด้านบน (เข้าถึงง่ายที่สุด แนะนำ)</option>
                            <option value="side">ด้านข้างกล่องใต้สติกเกอร์ฉลาก</option>
                            <option value="inside">ซ่อนอยู่ด้านในใต้แผ่นรองสินค้า</option>
                        </select>
                    </div>
                </div>

                <!-- Preview Box -->
                <div class="lg:col-span-6 bg-slate-100 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between items-center text-center">
                    <div class="w-full text-left font-bold text-xs text-slate-600 border-b border-slate-200 pb-2 mb-4 flex justify-between">
                        <span>พรีวิวบรรจุภัณฑ์อัจฉริยะ (3D Interactive Mockup)</span>
                        <span id="builder-score-badge" class="text-emerald-700 font-bold">ความสมบูรณ์: 100%</span>
                    </div>

                    <div id="builder-preview-canvas" class="w-64 h-64 rounded-3xl bg-amber-100/70 border-4 border-amber-800/30 flex flex-col items-center justify-center p-6 shadow-xl relative transition">
                        <div class="text-amber-950 font-bold text-sm mb-2">โรงเรียนบ้านน้ำพร</div>
                        <div class="text-xs text-amber-900 font-semibold mb-3">Smart Community Package</div>

                        <div id="builder-preview-nfc-tag" class="w-16 h-16 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center shadow-lg border-2 border-white animate-pulse">
                            <i class="fa-solid fa-wifi rotate-90 text-sm"></i>
                            <span class="text-[8px] font-bold">NFC TAP</span>
                        </div>

                        <div class="text-[10px] text-slate-600 mt-4 flex gap-2">
                            <span class="px-1.5 py-0.5 bg-white/80 rounded border">อย.</span>
                            <span class="px-1.5 py-0.5 bg-white/80 rounded border">มผช.</span>
                            <span class="px-1.5 py-0.5 bg-white/80 rounded border">ECO 100%</span>
                        </div>
                    </div>

                    <button onclick="PackagingSim.saveBuilderDesign()" class="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5">
                        <i class="fa-solid fa-floppy-disk"></i>
                        <span>บันทึกแบบบรรจุภัณฑ์อัจฉริยะ</span>
                    </button>
                </div>
            </div>
        `;
    },

    updateBuilderPreview() {
        const shape = document.getElementById("builder-shape").value;
        const box = document.getElementById("builder-preview-canvas");
        if (!box) return;

        if (shape === 'box') {
            box.className = "w-64 h-64 rounded-3xl bg-amber-100/80 border-4 border-amber-800/30 flex flex-col items-center justify-center p-6 shadow-xl relative transition";
        } else if (shape === 'pouch') {
            box.className = "w-52 h-72 rounded-3xl bg-stone-200 border-4 border-stone-400 flex flex-col items-center justify-center p-6 shadow-xl relative transition";
        } else {
            box.className = "w-48 h-64 rounded-t-xl rounded-b-3xl bg-cyan-50/90 border-4 border-cyan-300 flex flex-col items-center justify-center p-6 shadow-xl relative transition";
        }
    },

    saveBuilderDesign() {
        if (typeof PackagingApp !== 'undefined') {
            PackagingApp.completeLabMission('builder');
            PackagingApp.playSound('success');
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ!',
                text: 'บันทึกการออกแบบบรรจุภัณฑ์อัจฉริยะสำเร็จ! คุณได้รับคะแนนการออกแบบระดับดีเยี่ยม',
                confirmButtonColor: '#065f46'
            });
        } else {
            alert("บันทึกการออกแบบบรรจุภัณฑ์อัจฉริยะสำเร็จ! คุณได้รับคะแนนการออกแบบระดับดีเยี่ยม");
        }
        }
    },

    // =========================================================================
    // ฐานที่ 4: Innovator Business Model Canvas & ROI Calculator
    // =========================================================================
    renderLab4() {
        const container = document.getElementById("lab-container-roi");
        if (!container) return;

        container.innerHTML = `
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div class="border-b pb-3">
                    <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <i class="fa-solid fa-chart-line text-emerald-600"></i>
                        เครื่องคำนวณต้นทุน จุดคุ้มทุน และผลตอบแทนของนวัตกรดิจิทัล (ROI Calculator)
                    </h3>
                    <p class="text-xs text-slate-500">ทดลองปรับสไลเดอร์เพื่อดูการเพิ่มมูลค่าทางเศรษฐกิจให้ผลิตภัณฑ์ชุมชนบ้านน้ำพร</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Sliders -->
                    <div class="space-y-4 text-xs">
                        <div>
                            <div class="flex justify-between font-bold mb-1">
                                <span>ต้นทุนสินค้าเดิม:</span>
                                <span id="val-base-cost" class="text-emerald-600 font-mono">100 บาท</span>
                            </div>
                            <input id="slider-base-cost" type="range" min="50" max="300" step="10" value="100" oninput="PackagingSim.calcROI()" class="w-full accent-emerald-600">
                        </div>

                        <div>
                            <div class="flex justify-between font-bold mb-1">
                                <span>กล่องบรรจุภัณฑ์รักษ์โลก:</span>
                                <span id="val-pkg-cost" class="text-emerald-600 font-mono">15 บาท</span>
                            </div>
                            <input id="slider-pkg-cost" type="range" min="5" max="50" step="1" value="15" oninput="PackagingSim.calcROI()" class="w-full accent-emerald-600">
                        </div>

                        <div>
                            <div class="flex justify-between font-bold mb-1">
                                <span>ชิป NFC Tag (NTAG213):</span>
                                <span id="val-nfc-cost" class="text-emerald-600 font-mono">4 บาท</span>
                            </div>
                            <input id="slider-nfc-cost" type="range" min="3" max="15" step="1" value="4" oninput="PackagingSim.calcROI()" class="w-full accent-emerald-600">
                        </div>

                        <div>
                            <div class="flex justify-between font-bold mb-1">
                                <span>ราคาขายแบบ Smart Packaging:</span>
                                <span id="val-sale-price" class="text-emerald-600 font-mono">180 บาท</span>
                            </div>
                            <input id="slider-sale-price" type="range" min="120" max="500" step="10" value="180" oninput="PackagingSim.calcROI()" class="w-full accent-emerald-600">
                        </div>
                    </div>

                    <!-- Calculation KPIs -->
                    <div class="md:col-span-2 grid grid-cols-2 gap-3 text-center">
                        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-center">
                            <span class="text-xs text-slate-500">ต้นทุนรวมต่อชิ้น</span>
                            <span id="kpi-unit-cost" class="text-2xl font-bold font-mono text-slate-900 mt-1">119 บาท</span>
                            <span class="text-[10px] text-slate-400">สินค้า + กล่อง + ชิป NFC</span>
                        </div>

                        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-center">
                            <span class="text-xs text-emerald-800 font-semibold">กำไรสุทธิต่อชิ้น</span>
                            <span id="kpi-unit-profit" class="text-2xl font-bold font-mono text-emerald-700 mt-1">+61 บาท</span>
                            <span class="text-[10px] text-emerald-600">กำไรเพิ่มขึ้น 51%</span>
                        </div>

                        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-center">
                            <span class="text-xs text-emerald-800 font-semibold">ผลิตล็อตทดลอง 100 ชิ้น</span>
                            <span id="kpi-total-profit" class="text-2xl font-bold font-mono text-emerald-700 mt-1">+6,100 บาท</span>
                            <span class="text-[10px] text-emerald-600">รายได้หมุนเวียนสู่ชุมชน</span>
                        </div>

                        <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col justify-center">
                            <span class="text-xs text-purple-800 font-semibold">จุดคุ้มทุน (Break-even)</span>
                            <span id="kpi-breakeven" class="text-2xl font-bold font-mono text-purple-700 mt-1">1 กล่อง</span>
                            <span class="text-[10px] text-purple-600">ไม่มีภาระหนี้สินคงที่</span>
                        </div>
                    </div>
                </div>

                <div class="pt-2 text-right">
                    <button onclick="PackagingSim.completeROI()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition">
                        <i class="fa-solid fa-circle-check"></i> ยืนยันแผนธุรกิจนวัตกร
                    </button>
                </div>
            </div>
        `;
    },

    calcROI() {
        const base = parseInt(document.getElementById("slider-base-cost").value, 10);
        const pkg = parseInt(document.getElementById("slider-pkg-cost").value, 10);
        const nfc = parseInt(document.getElementById("slider-nfc-cost").value, 10);
        const sale = parseInt(document.getElementById("slider-sale-price").value, 10);

        document.getElementById("val-base-cost").innerText = `${base} บาท`;
        document.getElementById("val-pkg-cost").innerText = `${pkg} บาท`;
        document.getElementById("val-nfc-cost").innerText = `${nfc} บาท`;
        document.getElementById("val-sale-price").innerText = `${sale} บาท`;

        const totalCost = base + pkg + nfc;
        const profit = sale - totalCost;

        document.getElementById("kpi-unit-cost").innerText = `${totalCost} บาท`;
        document.getElementById("kpi-unit-profit").innerText = `${profit >= 0 ? '+' : ''}${profit} บาท`;
        document.getElementById("kpi-total-profit").innerText = `${profit >= 0 ? '+' : ''}${(profit * 100).toLocaleString()} บาท`;
    },

    completeROI() {
        if (typeof PackagingApp !== 'undefined') {
            PackagingApp.completeLabMission('roi');
            PackagingApp.playSound('success');
            if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'ภารกิจสำเร็จ!',
                text: 'ผ่านภารกิจแผนธุรกิจนวัตกรอาชีพดิจิทัลเรียบร้อย!',
                confirmButtonColor: '#065f46'
            });
        } else {
            alert("ผ่านภารกิจแผนธุรกิจนวัตกรอาชีพดิจิทัลเรียบร้อย!");
        }
        }
    }
};
