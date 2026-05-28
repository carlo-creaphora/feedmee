export type Feedback = {
  id: string;
  restaurantSlug: string;
  rating: number;
  visitMoment: string;
  dish: string;
  best: string;
  improve: string;
  uncomfortable: string;
  returnIntent: string;
  createdAt: string;
};

export type Insight = {
  title: string;
  area: "Comida" | "Servicio" | "Ambiente" | "Espera" | "Precio" | "Operacion";
  severity: "high" | "medium" | "low";
  description: string;
  action: string;
};

export const demoRestaurant = {
  name: "Casa Aurora",
  slug: "casa-aurora",
  city: "Medellin",
  plan: "Demo comercial",
};

export const sampleFeedback: Feedback[] = [
  {
    id: "fb-001",
    restaurantSlug: "casa-aurora",
    rating: 4,
    visitMoment: "Cena",
    dish: "Rib eye con papas",
    best: "La carne estaba muy bien preparada y el mesero fue amable.",
    improve: "La entrada llego tarde y nadie aviso que habia demora.",
    uncomfortable: "La musica estaba tan alta que costaba hablar en la mesa.",
    returnIntent: "Volveria, pero no para una cena tranquila.",
    createdAt: "2026-05-28T12:10:00.000Z",
  },
  {
    id: "fb-002",
    restaurantSlug: "casa-aurora",
    rating: 3,
    visitMoment: "Almuerzo",
    dish: "Pasta de la casa",
    best: "El sabor de la salsa estaba bueno.",
    improve: "El plato llego tibio y la bebida llego despues de empezar a comer.",
    uncomfortable: "Me dio pena decirlo alla, pero senti que estaban corriendo para liberar la mesa.",
    returnIntent: "No estoy seguro. Hay restaurantes similares con mejor ritmo de servicio.",
    createdAt: "2026-05-28T14:25:00.000Z",
  },
  {
    id: "fb-003",
    restaurantSlug: "casa-aurora",
    rating: 5,
    visitMoment: "Brunch",
    dish: "Tostadas francesas",
    best: "La presentacion del plato y la atencion de la anfitriona.",
    improve: "El cafe podria salir mas rapido.",
    uncomfortable: "El bano no estaba tan limpio como el salon.",
    returnIntent: "Si volveria con amigos.",
    createdAt: "2026-05-28T10:42:00.000Z",
  },
];

export const sampleInsights: Insight[] = [
  {
    title: "La experiencia se rompe por ritmo de servicio, no por sabor",
    area: "Servicio",
    severity: "high",
    description:
      "Las respuestas valoran la comida, pero repiten demoras, falta de aviso y sensacion de afan en mesa.",
    action: "Crear protocolo de aviso cuando cocina supere 12 minutos y medir bebida antes del plato fuerte.",
  },
  {
    title: "Senal debil en ambiente para cenas tranquilas",
    area: "Ambiente",
    severity: "medium",
    description:
      "La musica aparece como incomodidad silenciosa: no genera queja directa, pero cambia la ocasion de consumo.",
    action: "Bajar volumen en cena entre semana y preguntar por ocasion al recibir reservas.",
  },
  {
    title: "Limpieza de bano puede contaminar percepcion general",
    area: "Operacion",
    severity: "medium",
    description:
      "Aunque el salon se percibe bien, una mencion de bano afecta confianza y puede escalar en resenas publicas.",
    action: "Activar checklist visible cada 45 minutos en horas pico.",
  },
];

export function getAverageRating(feedback: Feedback[]) {
  if (!feedback.length) return 0;
  return Number((feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(1));
}

export function buildLiveInsights(feedback: Feedback[]): Insight[] {
  const text = feedback
    .map((item) => `${item.improve} ${item.uncomfortable} ${item.returnIntent} ${item.dish}`)
    .join(" ")
    .toLowerCase();

  const dynamic: Insight[] = [];

  if (text.includes("fria") || text.includes("frio") || text.includes("tibio") || text.includes("tibia")) {
    dynamic.push({
      title: "Temperatura de platos empieza a aparecer como riesgo",
      area: "Comida",
      severity: "high",
      description: "Hay menciones asociadas a platos que no llegan con temperatura ideal.",
      action: "Revisar pase de cocina y tiempos entre emplatado, despacho y entrega en mesa.",
    });
  }

  if (text.includes("demora") || text.includes("tarde") || text.includes("rapido")) {
    dynamic.push({
      title: "Demoras sin explicacion elevan frustracion",
      area: "Espera",
      severity: "medium",
      description: "El problema no es solo esperar, sino no recibir contexto durante la espera.",
      action: "Definir frases de aviso y compensacion ligera para mesas con espera fuera de rango.",
    });
  }

  if (text.includes("musica") || text.includes("ruido")) {
    dynamic.push({
      title: "Ambiente puede estar limitando ocasiones de consumo",
      area: "Ambiente",
      severity: "medium",
      description: "El ruido aparece como una incomodidad que cambia la intencion de volver.",
      action: "Ajustar volumen por franja horaria y tipo de visita.",
    });
  }

  return [...dynamic, ...sampleInsights].slice(0, 5);
}
