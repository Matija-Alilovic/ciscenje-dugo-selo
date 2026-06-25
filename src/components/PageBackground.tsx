export default function PageBackground() {
  return (
    <div className="page-ambient" aria-hidden="true">
      <div className="page-ambient-glow page-ambient-glow--primary" />
      <div className="page-ambient-glow page-ambient-glow--secondary" />
      <div className="page-ambient-glow page-ambient-glow--accent" />
      <div className="page-ambient-grid" />
    </div>
  );
}
