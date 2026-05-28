import { demoRestaurant } from "@/lib/demo-data";
import { SurveyExperience } from "./SurveyExperience";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RestaurantSurveyPage({ params }: PageProps) {
  const { slug } = await params;
  const restaurantName = slug === demoRestaurant.slug ? demoRestaurant.name : "Restaurante";

  return <SurveyExperience restaurantName={restaurantName} restaurantSlug={slug} />;
}
