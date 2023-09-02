"use client"

import { Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import { LatLngExpression } from 'leaflet';
import markerIconPng from '@/app/assets/images/marker.png';

interface MarkerProps {
    position: LatLngExpression;
    popupContent?: string;
    iconUrl?: string;
}

const MarkerComponent: React.FC<MarkerProps> = ({ position, popupContent, iconUrl }) => {
    const markerIcon = new Leaflet.Icon({
        iconUrl: iconUrl || markerIconPng.src,
        iconRetinaUrl: iconUrl || markerIconPng.src,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        // shadowUrl: null,
        // shadowSize: null,
        // shadowAnchor: null
    });

    return (
        <Marker position={position} icon={markerIcon}>
            {popupContent && <Popup>{popupContent}</Popup>}
        </Marker>
    );
}

export default MarkerComponent;