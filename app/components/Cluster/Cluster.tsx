import L from "leaflet";
import { FC } from "react";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import MarkerComponent from "../Marker/MarkerComponent";
import { findClusterData } from "./ClusterData";

import { ChargingStation } from "@/app/types/search";
import "./styles.scss";

const getIcon = (count: number) => {
  const data = findClusterData(count);

  return L.divIcon({
    html: `<div class=" custom-cluster custom-cluster-inner-${data.intensity}"><span>${count}</span></div>`,
    className: `leaflet-marker-icon marker-cluster leaflet-interactive`
  });
};

type Props = {
  data: ChargingStation[] | null;
};

export const Cluster: FC<Props> = ({ data }) => {
  const map = useMap();
  const bounds = map.getBounds();

  const geoJSON =
    data
      ?.filter((item) => item?.geoLocation?.lat && item?.geoLocation?.lon)
      .map((item) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item?.geoLocation?.lon, item?.geoLocation?.lat]
          },
          item,
          properties: { cluster: false, id: item.id }
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
    options: { radius: 300, maxZoom: 13 }
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
