import { useFacility } from "../context/FacilityContext";
import PageHeader from "../components/PageHeader";

export default function ActivityPage() {
  const { activity } = useFacility();
  return <>
    <PageHeader title="Staff activity" description="Review recent actions made during this browser session." />
    <section className="panel"><div className="panel-header"><div><h3>Recent activity</h3><p>{activity.length} sample and session entries</p></div></div>
      <div className="activity-list">{activity.map((entry, index) => { const [time, ...parts] = entry.split(" · "); return <div className="activity-row" key={`${entry}-${index}`}><span className="activity-dot" /><div><strong>{parts.join(" · ") || entry}</strong><span>{time}</span></div></div>; })}</div>
    </section>
  </>;
}