import { useState, useEffect } from "react";
import { getRecords, deleteRecord } from "../../services/api";

const TYPE_CONFIG = {
  "Lab Report":   { bg: "#E6F1FB", color: "#185FA5" },
  "Prescription": { bg: "#EAF3DE", color: "#3B6D11" },
  "Imaging":      { bg: "#EEEDFE", color: "#534AB7" },
  "Discharge":    { bg: "#FAECE7", color: "#993C1D" },
  "Vaccination":  { bg: "#E1F5EE", color: "#0F6E56" },
};

const TYPE_FILTERS = ["All", "Lab Report", "Prescription", "Imaging", "Discharge", "Vaccination"];

function LabIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M6 2v5L3 12a1 1 0 00.9 1.5h8.2A1 1 0 0013 12L10 7V2" />
      <path d="M5 2h6" />
      <circle cx="6.5" cy="10" r="0.5" fill="currentColor" />
    </svg>
  );
}

function RxIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <rect x="3" y="1.5" width="10" height="13" rx="1.5" />
      <path d="M6 5.5h4M6 8h4M6 10.5h2" />
    </svg>
  );
}

function ImgIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
      <circle cx="5.5" cy="7" r="1" />
      <path d="M1.5 11l3.5-3 3 2.5 2-1.5 3.5 3" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M10 1.5H4a1.5 1.5 0 00-1.5 1.5v10A1.5 1.5 0 004 14.5h8a1.5 1.5 0 001.5-1.5V5L10 1.5z" />
      <path d="M10 1.5V5H13.5" />
      <path d="M5.5 8.5h5M5.5 11h3" />
    </svg>
  );
}

function VaxIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M10.5 2.5l3 3-1.5 1.5-3-3 1.5-1.5z" />
      <path d="M9 4L4 9l1.5 1.5 1-1 2 2-1 1L9 14l5-5-2-2 1-1L11 4z" />
      <path d="M2 14l2-2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 16 16" width="14" height="14">
      <path d="M8 2v8M5 7l3 3 3-3" />
      <path d="M2.5 12.5h11" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 16 16" width="14" height="14">
      <path d="M3 4h10M6 4V2.5h4V4M5.5 4v8a.5.5 0 00.5.5h4a.5.5 0 00.5-.5V4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

function TypeIcon({ type }) {
  switch (type) {
    case "Lab Report":   return <LabIcon />;
    case "Prescription": return <RxIcon />;
    case "Imaging":      return <ImgIcon />;
    case "Discharge":    return <DocIcon />;
    case "Vaccination":  return <VaxIcon />;
    default:             return <DocIcon />;
  }
}

function StatusBadge({ status }) {
  const styles = {
    Verified: { background: "#EAF3DE", color: "#3B6D11" },
    Pending:  { background: "#FAEEDA", color: "#854F0B" },
    New:      { background: "#E6F1FB", color: "#185FA5" },
  };
  const s = styles[status] || styles["New"];
  return (
    <span style={{
      ...s,
      fontSize: 13,
      padding: "3px 10px",
      borderRadius: 99,
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 90,
      background: "var(--color-background-secondary, #f5f5f3)",
      borderRadius: 8,
      padding: "0.75rem 1rem",
    }}>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary, #888)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>{value}</div>
    </div>
  );
}

function RecordCard({ record, onDelete }) {
  const cfg = TYPE_CONFIG[record.type] || TYPE_CONFIG["Lab Report"];
  const date = new Date(record.uploadedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div style={{
      background: "var(--color-background-primary, #fff)",
      border: "0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.15))",
      borderRadius: 12,
      padding: "1rem 1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      transition: "border-color 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,0,0,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: cfg.bg, color: cfg.color,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <TypeIcon type={record.type} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 16, fontWeight: 500,
            color: "var(--color-text-primary, #111)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }} title={record.title}>
            {record.title}
          </div>
          <div style={{ fontSize: 14, color: "var(--color-text-secondary, #888)", marginTop: 2 }}>
            {record.type}
          </div>
        </div>
        <StatusBadge status={record.status || "Verified"} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.15))" }} />

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "var(--color-text-tertiary, #aaa)" }}>{date}</span>
        <div style={{ display: "flex", gap: 6 }}>
          {/* Download */}
          <button
            title="Download"
            onClick={() => alert(`Download: ${record.title}`)}
            style={{
              width: 28, height: 28, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "0.5px solid rgba(0,0,0,0.15)",
              cursor: "pointer", color: "var(--color-text-secondary, #666)",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <DownloadIcon />
          </button>
          {/* Delete */}
          <button
            title="Delete"
            onClick={() => {
              if (window.confirm(`Delete "${record.title}"?`)) onDelete(record._id);
            }}
            style={{
              width: 28, height: 28, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "0.5px solid rgba(0,0,0,0.15)",
              cursor: "pointer", color: "var(--color-text-secondary, #666)",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#FCEBEB";
              e.currentTarget.style.borderColor = "#F09595";
              e.currentTarget.style.color = "#A32D2D";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
              e.currentTarget.style.color = "var(--color-text-secondary, #666)";
            }}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");

  useEffect(() => {
    getRecords().then(res =>
      setRecords(res.data.map(r => ({ ...r, status: r.status || "Verified" })))
    );
  }, []);

  const handleDelete = async (id) => {
    await deleteRecord(id);
    setRecords(prev => prev.filter(r => r._id !== id));
  };

  const filtered = records
    .filter(r => {
      const matchType = filter === "All" || r.type === filter;
      const q = search.toLowerCase();
      const matchQ = !q || r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
      return matchType && matchQ;
    })
    .sort((a, b) => {
      if (sort === "date-desc") return b.uploadedAt.localeCompare(a.uploadedAt);
      if (sort === "date-asc")  return a.uploadedAt.localeCompare(b.uploadedAt);
      return a.title.localeCompare(b.title);
    });

  const thisYear = new Date().getFullYear().toString();
  const categories = new Set(records.map(r => r.type)).size;

  return (
    <div style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12, padding: "1.5rem 0 1rem",
      }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary, #111)", margin: 0 }}>
            My medical records
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary, #888)", marginTop: 2 }}>
            {records.length} records across {categories} categories
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)",
              color: "var(--color-text-secondary, #888)", pointerEvents: "none",
              display: "flex",
            }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search records…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                paddingLeft: 28, width: 200, fontSize: 13,
                border: "0.5px solid rgba(0,0,0,0.2)", borderRadius: 8,
                padding: "6px 10px 6px 28px",
                background: "var(--color-background-primary, #fff)",
                color: "var(--color-text-primary, #111)",
                outline: "none",
                fontSize: 14,
              }}
            />
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              fontSize: 14, padding: "6px 10px",
              border: "0.5px solid rgba(0,0,0,0.2)", borderRadius: 8,
              background: "var(--color-background-primary, #fff)",
              color: "var(--color-text-primary, #111)",
              cursor: "pointer",
            }}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: "1rem", flexWrap: "wrap" }}>
        <StatCard label="Total records" value={records.length} />
        <StatCard label="This year" value={records.filter(r => r.uploadedAt?.startsWith(thisYear)).length} />
        <StatCard label="Verified" value={records.filter(r => r.status === "Verified").length} />
        <StatCard label="Pending" value={records.filter(r => r.status === "Pending").length} />
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
        {TYPE_FILTERS.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              fontSize: 13, padding: "4px 12px", borderRadius: 99, cursor: "pointer",
              border: filter === type ? "0.5px solid #85B7EB" : "0.5px solid rgba(0,0,0,0.15)",
              background: filter === type ? "#E6F1FB" : "var(--color-background-secondary, #f5f5f3)",
              color: filter === type ? "#0C447C" : "var(--color-text-secondary, #888)",
              transition: "all 0.15s",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 12,
      }}>
        {filtered.length === 0 ? (
          <div style={{
            gridColumn: "1 / -1", textAlign: "center",
            padding: "3rem 0", fontSize: 16,
            color: "var(--color-text-tertiary, #aaa)",
          }}>
            No records found.
          </div>
        ) : (
          filtered.map(record => (
            <RecordCard key={record._id} record={record} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}