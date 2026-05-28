"use client";

import { demoRestaurant, type Feedback } from "./demo-data";

export type RestaurantProfile = {
  name: string;
  slug: string;
  city: string;
  country: string;
  category: string;
  contactName: string;
  whatsapp: string;
  plan: "Demo comercial" | "Licencia mensual";
  activatedAt: string;
};

export const feedbackStorageKey = "feedmee-feedback-v1";
export const restaurantStorageKey = "feedmee-restaurant-profile-v1";

export const defaultRestaurantProfile: RestaurantProfile = {
  name: demoRestaurant.name,
  slug: demoRestaurant.slug,
  city: demoRestaurant.city,
  country: "Colombia",
  category: "Restaurante casual",
  contactName: "Administrador",
  whatsapp: "",
  plan: "Demo comercial",
  activatedAt: "2026-05-28T00:00:00.000Z",
};

export function slugifyRestaurant(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function readRestaurantProfile(): RestaurantProfile {
  if (typeof window === "undefined") return defaultRestaurantProfile;
  const stored = window.localStorage.getItem(restaurantStorageKey);
  if (!stored) return defaultRestaurantProfile;

  try {
    return { ...defaultRestaurantProfile, ...(JSON.parse(stored) as Partial<RestaurantProfile>) };
  } catch {
    return defaultRestaurantProfile;
  }
}

export function saveRestaurantProfile(profile: RestaurantProfile) {
  window.localStorage.setItem(restaurantStorageKey, JSON.stringify(profile));
}

export function readFeedback(): Feedback[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(feedbackStorageKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Feedback[];
  } catch {
    return [];
  }
}

export function saveFeedback(feedback: Feedback[]) {
  window.localStorage.setItem(feedbackStorageKey, JSON.stringify(feedback));
}
