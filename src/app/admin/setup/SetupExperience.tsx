"use client";

import { CheckCircle2, Clipboard, ExternalLink, Save, Utensils } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  defaultRestaurantProfile,
  readRestaurantProfile,
  saveRestaurantProfile,
  slugifyRestaurant,
  type RestaurantProfile,
} from "@/lib/local-store";

export function SetupExperience() {
  const [profile, setProfile] = useState<RestaurantProfile>(defaultRestaurantProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(readRestaurantProfile());
  }, []);

  const feedbackPath = useMemo(() => `/r/${profile.slug || "restaurante"}`, [profile.slug]);

  function updateProfile(patch: Partial<RestaurantProfile>) {
    setSaved(false);
    setProfile((current) => ({ ...current, ...patch }));
  }

  function handleNameChange(name: string) {
    updateProfile({
      name,
      slug: slugifyRestaurant(name) || "restaurante",
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const activatedProfile = {
      ...profile,
      slug: profile.slug || slugifyRestaurant(profile.name) || "restaurante",
      activatedAt: new Date().toISOString(),
    };
    saveRestaurantProfile(activatedProfile);
    setProfile(activatedProfile);
    setSaved(true);
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(`${window.location.origin}${feedbackPath}`);
    setSaved(true);
  }

  return (
    <main className="survey-page">
      <div className="survey-shell">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <Utensils size={18} />
          </span>
          FeedMee
        </Link>

        <section className="survey-card" style={{ marginTop: 18 }}>
          <div className="survey-cover">
            <h1>Activar restaurante</h1>
            <p>
              Configura una sede en minutos. Esto prepara el link de feedback y el reporte vivo.
            </p>
          </div>

          <form className="survey-form" onSubmit={handleSubmit}>
            {saved ? (
              <div className="success-box">
                <CheckCircle2 size={21} />
                <strong style={{ display: "block", marginTop: 8 }}>Configuracion guardada.</strong>
              </div>
            ) : null}

            <div className="field">
              <label htmlFor="name">Nombre del restaurante</label>
              <input
                id="name"
                value={profile.name}
                onChange={(event) => handleNameChange(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="city">Ciudad</label>
              <input
                id="city"
                value={profile.city}
                onChange={(event) => updateProfile({ city: event.target.value })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="country">Pais</label>
              <select
                id="country"
                value={profile.country}
                onChange={(event) => updateProfile({ country: event.target.value })}
              >
                <option>Colombia</option>
                <option>Mexico</option>
                <option>Peru</option>
                <option>Chile</option>
                <option>Argentina</option>
                <option>Ecuador</option>
                <option>Panama</option>
                <option>Republica Dominicana</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="category">Tipo de restaurante</label>
              <select
                id="category"
                value={profile.category}
                onChange={(event) => updateProfile({ category: event.target.value })}
              >
                <option>Restaurante casual</option>
                <option>Cafe o brunch</option>
                <option>Gastrobar</option>
                <option>Fine dining</option>
                <option>Dark kitchen</option>
                <option>Hotel / restaurante</option>
                <option>Marca multi-sede</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="contactName">Responsable</label>
              <input
                id="contactName"
                value={profile.contactName}
                onChange={(event) => updateProfile({ contactName: event.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp operativo</label>
              <input
                id="whatsapp"
                value={profile.whatsapp}
                onChange={(event) => updateProfile({ whatsapp: event.target.value })}
                placeholder="+57 300 000 0000"
              />
            </div>

            <div className="panel" style={{ padding: 14 }}>
              <h3 style={{ margin: "0 0 8px" }}>Link de feedback</h3>
              <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>
                Comparte este link o usalo para generar el QR fisico.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="button secondary" href={feedbackPath}>
                  {feedbackPath}
                  <ExternalLink size={16} />
                </Link>
                <button className="button secondary" type="button" onClick={copyLink}>
                  Copiar
                  <Clipboard size={16} />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="button primary" type="submit">
                Guardar activacion
                <Save size={17} />
              </button>
              <Link className="button secondary" href="/admin">
                Ir al dashboard
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
