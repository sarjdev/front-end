import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import { LocationResponse } from "@/app/types";
import MarkerComponent from "../Marker/MarkerComponent";
import { findClusterData } from "./ClusterData";

import "./style.scss";

const getIcon = (count: number) => {
  const data = findClusterData(count);

  return L.divIcon({
    html: `<div class="custom-cluster-inner-${data.intensity}"><span>${count}</span></div>`,
    className: `leaflet-marker-icon marker-cluster leaflet-interactive custom-cluster`
  });
};

type Props = {
  data: LocationResponse[] | null;
};

export const Cluster = ({ data }: Props) => {
  const map = useMap();
  const bounds = map.getBounds();

  const geoJSON =
    data
      ?.filter((item) => item?.location?.lat && item?.location?.lon)
      .map((item) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.location.lon, item.location.lat]
          },
          item,
          properties: { cluster: false, id: item.id, category: item.city }
        };
      }) ?? [];

  const { clusters, supercluster } = useSupercluster({
    points: geoJSON,
    bounds: [
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat
    ],
    zoom: map.getZoom(),
    options: { radius: 300, maxZoom: 17 }
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount, id } = cluster.properties;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={getIcon(pointCount)}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    18
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true
                  });
                }
              }}
            />
          );
        }

        return (
          <MarkerComponent
            key={`cluster-${cluster.properties.id}`}
            position={[latitude, longitude]}
            icon={cluster?.item?.provider}
            chargingStationId={id}
          />
        );
      })}
    </>
  );
};
