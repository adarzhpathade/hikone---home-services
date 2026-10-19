import { cacheLife } from "next/cache";
import { HomeView } from "@/features/home/components/home-view";

export const metadata = {
  title: "Hikone — On-Demand Home Appliance Services & Repair",
  description:
    "Precision cooling care, deep sanitization, and certified appliance repairs delivered with Japanese-Scandinavian editorial excellence.",
};

async function getHomeData() {
  "use cache";
  cacheLife("hours");
  return {};
}

async function HomeData() {
  await getHomeData();
  return <HomeView />;
}

export default function HomePage() {
  return <HomeData />;
}
