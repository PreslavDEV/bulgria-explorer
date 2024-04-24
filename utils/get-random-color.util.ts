const colors = [
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

export const getRandomColor = () => {
  const index = Math.random() * colors.length;
  return colors[index];
};
