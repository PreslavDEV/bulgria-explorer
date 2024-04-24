const userColors = [
  "#FF5F6D", // Red
  "#FFE066", // Yellow
  "#FFB74D", // Orange
  "#4CAF50", // Green
  "#BA68C8", // Purple
  "#FF80AB", // Pink
  "#CDDC39", // Lime
  "#4DB6AC", // Teal
  "#FFC107", // Amber
  "#7986CB", // Indigo
];

export const LABEL_USER_COLORS = [
  { label: "Red", value: "#FF5F6D" },
  { label: "Yellow", value: "#FFE066" },
  { label: "Orange", value: "#FFB74D" },
  { label: "Green", value: "#4CAF50" },
  { label: "Purple", value: "#BA68C8" },
  { label: "Pink", value: "#FF80AB" },
  { label: "Lime", value: "#CDDC39" },
  { label: "Teal", value: "#4DB6AC" },
  { label: "Amber", value: "#FFC107" },
  { label: "Indigo", value: "#7986CB" },
] as const;

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * userColors.length);
  return userColors[index];
};
