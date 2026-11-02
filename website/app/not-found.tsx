import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: "center" }}>
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead" style={{ margin: "16px auto 28px" }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn">Back to home</Link>
      </div>
    </section>
  );
}
