export const fetchFromObject = (obj, prop) => {
    if (typeof obj === "undefined") {
      return false;
    }
    var _index = prop.indexOf(".");
    if (_index > -1) {
      return this.fetchFromObject(
        obj[prop.substring(0, _index)],
        prop.substr(_index + 1)
      );
    }
    return obj[prop];
  };

export const setDeep = (obj, path, value, setrecursively = false) => {
  let level = 0;
  path = path.split(".");
  path.reduce((a, b) => {
    level++;

    if (
      setrecursively &&
      typeof a[b] === "undefined" &&
      level !== path.length
    ) {
      a[b] = {};
      return a[b];
    }

    if (level === path.length) {
      a[b] = value;
      return value;
    } else {
      return a[b];
    }
  }, obj);
  return obj;
};
