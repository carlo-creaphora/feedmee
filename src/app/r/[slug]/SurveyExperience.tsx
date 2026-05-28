"use client";

import { CheckCircle2, Send, Utensils } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Feedback } from "@/lib/demo-data";

const storageKey = "feedmee-feedback-v1";

type SurveyExperienceProps = {
  restaurantName: string;
  restaurantSlug: string;
};

export function SurveyExperience({ restaurantName, restaurantSlug }: SurveyExperienceProps) {
  const [rating, setRating] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const feedback: Feedback = {
      id: `fb-${Date.now()}`,
      restaurantSlug,
      rating,
      visitMoment: String(data.get("visitMoment") || ""),
      dish: String(data.get("dish") || ""),
      best: String(data.get("best") || ""),
      improve: String(data.get("improve") || ""),
      uncomfortable: String(data.get("uncomfortable") || ""),
      returnIntent: String(data.get("returnIntent") || ""),
      createdAt: new Date().toISOString(),
    };

    const stored = window.localStorage.getItem(storageKey);
    const feedbackList = stored ? (JSON.parse(stored) as Feedback[]) : [];
    window.localStorage.setItem(storageKey, JSON.stringify([feedback, ...feedbackList]));
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="survey-page">
      <div className="survey-shell">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Utensils size={18} />
          </span>
          FeedMee
        </a>

        <section className="survey-card" style={{ marginTop: 18 }}>
          <div className="survey-cover">
            <h1>{restaurantName}</h1>
            <p>
              Tu respuesta ayuda a detectar detalles que normalmente no se dicen en mesa.
              Toma menos de dos minutos.
            </p>
          </div>

          {submitted ? (
            <div className="survey-form">
              <div className="success-box">
                <CheckCircle2 size={22} />
                <h2 style={{ margin: "10px 0 6px" }}>Gracias por decirlo con honestidad.</h2>
                <p style={{ margin: 0 }}>
                  Tu comentario ya quedo disponible para el reporte del restaurante.
                </p>
              </div>
              <button className="button secondary" type="button" onClick={() => setSubmitted(false)}>
                Enviar otra respuesta
              </button>
            </div>
          ) : (
            <form className="survey-form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Como calificas tu experiencia general?</label>
                <span>1 es mala, 5 es excelente.</span>
                <div className="rating-row" role="radiogroup" aria-label="Calificacion general">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      className={`rating-button ${rating === value ? "active" : ""}`}
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      aria-pressed={rating === value}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="visitMoment">Cuando nos visitaste?</label>
                <select id="visitMoment" name="visitMoment" defaultValue="Cena">
                  <option>Desayuno</option>
                  <option>Almuerzo</option>
                  <option>Brunch</option>
                  <option>Cena</option>
                  <option>Domicilio</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="dish">Que pediste?</label>
                <input id="dish" name="dish" placeholder="Ej. hamburguesa, pasta, menu del dia" />
              </div>

              <div className="field">
                <label htmlFor="best">Que fue lo mejor de la experiencia?</label>
                <textarea id="best" name="best" required placeholder="Cuentanos que funciono bien." />
              </div>

              <div className="field">
                <label htmlFor="improve">Que pudo ser mejor?</label>
                <textarea id="improve" name="improve" required placeholder="Comida, servicio, espera, ambiente..." />
              </div>

              <div className="field">
                <label htmlFor="uncomfortable">Hubo algo incomodo que normalmente no dirias?</label>
                <textarea
                  id="uncomfortable"
                  name="uncomfortable"
                  placeholder="Puede ser pequeno: ruido, limpieza, trato, temperatura, precio, afan..."
                />
              </div>

              <div className="field">
                <label htmlFor="returnIntent">Volverias o lo recomendarias? Por que?</label>
                <textarea id="returnIntent" name="returnIntent" required placeholder="La razon importa mas que el si/no." />
              </div>

              <button className="button primary" type="submit">
                Enviar feedback
                <Send size={17} />
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
