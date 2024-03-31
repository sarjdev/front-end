"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header";

const MapContent = dynamic(() => import("./components/Map/MapContent"), {
  ssr: false
});

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <MapContent />
    </QueryClientProvider>
  );
}
