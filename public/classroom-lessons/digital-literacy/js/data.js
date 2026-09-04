/**
 * ข้อมูลเนื้อหา สื่อการสอน แบบทดสอบ และสถานการณ์จำลอง
 * เรื่อง การพัฒนาความรู้เท่าทันดิจิทัลและความปลอดภัยออนไลน์ของนักเรียนชั้นมัธยมศึกษาปีที่ 3
 * โรงเรียนบ้านน้ำพร
 */

const APP_DATA = {
    schoolInfo: {
        name: "โรงเรียนบ้านน้ำพร",
        area: "สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1",
        motto: "นตฺถิ ปญฺญา สมา อาภา (ไม่มีแสงสว่างใดเสมอด้วยปัญญา)",
        subject: "เทคโนโลยี (วิทยาการคำนวณ) ม.3",
        level: "ชั้นมัธยมศึกษาปีที่ 3",
        academicYear: "2569",
        director: "นางศิวาลัย แก้วเขียว (ผู้อำนวยการโรงเรียนบ้านน้ำพร)",
        teacher: "นายนิรุทธิ์ เสวะนา (ครูประจำชั้น ม.3)",
        logoLight: "1-small.png",
        logoDark: "2-small.png"
    },

    // รายชื่อนักเรียนชั้น ม.3 ปีการศึกษา 2569 (20 คน)
    studentsM3: [
        { no: 1, studentId: "2446", title: "เด็กชาย", name: "ธันวา บุญตัน", fullName: "เด็กชายธันวา บุญตัน" },
        { no: 2, studentId: "2449", title: "เด็กชาย", name: "ธีรศักดิ์ บุญมาก", fullName: "เด็กชายธีรศักดิ์ บุญมาก" },
        { no: 3, studentId: "2450", title: "เด็กชาย", name: "วรเมธ แสงขาว", fullName: "เด็กชายวรเมธ แสงขาว" },
        { no: 4, studentId: "2451", title: "เด็กชาย", name: "สุรศักดิ์ ฤทธิศักดิ์", fullName: "เด็กชายสุรศักดิ์ ฤทธิศักดิ์" },
        { no: 5, studentId: "2627", title: "เด็กชาย", name: "ธนโชติ นิวงษา", fullName: "เด็กชายธนโชติ นิวงษา" },
        { no: 6, studentId: "2628", title: "เด็กชาย", name: "ณัฏฐวี ซุ้ยไกร", fullName: "เด็กชายณัฏฐวี ซุ้ยไกร" },
        { no: 7, studentId: "2629", title: "เด็กชาย", name: "อนุสรณ์ โพธิ์พันธุ์", fullName: "เด็กชายอนุสรณ์ โพธิ์พันธุ์" },
        { no: 8, studentId: "2645", title: "เด็กชาย", name: "กฤษณะพงษ์ ฝอยทอง", fullName: "เด็กชายกฤษณะพงษ์ ฝอยทอง" },
        { no: 9, studentId: "2672", title: "เด็กชาย", name: "วชิรวิทย์ คำบุผา", fullName: "เด็กชายวชิรวิทย์ คำบุผา" },
        { no: 10, studentId: "2452", title: "เด็กหญิง", name: "กวินตรา สุกสัก", fullName: "เด็กหญิงกวินตรา สุกสัก" },
        { no: 11, studentId: "2453", title: "เด็กหญิง", name: "กวิสรา เนินสง่า", fullName: "เด็กหญิงกวิสรา เนินสง่า" },
        { no: 12, studentId: "2456", title: "เด็กหญิง", name: "จันทร์จิรา ครองเคหา", fullName: "เด็กหญิงจันทร์จิรา ครองเคหา" },
        { no: 13, studentId: "2457", title: "เด็กหญิง", name: "ชญานี พรหมสาส์น", fullName: "เด็กหญิงชญานี พรหมสาส์น" },
        { no: 14, studentId: "2458", title: "เด็กหญิง", name: "ปรายฉัตร โคตรอาษา", fullName: "เด็กหญิงปรายฉัตร โคตรอาษา" },
        { no: 15, studentId: "2460", title: "เด็กหญิง", name: "รักษา แสงขาว", fullName: "เด็กหญิงรักษา แสงขาว" },
        { no: 16, studentId: "2468", title: "เด็กหญิง", name: "อินฑิรา ถามูล", fullName: "เด็กหญิงอินฑิรา ถามูล" },
        { no: 17, studentId: "2469", title: "เด็กหญิง", name: "อินทิรา มาลา", fullName: "เด็กหญิงอินทิรา มาลา" },
        { no: 18, studentId: "2507", title: "เด็กหญิง", name: "กมลลักษณ์ ศรีพิพัฒน์", fullName: "เด็กหญิงกมลลักษณ์ ศรีพิพัฒน์" },
        { no: 19, studentId: "2508", title: "เด็กหญิง", name: "น้ำเหนือ แก้วไกรสร", fullName: "เด็กหญิงน้ำเหนือ แก้วไกรสร" },
        { no: 20, studentId: "2630", title: "เด็กหญิง", name: "อ่อง พรมสาส์น", fullName: "เด็กหญิงอ่อง พรมสาส์น" }
    ],

    // บทเรียนทั้ง 4 หน่วย
    units: [
        {
            id: 1,
            title: "ความรู้เท่าทันดิจิทัลและความปลอดภัยออนไลน์: รู้ทันสื่อดิจิทัลและภัยข่าวปลอม",
            subtitle: "Digital Literacy & Fake News Detection",
            icon: "fa-shield-halved",
            color: "blue",
            readTime: "15 นาที",
            summary: "เรียนรู้วิธีวิเคราะห์ความน่าเชื่อถือของข้อมูล แยกแยะข่าวจริง-ข่าวปลอม และทำความเข้าใจเทคโนโลยี Deepfake",
            topics: [
                {
                    title: "1.1 ความรู้เท่าทันดิจิทัลคืออะไร และทำไมเด็ก ม.3 ต้องมี?",
                    content: `
                        <p class="mb-3"><strong>ความรู้เท่าทันดิจิทัล (Digital Literacy)</strong> ไม่ใช่เพียงแค่การใช้สมาร์ตโฟนหรือคอมพิวเตอร์เป็น แต่หมายถึง <em>"ทักษะในการเข้าถึง เข้าใจ วิเคราะห์ ประเมิน และสร้างสรรค์ข้อมูลดิจิทัลได้อย่างชาญฉลาดและปลอดภัย"</em></p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                            <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                                <i class="fa-solid fa-eye text-blue-600 text-2xl mb-2"></i>
                                <h4 class="font-bold text-blue-800">เข้าถึง & เลือกรับ</h4>
                                <p class="text-xs text-slate-600 mt-1">คัดกรองแหล่งข้อมูลที่มีคุณภาพ ไม่หลงเชื่อพาดหัวข่าวล่อเป้า (Clickbait)</p>
                            </div>
                            <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
                                <i class="fa-solid fa-brain text-indigo-600 text-2xl mb-2"></i>
                                <h4 class="font-bold text-indigo-800">คิดวิเคราะห์</h4>
                                <p class="text-xs text-slate-600 mt-1">ตั้งคำถามว่าใครเป็นผู้สร้าง มีวัตถุประสงค์อะไร และมีหลักฐานรองรับหรือไม่</p>
                            </div>
                            <div class="p-3 bg-teal-50 border border-teal-200 rounded-xl text-center">
                                <i class="fa-solid fa-share-nodes text-teal-600 text-2xl mb-2"></i>
                                <h4 class="font-bold text-teal-800">แชร์อย่างรับผิดชอบ</h4>
                                <p class="text-xs text-slate-600 mt-1">ไม่ส่งต่อข้อมูลเท็จที่สร้างความตื่นตระหนก หรือละเมิดสิทธิผู้อื่น</p>
                            </div>
                        </div>
                    `
                },
                {
                    title: "1.2 ประเภทของข้อมูลเท็จและข่าวปลอม (Information Disorder)",
                    content: `
                        <p class="mb-3">ข่าวปลอมในปัจจุบันถูกสร้างขึ้นหลายรูปแบบ ซึ่งนักวิชาการแบ่งออกเป็น 3 ระดับความรุนแรง:</p>
                        <div class="space-y-3">
                            <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                                <div class="font-bold text-amber-900 flex items-center gap-2">
                                    <i class="fa-solid fa-circle-info text-amber-600"></i>
                                    1. ข้อมูลผิดพลาด (Misinformation)
                                </div>
                                <p class="text-sm text-slate-700 mt-1">ข้อมูลที่ผิดหรือไม่ถูกต้อง <strong>แต่ผู้ส่งต่อไม่ได้มีเจตนาร้าย</strong> เช่น ผู้ใหญ่แชร์ข้อความสูตรยาสมุนไพรที่เข้าใจผิดว่ารักษาโรคได้เพราะหวังดี</p>
                            </div>
                            <div class="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                <div class="font-bold text-red-900 flex items-center gap-2">
                                    <i class="fa-solid fa-triangle-exclamation text-red-600"></i>
                                    2. ข้อมูลบิดเบือนเจตนาร้าย (Disinformation)
                                </div>
                                <p class="text-sm text-slate-700 mt-1">ข้อมูลที่เป็นเท็จโดยสิ้นเชิง และ<strong>ผู้สร้างตั้งใจหลอกลวง</strong>เพื่อผลประโยชน์ เช่น ปั่นราคาหุ้น หลอกให้ลงทุน หรือสร้างความแตกแยกทางการเมือง</p>
                            </div>
                            <div class="p-3 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                                <div class="font-bold text-purple-900 flex items-center gap-2">
                                    <i class="fa-solid fa-skull-crossbones text-purple-600"></i>
                                    3. ข้อมูลอันตรายมุ่งทำลาย (Malinformation)
                                </div>
                                <p class="text-sm text-slate-700 mt-1">ข้อมูลที่เป็นเรื่องจริง แต่ถูกนำมาเปิดเผยเพื่อ<strong>มุ่งทำร้ายหรือทำลายชื่อเสียง</strong>ของผู้อื่น เช่น การปล่อยภาพหลุด หรือข้อมูลลับส่วนตัวในที่สาธารณะ (Doxxing)</p>
                            </div>
                        </div>
                    `
                },
                {
                    title: "1.3 เทคนิคการจับโกหกข่าวปลอมด้วย CRAAP Test & 5W1H",
                    content: `
                        <p class="mb-3">ก่อนจะเชื่อหรือแชร์ ให้ใช้เกณฑ์มาตรฐาน <strong>CRAAP Test</strong> สากลในการตรวจสอบ:</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <span class="font-bold text-blue-600">C - Currency (ความสดใหม่):</span> ข้อมูลเผยแพร่เมื่อไหร่? เป็นข่าวเก่าปีที่แล้วนำมาวนซ้ำหรือไม่?
                            </div>
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <span class="font-bold text-blue-600">R - Relevance (ความเกี่ยวข้อง):</span> ข้อมูลตรงกับหัวข้อหรือไม่? พาดหัวกับเนื้อหาข้างในขัดแย้งกันเองหรือไม่?
                            </div>
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <span class="font-bold text-blue-600">A - Authority (ความน่าเชื่อถือของผู้เขียน):</span> ใครเป็นคนเขียน? มีตัวตนจริงไหม? เว็บไซต์ลงท้ายด้วยโดเมนที่น่าสงสัยหรือไม่?
                            </div>
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <span class="font-bold text-blue-600">A - Accuracy (ความถูกต้องแม่นยำ):</span> มีแหล่งอ้างอิงหรือไม่? ตรวจสอบกับสำนักข่าวหลักแล้วมีรายงานตรงกันหรือไม่?
                            </div>
                            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg md:col-span-2">
                                <span class="font-bold text-blue-600">P - Purpose (วัตถุประสงค์):</span> ข้อมูลนี้สร้างขึ้นเพื่ออะไร? ให้ความรู้, โฆษณาขายของ, สร้างความเกลียดชัง หรือล่อให้คลิกรับไวรัส?
                            </div>
                        </div>
                        <div class="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-3">
                            <i class="fa-solid fa-magnifying-glass-location text-emerald-600 text-2xl"></i>
                            <div class="text-sm text-emerald-900">
                                <strong>เครื่องมือช่วยเช็คความจริง:</strong> Google Reverse Image Search (ค้นหาที่มาของภาพ), เว็บไซต์ชัวร์ก่อนแชร์ (Sure and Share), ศูนย์ต่อต้านข่าวปลอมประเทศไทย (Anti-Fake News Center)
                            </div>
                        </div>
                    `
                },
                {
                    title: "1.4 รู้ทัน Deepfake และ AI หลอกลวงในปัจจุบัน",
                    content: `
                        <p class="mb-2">ปัจจุบัน AI สามารถสร้างภาพ วิดีโอ และเลียนแบบเสียงคนรู้จักได้อย่างแนบเนียน เรียกว่า <strong>Deepfake</strong></p>
                        <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                            <h4 class="font-bold text-rose-800 mb-2 flex items-center gap-2">
                                <i class="fa-solid fa-robot"></i> จุดสังเกตภาพและวิดีโอ Deepfake:
                            </h4>
                            <ul class="list-disc list-inside space-y-1 text-sm text-slate-700">
                                <li>การกะพริบตาผิดธรรมชาติ หรือไม่กะพริบตาเลย</li>
                                <li>การเคลื่อนไหวของริมฝีปากไม่ตรงกับเสียงที่เปล่งออกมา</li>
                                <li>เงาและแสงสะท้อนบนใบหน้ากับสิ่งแวดล้อมไม่สอดคล้องกัน</li>
                                <li>บริเวณกรอบใบหน้า ลำคอ หรือเส้นผมมีความเบลอหรือลายเส้นบิดเบี้ยว</li>
                                <li>รายละเอียดที่นิ้วมือ ฟัน หรือเครื่องประดับเบี้ยวผิดรูป</li>
                            </ul>
                        </div>
                    `
                }
            ],
            miniQuiz: [
                {
                    q: "ข้อใดคือความหมายของ 'Misinformation' ที่ถูกต้องที่สุด?",
                    options: [
                        "ข้อมูลลับทางราชการที่ถูกขโมยมาแบล็กเมล์",
                        "ข้อมูลที่ผิดพลาดแต่ผู้ส่งต่อไม่มีเจตนาร้าย เพียงแต่เข้าใจผิด",
                        "ข้อมูลที่สร้างขึ้นเพื่อหลอกลวงปั่นป่วนระบบเศรษฐกิจโดยเฉพาะ",
                        "การติดตั้งไวรัสเพื่อขโมยรหัสผ่าน"
                    ],
                    ans: 1,
                    exp: "Misinformation คือข้อมูลที่คลาดเคลื่อนโดยผู้เผยแพร่ไม่ได้ตั้งใจทำร้ายหรือหลอกลวง (ต่างจาก Disinformation ที่จงใจหลอก)"
                },
                {
                    q: "หากพบภาพข่าวที่สงสัยว่าตัดต่อหรือเป็นภาพเก่าเล่าใหม่ ควรใช้เครื่องมือใดตรวจสอบเป็นอันดับแรก?",
                    options: [
                        "ส่งต่อให้เพื่อนในกลุ่มไลน์ช่วยดู 10 คน",
                        "ใช้ Google Reverse Image Search ตรวจสอบที่มาดั้งเดิมของภาพ",
                        "โพสต์ประจานทันทีเพื่อเตือนภัยสังคม",
                        "บันทึกภาพเก็บไว้ในไดรฟ์โดยไม่ต้องทำอะไร"
                    ],
                    ans: 1,
                    exp: "Google Reverse Image Search ช่วยค้นหาว่ารูปภาพนี้ถูกเผยแพร่ครั้งแรกเมื่อไหร่ บนเว็บใด และเป็นเหตุการณ์จริงหรือไม่"
                },
                {
                    q: "เกณฑ์ CRAAP Test ตัวอักษร 'A' หมายถึงข้อใด?",
                    options: [
                        "Application (การดาวน์โหลดแอป)",
                        "Authority (ความน่าเชื่อถือของผู้เขียน/แหล่งที่มา) และ Accuracy (ความถูกต้องแม่นยำ)",
                        "Artificial (การสร้างด้วยระบบปัญญาประดิษฐ์)",
                        "Advertisement (การมีโฆษณาแทรก)"
                    ],
                    ans: 1,
                    exp: "A ใน CRAAP Test แทน Authority (ผู้เขียนเป็นใคร มีความเชี่ยวชาญหรือไม่) และ Accuracy (มีความถูกต้อง มีหลักฐานหรือไม่)"
                }
            ]
        },

        {
            id: 2,
            title: "หน่วยที่ 2: ความปลอดภัยออนไลน์และภัยคุกคามไซเบอร์",
            subtitle: "Cyber Safety & Modern Online Threats",
            icon: "fa-lock",
            color: "emerald",
            readTime: "18 นาที",
            summary: "ทำความรู้จัก Phishing, แก๊งคอลเซ็นเตอร์, มัลแวร์ดูดเงิน พร้อมวิธีตั้งรหัสผ่านระดับเทพ และการเปิดใช้ 2FA",
            topics: [
                {
                    title: "2.1 ฟิชชิ่ง (Phishing) และกลลวงมิจฉาชีพออนไลน์",
                    content: `
                        <p class="mb-3"><strong>Phishing (ฟิชชิ่ง)</strong> เปรียบเสมือนการตกปลา มิจฉาชีพจะใช้เหยื่อล่อเพื่อหลอกเอาข้อมูลสำคัญ เช่น รหัสผ่าน เลขบัตรประชาชน หรือรหัส OTP</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <h4 class="font-bold text-red-700 mb-1 flex items-center gap-1">
                                    <i class="fa-solid fa-comment-sms"></i> SMS / แชท หลอกลวง
                                </h4>
                                <p class="text-xs text-slate-600">มักมาพร้อมข้อความสร้างความตกใจหรือโลภ เช่น <em>"บัญชีธนาคารของคุณถูกระงับ คลิกที่นี่"</em> หรือ <em>"คุณได้รับเงินรางวัล 50,000 บาท กดรับสิทธิ์"</em></p>
                            </div>
                            <div class="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                                <h4 class="font-bold text-purple-700 mb-1 flex items-center gap-1">
                                    <i class="fa-solid fa-phone-volume"></i> แก๊งคอลเซ็นเตอร์
                                </h4>
                                <p class="text-xs text-slate-600">อ้างตัวเป็นเจ้าหน้าที่ตำรวจ กรมศุลกากร หรือไปรษณีย์ ข่มขู่ว่ามีพัสดุผิดกฎหมาย และหลอกให้โอนเงินเพื่อตรวจสอบบัญชี</p>
                            </div>
                        </div>
                        <div class="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r text-sm">
                            <strong>กฎเหล็กความปลอดภัย:</strong> ธนาคารและหน่วยงานรัฐที่ถูกต้องตามกฎหมาย <strong>ไม่มีนโยบายส่งลิงก์ SMS เพื่อให้ล็อกอินหรือกรอกข้อมูลส่วนบุคคลใดๆ ทั้งสิ้น</strong>
                        </div>
                    `
                },
                {
                    title: "2.2 ศาสตร์แห่งการตั้งรหัสผ่านที่ปลอดภัย (Password Security)",
                    content: `
                        <p class="mb-3">รหัสผ่านยอดแย่ที่สุดในโลกคือ <code class="text-rose-600 bg-rose-100 px-2 py-0.5 rounded">123456</code>, <code class="text-rose-600 bg-rose-100 px-2 py-0.5 rounded">password</code>, วันเดือนปีเกิด หรือเบอร์โทรศัพท์ ซึ่งแฮกเกอร์ใช้เวลาเจาะระบบไม่ถึง 1 วินาที!</p>
                        <div class="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                            <div class="font-bold text-cyan-400 text-base">สูตรสร้าง Passphrase แข็งแกร่งระดับกองทัพ:</div>
                            <ul class="text-sm space-y-1.5 text-slate-300">
                                <li><i class="fa-solid fa-check text-emerald-400 mr-1"></i> ความยาวอย่างน้อย <strong>12-16 ตัวอักษรขึ้นไป</strong> ยิ่งยาวยิ่งเจาะยากแบบทวีคูณ</li>
                                <li><i class="fa-solid fa-check text-emerald-400 mr-1"></i> ผสมผสาน <strong>ตัวพิมพ์ใหญ่ (A-Z)</strong>, <strong>ตัวพิมพ์เล็ก (a-z)</strong>, <strong>ตัวเลข (0-9)</strong>, และ <strong>อักขระพิเศษ (!@#$%^&*)</strong></li>
                                <li><i class="fa-solid fa-check text-emerald-400 mr-1"></i> ใช้เทคนิคประโยคจำง่ายแต่เจาะยาก (Passphrase) เช่น <code class="text-yellow-300">Namphorn#2569BestSchool!</code></li>
                                <li><i class="fa-solid fa-xmark text-rose-400 mr-1"></i> <strong>ห้ามใช้รหัสผ่านเดียวกันในทุกบัญชี!</strong> หากเว็บใดเว็บหนึ่งรั่ว บัญชีอื่นจะปลอดภัย</li>
                            </ul>
                        </div>
                    `
                },
                {
                    title: "2.3 เกราะป้องกันชั้นที่สอง: 2FA (Two-Factor Authentication)",
                    content: `
                        <p class="mb-3">แม้ว่าคนอื่นจะรู้รหัสผ่านของเรา แต่ถ้าเราเปิดระบบ <strong>2FA</strong> โจรก็ยังเข้าบัญชีเราไม่ได้!</p>
                        <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
                            <h4 class="font-bold text-emerald-800 mb-2">ปัจจัยการยืนยันตัวตน 3 ประเภท:</h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-700">
                                <div class="bg-white p-2 rounded shadow-sm border">
                                    <strong>1. สิ่งที่คุณรู้ (Knowledge):</strong> รหัสผ่าน, PIN
                                </div>
                                <div class="bg-white p-2 rounded shadow-sm border">
                                    <strong>2. สิ่งที่คุณมี (Possession):</strong> สมาร์ตโฟน, OTP, แอป Authenticator
                                </div>
                                <div class="bg-white p-2 rounded shadow-sm border">
                                    <strong>3. สิ่งที่คุณเป็น (Inherence):</strong> ลายนิ้วมือ, การสแกนใบหน้า
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    title: "2.4 มัลแวร์และอันตรายจาก Free Wi-Fi สาธารณะ",
                    content: `
                        <div class="space-y-3 text-sm text-slate-700">
                            <p><strong>มัลแวร์ดูดเงิน / แอปเถื่อน:</strong> มักมาในรูปแบบไฟล์ <code class="text-rose-600 bg-rose-100 px-1 rounded">.apk</code> บนระบบ Android ที่หลอกให้ติดตั้งนอก Google Play Store เมื่อติดตั้งแล้วจะขอสิทธิ์เข้าถึงหน้าจอ (Accessibility Service) เพื่อแอบโอนเงินในแอปธนาคาร</p>
                            <p><strong>Free Wi-Fi ตามห้างหรือร้านกาแฟ:</strong> อาจเป็น Wi-Fi ปลอม (Evil Twin) ที่แฮกเกอร์ตั้งขึ้นเพื่อดักจับข้อมูล (Man-in-the-Middle Attack) ดังนั้น <strong>ห้ามทำธุรกรรมการเงินหรือล็อกอินข้อมูลสำคัญขณะเชื่อมต่อ Wi-Fi สาธารณะที่ไม่มีรหัสผ่าน</strong></p>
                        </div>
                    `
                }
            ],
            miniQuiz: [
                {
                    q: "หากได้รับ SMS แจ้งว่า 'คุณได้รับสิทธิ์กู้เงินดอกเบี้ย 0% ด่วน คลิก www.bank-easy-cash.cc' นักเรียนควรทำอย่างไร?",
                    options: [
                        "คลิกเข้าไปดูเงื่อนไขก่อน เผื่อได้เงินจริง",
                        "ส่งต่อให้เพื่อนสนิทเพื่อช่วยกันตรวจสอบ",
                        "ลบข้อความทิ้งทันที และไม่กดลิงก์ใดๆ ทั้งสิ้น",
                        "พิมพ์ด่ากลับไปในช่อง SMS"
                    ],
                    ans: 2,
                    exp: "ธนาคารไม่มีนโยบายส่งลิงก์ชวนกู้เงินผ่าน SMS ทั่วไป โดเมน .cc เป็นเว็บต่างประเทศที่น่าสงสัย ห้ามกดลิงก์เด็ดขาด"
                },
                {
                    q: "การยืนยันตัวตนแบบ 2 ขั้นตอน (Two-Factor Authentication: 2FA) มีประโยชน์อย่างไร?",
                    options: [
                        "ช่วยให้เน็ตเร็วขึ้นเป็น 2 เท่า",
                        "ช่วยป้องกันการถูกแฮก แม้คนร้ายจะรู้รหัสผ่านของเราไปแล้วก็ตาม",
                        "ช่วยให้จำรหัสผ่านได้ง่ายขึ้นไม่ต้องจด",
                        "ใช้สำหรับการช้อปปิ้งออนไลน์โดยไม่ต้องจ่ายเงิน"
                    ],
                    ans: 1,
                    exp: "2FA เพิ่มความปลอดภัยอีกชั้น เพราะแม้แฮกเกอร์จะรู้รหัสผ่าน ก็ยังต้องมีรหัส OTP หรือการอนุมัติจากมือถือของเราจึงจะเข้าได้"
                },
                {
                    q: "การกระทำใดเสี่ยงต่อการถูกมัลแวร์ดูดเงินในมือถือมากที่สุด?",
                    options: [
                        "การอัปเดตระบบปฏิบัติการโทรศัพท์มือถือเป็นประจำ",
                        "การเปิดโหมดประหยัดพลังงานแบตเตอรี่",
                        "การดาวน์โหลดไฟล์แอปพลิเคชันนามสกุล .apk จากลิงก์ในแชทคนแปลกหน้ามาติดตั้ง",
                        "การเปิดบลูทูธฟังเพลงกับหูฟังไร้สายที่บ้าน"
                    ],
                    ans: 2,
                    exp: "ไฟล์ .apk ที่ดาวน์โหลดจากนอก Store มักแฝงมัลแวร์ดักคีย์บอร์ดและแอบควบคุมเครื่องเพื่อโอนเงิน"
                }
            ]
        },

        {
            id: 3,
            title: "หน่วยที่ 3: รอยเท้าดิจิทัลและความเป็นส่วนตัว",
            subtitle: "Digital Footprint & Privacy Protection (PDPA)",
            icon: "fa-shoe-prints",
            color: "purple",
            readTime: "15 นาที",
            summary: "ทำความเข้าใจรอยเท้าดิจิทัลที่ไม่มีวันลบเลือน กฎหมาย PDPA และการปกป้องข้อมูลส่วนบุคคลในโลกโซเชียล",
            topics: [
                {
                    title: "3.1 รอยเท้าดิจิทัล (Digital Footprint) คืออะไร?",
                    content: `
                        <p class="mb-3">ทุกสิ่งที่เราทำบนโลกออนไลน์ ทั้งการกดไลก์ การคอมเมนต์ การเช็กอินสถานที่ หรือการค้นหากูเกิล ล้วนทิ้ง <strong>'รอยเท้าดิจิทัล'</strong> ไว้เสมอ ซึ่งแบ่งเป็น 2 ประเภท:</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                                <h4 class="font-bold text-purple-800 flex items-center gap-1 mb-1">
                                    <i class="fa-solid fa-pen-nib"></i> 1. Active Footprint (รอยเท้าแบบตั้งใจ)
                                </h4>
                                <p class="text-xs text-slate-600">ข้อมูลที่เราตั้งใจโพสต์หรือแชร์ด้วยตัวเอง เช่น รูปถ่ายส่วนตัว สเตตัสบน Facebook/TikTok วิดีโอบน YouTube หรือการแสดงความคิดเห็น</p>
                            </div>
                            <div class="p-3 bg-slate-100 border border-slate-300 rounded-xl">
                                <h4 class="font-bold text-slate-800 flex items-center gap-1 mb-1">
                                    <i class="fa-solid fa-cookie-bite"></i> 2. Passive Footprint (รอยเท้าแบบไม่รู้ตัว)
                                </h4>
                                <p class="text-xs text-slate-600">ข้อมูลที่ระบบบันทึกไว้เบื้องหลังอัตโนมัติ เช่น ประวัติการเข้าชมเว็บ IP Address พิกัด GPS คุกกี้ที่บันทึกสินค้าที่เราเคยเปิดดู</p>
                            </div>
                        </div>
                    `
                },
                {
                    title: "3.2 ทำไมคำว่า 'โพสต์แล้วลบ ไม่มีจริง' จึงเป็นเรื่องจริง?",
                    content: `
                        <div class="p-4 bg-amber-50 border border-amber-300 rounded-xl space-y-2">
                            <div class="font-bold text-amber-900 text-base flex items-center gap-2">
                                <i class="fa-solid fa-triangle-exclamation"></i> ผลกระทบของ Digital Footprint ต่ออนาคตนักเรียน:
                            </div>
                            <p class="text-sm text-slate-700">แม้เราจะลบโพสต์ไปแล้วภายใน 1 วินาที แต่คนอื่นอาจ <strong>แคปหน้าจอ (Screenshot)</strong> ไว้แล้ว หรือถูกเก็บไว้ในเซิร์ฟเวอร์สำรอง (Web Archive)</p>
                            <ul class="text-xs text-slate-600 list-disc list-inside space-y-1">
                                <li><strong>การเข้าศึกษาต่อในระดับมหาวิทยาลัย:</strong> ปัจจุบันสถาบันหลายแห่งสืบค้นพฤติกรรมโซเชียลของผู้สมัคร</li>
                                <li><strong>การสมัครงานในอนาคต:</strong> ฝ่ายบุคคล (HR) มักตรวจเช็ก Digital Footprint ว่าผู้สมัครมีทัศนคติ การบูลลี่ หรือพฤติกรรมสุ่มเสี่ยงหรือไม่</li>
                                <li><strong>ชื่อเสียงและครอบครัว:</strong> โพสต์ที่รู้เท่าไม่ถึงการณ์ในวัยเรียน อาจย้อนกลับมาทำร้ายตัวเองในอีก 10 ปีข้างหน้า</li>
                            </ul>
                        </div>
                    `
                },
                {
                    title: "3.3 กฎหมาย PDPA และข้อมูลส่วนบุคคลที่ห้ามเผยแพร่เด็ดขาด",
                    content: `
                        <p class="mb-3"><strong>PDPA (Personal Data Protection Act)</strong> หรือ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล คือกฎหมายที่ให้สิทธิ์เจ้าของข้อมูลในการคุ้มครองข้อมูลของตนเอง</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div class="font-bold text-red-700 mb-1">❌ ข้อมูลอันตราย ห้ามโพสต์ลงโซเชียล:</div>
                                <ul class="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                                    <li>ภาพถ่ายบัตรประจำตัวประชาชน / พาสปอร์ต</li>
                                    <li>ภาพตั๋วเครื่องบิน / คอนเสิร์ตที่มีบาร์โค้ดหรือ QR Code</li>
                                    <li>สมุดบัญชีเงินฝาก หรือสลิปโอนเงินที่มีเลขบัญชีเต็ม</li>
                                    <li>เลขบัตรเครดิต/เดบิต และรหัสหลังบัตร (CVV)</li>
                                    <li>การเช็กอินพิกัดบ้านพักแบบเรียลไทม์เวลาอยู่คนเดียว</li>
                                </ul>
                            </div>
                            <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                                <div class="font-bold text-emerald-700 mb-1">✅ สิ่งที่ควรปฏิบัติเพื่อความปลอดภัย:</div>
                                <ul class="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                                    <li>ตั้งค่าบัญชีโซเชียลเป็นแบบ "ส่วนตัว (Private)"</li>
                                    <li>หากจำเป็นต้องโพสต์เอกสาร ให้ขีดฆ่าและปิดบังข้อมูลสำคัญ</li>
                                    <li>ขอความยินยอม (Consent) จากเพื่อนก่อนโพสต์รูปที่มีหน้าเพื่อน</li>
                                    <li>หมั่นล้างประวัติการท่องเว็บและปฏิเสธคุกกี้ที่ไม่จำเป็น</li>
                                </ul>
                            </div>
                        </div>
                    `
                }
            ],
            miniQuiz: [
                {
                    q: "ข้อใดจัดเป็น 'Passive Digital Footprint'?",
                    options: [
                        "การโพสต์รูปภาพชุดนักเรียนลงบนสตอรี่ไอจี",
                        "การเขียนคอมเมนต์แสดงความคิดเห็นใต้คลิป TikTok",
                        "ประวัติการค้นหาข้อมูลและตำแหน่งพิกัด GPS ที่เว็บไซต์บันทึกไว้ในคุกกี้",
                        "การอัปโหลดคลิปเต้นลงบน Facebook Reels"
                    ],
                    ans: 2,
                    exp: "Passive Footprint คือร่องรอยดิจิทัลที่ถูกบันทึกไว้โดยที่ผู้ใช้ไม่ได้เจตนาป้อนข้อมูลเข้าไปตรงๆ เช่น คุกกี้ พิกัด และประวัติการท่องเว็บ"
                },
                {
                    q: "พฤติกรรมใดเสี่ยงต่อการถูกขโมยข้อมูลอัตลักษณ์ (Identity Theft) มากที่สุด?",
                    options: [
                        "โพสต์รูปภาพวิวธรรมชาติที่ไปเที่ยวกับครอบครัว",
                        "ถ่ายรูปบัตรประชาชนเพื่ออวดว่าเพิ่งทำบัตรใหม่ลงโซเชียลโดยไม่ปิดบังข้อมูล",
                        "ตั้งค่ารูปโปรไฟล์เป็นภาพการ์ตูนอนิเมะ",
                        "ค้นหาแนวข้อสอบวิทยาศาสตร์บน Google"
                    ],
                    ans: 1,
                    exp: "บัตรประชาชนมีเลข 13 หลัก วันเกิด ที่อยู่ และรหัสหลังบัตร ซึ่งมิจฉาชีพสามารถนำไปสวมรอยเปิดบัญชีม้าหรือกู้เงินออนไลน์ได้"
                },
                {
                    q: "เมื่อถ่ายภาพกลุ่มกับเพื่อนร่วมชั้น หากปฏิบัติตามมารยาทดิจิทัลและหลักการคุ้มครองข้อมูลส่วนบุคคล ควรทำอย่างไรก่อนโพสต์?",
                    options: [
                        "โพสต์ได้ทันทีเพราะเป็นเพื่อนกันไม่คิดมาก",
                        "แท็กชื่อเพื่อนทุกคนพร้อมระบุเบอร์โทรศัพท์",
                        "ถามความยินยอมและอนุญาตจากเพื่อนก่อนนำภาพไปเผยแพร่สาธารณะ",
                        "ปรับแต่งภาพให้เพื่อนดูตลกแล้วโพสต์แซว"
                    ],
                    ans: 2,
                    exp: "การเคารพสิทธิส่วนบุคคล (Privacy) ต้องขอความยินยอม (Consent) จากเจ้าของภาพก่อนเผยแพร่สู่สาธารณะ"
                }
            ]
        },

        {
            id: 4,
            title: "หน่วยที่ 4: มารยาทไซเบอร์และการรับมือ Cyberbullying",
            subtitle: "Netiquette, Cyberbullying & Cyber Laws",
            icon: "fa-scale-balanced",
            color: "amber",
            readTime: "16 นาที",
            summary: "วิธีรับมือการกลั่นแกล้งบนไซเบอร์อย่างชาญฉลาด สรุปสาระสำคัญ พ.ร.บ.คอมพิวเตอร์ และลิขสิทธิ์สร้างสรรค์",
            topics: [
                {
                    title: "4.1 ภัยไซเบอร์บูลลี่ (Cyberbullying) และสัญญาณเตือน",
                    content: `
                        <p class="mb-3"><strong>การกลั่นแกล้งบนโลกออนไลน์ (Cyberbullying)</strong> คือการใช้เครื่องมือสื่อสารทำร้าย ข่มขู่ หรือประจานผู้อื่นซ้ำๆ จนเกิดความอับอายหรือวิตกกังวล</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                <span class="font-bold text-rose-600 block mb-1">การล้อเลียน/เหยียด:</span> แซวรูปร่าง หน้าตา ฐานะ หรือสีผิวในช่องคอมเมนต์
                            </div>
                            <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                <span class="font-bold text-rose-600 block mb-1">การแอบอ้างสวมรอย:</span> แฮกหรือสร้างเฟซปลอมไปด่าคนอื่นเพื่อโยนความผิด
                            </div>
                            <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                <span class="font-bold text-rose-600 block mb-1">การขับออกจากกลุ่ม:</span> กีดกันเพื่อนออกจากกลุ่มไลน์แชทห้องเรียนเพื่อสร้างความโดดเดี่ยว
                            </div>
                        </div>
                    `
                },
                {
                    title: "4.2 คาถารับมือ Cyberbullying: 'Stop - Block - Tell' (หยุด - บล็อก - บอก)",
                    content: `
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                            <div class="p-3 bg-rose-50 border border-rose-300 rounded-xl text-center">
                                <div class="w-10 h-10 mx-auto bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">1</div>
                                <h4 class="font-bold text-rose-900">STOP (หยุด)</h4>
                                <p class="text-xs text-slate-600 mt-1">อย่าตอบโต้ด้วยอารมณ์หรือคำด่ากลับ เพราะยิ่งตอบโต้ ผู้กลั่นแกล้งจะยิ่งได้ใจ</p>
                            </div>
                            <div class="p-3 bg-amber-50 border border-amber-300 rounded-xl text-center">
                                <div class="w-10 h-10 mx-auto bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">2</div>
                                <h4 class="font-bold text-amber-900">BLOCK & CAP (บล็อก & บันทึก)</h4>
                                <p class="text-xs text-slate-600 mt-1">กดบล็อกหรือรายงานบัญชี (Report) พร้อม<strong>แคปเจอร์หน้าจอเก็บหลักฐาน</strong> วัน เวลา ลิงก์โปรไฟล์</p>
                            </div>
                            <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
                                <div class="w-10 h-10 mx-auto bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">3</div>
                                <h4 class="font-bold text-emerald-900">TELL (บอก)</h4>
                                <p class="text-xs text-slate-600 mt-1">บอกคุณครู ผู้ปกครอง หรือบุคคลที่ไว้วางใจเพื่อขอความช่วยเหลือ ไม่ควรเก็บปัญหาไว้คนเดียว</p>
                            </div>
                        </div>
                    `
                },
                {
                    title: "4.3 สรุป พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ ฉบับนักเรียน ม.3",
                    content: `
                        <div class="p-3 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
                            <div class="text-sm font-bold text-cyan-400">กฎหมายคอมพิวเตอร์ที่วัยรุ่นต้องจำขึ้นใจ (มีโทษทั้งจำคุกและปรับ):</div>
                            <div class="border-b border-slate-700 pb-2">
                                <strong class="text-rose-400">แอบเข้าถึงระบบหรือข้อมูลผู้อื่น:</strong> แอบล็อกอินเข้าเฟซบุ๊กหรือไลน์คนอื่น มีโทษจำคุกไม่เกิน 2 ปี หรือปรับไม่เกิน 40,000 บาท
                            </div>
                            <div class="border-b border-slate-700 pb-2">
                                <strong class="text-amber-400">มาตรา 14 (นำเข้าข้อมูลเท็จ):</strong> โพสต์ข้อมูลเท็จ ข่าวลวง หรือตัดต่อภาพที่ก่อให้เกิดความเสียหายต่อประชาชน โทษจำคุกสูงสุด 5 ปี หรือปรับไม่เกิน 100,000 บาท
                            </div>
                            <div class="border-b border-slate-700 pb-2">
                                <strong class="text-yellow-400">มาตรา 16 (ภาพตัดต่อผู้อื่น):</strong> ตัดต่อ ดัดแปลง ภาพของผู้อื่นทำให้เสียชื่อเสียง ถูกดูหมิ่นเกลียดชัง โทษจำคุกไม่เกิน 3 ปี ปรับไม่เกิน 200,000 บาท
                            </div>
                            <div>
                                <strong class="text-purple-400">การฝากร้าน/ส่งสแปม:</strong> ส่งข้อความโฆษณารบกวนผู้อื่นโดยไม่มีปุ่มให้กดยกเลิก มีโทษปรับสูงสุด 200,000 บาท
                            </div>
                        </div>
                    `
                },
                {
                    title: "4.4 มารยาทชาวเน็ต (Netiquette) และการเคารพลิขสิทธิ์ (Creative Commons)",
                    content: `
                        <p class="mb-2 text-sm">การนำภาพ วิดีโอ หรือเสียงของคนอื่นมาทำรายงาน ต้องให้เครดิตแหล่งที่มา และเข้าใจสัญญาอนุญาต <strong>Creative Commons (CC)</strong>:</p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                            <div class="p-2 bg-slate-100 rounded border">
                                <strong>BY (Attribution)</strong><br><span class="text-[10px] text-slate-500">ต้องระบุชื่อผู้สร้างผลงาน</span>
                            </div>
                            <div class="p-2 bg-slate-100 rounded border">
                                <strong>NC (Non-Commercial)</strong><br><span class="text-[10px] text-slate-500">ห้ามใช้เพื่อการค้าหากำไร</span>
                            </div>
                            <div class="p-2 bg-slate-100 rounded border">
                                <strong>ND (No Derivatives)</strong><br><span class="text-[10px] text-slate-500">ห้ามดัดแปลงแก้ไขผลงาน</span>
                            </div>
                            <div class="p-2 bg-slate-100 rounded border">
                                <strong>SA (Share Alike)</strong><br><span class="text-[10px] text-slate-500">ต้องเผยแพร่ด้วยเงื่อนไขเดิม</span>
                            </div>
                        </div>
                    `
                }
            ],
            miniQuiz: [
                {
                    q: "เมื่อถูกเพื่อนในโลกออนไลน์โพสต์ข้อความด่าทอประจาน สิ่งแรกที่ควรทำตามหลัก Stop-Block-Tell คือข้อใด?",
                    options: [
                        "ด่าตอบโต้ทันทีด้วยถ้อยคำที่รุนแรงกว่า",
                        "หยุดตอบโต้ แคปหน้าจอเก็บหลักฐาน แล้วบล็อกผู้กระทำ",
                        "ลบบัญชีโซเชียลทิ้งแล้วไม่บอกใคร",
                        "ชวนเพื่อนคนอื่นไปรุมด่าฝ่ายตรงข้าม"
                    ],
                    ans: 1,
                    exp: "การหยุดตอบโต้จะช่วยไม่ให้เรื่องบานปลาย และการแคปหน้าจอจะใช้เป็นหลักฐานเอาผิดตามกฎหมายได้"
                },
                {
                    q: "การแอบดูรหัสผ่านของเพื่อนแล้วแอบล็อกอินเข้าไปอ่านแชทส่วนตัว มีความผิดตาม พ.ร.บ.คอมพิวเตอร์ หรือไม่?",
                    options: [
                        "ไม่ผิด เพราะเป็นเพื่อนสนิทกันหยอกล้อกันได้",
                        "ไม่ผิด หากไม่ได้ขโมยเงินหรือโพสต์อะไรเสียหาย",
                        "มีความผิด ฐานแอบเข้าถึงระบบและข้อมูลคอมพิวเตอร์ของผู้อื่นโดยมิชอบ",
                        "มีความผิดเฉพาะเมื่อเพื่อนไปแจ้งความภายใน 1 ชั่วโมงเท่านั้น"
                    ],
                    ans: 2,
                    exp: "การเข้าถึงข้อมูลคอมพิวเตอร์ของผู้อื่นโดยไม่มีสิทธิ มีความผิดตาม พ.ร.บ. คอมพิวเตอร์อย่างชัดเจน แม้จะเป็นเพื่อนกันก็ตาม"
                },
                {
                    q: "สัญลักษณ์ Creative Commons รูป 'NC' (Non-Commercial) หมายความว่าอย่างไร?",
                    options: [
                        "ห้ามดัดแปลงผลงาน",
                        "ต้องจ่ายเงินค่าลิขสิทธิ์ก่อนใช้งาน",
                        "อนุญาตให้นำไปใช้ได้ แต่ห้ามนำไปใช้เพื่อแสวงหาผลประโยชน์ทางการค้า",
                        "ห้ามเด็กและเยาวชนใช้งาน"
                    ],
                    ans: 2,
                    exp: "NC ย่อมาจาก Non-Commercial คือห้ามนำไปใช้ประโยชน์ในเชิงพาณิชย์หรือเพื่อการค้า"
                }
            ]
        }
    ],

    // คลังข้อสอบก่อนเรียน - หลังเรียน (10 ข้อมาตรฐาน ว 4.2 ม.3)
    quizQuestions: [
        {
            id: 1,
            unit: 1,
            question: "หากนักเรียนเห็นพาดหัวข่าวใน Facebook ว่า 'ด่วนที่สุด! กินน้ำอุ่นผสมมะนาวช่วยรักษาโรคมะเร็งหายขาดใน 3 วัน' นักเรียนควรดำเนินการอย่างไรเป็นอันดับแรก?",
            options: [
                "กดแชร์ต่อให้คนในครอบครัวทันทีเพราะเป็นประโยชน์ต่อสุขภาพ",
                "ตรวจสอบข้อมูลกับเว็บไซต์ที่เชื่อถือได้ เช่น ศูนย์ต่อต้านข่าวปลอม หรือกระทรวงสาธารณสุข",
                "พิมพ์คอมเมนต์สั่งซื้อน้ำมะนาวใต้โพสต์",
                "เซฟรูปเก็บไว้แล้วส่งต่อในกลุ่มแชทไลน์ห้องเรียน"
            ],
            correct: 1,
            explanation: "ข่าวสุขภาพที่มีการอ้างสรรพคุณมหัศจรรย์มักเป็นข่าวปลอมหรือข้อมูลคลาดเคลื่อน ต้องตรวจสอบกับหน่วยงานสาธารณสุขก่อนเชื่อหรือแชร์เสมอ"
        },
        {
            id: 2,
            unit: 1,
            question: "เทคโนโลยีใดที่สามารถสังเคราะห์ใบหน้าและเสียงของบุคคลอื่นให้พูดตามที่ผู้สร้างต้องการ จนนำมาใช้ในการหลอกลวงออนไลน์อย่างแพร่หลายในปัจจุบัน?",
            options: [
                "Cloud Computing",
                "Deepfake (เทคโนโลยีปัญญาประดิษฐ์สังเคราะห์สื่อ)",
                "Blockchain",
                "Virtual Reality (VR)"
            ],
            correct: 1,
            explanation: "Deepfake คือการใช้ AI ผสมผสานรูปภาพและเสียงเพื่อสร้างสื่อสังเคราะห์ที่เสมือนจริง มิจฉาชีพมักนำมาใช้แอบอ้างเป็นบุคคลที่มีชื่อเสียงหรือคนรู้จักเพื่อหลอกลวง"
        },
        {
            id: 3,
            unit: 2,
            question: "รหัสผ่านในข้อใดมีความแข็งแกร่งและปลอดภัยจากการถูกแฮกเกอร์โจมตีแบบสุ่มรหัสผ่าน (Brute-Force Attack) มากที่สุด?",
            options: [
                "1234567890",
                "somchai2026",
                "NPschool#96!Safety2026",
                "passwordM3"
            ],
            correct: 2,
            explanation: "รหัสผ่านที่ดีต้องมีความยาวเกิน 12 ตัวอักษร ผสมตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ โดยไม่ใช้คำในพจนานุกรมเดี่ยวๆ"
        },
        {
            id: 4,
            unit: 2,
            question: "หากมีข้อความ SMS ส่งเข้ามือถือว่า 'เงินกู้ด่วน อนุมัติไว 50,000 บาท แอดไลน์คลิก bit.ly/easy-loan' พฤติกรรมนี้เข้าข่ายภัยคุกคามประเภทใด?",
            options: [
                "Denial of Service (DoS)",
                "Phishing / Scam (การหลอกลวงแบบฟิชชิ่ง)",
                "Software Bug",
                "System Backup"
            ],
            correct: 1,
            explanation: "การส่งลิงก์สั้นผ่าน SMS เพื่อหลอกให้เหยื่อแอดไลน์หรือกรอกข้อมูล เป็นรูปแบบหนึ่งของ Phishing และ Scam ของมิจฉาชีพ"
        },
        {
            id: 5,
            unit: 2,
            question: "ข้อใดเป็นข้อควรระวังสำคัญที่สุดเมื่อจำเป็นต้องเชื่อมต่อเครือข่าย Wi-Fi สาธารณะที่ไม่มีรหัสผ่าน (Free Public Wi-Fi)?",
            options: [
                "ห้ามชาร์จแบตเตอรี่โทรศัพท์ขณะต่อ Wi-Fi",
                "ห้ามทำธุรกรรมทางการเงินหรือล็อกอินเข้าสู่ระบบบัญชีสำคัญ",
                "ห้ามฟังเพลงที่มีลิขสิทธิ์",
                "ห้ามส่งรูปถ่ายวิวทิวทัศน์ให้เพื่อน"
            ],
            correct: 1,
            explanation: "Wi-Fi สาธารณะที่ไม่มีการเข้ารหัส อาจมีผู้ไม่หวังดีดักจับแพ็กเก็ตข้อมูล (Sniffing) ทำให้รหัสผ่านและข้อมูลทางการเงินถูกขโมยได้"
        },
        {
            id: 6,
            unit: 3,
            question: "คำว่า 'Digital Footprint' มีความสำคัญต่ออนาคตของนักเรียนอย่างไร?",
            options: [
                "เป็นรอยเท้าที่ช่วยตรวจนับก้าวเดินออกกำลังกายบนสมาร์ตวอทช์",
                "เป็นประวัติและพฤติกรรมบนโลกออนไลน์ที่ไม่สามารถลบได้หมด ซึ่งอาจมีผลต่อการศึกษาต่อและการทำงานในอนาคต",
                "ไม่มีผลใดๆ เมื่อผู้ใช้ลบบัญชีโซเชียลมีเดียทิ้ง",
                "เป็นไวรัสคอมพิวเตอร์ที่คอยติดตามดักจับการพิมพ์"
            ],
            correct: 1,
            explanation: "รอยเท้าดิจิทัลคือประวัติการใช้งานทุกอย่างบนโลกออนไลน์ ซึ่งมหาวิทยาลัยหรือนายจ้างในอนาคตอาจใช้เป็นเกณฑ์พิจารณาคัดเลือกบุคคล"
        },
        {
            id: 7,
            unit: 3,
            question: "ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ข้อใดจัดเป็น 'ข้อมูลส่วนบุคคล' ที่ต้องได้รับความยินยอมก่อนนำไปเผยแพร่?",
            options: [
                "ภาพถ่ายบัตรประชาชน และข้อมูลประวัติการรักษาพยาบาล",
                "สภาพภูมิอากาศของจังหวัดน่านในวันนี้",
                "ตารางสูตรคูณแม่ 2 ถึงแม่ 12",
                "แผนที่ภูมิศาสตร์ประเทศไทย"
            ],
            correct: 0,
            explanation: "ข้อมูลส่วนบุคคลคือข้อมูลที่สามารถระบุตัวตนของบุคคลธรรมดาได้ ไม่ว่าโดยตรงหรือโดยอ้อม เช่น เลขบัตรประชาชน ภาพถ่าย ประวัติสุขภาพ ฯลฯ"
        },
        {
            id: 8,
            unit: 4,
            question: "เมื่อพบว่ามีเพื่อนในห้องถูกสร้างเพจปลอมเพื่อนำภาพไปตัดต่อล้อเลียนให้อับอาย พฤติกรรมนี้เข้าข่ายความผิดข้อใด?",
            options: [
                "Cyberbullying และมีความผิดตาม พ.ร.บ.คอมพิวเตอร์ มาตรา 16",
                "เป็นการหยอกล้อธรรมดาของวัยรุ่น ไม่ถือเป็นความผิดทางกฎหมาย",
                "ความผิดตามกฎหมายจราจรทางบก",
                "ความผิดเรื่องลิขสิทธิ์สิทธิบัตรยา"
            ],
            correct: 0,
            explanation: "การตัดต่อภาพผู้อื่นแล้วนำเข้าสู่ระบบคอมพิวเตอร์จนทำให้เสียชื่อเสียง ถูกดูหมิ่นเกลียดชัง ถือเป็นการกลั่นแกล้งบนไซเบอร์ และผิด พ.ร.บ.คอมพิวเตอร์ มีโทษทั้งจำและปรับ"
        },
        {
            id: 9,
            unit: 4,
            question: "หลักการรับมือการถูกกลั่นแกล้งบนโลกไซเบอร์แบบ 'Stop - Block - Tell' ข้อใดอธิบายขั้นตอน 'Tell' ได้ถูกต้องที่สุด?",
            options: [
                "โพสต์ด่าประจานฝ่ายตรงข้ามให้สังคมรุมประณาม",
                "แอบไปบอกเพื่อนในกลุ่มลับให้นัดไปรุมทำร้ายหลังเลิกเรียน",
                "บอกคุณครู ผู้ปกครอง หรือผู้ใหญ่ที่ไว้วางใจ พร้อมส่งมอบหลักฐานภาพแคปหน้าจอเพื่อขอความช่วยเหลือ",
                "บอกให้ทุกคนลืมเรื่องที่เกิดขึ้นแล้วเก็บความทุกข์ไว้คนเดียว"
            ],
            correct: 2,
            explanation: "Tell คือการสื่อสารและขอความช่วยเหลือจากผู้ใหญ่ที่ไว้ใจได้ เช่น ครูประจำชั้น ครูแนะแนว หรือผู้ปกครอง พร้อมหลักฐานเพื่อแก้ไขปัญหาอย่างถูกวิธี"
        },
        {
            id: 10,
            unit: 4,
            question: "การนำรูปภาพจากอินเทอร์เน็ตมาประกอบสไลด์รายงานวิชาการ โดยให้เครดิตระบุแหล่งที่มาของผู้สร้างสรรค์ และมีสัญลักษณ์สัญญาอนุญาต Creative Commons (CC BY-NC) ถือว่าถูกต้องหรือไม่ เพราะเหตุใด?",
            options: [
                "ไม่ถูกต้อง เพราะห้ามนำผลงานของคนอื่นมาใช้ในทุกกรณี",
                "ถูกต้อง เพราะเป็นการใช้งานเพื่อการศึกษา ไม่ได้แสวงหากำไร และมีการให้เครดิตเจ้าของผลงานตามเงื่อนไข",
                "ไม่ถูกต้อง เพราะต้องจ่ายค่าลิขสิทธิ์ให้กับกระทรวงดิจิทัลก่อน",
                "ถูกต้อง แต่ต้องลบลายน้ำและอ้างว่าเป็นผลงานของตนเอง"
            ],
            correct: 1,
            explanation: "สัญญาอนุญาต CC BY-NC อนุญาตให้นำผลงานไปใช้ได้โดยต้องระบุชื่อผู้สร้าง (BY) และห้ามใช้เพื่อการค้าหากำไร (NC) การทำรายงานส่งครูจึงทำได้ตามข้อตกลง"
        }
    ],

    // ข้อมูลสำหรับห้องปฏิบัติการจำลอง (Interactive Labs)
    labs: {
        phishing: [
            {
                id: 1,
                sender: "SMS: Krungthai-Alert",
                channel: "sms",
                time: "10:24 น.",
                message: "บัญชีของคุณมีความพยายามเข้าสู่ระบบจากอุปกรณ์อื่น กรุณายืนยันตัวตนทันทีที่ https://ktb-secure-verify.cc/login มิเช่นนั้นบัญชีจะถูกอายัดภายใน 24 ชม.",
                isScam: true,
                clues: [
                    "สร้างความตื่นตระหนกและเร่งเร้าด้วยการขู่อายัดบัญชีใน 24 ชม.",
                    "ลิงก์ลงท้ายด้วย .cc แทนที่จะเป็น .co.th หรือ .com ของธนาคารจริง",
                    "ธนาคารแห่งประเทศไทยห้ามธนาคารส่งลิงก์ยืนยันตัวตนผ่าน SMS ทุกกรณี"
                ],
                explanation: "นี่คือ SMS Phishing แน่นอน! สังเกตชื่อโดเมนปลอม และการสร้างความกลัวเพื่อบีบให้เหยื่อรีบคลิกลิงก์"
            },
            {
                id: 2,
                sender: "อีเมล: service@delivery-express.in.th",
                channel: "email",
                time: "14:15 น.",
                message: "พัสดุหมายเลข TH827104921 ของคุณค้างอยู่ที่คลังสินค้าเนื่องจากค้างชำระค่าธรรมเนียมศุลกากร 42 บาท ชำระเงินได้ที่ลิงก์แนบ",
                isScam: true,
                clues: [
                    "เหยื่อไม่ได้สั่งสินค้าจากต่างประเทศ แต่มีแจ้งเก็บเงิน",
                    "ยอดเงินจำนวนน้อย (42 บาท) เพื่อให้เหยื่อตัดสินใจจ่ายง่ายๆ แต่หน้าเว็บจะหลอกกรอกเลขบัตรเครดิต/เดบิตเพื่อดูดเงินหมดบัญชี",
                    "อีเมลส่งมาจากโดเมนที่ไม่ใช่ของไปรษณีย์ไทยหรือบริษัทขนส่งทางการ"
                ],
                explanation: "กลลวงพัสดุตกค้างยอดนิยม! มิจฉาชีพจะหลอกล่อด้วยเงินจำนวนน้อย เพื่อให้เหยื่อตายใจแล้วกรอกข้อมูลบัตร"
            },
            {
                id: 3,
                sender: "แจ้งเตือนระบบ: Google Account",
                channel: "email",
                time: "08:30 น.",
                message: "มีการลงชื่อเข้าใช้ใหม่บนอุปกรณ์ Windows ของคุณ หากนี่คือคุณ ไม่จำเป็นต้องดำเนินการใดๆ หากไม่ใช่คุณ สามารถตรวจสอบกิจกรรมได้ที่ myaccount.google.com/security",
                isScam: false,
                clues: [
                    "ลิงก์ที่ให้ตรวจสอบเป็นโดเมนหลักของ Google แท้จริง (google.com)",
                    "ไม่มีข้อความข่มขู่ ไม่ขอรหัสผ่าน ไม่บังคับให้กรอก OTP ทันที",
                    "เป็นการแจ้งเตือนเพื่อความปลอดภัยตามปกติของระบบเมื่อพบล็อกอินใหม่"
                ],
                explanation: "ข้อความนี้เป็นของจริง ปลอดภัย! โดเมนถูกต้อง และไม่มีพฤติกรรมบังคับให้โอนเงินหรือให้ข้อมูลลับ"
            },
            {
                id: 4,
                sender: "LINE: ฝ่ายสรรหาบุคลากร TikTok Official",
                channel: "chat",
                time: "19:40 น.",
                message: "สวัสดีค่ะ สนใจทำงานพาร์ทไทม์ออนไลน์ไหมคะ? เพียงแค่กดไลก์กดติดตามคลิป รายได้วันละ 800 - 2,000 บาท ทำที่บ้านได้ นักเรียนทำได้ ไม่ต้องมีประสบการณ์ สนใจพิมพ์ 1 ค่ะ",
                isScam: true,
                clues: [
                    "รายได้สูงเกินจริงเทียบกับเนื้องาน (กดไลก์ได้วันละ 2,000 บาท)",
                    "ทักหาคนแปลกหน้าผ่านไลน์โดยตรงโดยที่ผู้รับไม่เคยสมัครงาน",
                    "ขั้นตอนต่อไปจะให้โอนเงิน 'ค่าประกันงาน' หรือ 'ค่าสำรองทุน' ซึ่งจะถูกเชิดเงินหนี"
                ],
                explanation: "มิจฉาชีพหลอกทำงานออนไลน์ (Task Scam)! เมื่อเหยื่อหลงเชื่อ จะถูกหลอกให้โอนเงินเข้าสู่ระบบเพื่อปลดล็อกภารกิจแล้วไม่สามารถถอนเงินคืนได้"
            }
        ],

        factCheck: [
            {
                id: 1,
                title: "นักวิทยาศาสตร์เตือน! คลื่น 5G ปล่อยรังสีทำลายเซลล์สมองและทำให้ติดเชื้อไวรัสได้ง่ายขึ้น",
                source: "เพจแชร์ต่อไม่รอแล้วนะ (ผู้ติดตาม 1,200 คน)",
                publishedDate: "เมื่อ 2 ชั่วโมงที่แล้ว",
                imagePlaceholder: "fa-tower-cell",
                isFake: true,
                verificationPoints: [
                    "องค์การอนามัยโลก (WHO) และ กสทช. ยืนยันแล้วว่าคลื่นวิทยุ 5G เป็นคลื่นความถี่ประเภท Non-ionizing radiation ไม่สามารถเปลี่ยนโครงสร้างเซลล์หรือส่งต่อเชื้อไวรัสได้",
                    "ไม่มีการอ้างอิงชื่อนักวิทยาศาสตร์ สถาบันวิจัย หรือผลการทดลองทางวิทยาศาสตร์ที่ตรวจสอบได้",
                    "พาดหัวข่าวกระตุ้นความตื่นตระหนกเพื่อหวังยอดแชร์"
                ]
            },
            {
                id: 2,
                title: "โรงเรียนบ้านน้ำพร เปิดรับสมัครนักเรียนเข้าร่วมกิจกรรมอบรมทักษะดิจิทัล ประจำปีการศึกษา 2569",
                source: "เว็บไซต์ทางการและเพจเฟซบุ๊กทางการของโรงเรียนบ้านน้ำพร",
                publishedDate: "วันนี้",
                imagePlaceholder: "fa-school",
                isFake: false,
                verificationPoints: [
                    "เผยแพร่ผ่านช่องทางประชาสัมพันธ์หลักที่มีตัวตนจริงของสถานศึกษา",
                    "มีลายเซ็นผู้บริหารและตราสัญลักษณ์ของโรงเรียนชัดเจน",
                    "สามารถสอบถามและตรวจสอบกับคุณครูในโรงเรียนได้โดยตรง"
                ]
            },
            {
                id: 3,
                title: "ประกาศด่วน! ผู้ถือบัตรทองทุกคนสามารถรับเงินเยียวยาพิเศษคนละ 3,000 บาท เข้าบัญชีทันที แค่แอดไลน์ @gold-care-fund",
                source: "ข้อความส่งต่อในแชทกลุ่มครอบครัว",
                publishedDate: "ไม่ระบุวันที่",
                imagePlaceholder: "fa-hand-holding-dollar",
                isFake: true,
                verificationPoints: [
                    "สำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.) ยืนยันว่าเป็นข่าวปลอม ไม่มีนโยบายแจกเงินสด",
                    "ไอดีไลน์เป็นไลน์ส่วนบุคคล ไม่ใช่บัญชีทางการ (Verified Account ที่มีโล่เขียว/น้ำเงิน)",
                    "เป้าหมายเพื่อหลอกดึงคนเข้ากลุ่มเพื่อเชิญชวนเล่นการพนันหรือชวนลงทุนผิดกฎหมาย"
                ]
            },
            {
                id: 4,
                title: "กรมอุตุนิยมวิทยาออกประกาศเตือนสภาพอากาศฝนตกหนักถึงหนักมากในพื้นที่ภาคเหนือ",
                source: "เว็บไซต์กรมอุตุนิยมวิทยา (tmd.go.th)",
                publishedDate: "อัปเดตล่าสุด 06:00 น.",
                imagePlaceholder: "fa-cloud-showers-heavy",
                isFake: false,
                verificationPoints: [
                    "เว็บไซต์ลงท้ายด้วยโดเมน .go.th ซึ่งเป็นโดเมนสำหรับหน่วยงานรัฐบาลไทยเท่านั้น",
                    "มีเลขที่ประกาศ วันเวลา และชื่ออธิบดีกรมอุตุนิยมวิทยากำกับอย่างเป็นทางการ",
                    "สำนักข่าวโทรทัศน์ทุกช่องรายงานเนื้อหาและข้อความตรงกัน"
                ]
            }
        ],

        scenarios: [
            {
                id: 1,
                title: "เหตุการณ์ที่ 1: ดราม่าในกลุ่มแชทห้อง ม.3",
                context: "ในกลุ่มไลน์ห้องเรียน มีเพื่อนคนหนึ่งส่งรูปเพื่อนร่วมห้องที่กำลังนั่งหลับน้ำลายไหล พร้อมพิมพ์ข้อความแซวว่า 'สภาพ! หน้าเหมือนตัวตลกเลย ใครเห็นก็ขยะแขยง 555' จากนั้นเพื่อนหลายคนเริ่มส่งสติกเกอร์หัวเราะเยาะ",
                question: "ในฐานะที่นักเรียนอยู่ในกลุ่มแชทนี้ นักเรียนควรทำอย่างไรเพื่อแสดงความรับผิดชอบทางดิจิทัล?",
                choices: [
                    {
                        text: "ส่งสติกเกอร์หัวเราะตามเพื่อน จะได้ไม่ตกกระแสและดูกลมกลืน",
                        score: 0,
                        feedback: "❌ ไม่ถูกต้อง! การร่วมหัวเราะเป็นการสนับสนุนการกลั่นแกล้ง (Bystander effect) ทำให้เพื่อนที่ตกเป็นเป้าหมายรู้สึกโดดเดี่ยวและเจ็บปวดยิ่งขึ้น"
                    },
                    {
                        text: "ทักแชทส่วนตัวไปเตือนเพื่อนคนที่โพสต์อย่างสุภาพให้ลบรูป และทักไปให้กำลังใจเพื่อนที่ถูกแกล้ง พร้อมแจ้งครูหากสถานการณ์ไม่หยุด",
                        score: 100,
                        feedback: "🎉 ยอดเยี่ยมมาก! นี่คือคุณสมบัติของ Upstander (ผู้กล้าหยุดการบูลลี่) ที่ช่วยปกป้องเพื่อนและไม่ส่งเสริมพฤติกรรมทำร้ายจิตใจ"
                    },
                    {
                        text: "เซฟรูปไว้แล้วเอาไปโพสต์ลง TikTok ส่วนตัวให้คนอื่นช่วยดู",
                        score: 0,
                        feedback: "❌ อันตรายมาก! การนำรูปไปเผยแพร่ต่อมีความผิดตาม พ.ร.บ.คอมพิวเตอร์ และทำให้ความเสียหายขยายวงกว้างยิ่งขึ้น"
                    }
                ]
            },
            {
                id: 2,
                title: "เหตุการณ์ที่ 2: ข้อความขอรหัส OTP จากเพื่อนสนิท",
                context: "เพื่อนสนิทในห้องทักแชท Facebook มาหาตอน 2 ทุ่มว่า 'เธอๆ เราทำภารกิจในเกม Rov อยู่ ขอช่วยส่งเบอร์โทรกับรหัส OTP 6 ตัวที่จะเด้งเข้าเครื่องเธอมาให้เราหน่อยสิ รีบมากเหลือเวลา 2 นาที!'",
                question: "นักเรียนควรตัดสินใจอย่างไร?",
                choices: [
                    {
                        text: "รีบส่งให้ทันทีเพราะเป็นเพื่อนสนิทกัน คงไม่หลอกกันอยู่แล้ว",
                        score: 0,
                        feedback: "❌ เสี่ยงโดนแฮกสูงมาก! บัญชีของเพื่อนอาจถูกแฮกเกอร์ขโมยไปแล้ว และ OTP นั้นอาจเป็นรหัสโอนเงินหรือรหัสยึดบัญชีของเราเอง"
                    },
                    {
                        text: "โทรศัพท์สายตรงหาเพื่อน หรือโทรผ่านเบอร์ปกติเพื่อยืนยันตัวตนว่าเป็นเพื่อนตัวจริงหรือไม่ และห้ามส่งรหัส OTP ให้เด็ดขาด",
                        score: 100,
                        feedback: "🎉 ถูกต้องและรอบคอบที่สุด! รหัส OTP เป็นความลับเฉพาะตัว ห้ามบอกใครในโลก และการโทรตรวจสอบด้วยเสียงจะช่วยตัดตอนมิจฉาชีพได้ทันที"
                    },
                    {
                        text: "ส่งรหัสผิดไปมั่วๆ เพื่อแกล้งเพื่อนกลับ",
                        score: 30,
                        feedback: "⚠️ แม้จะไม่ได้ส่งรหัสจริง แต่ก็ยังไม่ได้ตรวจสอบว่าบัญชีเพื่อนกำลังตกอยู่ในอันตรายหรือไม่ ทางที่ดีควรรีบโทรแจ้งเพื่อนทันที"
                    }
                ]
            }
        ]
    }
};
