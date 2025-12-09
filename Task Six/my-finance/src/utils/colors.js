export const vibrantColors = [
  "#4e79a7", "#f28e2b", "#e15759", "#76b7b2",
  "#59a14f", "#edc949", "#af7aa1", "#ff9da7",
  "#9c755f", "#bab0ab", "#6f4e7c", "#d37295",
  "#72b7e1", "#f1ce63", "#c94c4c", "#6dbd6d"
];

export const getColor = (index) => {
  return vibrantColors[index % vibrantColors.length];
};

export const getBorderColor = (index) => {
  const base = vibrantColors[index % vibrantColors.length];
  return base + "CC"; 
};
