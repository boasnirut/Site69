"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ClipboardCheck,
  Download,
  Lock,
  Pencil,
  ShieldCheck,
  Upload,
  UsersRound
} from "lucide-react";
import { homeroomInsights, homeroomStudents as seedStudents } from "@/lib/site-data";

type Student = {
  no: number;
  nickname: string;
  fullName: string;
  gender: string;
  image: string;
  attendance: number;
  sdq: {
    emotional: number;
    conduct: number;
    hyperactivity: number;
    peer: number;
    prosocial: number;
    level?: string;
  };
};

type AuthMode = "edit" | "import";
type StudentForm = ReturnType<typeof makeForm>;

const PASSWORD = "42010113";
const STORAGE_KEY = "nirut-homeroom-students-csv";
const csvHeader = "no,nickname,fullName,gender,image,attendance,emotional,conduct,hyperactivity,peer,prosocial";

function escapeCsv(value: string | number) {
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function toNumber(value: string | number, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function parseCsv(csv: string): Student[] {
  return csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [no, nickname, fullName, gender, image, attendance, emotional, conduct, hyperactivity, peer, prosocial] =
        parseCsvLine(line);
      return {
        no: toNumber(no),
        nickname,
        fullName,
        gender,
        image,
        attendance: toNumber(attendance, 100),
        sdq: {
          emotional: toNumber(emotional),
          conduct: toNumber(conduct),
          hyperactivity: toNumber(hyperactivity),
          peer: toNumber(peer),
          prosocial: toNumber(prosocial)
        }
      };
    })
    .filter((student) => student.no > 0 && student.nickname && student.fullName)
    .sort((a, b) => a.no - b.no);
}

function toCsv(students: Student[]) {
  return [
    csvHeader,
    ...students.map((student) =>
      [
        student.no,
        student.nickname,
        student.fullName,
        student.gender,
        student.image,
        student.attendance,
        student.sdq.emotional,
        student.sdq.conduct,
        student.sdq.hyperactivity,
        student.sdq.peer,
        student.sdq.prosocial
      ]
        .map((value) => escapeCsv(value))
        .join(",")
    )
  ].join("\n");
}

function notify(kind: "success" | "error", text: string) {
  window.dispatchEvent(new CustomEvent("site-notice", { detail: { kind, text } }));
}

function getRiskScore(student: Student) {
  return student.sdq.emotional + student.sdq.conduct + student.sdq.hyperactivity + student.sdq.peer;
}

function getSdqLevel(student: Student) {
  const risk = getRiskScore(student);
  if (risk >= 20) return "ควรช่วยเหลือ";
  if (risk >= 13) return "เฝ้าระวัง";
  return "ปกติ";
}

function makeForm(student: Student) {
  return {
    no: String(student.no),
    nickname: student.nickname,
    fullName: student.fullName,
    gender: student.gender,
    image: student.image,
    attendance: String(student.attendance),
    emotional: String(student.sdq.emotional),
    conduct: String(student.sdq.conduct),
    hyperactivity: String(student.sdq.hyperactivity),
    peer: String(student.sdq.peer),
    prosocial: String(student.sdq.prosocial)
  };
}

export function HomeroomClassroom() {
  const [students, setStudents] = useState<Student[]>(seedStudents);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [tableOpen, setTableOpen] = useState(false);
  const [tableForms, setTableForms] = useState<StudentForm[]>(() => seedStudents.map((student) => makeForm(student)));
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = parseCsv(saved);
      if (parsed.length > 0) {
        setStudents(parsed);
        return;
      }
    }

    fetch("/homeroom-students.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parsed = parseCsv(csv);
        if (parsed.length > 0) {
          setStudents(parsed);
        }
      })
      .catch(() => setStudents(seedStudents));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, toCsv(students));
  }, [students]);

  const dashboard = useMemo(() => {
    const total = students.length;
    const male = students.filter((student) => student.gender === "ชาย").length;
    const female = students.filter((student) => student.gender === "หญิง").length;
    const attendance = total
      ? students.reduce((sum, student) => sum + student.attendance, 0) / total
      : 0;
    const normal = students.filter((student) => getSdqLevel(student) === "ปกติ").length;
    const watch = students.filter((student) => getSdqLevel(student) === "เฝ้าระวัง").length;
    const help = students.filter((student) => getSdqLevel(student) === "ควรช่วยเหลือ").length;

    return {
      total,
      male,
      female,
      attendance,
      normal,
      watch,
      help,
      metrics: [
        { label: "นักเรียนทั้งหมด", value: String(total), detail: "ม.3", tone: "orange" },
        { label: "ชาย", value: String(male), detail: `${total ? Math.round((male / total) * 100) : 0}%`, tone: "blue" },
        { label: "หญิง", value: String(female), detail: `${total ? Math.round((female / total) * 100) : 0}%`, tone: "coral" },
        { label: "มาเรียนเฉลี่ย", value: `${attendance.toFixed(1)}%`, detail: "คำนวณจากข้อมูลรายบุคคล", tone: "teal" },
        { label: "SDQ ปกติ", value: String(normal), detail: `${total ? Math.round((normal / total) * 100) : 0}%`, tone: "green" },
        { label: "ควรติดตาม", value: String(watch + help), detail: `เฝ้าระวัง ${watch} / ช่วยเหลือ ${help}`, tone: "amber" }
      ]
    };
  }, [students]);

  const sdqSummary = [
    { label: "ปกติ", value: dashboard.normal, percent: dashboard.total ? (dashboard.normal / dashboard.total) * 100 : 0, color: "green" },
    { label: "เฝ้าระวัง", value: dashboard.watch, percent: dashboard.total ? (dashboard.watch / dashboard.total) * 100 : 0, color: "amber" },
    { label: "ควรช่วยเหลือ", value: dashboard.help, percent: dashboard.total ? (dashboard.help / dashboard.total) * 100 : 0, color: "coral" }
  ];

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setPassword("");
    setAuthError("");
    setImportError("");
  };

  const passAuth = () => {
    if (password !== PASSWORD || !authMode) {
      setAuthError("รหัสไม่ถูกต้อง");
      return;
    }

    if (authMode === "import") {
      setAuthMode(null);
      setImportText(toCsv(students));
      setImportOpen(true);
      return;
    }

    setAuthMode(null);
    setTableForms(students.map((student) => makeForm(student)));
    setTableOpen(true);
  };

  const updateTableForm = (index: number, key: keyof StudentForm, value: string) => {
    setTableForms((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  };

  const saveStudentTable = () => {
    const nextStudents = tableForms
      .map((item, index) => {
        const no = toNumber(item.no, index + 1);
        return {
          no,
          nickname: item.nickname.trim(),
          fullName: item.fullName.trim(),
          gender: item.gender.trim() || "ชาย",
          image: item.image.trim() || `/student-m3-${String(no).padStart(2, "0")}.jpg`,
          attendance: Math.max(0, Math.min(100, toNumber(item.attendance, 100))),
          sdq: {
            emotional: toNumber(item.emotional),
            conduct: toNumber(item.conduct),
            hyperactivity: toNumber(item.hyperactivity),
            peer: toNumber(item.peer),
            prosocial: toNumber(item.prosocial)
          }
        };
      })
      .filter((student) => student.no > 0 && student.nickname && student.fullName)
      .sort((a, b) => a.no - b.no);

    if (nextStudents.length === 0) {
      notify("error", "กรุณากรอกข้อมูลนักเรียนอย่างน้อย 1 คน");
      return;
    }

    setStudents(nextStudents);
    setTableOpen(false);
    notify("success", "บันทึกข้อมูลนักเรียนทั้งห้องเรียบร้อย");
  };

  const saveImport = () => {
    const parsed = parseCsv(importText);
    if (parsed.length === 0) {
      setImportError("CSV ไม่มีข้อมูลนักเรียนที่ถูกต้อง");
      notify("error", "นำเข้า CSV ไม่สำเร็จ");
      return;
    }

    setStudents(parsed);
    setImportOpen(false);
    setImportText("");
    notify("success", "นำเข้า CSV นักเรียนเรียบร้อย");
  };

  const downloadCsv = () => {
    const blob = new Blob([toCsv(students)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "homeroom-students.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("success", "ส่งออก CSV นักเรียนเรียบร้อย");
  };

  const readImportFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImportText(String(reader.result || ""));
      setImportError("");
    };
    reader.onerror = () => {
      setImportError("อ่านไฟล์ CSV ไม่สำเร็จ");
      notify("error", "อ่านไฟล์ CSV ไม่สำเร็จ");
    };
    reader.readAsText(file, "utf-8");
  };

  return (
    <>
      <section className="section-block homeroom-dashboard-section">
        <div className="section-heading">
          <span className="eyebrow">Classroom M.3</span>
          <h2>แดชบอร์ดประจำชั้นมัธยมศึกษาปีที่ 3</h2>
          <p>ข้อมูลนักเรียน {dashboard.total} คน ชาย {dashboard.male} คน หญิง {dashboard.female} คน พร้อมคำนวณ SDQ และสถิติจากข้อมูลล่าสุดโดยอัตโนมัติ</p>
        </div>

        <div className="homeroom-data-actions">
          <button type="button" onClick={() => openAuth("import")}>
            <Upload aria-hidden="true" />
            นำเข้า CSV
          </button>
          <button type="button" onClick={downloadCsv}>
            <Download aria-hidden="true" />
            ส่งออก CSV
          </button>
        </div>

        <div className="homeroom-dashboard-grid">
          {dashboard.metrics.map((item) => (
            <article className={`homeroom-metric ${item.tone}`} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </article>
          ))}
        </div>

        <div className="homeroom-analytics">
          <article className="homeroom-chart-panel">
            <div className="homeroom-panel-head">
              <Activity aria-hidden="true" />
              <div>
                <span>SDQ Overview</span>
                <h3>ภาพรวมการคัดกรอง SDQ</h3>
              </div>
            </div>
            <div className="sdq-summary-bars">
              {sdqSummary.map((item) => (
                <div className={`sdq-summary-row ${item.color}`} key={item.label}>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.value} คน</span>
                  </div>
                  <div className="sdq-bar">
                    <span style={{ width: `${item.percent}%` }} />
                  </div>
                  <em>{item.percent.toFixed(0)}%</em>
                </div>
              ))}
            </div>
          </article>

          <article className="homeroom-chart-panel gender">
            <div className="homeroom-panel-head">
              <UsersRound aria-hidden="true" />
              <div>
                <span>Class Composition</span>
                <h3>สัดส่วนนักเรียนในห้อง</h3>
              </div>
            </div>
            <div className="gender-donut" aria-label={`ชาย ${dashboard.male} คน หญิง ${dashboard.female} คน`}>
              <strong>{dashboard.total}</strong>
              <span>คน</span>
            </div>
            <div className="gender-legend">
              <span className="male">ชาย {dashboard.male} คน</span>
              <span className="female">หญิง {dashboard.female} คน</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Student Members</span>
          <h2>สมาชิกในห้องเรียน</h2>
          <div className="student-members-heading">
            <span className="eyebrow">Student Members</span>
            <button type="button" onClick={() => openAuth("edit")}>
              <Pencil aria-hidden="true" />
              แก้ไขข้อมูล
            </button>
          </div>
          <h2>สมาชิกในห้องเรียน</h2>
          <p>การ์ดนักเรียนแบบ 3D สามารถชี้หรือแตะเพื่อพลิกดูสถิติ SDQ และจัดการข้อมูลทั้งห้องผ่านตารางแก้ไขกลาง</p>
        </div>

        <div className="student-card-grid">
          {students.map((student) => {
            const totalRisk = getRiskScore(student);
            const level = getSdqLevel(student);
            return (
              <article className="student-flip-card" key={student.no} tabIndex={0}>
                <div className="student-flip-inner">
                  <div className="student-card-face student-front">
                    <div className="student-card-top">
                      <span>#{String(student.no).padStart(2, "0")}</span>
                      <strong>{student.nickname}</strong>
                    </div>
                    <div className="student-photo">
                      <img src={student.image} alt={student.fullName} />
                    </div>
                    <div className="student-nameplate">
                      <h3>{student.fullName}</h3>
                      <p>{student.gender} • มาเรียน {student.attendance}%</p>
                    </div>
                  </div>

                  <div className="student-card-face student-back">
                    <div className="student-card-top">
                      <span>SDQ</span>
                      <strong>{level}</strong>
                    </div>
                    <div className="sdq-stat-list">
                      {[
                        ["อารมณ์", student.sdq.emotional],
                        ["ความประพฤติ", student.sdq.conduct],
                        ["สมาธิ/อยู่ไม่นิ่ง", student.sdq.hyperactivity],
                        ["เพื่อน", student.sdq.peer],
                        ["สัมพันธภาพสังคม", student.sdq.prosocial]
                      ].map(([label, value]) => (
                        <div className="sdq-mini-row" key={label}>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="student-risk-chip">
                      <ShieldCheck aria-hidden="true" />
                      คะแนนกลุ่มเสี่ยง {totalRisk}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Care System</span>
          <h2>สิ่งที่ควรติดตามเพิ่มเติม</h2>
          <p>ส่วนนี้ช่วยให้หน้างานประจำชั้นไม่ได้เป็นแค่รายชื่อ แต่เป็นศูนย์กลางข้อมูลสำหรับดูแลนักเรียนทั้งห้อง</p>
        </div>
        <div className="homeroom-insight-grid">
          {homeroomInsights.map((item) => (
            <article className="homeroom-insight-card" key={item.title}>
              <ClipboardCheck aria-hidden="true" />
              <span>{item.value}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {authMode ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal small">
            <Lock aria-hidden="true" />
            <h3>{authMode === "import" ? "กรอกรหัสเพื่อนำเข้า CSV นักเรียน" : "กรอกรหัสเพื่อแก้ไขข้อมูลนักเรียน"}</h3>
            <input
              autoFocus
              inputMode="numeric"
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && passAuth()}
              placeholder="รหัสผ่าน"
              type="password"
              value={password}
            />
            {authError ? <p className="form-error">{authError}</p> : null}
            <div className="modal-actions">
              <button type="button" onClick={() => setAuthMode(null)}>ยกเลิก</button>
              <button type="button" onClick={passAuth}>ยืนยัน</button>
            </div>
          </div>
        </div>
      ) : null}

      {tableOpen ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal student-table-modal">
            <h3>แก้ไขข้อมูลนักเรียนทั้งห้อง</h3>
            <div className="student-table-editor">
              <table>
                <thead>
                  <tr>
                    <th>เลขที่</th>
                    <th>ชื่อเล่น</th>
                    <th>ชื่อ-นามสกุล</th>
                    <th>เพศ</th>
                    <th>ภาพ</th>
                    <th>มาเรียน %</th>
                    <th>อารมณ์</th>
                    <th>ประพฤติ</th>
                    <th>สมาธิ</th>
                    <th>เพื่อน</th>
                    <th>สังคม</th>
                  </tr>
                </thead>
                <tbody>
                  {tableForms.map((student, index) => (
                    <tr key={`${student.no}-${index}`}>
                      <td><input value={student.no} onChange={(event) => updateTableForm(index, "no", event.target.value)} /></td>
                      <td><input value={student.nickname} onChange={(event) => updateTableForm(index, "nickname", event.target.value)} /></td>
                      <td><input value={student.fullName} onChange={(event) => updateTableForm(index, "fullName", event.target.value)} /></td>
                      <td>
                        <select value={student.gender} onChange={(event) => updateTableForm(index, "gender", event.target.value)}>
                          <option>ชาย</option>
                          <option>หญิง</option>
                        </select>
                      </td>
                      <td><input value={student.image} onChange={(event) => updateTableForm(index, "image", event.target.value)} /></td>
                      <td><input inputMode="decimal" value={student.attendance} onChange={(event) => updateTableForm(index, "attendance", event.target.value)} /></td>
                      <td><input inputMode="numeric" value={student.emotional} onChange={(event) => updateTableForm(index, "emotional", event.target.value)} /></td>
                      <td><input inputMode="numeric" value={student.conduct} onChange={(event) => updateTableForm(index, "conduct", event.target.value)} /></td>
                      <td><input inputMode="numeric" value={student.hyperactivity} onChange={(event) => updateTableForm(index, "hyperactivity", event.target.value)} /></td>
                      <td><input inputMode="numeric" value={student.peer} onChange={(event) => updateTableForm(index, "peer", event.target.value)} /></td>
                      <td><input inputMode="numeric" value={student.prosocial} onChange={(event) => updateTableForm(index, "prosocial", event.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <button type="button" onClick={() => setTableOpen(false)}>ยกเลิก</button>
              <button type="button" onClick={saveStudentTable}>บันทึก</button>
            </div>
          </div>
        </div>
      ) : null}

      {importOpen ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal student-editor-modal">
            <h3>นำเข้า CSV นักเรียน</h3>
            <label>
              เลือกไฟล์ CSV
              <input accept=".csv,text/csv" type="file" onChange={(event) => readImportFile(event.target.files?.[0])} />
            </label>
            <label>
              ข้อมูล CSV
              <textarea value={importText} onChange={(event) => setImportText(event.target.value)} />
            </label>
            {importError ? <p className="form-error">{importError}</p> : null}
            <div className="modal-actions">
              <button type="button" onClick={() => setImportOpen(false)}>ยกเลิก</button>
              <button type="button" onClick={saveImport}>บันทึก CSV</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
