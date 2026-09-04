/**
 * packaging-data.js
 * ข้อมูลหลักสูตร สื่อการสอน ผลิตภัณฑ์ชุมชน และแบบทดสอบ
 * โครงการพัฒนาทักษะนวัตกรอาชีพดิจิทัล (Digital Career Innovator)
 * ผ่านการสร้างสรรค์บรรจุภัณฑ์อัจฉริยะ (Smart Packaging) ด้วยเทคโนโลยี NFC Tag
 * โรงเรียนบ้านน้ำพร สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1
 */

const PACKAGING_DATA = {
    schoolInfo: {
        name: "โรงเรียนบ้านน้ำพร",
        area: "สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1",
        areaShort: "สพป.เลย เขต 1",
        motto: "นตฺถิ ปญฺญา สมา อาภา (ไม่มีแสงสว่างใดเสมอด้วยปัญญา)",
        subject: "เทคโนโลยี (การออกแบบและเทคโนโลยี 3) รหัสวิชา ว23104",
        level: "ชั้นมัธยมศึกษาปีที่ 3",
        academicYear: "2569",
        director: "นางศิวาลัย แก้วเขียว (ผู้อำนวยการโรงเรียนบ้านน้ำพร)",
        teacher: "นายนิรุทธิ์ เสวะนา (ครูประจำชั้น ม.3)",
        teacherPassword: "42010113",
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

    // ผลิตภัณฑ์ชุมชนบ้านน้ำพร / จังหวัดเลย ที่ใช้ในระบบ
    communityProducts: [
        {
            id: "cotton",
            name: "ผ้าฝ้ายทอมือย้อมสีธรรมชาติบ้านน้ำพร",
            category: "สิ่งทอและหัตถกรรมพื้นถิ่น",
            origin: "กลุ่มทอผ้าสตรีบ้านน้ำพร ต.ปากพร้าว จ.เลย",
            description: "ผ้าฝ้ายเข็นมือลายโบราณ ย้อมด้วยเปลือกไม้และครามธรรมชาติ นุ่ม สวมใส่สบาย ไม่ระคายเคืองผิว สื่อถึงวิถีชีวิตชาวไทเลย",
            priceNormal: 350,
            priceSmart: 550,
            tagType: "NTAG213 (Laundry/Fabric Resistant)",
            nfcPayload: "https://bannamphorn.ac.th/product/cotton-craft",
            icon: "fa-vest",
            color: "indigo",
            ecoMaterial: "กล่องกระดาษคราฟต์รีไซเคิล ฉลุลายหน้าต่าง มองเห็นเนื้อผ้า"
        },
        {
            id: "macadamia",
            name: "มะคาเดเมียคั่วอบธรรมชาติภูหลวง",
            category: "เกษตรแปรรูปและอาหารสุขภาพ",
            origin: "สวนเกษตรอินทรีย์เชิงดอยภูหลวง ชุมชนบ้านน้ำพร",
            description: "มะคาเดเมียเม็ดโต อบสดใหม่ ไม่ใส่วัตถุกันเสีย อุดมด้วยกรดไขมันดี โอเมก้า 3-6-9 ผ่านมาตรฐาน อย. และ มผช.",
            priceNormal: 120,
            priceSmart: 180,
            tagType: "NTAG215 (Food-Grade Sticker)",
            nfcPayload: "https://bannamphorn.ac.th/product/macadamia-organic",
            icon: "fa-seedling",
            color: "emerald",
            ecoMaterial: "ซองกระดาษคราฟต์ซิปล็อกเคลือบฟิล์มสลายตัวทางชีวภาพ (PLA)"
        },
        {
            id: "coffee",
            name: "กาแฟอาราบิกาดริปดอยน้ำพร",
            category: "เครื่องดื่มพรีเมียมชุมชน",
            origin: "วิสาหกิจชุมชนกาแฟสร้างป่าบ้านน้ำพร บนระดับความสูง 950 เมตร",
            description: "เมล็ดกาแฟอาราบิกา 100% ผ่านกรรมวิธี Washed Process คั่วระดับกลาง กลิ่นหอมผลไม้และคาราเมล สัมผัสละมุนในรูปแบบ Drip Bag",
            priceNormal: 150,
            priceSmart: 240,
            tagType: "NTAG213 (Compact Paper Label)",
            nfcPayload: "https://bannamphorn.ac.th/product/drip-coffee",
            icon: "fa-mug-hot",
            color: "amber",
            ecoMaterial: "กล่องกระดาษฟางข้าวเยื่อธรรมชาติ พิมพ์ด้วยหมึกถั่วเหลือง (Soy Ink)"
        },
        {
            id: "honey",
            name: "น้ำผึ้งป่าเดือนห้าอินทรีย์บ้านน้ำพร",
            category: "ผลผลิตจากป่าธรรมชาติ",
            origin: "ป่าชุมชนบ้านน้ำพร แหล่งรังผึ้งโพรงธรรมชาติ",
            description: "น้ำผึ้งแท้บริสุทธิ์จากเกสรดอกไม้ป่านานาพรรณ เก็บเฉพาะช่วงเดือนห้า ความชื้นต่ำ รสหวานกลมกล่อม มีคุณค่าทางโภชนาการสูง",
            priceNormal: 200,
            priceSmart: 320,
            tagType: "NTAG216 (Anti-Metal Cap Seal)",
            nfcPayload: "https://bannamphorn.ac.th/product/wild-honey",
            icon: "fa-jar",
            color: "yellow",
            ecoMaterial: "ขวดแก้วรีไซเคิล ปิดผนึกด้วยชานอ้อยและซีลชิป NFC บนฝาขวด"
        }
    ],

    // หน่วยการเรียนรู้ 4 หน่วย
    units: [
        {
            id: 1,
            title: "หน่วยที่ 1: มหัศจรรย์เทคโนโลยี NFC & Internet of Packaging (IoP)",
            subtitle: "Near Field Communication & Smart Connected Packaging",
            readTime: "20 นาที",
            icon: "fa-wifi",
            color: "blue",
            summary: "เรียนรู้คลื่นความถี่ 13.56 MHz, สถาปัตยกรรมชิป NTAG, การเปรียบเทียบข้อได้เปรียบของ NFC เหนือ QR Code และแนวคิด Internet of Packaging",
            topics: [
                {
                    title: "1.1 เทคโนโลยี NFC คืออะไร และทำงานอย่างไร?",
                    content: `
                        <p class="mb-3"><strong>NFC (Near Field Communication)</strong> คือ เทคโนโลยีการสื่อสารข้อมูลแบบไร้สายระยะใกล้มาก (ประมาณ 2-4 เซนติเมตร) ทำงานบนคลื่นความถี่ <strong>13.56 MHz</strong> โดยอาศัยหลักการเหนี่ยวนำแม่เหล็กไฟฟ้า (Electromagnetic Induction)</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                            <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                <h4 class="font-bold text-blue-900 flex items-center gap-1.5"><i class="fa-solid fa-microchip"></i> ชิป NFC Tag (Passive Device)</h4>
                                <p class="text-xs text-slate-600 mt-1">ไม่ต้องมีแบตเตอรี่ในตัว มีขนาดเล็กบางเหมือนสติกเกอร์ สามารถฝังลงในกระดาษ พลาสติก หรือผ้า เมื่อสมาร์ตโฟนเข้ามาใกล้ คลื่นแม่เหล็กจะจ่ายพลังงานให้ชิปส่งข้อมูลออกมาทันที</p>
                            </div>
                            <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                                <h4 class="font-bold text-indigo-900 flex items-center gap-1.5"><i class="fa-solid fa-mobile-screen"></i> เครื่องอ่าน NFC (Active Reader)</h4>
                                <p class="text-xs text-slate-600 mt-1">สมาร์ตโฟนในปัจจุบัน (ทั้ง Android และ iOS) มีตัวอ่าน NFC ฝังในตัว เพียงเปิดหน้าจอแล้วนำไปแตะ (Tap) บรรจุภัณฑ์ ข้อมูลจะเปิดขึ้นมาทันทีโดยไม่ต้องเปิดกล้องสแกน</p>
                            </div>
                        </div>
                    `
                },
                {
                    title: "1.2 เปรียบเทียบ Barcode vs QR Code vs NFC Tag",
                    content: `
                        <div class="overflow-x-auto my-3">
                            <table class="w-full text-xs text-left border-collapse border border-slate-200">
                                <thead class="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th class="p-2 border">คุณสมบัติ</th>
                                        <th class="p-2 border">บาร์โค้ด (Barcode)</th>
                                        <th class="p-2 border">คิวอาร์โค้ด (QR Code)</th>
                                        <th class="p-2 border bg-blue-50 text-blue-900 font-bold">เอ็นเอฟซี (NFC Tag) ⭐</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="p-2 border font-bold">วิธีอ่านข้อมูล</td>
                                        <td class="p-2 border">ยิงเลเซอร์แนวตรง</td>
                                        <td class="p-2 border">เปิดแอปกล้องส่อง</td>
                                        <td class="p-2 border bg-blue-50/50 font-semibold text-emerald-700">แค่แตะสัมผัส (Tap & Go)</td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 border font-bold">การซ่อนในบรรจุภัณฑ์</td>
                                        <td class="p-2 border">ต้องมองเห็นได้ชัดเจน</td>
                                        <td class="p-2 border">ต้องพิมพ์บนพื้นผิว</td>
                                        <td class="p-2 border bg-blue-50/50 font-semibold text-emerald-700">ซ่อนใต้กระดาษหรือฝาได้</td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 border font-bold">ความทนทาน</td>
                                        <td class="p-2 border">ฉีกขาดแล้วอ่านไม่ได้</td>
                                        <td class="p-2 border">เปื้อนหรือยับอ่านยาก</td>
                                        <td class="p-2 border bg-blue-50/50 font-semibold text-emerald-700">กันน้ำ กันรอยขีดข่วน อายุ 10 ปี</td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 border font-bold">การเปลี่ยนข้อมูล</td>
                                        <td class="p-2 border">เปลี่ยนไม่ได้</td>
                                        <td class="p-2 border">ต้องพิมพ์ใหม่</td>
                                        <td class="p-2 border bg-blue-50/50 font-semibold text-emerald-700">เขียนทับ/อัปเดตได้นับแสนครั้ง</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `
                },
                {
                    title: "1.3 ตระกูลชิป NTAG ยอดนิยมในงานบรรจุภัณฑ์",
                    content: `
                        <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-700 pl-2">
                            <li><strong>NTAG213:</strong> ความจุ 144 ไบต์ เหมาะสำหรับบันทึกลิงก์ URL สตอรี่สินค้า สถิตินิยมใช้สูงที่สุดและราคาประหยัด (ประมาณ 3-5 บาท/ชิ้น)</li>
                            <li><strong>NTAG215:</strong> ความจุ 504 ไบต์ เหมาะสำหรับข้อมูลยาว ข้อความแนะนำวิธีใช้ หรือนามบัตรดิจิทัล</li>
                            <li><strong>NTAG216:</strong> ความจุ 888 ไบต์ เหมาะสำหรับระบบความปลอดภัยสูง ข้อมูลเข้ารหัสรับรองของแท้</li>
                        </ul>
                    `
                }
            ]
        },
        {
            id: 2,
            title: "นวัตกรบรรจุภัณฑ์อัจฉริยะ (NFC Tag): บรรจุภัณฑ์อัจฉริยะกับการเพิ่มมูลค่าผลิตภัณฑ์ชุมชน",
            subtitle: "Smart Packaging & Local Value Creation",
            readTime: "20 นาที",
            icon: "fa-box-open",
            color: "emerald",
            summary: "ทำความเข้าใจประเภทของ Smart Packaging (Active, Intelligent, Connected) และกรณีศึกษาการเพิ่มมูลค่าผลิตภัณฑ์ชุมชนบ้านน้ำพรและเมืองเลย",
            topics: [
                {
                    title: "2.1 วิวัฒนาการสู่ 'บรรจุภัณฑ์อัจฉริยะ' (Smart Packaging)",
                    content: `
                        <p class="mb-2">บรรจุภัณฑ์ยุคใหม่ไม่ได้ทำหน้าที่เพียงแค่ห่อหุ้มสินค้า แต่แบ่งออกเป็น 3 ระดับ:</p>
                        <div class="space-y-2 text-xs">
                            <div class="p-2.5 bg-slate-50 border-l-4 border-slate-400 rounded-r-lg">
                                <strong>1. Active Packaging (บรรจุภัณฑ์มีฤทธิ์):</strong> มีสารดูดซับออกซิเจนหรือความชื้น เพื่อยืดอายุอาหาร
                            </div>
                            <div class="p-2.5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                                <strong>2. Intelligent Packaging (บรรจุภัณฑ์ตรวจรู้):</strong> มีเซนเซอร์เปลี่ยนสีเมื่ออาหารเริ่มบูดหรืออุณหภูมิเปลี่ยน
                            </div>
                            <div class="p-2.5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                                <strong>3. Connected Packaging (บรรจุภัณฑ์เชื่อมโยงดิจิทัล):</strong> ฝัง NFC Tag / RFID เพื่อให้ผู้บริโภคสื่อสารกับแบรนด์ได้โดยตรง ซึ่งเป็นหัวใจสำคัญของโครงการนี้
                            </div>
                        </div>
                    `
                },
                {
                    title: "2.2 โมเดลการเพิ่มมูลค่าสินค้าชุมชนบ้านน้ำพรด้วย NFC",
                    content: `
                        <p class="mb-2">เมื่อติดชิป NFC บนสินค้าชุมชน จะช่วยเพิ่มมูลค่าได้ 30% - 50% ด้วยประโยชน์ 4 ด้าน:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div class="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                                <strong class="text-emerald-900 block mb-1">1. Storytelling (เล่าเรื่องแหล่งกำเนิด):</strong>
                                <p class="text-slate-600">ลูกค้าแตะมือถือแล้วดูคลิปแม่ๆ กลุ่มทอผ้าบ้านน้ำพรย้อมคราม หรือดูภาพป่ารวงผึ้งธรรมชาติ สร้างความผูกพันและคุณค่าทางจิตใจ</p>
                            </div>
                            <div class="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                                <strong class="text-blue-900 block mb-1">2. Anti-Counterfeit (ตรวจของแท้):</strong>
                                <p class="text-slate-600">ชิป NFC มี Unique UID ประจำชิปไม่ซ้ำกันทั่วโลก ป้องกันการลอกเลียนแบบสินค้า OTOP เด่น</p>
                            </div>
                            <div class="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl">
                                <strong class="text-amber-900 block mb-1">3. Direct Re-Order (ซื้อซ้ำทันใจ):</strong>
                                <p class="text-slate-600">เมื่อทานมะคาเดเมียหรือกาแฟหมด แตะกล่องเดิมเพื่อกดสั่งซื้อล็อตใหม่ส่งตรงจากบ้านน้ำพรได้ทันที</p>
                            </div>
                            <div class="p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl">
                                <strong class="text-purple-900 block mb-1">4. Sustainability (ลดขยะเอกสาร):</strong>
                                <p class="text-slate-600">ไม่ต้องพิมพ์โบรชัวร์กระดาษหนาๆ ลดต้นทุนและรักษาสิ่งแวดล้อมตามแนวคิด BCG Model</p>
                            </div>
                        </div>
                    `
                }
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3: กระบวนการออกแบบบรรจุภัณฑ์และอัตลักษณ์ชุมชน",
            subtitle: "Design Thinking & Eco-Friendly Materials",
            readTime: "25 นาที",
            icon: "fa-palette",
            color: "amber",
            summary: "ฝึกกระบวนการคิดเชิงออกแบบ (Design Thinking 5 ขั้นตอน), การเลือกใช้วัสดุรักษ์โลก และหลักการกำหนดตำแหน่งฝังชิป NFC บนบรรจุภัณฑ์",
            topics: [
                {
                    title: "3.1 กระบวนการคิดเชิงออกแบบ 5 ขั้นตอน (Design Thinking)",
                    content: `
                        <ol class="list-decimal list-inside space-y-1.5 text-xs text-slate-700 pl-2">
                            <li><strong>Empathize (เข้าใจผู้ใช้):</strong> ศึกษาพฤติกรรมลูกค้าของฝากเมืองเลย ว่าชอบสินค้าแบบไหน กังวลเรื่องอะไร (เช่น ของแท้หรือไม่ เก็บได้กี่วัน)</li>
                            <li><strong>Define (ระบุปัญหา):</strong> บรรจุภัณฑ์เดิมดูเรียบเกินไป ไม่มีเรื่องราว ลูกค้าไม่รู้แหล่งที่มา และซื้อซ้ำยาก</li>
                            <li><strong>Ideate (ระดมไอเดีย):</strong> นำเทคโนโลยี NFC มาฝังในฉลาก ทำ Landing Page ภาษาไทย-อังกฤษ และใช้วัสดุธรรมชาติ</li>
                            <li><strong>Prototype (สร้างต้นแบบ):</strong> ออกแบบกล่องกระดาษคราฟต์ ติดสติกเกอร์ NFC Tag และเขียนข้อมูลทดสอบ</li>
                            <li><strong>Test (ทดสอบกับกลุ่มเป้าหมาย):</strong> นำไปให้คุณครู เพื่อนนักเรียน และชาวบ้านลองแตะทดสอบใช้งาน</li>
                        </ol>
                    `
                },
                {
                    title: "3.2 ข้อพิจารณาสำคัญในการฝังชิป NFC Tag",
                    content: `
                        <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-slate-700 space-y-1">
                            <p>⚠️ <strong>ข้อควรระวังเรื่องโลหะ (Metal Interference):</strong> คลื่น NFC จะถูกรบกวนหากติดบนกระป๋องเหล็กหรือฟอยล์อะลูมิเนียมโดยตรง หากจำเป็นต้องติดบนขวดโลหะ ต้องเลือกใช้ <em>Anti-Metal NFC Tag</em> ที่มีชั้นเฟอร์ไรต์กั้น</p>
                            <p>📍 <strong>สัญลักษณ์บอกตำแหน่ง:</strong> ควรพิมพ์ไอคอนรูปคลื่น NFC หรือข้อความ <em>"แตะตรงนี้ด้วยมือถือ (Tap Here)"</em> เพื่อให้ลูกค้ารู้จุดที่ต้องนำสมาร์ตโฟนมาแตะ</p>
                        </div>
                    `
                }
            ]
        },
        {
            id: 4,
            title: "หน่วยที่ 4: การเขียนข้อมูล NFC (NDEF) และ Digital Landing Page",
            subtitle: "NDEF Encoding & Digital Career Skills",
            readTime: "25 นาที",
            icon: "fa-code",
            color: "purple",
            summary: "เรียนรู้โครงสร้างข้อมูล NDEF, ขั้นตอนการเขียนชิปด้วยสมาร์ตโฟน, การออกแบบหน้าเว็บเพจแสดงสินค้าชุมชน และการคำนวณต้นทุน-ผลตอบแทนทางธุรกิจ",
            topics: [
                {
                    title: "4.1 มาตรฐาน NDEF (NFC Data Exchange Format)",
                    content: `
                        <p class="mb-2 text-xs">NDEF คือรูปแบบข้อมูลมาตรฐานสากลที่ชิป NFC ใช้สื่อสารกับระบบปฏิบัติการ Android และ iOS:</p>
                        <ul class="list-disc list-inside space-y-1 text-xs text-slate-700 pl-2">
                            <li><strong>URI/URL Record:</strong> บันทึกลิงก์เว็บไซต์ เช่น <code>https://bannamphorn.ac.th/product/cotton</code> (เป็นที่นิยมที่สุด)</li>
                            <li><strong>Text Record:</strong> บันทึกข้อความสั้น เช่น รหัสยืนยันสินค้า หรือคำอวยพร</li>
                            <li><strong>vCard Record:</strong> บันทึกข้อมูลติดต่อผู้ผลิต เบอร์โทรศัพท์ และพิกัดร้าน</li>
                        </ul>
                    `
                },
                {
                    title: "4.2 การคำนวณความคุ้มค่าทางเศรษฐกิจ (Business Feasibility)",
                    content: `
                        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                            <div class="flex justify-between border-b pb-1">
                                <span>ต้นทุนสินค้าเดิม (มะคาเดเมีย):</span>
                                <span class="font-bold">100 บาท</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span>กล่อง Eco-Packaging สวยงาม:</span>
                                <span class="font-bold">+15 บาท</span>
                            </div>
                            <div class="flex justify-between border-b pb-1">
                                <span>ชิป NFC สติกเกอร์ (NTAG213):</span>
                                <span class="font-bold">+4 บาท</span>
                            </div>
                            <div class="flex justify-between border-b pb-1 text-slate-900 font-bold">
                                <span>รวมต้นทุนใหม่:</span>
                                <span>119 บาท</span>
                            </div>
                            <div class="flex justify-between pt-1 text-emerald-700 font-bold text-sm">
                                <span>ราคาขายเดิม 120 บาท ➔ ราคาขายใหม่ Smart:</span>
                                <span>180 บาท (กำไรเพิ่มขึ้น +41 บาท/กล่อง!)</span>
                            </div>
                        </div>
                    `
                }
            ]
        }
    ],

    // แบบทดสอบก่อน-หลังเรียน 10 ข้อ
    quizQuestions: [
        {
            id: 1,
            question: "เทคโนโลยี NFC (Near Field Communication) ทำงานบนความถี่วิทยุเท่าใด และมีระยะการส่งสัญญาณประมาณเท่าใด?",
            options: [
                "2.4 GHz ระยะ 10 เมตร",
                "13.56 MHz ระยะประมาณ 2-4 เซนติเมตร",
                "900 MHz ระยะประมาณ 1 เมตร",
                "5 GHz ระยะประมาณ 30 เซนติเมตร"
            ],
            answer: 1,
            explanation: "NFC ทำงานที่ความถี่มาตรฐานสากล 13.56 MHz และมีระยะการเชื่อมต่อระยะใกล้มากประมาณ 2-4 ซม. เพื่อความปลอดภัยและความแม่นยำ"
        },
        {
            id: 2,
            question: "ข้อใดคือข้อได้เปรียบที่เด่นชัดที่สุดของสติกเกอร์ NFC Tag เมื่อเทียบกับ QR Code ในงานบรรจุภัณฑ์?",
            options: [
                "NFC มีราคาถูกกว่ากระดาษพิมพ์",
                "NFC ไม่จำเป็นต้องเปิดกล้องส่อง สามารถแตะผ่านสมาร์ตโฟนได้ทันทีและซ่อนใต้ผิววัสดุได้",
                "NFC บันทึกวิดีโอความยาว 2 ชั่วโมงลงในชิปได้โดยตรง",
                "NFC ไม่จำเป็นต้องใช้สมาร์ตโฟนในการอ่านข้อมูล"
            ],
            answer: 1,
            explanation: "NFC อาศัยคลื่นแม่เหล็กไฟฟ้า สามารถซ่อนใต้ฉลากหรือฝากล่องได้ และเพียงนำมือถือมาแตะ (Tap) ก็เปิดข้อมูลได้ทันทีโดยไม่ต้องเปิดแอปกล้องสแกน"
        },
        {
            id: 3,
            question: "ชิป NFC ชนิด NTAG213 มีความจุข้อมูลสำหรับการใช้งานทั่วไปประมาณเท่าใด?",
            options: [
                "144 ไบต์ (เหมาะสำหรับบันทึกลิงก์ URL)",
                "8 กิกะไบต์",
                "512 เมกะไบต์",
                "10 กิโลไบต์"
            ],
            answer: 0,
            explanation: "NTAG213 มีความจุ 144 ไบต์ ซึ่งเพียงพออย่างยิ่งสำหรับการบันทึกลิงก์เว็บไซต์ (URL) ความยาวมาตรฐาน และมีราคาคุ้มค่าที่สุด"
        },
        {
            id: 4,
            question: "บรรจุภัณฑ์ประเภทใดที่เรียกว่า 'Connected Packaging' (บรรจุภัณฑ์เชื่อมโยงดิจิทัล)?",
            options: [
                "บรรจุภัณฑ์ที่เคลือบสารดูดซับออกซิเจนเพื่อยืดอายุอาหาร",
                "บรรจุภัณฑ์ที่มีเทคโนโลยีฝังชิป NFC หรือ QR Code เพื่อเชื่อมต่อผู้บริโภคสู่ข้อมูลดิจิทัล",
                "บรรจุภัณฑ์ที่ทำจากพลาสติกหนาหลายชั้น",
                "บรรจุภัณฑ์ที่มีเซนเซอร์วัดระดับสารอาหารแบบเคมี"
            ],
            answer: 1,
            explanation: "Connected Packaging คือการเชื่อมโยงบรรจุภัณฑ์ทางกายภาพเข้าสู่โลกอินเทอร์เน็ต ผ่าน NFC หรือ IoT เพื่อเล่าเรื่องและให้บริการดิจิทัล"
        },
        {
            id: 5,
            question: "หากต้องการติดชิป NFC บนกระป๋องกาแฟอะลูมิเนียม หรือขวดน้ำผึ้งฝาโลหะ ควรเลือกใช้ชิป NFC ชนิดใด?",
            options: [
                "สติกเกอร์กระดาษธรรมดา",
                "Anti-Metal NFC Tag (ชิปที่มีแผ่นฉนวนเฟอร์ไรต์กันคลื่นสะท้อน)",
                "ชิปที่ชาร์จไฟผ่านสาย USB",
                "ชิปขนาดใหญ่กว่า 10 เซนติเมตร"
            ],
            answer: 1,
            explanation: "โลหะจะรบกวนและสะท้อนคลื่นแม่เหล็ก 13.56 MHz จึงต้องใช้ Anti-Metal Tag ซึ่งมีชั้นวัสดุเฟอร์ไรต์ช่วยดูดซับและป้องกันการรบกวน"
        },
        {
            id: 6,
            question: "รูปแบบข้อมูลมาตรฐานที่ใช้ในการจัดเก็บและแลกเปลี่ยนข้อมูลบนชิป NFC มีชื่อเรียกว่าอะไร?",
            options: [
                "MP4 Format",
                "NDEF (NFC Data Exchange Format)",
                "PDF Document",
                "JPEG Compression"
            ],
            answer: 1,
            explanation: "NDEF ย่อมาจาก NFC Data Exchange Format เป็นรูปแบบข้อมูลมาตรฐานที่องค์กร NFC Forum กำหนดให้ใช้ร่วมกันทั้ง Android และ iOS"
        },
        {
            id: 7,
            question: "การนำเทคโนโลยี NFC มาสร้าง 'Storytelling' ให้ผ้าฝ้ายทอมือบ้านน้ำพร มีผลดีต่อธุรกิจชุมชนอย่างไร?",
            options: [
                "ทำให้ผ้าทอนุ่มขึ้นและซักง่ายขึ้น",
                "ช่วยให้ลูกค้าเห็นเรื่องราวแหล่งกำเนิด ภูมิปัญญา และความประณีต ซึ่งช่วยเพิ่มคุณค่าและมูลค่าสินค้าได้สูงขึ้น",
                "ช่วยลดขั้นตอนการทอผ้าของชาวบ้าน",
                "ทำให้ผ้าทอเปลี่ยนสีได้ตามสภาพอากาศ"
            ],
            answer: 1,
            explanation: "การเล่าเรื่องราว (Storytelling) ผ่านการแตะชิปช่วยเพิ่ม Value Creation ทางอารมณ์ความรู้สึก ทำให้ลูกค้ายินดีจ่ายในราคาพรีเมียม"
        },
        {
            id: 8,
            question: "ในกระบวนการ Design Thinking ขั้นตอนใดที่นักเรียนต้องลงมือสร้างกล่องต้นแบบและทดลองฝังชิป NFC?",
            options: [
                "Empathize (การเข้าใจปัญหา)",
                "Define (การกำหนดกรอบโจทย์)",
                "Prototype (การสร้างชิ้นงานต้นแบบ)",
                "Ideate (การระดมสมอง)"
            ],
            answer: 2,
            explanation: "ขั้นตอน Prototype คือการเปลี่ยนแนวคิดออกมาเป็นชิ้นงานที่จับต้องได้จริงเพื่อนำไปทดสอบ"
        },
        {
            id: 9,
            question: "หากผลิตภัณฑ์มีต้นทุนสินค้า 100 บาท เพิ่มกล่องรักษ์โลก 15 บาท และชิป NFC 4 บาท แล้วตั้งราคาขายแบบ Smart Packaging ที่ 180 บาท นักเรียนจะได้กำไรต่อชิ้นเท่าใด?",
            options: [
                "40 บาท",
                "61 บาท (180 - 119 = 61 บาท)",
                "80 บาท",
                "25 บาท"
            ],
            answer: 1,
            explanation: "ต้นทุนรวม = 100 + 15 + 4 = 119 บาท ขายในราคา 180 บาท กำไร = 180 - 119 = 61 บาทต่อกล่อง"
        },
        {
            id: 10,
            question: "บทบาทของนักเรียนในฐานะ 'นวัตกรอาชีพดิจิทัล (Digital Career Innovator)' ที่ดีต่อชุมชนคือข้อใด?",
            options: [
                "การนำเข้าสินค้าจากต่างประเทศมาขายแทนสินค้าท้องถิ่น",
                "การนำเทคโนโลยีดิจิทัลสมัยใหม่มาบูรณาการยกระดับภูมิปัญญาท้องถิ่น สร้างรายได้และความยั่งยืนให้ชุมชน",
                "การขายชิป NFC ให้ชาวบ้านในราคาสูง",
                "การรอรับคำสั่งจากผู้อื่นโดยไม่ริเริ่มสร้างสรรค์งานใหม่"
            ],
            answer: 1,
            explanation: "นวัตกรอาชีพดิจิทัลคือผู้ที่มองเห็นคุณค่าของท้องถิ่น และนำเทคโนโลยีดิจิทัลมาสร้างนวัตกรรมที่เกิดประโยชน์และรายได้จริงแก่ชุมชนอย่างยั่งยืน"
        }
    ]
};
