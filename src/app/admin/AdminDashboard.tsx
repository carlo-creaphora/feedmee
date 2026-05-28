"use client";

import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MessageSquareText,
  QrCode,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  buildLiveInsights,
  demoRestaurant,
  getAverageRating,
  sampleFeedback,
  type Feedback,
  type Insight,
} from "@/lib/demo-data";
import { defaultRestaurantProfile, readFeedback, readRestaurantProfile, type RestaurantProfile } from "@/lib/local-store";

export function AdminDashboard() {
  const [capturedFeedback, setCapturedFeedback] = useState<Feedback[]>([]);
  const [restaurant, setRestaurant] = useState<RestaurantProfile>(defaultRestaurantProfile);

  useEffect(() => {
    setRestaurant(readRestaurantProfile());
    setCapturedFeedback(readFeedback());
  }, []);

  const feedback = useMemo(() => {
    const activeFeedback = capturedFeedback.filter((item) => item.restaurantSlug === restaurant.slug);
    const demoFallback = restaurant.slug === demoRestaurant.slug ? sampleFeedback : [];
    return [...activeFeedback, ...demoFallback];
  }, [capturedFeedback, restaurant.slug]);

  const insights = useMemo<Insight[]>(() => buildLiveInsights(feedback), [feedback]);
  const averageRating = getAverageRating(feedback);
  const highSignals = insights.filter((item) => item.severity === "high").length;

  return (
    <main className="admin-shell">
      <div className="admin-layout">
        <aside className="sidebar">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Utensils size={18} />
            </span>
            FeedMee
          </Link>
          <nav className="sidebar-nav">
            <span className="active">
              <BarChart3 size={17} />
              Reporte vivo
            </span>
            <span>
              <MessageSquareText size={17} />
              Respuestas
            </span>
            <span>
              <QrCode size={17} />
              QR y link
            </span>
            <span>
              <ShieldCheck size={17} />
              Licencia
            </span>
          </nav>
        </aside>

        <section className="dashboard">
          <div className="mobile-only" style={{ marginBottom: 16 }}>
            <Link className="brand" href="/">
              <span className="brand-mark">
                <Utensils size={18} />
              </span>
              FeedMee
            </Link>
          </div>

          <div className="admin-header panel">
            <div>
              <span className="eyebrow">
                <ShieldCheck size={15} />
                {restaurant.plan}
              </span>
              <h1 style={{ margin: "12px 0 4px" }}>{restaurant.name}</h1>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                Reporte vivo de experiencia para {restaurant.city}, {restaurant.country}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="button secondary" href="/admin/setup">
                Configurar
              </Link>
              <Link className="button primary" href={`/r/${restaurant.slug}`}>
              Abrir encuesta
              <ExternalLink size={16} />
              </Link>
            </div>
          </div>

          <div className="kpi-grid">
            <div className="kpi">
              <span>Pulso general</span>
              <strong>{averageRating}</strong>
            </div>
            <div className="kpi">
              <span>Respuestas</span>
              <strong>{feedback.length}</strong>
            </div>
            <div className="kpi">
              <span>Alertas</span>
              <strong>{highSignals}</strong>
            </div>
            <div className="kpi">
              <span>Activacion</span>
              <strong>QR</strong>
            </div>
          </div>

          <div className="dashboard-grid">
            <section className="panel">
              <h2>Senales detectadas</h2>
              <p>
                Lectura operativa a partir de respuestas abiertas. En el siguiente corte estas senales
                seran clasificadas por IA real.
              </p>
              <div className="insight-list">
                {insights.map((insight) => (
                  <article className="insight" key={insight.title}>
                    <header>
                      <strong>{insight.title}</strong>
                      <span className={`tag severity-${insight.severity}`}>{insight.area}</span>
                    </header>
                    <p>{insight.description}</p>
                    <p>
                      <b>Decision sugerida:</b> {insight.action}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="panel">
              <h2>QR de feedback</h2>
              <p>
                Este es el activo comercial minimo: un link que el restaurante puede poner en mesa,
                caja, factura, WhatsApp o Instagram.
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div className="qr-box" aria-label="QR demo" />
                <div>
                  <Link className="button secondary" href={`/r/${demoRestaurant.slug}`}>
                    /r/{restaurant.slug}
                  </Link>
                </div>
              </div>

              <h3 style={{ marginTop: 28 }}>Ultimas respuestas</h3>
              <div className="insight-list">
                {feedback.slice(0, 4).map((item) => (
                  <article className="insight" key={item.id}>
                    <header>
                      <strong>{item.rating}/5 · {item.visitMoment}</strong>
                      {item.rating <= 3 ? <AlertTriangle size={17} /> : <CheckCircle2 size={17} />}
                    </header>
                    <blockquote className="quote">{item.improve || item.uncomfortable}</blockquote>
                    <p style={{ marginBottom: 0 }}>
                      <Clock3 size={14} style={{ verticalAlign: "-2px" }} /> {item.dish || "Sin plato registrado"}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
