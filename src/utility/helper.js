// ../../utility/helper.js
export const mobileWidth = 819;
export default function isMobileFunction() {
  const windowWidth = window.innerWidth;
  const match = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(Android)|(webOS)/i,
  );
  //Fix for iPad pro
  //TODO: find better solution
  if (windowWidth > mobileWidth && match && match.includes('iPad'))
      return false;
  if (windowWidth <= mobileWidth) return true;
  return !!match;
}

export const formatDate = (dateString) => {
  const parsedDate = new Date(dateString);

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short', // Short month name, e.g., "Dec"
    day: 'numeric', // Numeric day, e.g., "11"
  });
};


export const formateTime = (dateString) => {
  const parsedDate = new Date(dateString);
  return parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",

    hour12:true
  })

}

export const useLocalStorageHelper = () => {
  const checkLocalStorage = () => {
      try {
          return localStorage && typeof localStorage !== 'undefined';
      } catch (error) {
          return false;
      }
  };

  const check = checkLocalStorage();

  const set = (key, value) => {
      if (check) {
          localStorage.setItem(key, value);
      }
  };

  const get = (key) => {
      if (check) {
          return localStorage.getItem(key);
      }
      return null;
  };

  const remove = (key) => {
      if (check) {
          localStorage.removeItem(key);
      }
  };

  return { set, get, remove };
};


