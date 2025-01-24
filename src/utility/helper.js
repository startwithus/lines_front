// ../../utility/helper.js
export const mobileWidth = 819;
export default function isMobileFunction() {
  const windowWidth = window.innerWidth;
  const match = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(Android)|(webOS)/i
  );
  //Fix for iPad pro
  //TODO: find better solution
  if (windowWidth > mobileWidth && match && match.includes("iPad"))
    return false;
  if (windowWidth <= mobileWidth) return true;
  return !!match;
}

export const formatDate = (dateString) => {
  const parsedDate = new Date(dateString);

  return parsedDate.toLocaleDateString("en-US", {
    month: "short", // Short month name, e.g., "Dec"
    day: "numeric", // Numeric day, e.g., "11"
  });
};

export const formateTime = (dateString) => {
  const parsedDate = new Date(dateString);
  return parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",

    hour12: true,
  });
};

const RTP = 92;
export function getMaxMult(ranges) {
  let mult = 1;
  for (let range of ranges) {
    const singleMult = getMaxMultFromRange(range);
    mult *= singleMult;
  }
  const finalMult = mult * (RTP / 100);
  return Math.floor(finalMult * 100) / 100;
}

export function getMaxMultFromRange(num) {
  const range = 100;
  const prob = (range - num) / range;
  const mult = 1 / prob;
  return mult;
}
export function formatBalance(amount) {
  if (amount === undefined || amount === null) return "";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
