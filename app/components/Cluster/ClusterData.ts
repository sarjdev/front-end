export type ClusterDataType = {
  id: number;
  intensity: string;
  minClus: number;
  maxClus?: number;
};

export interface IClusterData {
  [key: string]: ClusterDataType;
}

export const ClusterData: IClusterData = {
  safe: {
    id: 1,
    intensity: "safe",
    minClus: 0,
    maxClus: 0
  },
  low: {
    id: 2,
    intensity: "low",
    minClus: 1,
    maxClus: 15
  },
  "mid-low": {
    id: 3,
    intensity: "mid-low",
    minClus: 16,
    maxClus: 35
  },
  mid: {
    id: 4,
    intensity: "mid",
    minClus: 36,
    maxClus: 65
  },
  "mid-high": {
    id: 5,
    intensity: "mid-high",
    minClus: 66,
    maxClus: 85
  },
  high: {
    id: 6,
    intensity: "high",
    minClus: 86
  }
};

export function findClusterData(clusterCount: number): ClusterDataType {
  const data = Object.values(ClusterData).find(
    (item) =>
      clusterCount >= item.minClus && clusterCount <= (item.maxClus ?? Number.MAX_SAFE_INTEGER)
  );

  return data || ClusterData.safe;
}
