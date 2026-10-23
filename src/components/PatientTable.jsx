import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function PatientTable({ patients, showActions = true, onDetails }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const filtered = patients.filter((p) => {
    const q = query.toLowerCase();
    return (!q || `${p.name} ${p.id} ${p.room}`.toLowerCase().includes(q)) && (!status || p.status === status);
  });
  return (
    <>
      <div className="table-toolbar">
        <input className="control search-control" placeholder="Search patient, ID or room..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="control" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option><option>Fever</option><option>Stable</option><option>Ready for review</option><option>Discharge review</option><option>Discharged</option>
        </select>
      </div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>Patient</th><th>Room</th><th>Latest temp.</th><th>Nurse check</th><th>Doctor visit</th><th>Fever-free</th><th>Status</th>{showActions && <th>Action</th>}</tr></thead>
        <tbody>{filtered.map((p) => <tr key={p.id}>
          <td><strong>{p.name}</strong><small className="table-subtext">{p.id}</small></td><td>{p.room}</td>
          <td><strong className={p.temp >= 38 ? "temperature-hot" : ""}>{Number(p.temp).toFixed(1)}°C</strong></td>
          <td><StatusBadge>{p.check}</StatusBadge></td><td><StatusBadge>{p.doctor}</StatusBadge></td><td>{p.feverFree}/3 days</td><td><StatusBadge>{p.status}</StatusBadge></td>
          {showActions && <td><button className="text-action" onClick={() => onDetails?.(p)}>Details</button></td>}
        </tr>)}
        {!filtered.length && <tr><td colSpan={showActions ? 8 : 7} className="empty-cell">No patients match this search.</td></tr>}</tbody></table></div>
    </>
  );
}