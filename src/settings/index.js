export const CONTROL_POINT_SETTINGS = {
  radius: 10,
  fill: "rgba(63, 191, 191, 0.15)",
  stroke: "rgb(63, 191, 191)",
  strokeWidth: 2,
};

export const TANGENT_LINE_SETTINGS = {
  stroke: "rgb(63, 191, 191)",
  strokeWidth: 2,
};

export const ACTION_TYPES = [
  {
    id: "CLICK",
  },
  {
    id: "CIRCLE",
  },
  {
    id: "LINE",
  },
  {
    id: "BEZIER",
  },
];

export const ZOOM_DIFF = 0.1;
export const MAX_ZOOM = 2;
export const MIN_ZOOM = 0.1;
