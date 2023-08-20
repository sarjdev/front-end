import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const MapContent = dynamic(() => import("./components/Map/Content"), {
  ssr: false,
});


export default function Home() {
  return (
    <MapContent />
  )
}
