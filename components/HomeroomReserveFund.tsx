"use client";

import { useEffect, useMemo, useState } from "react";
import { Coins, Lock, Pencil, Plus, Save, Trash2, TrendingDown, TrendingUp } from "lucide-react";

type FundType = "income" | "expense";

type FundEntry = {
  id: string;
  date: string;
  title: string;
  type: FundType;
  amount: number;
  note: string;
};

type FundForm = {
  id: string;
  date: string;
  title: string;
  type: FundType;
  amount: string;
  note: string;
};

const PASSWORD = "42010113";
const STORAGE_KEY = "nirut-homeroom-reserve-fund-csv";
const csvHeader = "id,date,title,type,amount,note";

const seedFundEntries: FundEntry[] = [
  {
    id: "fund-001",
    date: "2026-05-18",
    title: "ยอดยกมากองทุนสำรองห้องเรียน",
    type: "income",
    amount: 1200,
    note: "เงินตั้งต้นสำหรับใช้ดูแลกิจกรรมและเหตุจำเป็นของนักเรียน ม.3"
  },
  {
    id: "fund-002",
    date: "2026-06-03",
    title: "สมทบกองทุนประจำเดือน",
    type: "income",
    amount: 800,
    note: "เงินสมทบเข้ากองทุนสำรองห้องเรียน"
  },
  {
    id: "fund-003",
    date: "2026-06-10",
    title: "อุปกรณ์กิจกรรมโฮมรูม",
    type: "expense",
    amount: 250,
    note: "ค่าอุปกรณ์สำหรับกิจกรรมส่งเสริมวินัยและความรับผิดชอบ"
  }
];

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

function toCsv(entries: FundEntry[]) {
  return [
    csvHeader,
    ...entries.map((entry) =>
      [entry.id, entry.date, entry.title, entry.type, entry.amount, entry.note]
        .map((value) => escapeCsv(value))
        .join(",")
    )
  ].join("\n");
}

function parseCsv(csv: string): FundEntry[] {
  return csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [id, date, title, type, amount, note] = parseCsvLine(line);
      const entryType: FundType = type === "expense" ? "expense" : "income";
      return {
        id,
        date,
        title,
        type: entryType,
        amount: Math.max(0, toNumber(amount)),
        note
      };
    })
    .filter((entry) => entry.id && entry.date && entry.title)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function notify(kind: "success" | "error", text: string) {
  window.dispatchEvent(new CustomEvent("site-notice", { detail: { kind, text } }));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(value);
}

function formatThaiDate(dateValue: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${dateValue}T00:00:00`));
}

function makeForm(entry: FundEntry): FundForm {
  return {
    id: entry.id,
    date: entry.date,
    title: entry.title,
    type: entry.type,
    amount: String(entry.amount),
    note: entry.note
  };
}

function makeNewForm(): FundForm {
  return {
    id: `fund-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    title: "",
    type: "income",
    amount: "0",
    note: ""
  };
}

export function HomeroomReserveFund() {
  const [entries, setEntries] = useState<FundEntry[]>(seedFundEntries);
  const [authOpen, setAuthOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [forms, setForms] = useState<FundForm[]>(() => seedFundEntries.map((entry) => makeForm(entry)));

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = parseCsv(saved);
      if (parsed.length > 0) {
        setEntries(parsed);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, toCsv(entries));
  }, [entries]);

  const summary = useMemo(() => {
    const income = entries
      .filter((entry) => entry.type === "income")
      .reduce((total, entry) => total + entry.amount, 0);
    const expense = entries
      .filter((entry) => entry.type === "expense")
      .reduce((total, entry) => total + entry.amount, 0);
    const balance = income - expense;
    const latest = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

    return { income, expense, balance, latest };
  }, [entries]);

  const openAuth = () => {
    setPassword("");
    setAuthError("");
    setAuthOpen(true);
  };

  const passAuth = () => {
    if (password !== PASSWORD) {
      setAuthError("รหัสไม่ถูกต้อง");
      return;
    }

    setAuthOpen(false);
    setPassword("");
    setForms(entries.map((entry) => makeForm(entry)));
    setEditorOpen(true);
  };

  const updateForm = (index: number, key: keyof FundForm, value: string) => {
    setForms((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    );
  };

  const addRow = () => {
    setForms((current) => [...current, makeNewForm()]);
  };

  const removeRow = (index: number) => {
    setForms((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const saveEntries = () => {
    const nextEntries = forms
      .map((item, index) => ({
        id: item.id || `fund-${Date.now()}-${index}`,
        date: item.date,
        title: item.title.trim(),
        type: item.type,
        amount: Math.max(0, toNumber(item.amount)),
        note: item.note.trim()
      }))
      .filter((entry) => entry.date && entry.title)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (nextEntries.length === 0) {
      notify("error", "กรุณากรอกข้อมูลกองทุนอย่างน้อย 1 รายการ");
      return;
    }

    setEntries(nextEntries);
    setEditorOpen(false);
    notify("success", "บันทึกยอดกองทุนสำรองห้องเรียนเรียบร้อย");
  };

  return (
    <>
      <section className="section-block reserve-fund-section">
        <div className="section-heading">
          <span className="eyebrow">Reserve Fund</span>
          <h2>รายงานกองทุนสำรองห้องเรียนชั้น ม.3</h2>
          <p>สรุปรายรับ รายจ่าย และยอดคงเหลือของกองทุนสำรองห้องเรียน พร้อมแก้ไขยอดผ่านรหัสผ่านประจำระบบ</p>
        </div>

        <div className="reserve-fund-layout">
          <div className="fund-visual-panel" aria-label="โมเดล 3D กองทุนสำรองห้องเรียน">
            <div className="fund-visual-orbit">
              <div className="fund-holo-ring ring-a" />
              <div className="fund-holo-ring ring-b" />
              <div className="fund-coin-drop-scene">
                <div className="fund-drop-coin coin-a">฿</div>
                <div className="fund-drop-coin coin-b">฿</div>
                <div className="fund-drop-coin coin-c">฿</div>
                <div className="fund-collection-box-3d">
                  <div className="fund-box-face fund-box-front">
                    <Coins aria-hidden="true" />
                    <strong>M.3</strong>
                    <span>Class Fund</span>
                  </div>
                  <div className="fund-box-face fund-box-back" />
                  <div className="fund-box-face fund-box-right" />
                  <div className="fund-box-face fund-box-left" />
                  <div className="fund-box-face fund-box-top">
                    <span className="fund-coin-slot" />
                  </div>
                  <div className="fund-box-face fund-box-bottom" />
                </div>
                <div className="fund-coin-stack">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className="fund-balance-badge">
              <span>ยอดคงเหลือ</span>
              <strong>{formatCurrency(summary.balance)}</strong>
            </div>
          </div>

          <div className="fund-report-panel">
            <div className="fund-report-head">
              <div>
                <span className="eyebrow">M.3 Treasury</span>
                <h3>ภาพรวมเงินสำรอง</h3>
              </div>
              <button className="fund-edit-button" type="button" onClick={openAuth}>
                <Pencil aria-hidden="true" />
                แก้ไขยอด
              </button>
            </div>

            <div className="fund-metric-grid">
              <article className="fund-metric income">
                <TrendingUp aria-hidden="true" />
                <span>รายรับ</span>
                <strong>{formatCurrency(summary.income)}</strong>
              </article>
              <article className="fund-metric expense">
                <TrendingDown aria-hidden="true" />
                <span>รายจ่าย</span>
                <strong>{formatCurrency(summary.expense)}</strong>
              </article>
              <article className="fund-metric balance">
                <Coins aria-hidden="true" />
                <span>คงเหลือ</span>
                <strong>{formatCurrency(summary.balance)}</strong>
              </article>
            </div>

            <div className="fund-entry-list">
              {summary.latest.map((entry) => (
                <article className={`fund-entry-card ${entry.type}`} key={entry.id}>
                  <div>
                    <strong>{entry.title}</strong>
                    <span>{formatThaiDate(entry.date)} {entry.note ? `• ${entry.note}` : ""}</span>
                  </div>
                  <em>{entry.type === "income" ? "+" : "-"}{formatCurrency(entry.amount)}</em>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {authOpen ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal small">
            <Lock aria-hidden="true" />
            <h3>กรอกรหัสเพื่อแก้ไขยอดกองทุน</h3>
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
              <button type="button" onClick={() => setAuthOpen(false)}>ยกเลิก</button>
              <button type="button" onClick={passAuth}>ยืนยัน</button>
            </div>
          </div>
        </div>
      ) : null}

      {editorOpen ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal fund-editor-modal">
            <div className="fund-editor-head">
              <h3>แก้ไขรายการกองทุนสำรองห้องเรียน ม.3</h3>
              <button className="fund-add-row-button" type="button" onClick={addRow}>
                <Plus aria-hidden="true" />
                เพิ่มรายการ
              </button>
            </div>
            <div className="fund-table-editor">
              <table>
                <thead>
                  <tr>
                    <th>วันที่</th>
                    <th>รายการ</th>
                    <th>ประเภท</th>
                    <th>จำนวนเงิน</th>
                    <th>หมายเหตุ</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((entry, index) => (
                    <tr key={`${entry.id}-${index}`}>
                      <td>
                        <input type="date" value={entry.date} onChange={(event) => updateForm(index, "date", event.target.value)} />
                      </td>
                      <td>
                        <input value={entry.title} onChange={(event) => updateForm(index, "title", event.target.value)} />
                      </td>
                      <td>
                        <select
                          value={entry.type}
                          onChange={(event) => updateForm(index, "type", event.target.value as FundType)}
                        >
                          <option value="income">รายรับ</option>
                          <option value="expense">รายจ่าย</option>
                        </select>
                      </td>
                      <td>
                        <input inputMode="decimal" value={entry.amount} onChange={(event) => updateForm(index, "amount", event.target.value)} />
                      </td>
                      <td>
                        <input value={entry.note} onChange={(event) => updateForm(index, "note", event.target.value)} />
                      </td>
                      <td>
                        <button type="button" onClick={() => removeRow(index)} aria-label={`ลบ${entry.title || "รายการ"}`}>
                          <Trash2 aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <button type="button" onClick={() => setEditorOpen(false)}>ยกเลิก</button>
              <button type="button" onClick={saveEntries}>
                <Save aria-hidden="true" />
                บันทึกยอด
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
