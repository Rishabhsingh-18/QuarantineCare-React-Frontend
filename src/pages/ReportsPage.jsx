import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function ReportsPage() {
  return <>
    <PageHeader title="Quality & outcomes" description="Track facility outcomes against the 15% mortality and 85% success benchmarks." />
    <div className="notice"><strong>Data note:</strong> the percentages below are the targets from the project brief, not measured facility performance.</div>
    <div className="stats-grid"><StatCard label="Mortality benchmark" value="15%" note="Expected reference rate" icon="HeartPulse" tone="red" /><StatCard label="Success target" value="85%" note="Target benchmark" icon="Activity" /><StatCard label="Patient capacity" value="74" note="Maximum beds" icon="Users" tone="blue" /><StatCard label="Outcome data" value="Not set" note="Needs verified records" icon="ClipboardCheck" tone="amber" /></div>
    <div className="dashboard-grid">
      <section className="panel"><div className="panel-header"><div><h3>Outcome benchmarks</h3><p>Reference values from the brief</p></div></div><div className="benchmark-body"><div className="benchmark-label"><span>Expected mortality rate</span><strong>15%</strong></div><div className="progress-track danger"><span style={{ width: "15%" }} /></div><div className="benchmark-label"><span>Target success rate</span><strong>85%</strong></div><div className="progress-track"><span style={{ width: "85%" }} /></div><p className="muted-small">Actual outcomes should be calculated from verified discharge and mortality records when a backend is added.</p></div></section>
      <section className="panel"><div className="panel-header"><div><h3>Suggested measures</h3><p>Possible next improvements</p></div></div><ul className="suggestion-list"><li>Daily temperature-check completion rate</li><li>Doctor visits completed after temperature checks</li><li>Average length of stay</li><li>Discharge processing delays</li><li>Mortality and success rates</li><li>Bed occupancy over time</li></ul></section>
    </div>
  </>;
}