'use client'
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from 'react-query';

const MapContent = dynamic(() => import("./components/Map/Content"), {
  ssr: false,
});

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <MapContent />
    </QueryClientProvider>
  )
}
