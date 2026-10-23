export default function StatusBadge({ children }) {
  const text = String(children || "");
  let tone = "blue";
  if (/fever|high/i.test(text)) tone = "red";
  else if (/complete|ready|discharged|normal/i.test(text)) tone = "green";
  else if (/pending|review/i.test(text)) tone = "amber";
  return <span className={`status-badge ${tone}`}>{text}</span>;
}