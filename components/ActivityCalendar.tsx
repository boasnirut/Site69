"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Download, Lock, Pencil, Plus, Trash2, Upload } from "lucide-react";

type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  category: string;
  detail: string;
};

type EditorMode = "add" | "edit" | "delete" | "import";

const PASSWORD = "42010113";
const STORAGE_KEY = "nirut-calendar-events-csv";
const csvHeader = "id,date,title,category,detail";
const seedEvents: CalendarEvent[] = [
  {
    id: "evt-001",
    date: "2026-06-12",
    title: "กิจกรรมโฮมรูมและดูแลช่วยเหลือนักเรียน",
    category: "Student Care",
    detail: "ติดตามข้อมูลนักเรียนรายบุคคลและสื่อสารกับผู้ปกครอง"
  },
  {
    id: "evt-002",
    date: "2026-06-18",
    title: "PLC Digital Learning",
    category: "Professional Learning Community",
    detail: "แลกเปลี่ยนแนวทางการใช้สื่อดิจิทัลและ AI ในการจัดการเรียนรู้"
  },
  {
    id: "evt-003",
    date: "2026-06-24",
    title: "ประเมินผลงานผู้เรียนออนไลน์",
    category: "Assessment",
    detail: "ตรวจชิ้นงานและสรุปหลักฐานการเรียนรู้ผ่านระบบออนไลน์"
  }
];

function escapeCsv(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

function toCsv(events: CalendarEvent[]) {
  return [
    csvHeader,
    ...events.map((event) =>
      [event.id, event.date, event.title, event.category, event.detail].map((value) => escapeCsv(value)).join(",")
    )
  ].join("\n");
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

function parseCsv(csv: string): CalendarEvent[] {
  return csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [id, date, title, category, detail] = parseCsvLine(line);
      return { id, date, title, category, detail };
    })
    .filter((event) => event.id && event.date && event.title);
}

function notify(kind: "success" | "error", text: string) {
  window.dispatchEvent(new CustomEvent("site-notice", { detail: { kind, text } }));
}

function formatThaiDate(dateValue: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${dateValue}T00:00:00`));
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ date: string; day: number | null }> = [];

  for (let index = 0; index < startOffset; index += 1) {
    cells.push({ date: "", day: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({ date: iso, day });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ date: "", day: null });
  }

  return cells;
}

export function ActivityCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(seedEvents);
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [authMode, setAuthMode] = useState<EditorMode | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [editorMode, setEditorMode] = useState<EditorMode | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({ date: "", title: "", category: "", detail: "" });
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEvents(parseCsv(saved));
      return;
    }

    fetch("/calendar-events.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parsed = parseCsv(csv);
        if (parsed.length > 0) {
          setEvents(parsed);
        }
      })
      .catch(() => setEvents(seedEvents));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, toCsv(events));
  }, [events]);

  const cells = useMemo(() => getMonthDays(monthDate), [monthDate]);
  const monthLabel = new Intl.DateTimeFormat("th-TH", { month: "long", year: "numeric" }).format(monthDate);
  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const selectedEvent = events.find((event) => event.id === selectedId);

  const openAuth = (mode: EditorMode) => {
    setAuthMode(mode);
    setPassword("");
    setAuthError("");
  };

  const passAuth = () => {
    if (password !== PASSWORD || !authMode) {
      setAuthError("รหัสไม่ถูกต้อง");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const firstEvent = sortedEvents[0];
    setEditorMode(authMode);
    setAuthMode(null);
    setPassword("");
    setImportError("");
    setImportText("");
    setSelectedId(firstEvent?.id || "");
    setForm(
      authMode === "edit" && firstEvent
        ? { date: firstEvent.date, title: firstEvent.title, category: firstEvent.category, detail: firstEvent.detail }
        : { date: today, title: "", category: "กิจกรรม", detail: "" }
    );
  };

  const applyEditSelection = (id: string) => {
    setSelectedId(id);
    const event = events.find((item) => item.id === id);
    if (event) {
      setForm({ date: event.date, title: event.title, category: event.category, detail: event.detail });
    }
  };

  const saveEvent = () => {
    if (editorMode === "delete") {
      if (!selectedId) {
        notify("error", "ไม่พบกิจกรรมที่ต้องการลบ");
        return;
      }

      setEvents((current) => current.filter((event) => event.id !== selectedId));
      setSelectedId("");
      setEditorMode(null);
      notify("success", "ลบกิจกรรมเรียบร้อย");
      return;
    }

    if (editorMode === "import") {
      const parsed = parseCsv(importText);
      if (parsed.length === 0) {
        setImportError("ไฟล์ CSV ไม่มีข้อมูลกิจกรรมที่ถูกต้อง");
        notify("error", "นำเข้า CSV ไม่สำเร็จ");
        return;
      }

      setEvents(parsed);
      setEditorMode(null);
      setImportText("");
      setImportError("");
      notify("success", "นำเข้า CSV เรียบร้อย");
      return;
    }

    if (!form.date || !form.title.trim()) {
      notify("error", "กรุณากรอกวันที่และชื่อกิจกรรม");
      return;
    }

    if (editorMode === "add") {
      setEvents((current) => [
        ...current,
        {
          id: `evt-${Date.now()}`,
          date: form.date,
          title: form.title.trim(),
          category: form.category.trim() || "กิจกรรม",
          detail: form.detail.trim()
        }
      ]);
      notify("success", "เพิ่มกิจกรรมเรียบร้อย");
    }

    if (editorMode === "edit" && selectedId) {
      setEvents((current) =>
        current.map((event) => (event.id === selectedId ? { ...event, ...form, title: form.title.trim() } : event))
      );
      notify("success", "แก้ไขกิจกรรมเรียบร้อย");
    }

    setEditorMode(null);
  };

  const downloadCsv = () => {
    const blob = new Blob([toCsv(sortedEvents)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "calendar-events.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("success", "ส่งออก CSV เรียบร้อย");
  };

  const readImportFile = (file: File | undefined) => {
    if (!file) {
      return;
    }

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
    <section className="section-block calendar-section">
      <div className="calendar-shell">
        <div className="calendar-main">
          <div className="calendar-heading">
            <div>
              <span className="eyebrow">Activity Calendar</span>
              <h2>ปฏิทินกิจกรรม</h2>
            </div>
            <div className="calendar-month-controls">
              <button type="button" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}>
                ก่อนหน้า
              </button>
              <strong>{monthLabel}</strong>
              <button type="button" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}>
                ถัดไป
              </button>
            </div>
          </div>

          <div className="calendar-grid" aria-label="ปฏิทินรายเดือน">
            {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day) => (
              <span className="calendar-weekday" key={day}>{day}</span>
            ))}
            {cells.map((cell, index) => {
              const dayEvents = events.filter((event) => event.date === cell.date);
              return (
                <div className={cell.day ? "calendar-day" : "calendar-day empty"} key={`${cell.date}-${index}`}>
                  {cell.day ? <strong>{cell.day}</strong> : null}
                  {dayEvents.slice(0, 2).map((event) => (
                    <span className="calendar-dot" key={event.id}>{event.title}</span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="calendar-side">
          <div className="calendar-side-head">
            <CalendarDays aria-hidden="true" />
            <div>
              <h3>รายการกิจกรรมที่บันทึกไว้</h3>
              <p>แก้ไขแล้วเก็บในเครื่องนี้ และดาวน์โหลดเป็น CSV ได้</p>
            </div>
          </div>

          <div className="calendar-actions">
            <button type="button" onClick={() => openAuth("add")}><Plus aria-hidden="true" />เพิ่ม</button>
            <button type="button" onClick={() => openAuth("edit")}><Pencil aria-hidden="true" />แก้ไข</button>
            <button type="button" onClick={() => openAuth("delete")}><Trash2 aria-hidden="true" />ลบ</button>
            <button type="button" onClick={() => openAuth("import")}><Upload aria-hidden="true" />นำเข้า CSV</button>
            <button type="button" onClick={downloadCsv}><Download aria-hidden="true" />ส่งออก CSV</button>
          </div>

          <div className="calendar-event-list">
            {sortedEvents.map((event) => (
              <article className="calendar-event-card" key={event.id}>
                <span>{event.category}</span>
                <strong>{event.title}</strong>
                <small>{formatThaiDate(event.date)}</small>
                <p>{event.detail}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>

      {authMode ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal small">
            <Lock aria-hidden="true" />
            <h3>กรอกรหัสเพื่อจัดการปฏิทิน</h3>
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

      {editorMode ? (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal">
            <h3>{editorMode === "add" ? "เพิ่มกิจกรรม" : editorMode === "edit" ? "แก้ไขกิจกรรม" : editorMode === "delete" ? "ลบกิจกรรม" : "นำเข้า CSV"}</h3>
            {editorMode !== "add" && editorMode !== "import" ? (
              <label>
                เลือกกิจกรรม
                <select value={selectedId} onChange={(event) => applyEditSelection(event.target.value)}>
                  {sortedEvents.map((event) => (
                    <option key={event.id} value={event.id}>{event.title}</option>
                  ))}
                </select>
              </label>
            ) : null}

            {editorMode === "delete" ? (
              <p>ต้องการลบ “{selectedEvent?.title || "กิจกรรมนี้"}” ใช่หรือไม่</p>
            ) : editorMode === "import" ? (
              <>
                <label>
                  เลือกไฟล์ CSV
                  <input accept=".csv,text/csv" type="file" onChange={(event) => readImportFile(event.target.files?.[0])} />
                </label>
                <label>
                  ตัวอย่าง/แก้ไขข้อมูล CSV
                  <textarea value={importText} onChange={(event) => setImportText(event.target.value)} />
                </label>
                {importError ? <p className="form-error">{importError}</p> : null}
              </>
            ) : (
              <>
                <label>
                  วันที่
                  <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                </label>
                <label>
                  ชื่อกิจกรรม
                  <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
                </label>
                <label>
                  หมวดหมู่
                  <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
                </label>
                <label>
                  รายละเอียด
                  <textarea value={form.detail} onChange={(event) => setForm({ ...form, detail: event.target.value })} />
                </label>
              </>
            )}

            <div className="modal-actions">
              <button type="button" onClick={() => setEditorMode(null)}>ยกเลิก</button>
              <button type="button" onClick={saveEvent}>{editorMode === "delete" ? "ลบกิจกรรม" : editorMode === "import" ? "นำเข้า" : "บันทึก"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
