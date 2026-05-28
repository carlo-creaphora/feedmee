import {
  AlertTriangle,
  ArrowRight,
  ChartNoAxesCombined,
  ClipboardList,
  MessageSquareText,
  QrCode,
  Sparkles,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { demoRestaurant, sampleFeedback, sampleInsights, getAverageRating } from "@/lib/demo-data";

export default function Home() {
  const rating = getAverageRating(sampleFeedback);

  return (
    <main className="app-shell">
      <div className="container">
        <nav className="top-nav">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Utensils size={18} />
            </span>
            FeedMee
          </Link>
          <div className="nav-actions">
            <Link className="button secondary" href={`/r/${demoRestaurant.slug}`}>
              Ver encuesta
            </Link>
            <Link className="button primary" href="/admin">
              Ver dashboard
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>

        <section className="hero">
          <div>
            <span className="eyebrow">
              <Sparkles size={15} />
              Feedback honesto para restaurantes LATAM
            </span>
            <h1>FeedMee</h1>
            <p className="hero-copy">
              Convierte respuestas abiertas de comensales en un reporte vivo para entender que les molesto,
              que no dijeron y que debes corregir antes de perder clientes.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href={`/r/${demoRestaurant.slug}`}>
                Probar encuesta
                <MessageSquareText size={17} />
              </Link>
              <Link className="button secondary" href="/admin">
                Abrir reporte demo
                <ChartNoAxesCombined size={17} />
              </Link>
            </div>
            <div className="hero-proof">
              <div className="metric">
                <strong>{rating}</strong>
                <span>pulso general</span>
              </div>
              <div className="metric">
                <strong>{sampleFeedback.length}</strong>
                <span>respuestas demo</span>
              </div>
              <div className="metric">
                <strong>15 min</strong>
                <span>activacion objetivo</span>
              </div>
            </div>
          </div>

          <div className="preview-board" aria-label="Vista previa del reporte FeedMee">
            <div className="preview-header">
              <div>
                <strong>{demoRestaurant.name}</strong>
                <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>Reporte vivo de experiencia</p>
              </div>
              <span className="status-pill">En tiempo real</span>
            </div>
            <div className="preview-content">
              {sampleInsights.map((insight) => (
                <article className="signal-row" key={insight.title}>
                  {insight.severity === "high" ? <AlertTriangle size={20} /> : <ClipboardList size={20} />}
                  <div>
                    <h3>{insight.title}</h3>
                    <p>{insight.description}</p>
                  </div>
                  <span className="tag">{insight.area}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="section-band">
        <div className="container">
          <div className="section-heading">
            <h2>Vendido como licencia mensual, implementado con QR y link.</h2>
            <p>
              FeedMee empieza sin integraciones pesadas: cada restaurante puede activar una sede,
              compartir su encuesta y revisar senales accionables desde el primer dia.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature">
              <QrCode size={24} />
              <h3>Activacion rapida</h3>
              <p>Link y QR propio para mesas, caja, factura, WhatsApp o Instagram.</p>
            </article>
            <article className="feature">
              <MessageSquareText size={24} />
              <h3>Respuestas abiertas</h3>
              <p>Preguntas que buscan el por que, no solo caritas o calificaciones cerradas.</p>
            </article>
            <article className="feature">
              <ChartNoAxesCombined size={24} />
              <h3>Reporte accionable</h3>
              <p>Senales, hallazgos incomodos y recomendaciones para decidir que ajustar.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
