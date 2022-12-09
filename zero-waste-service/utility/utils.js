/**
 * Parse cookie string to get array object containing all the cookies.
 * 
 * @param {String} cookieString cookie string to be parsed.
 * @returns {Array} - the parsed cookie array
 */
const parseCookie = (cookieString) => {
  const cookieList = cookieString.split("; ");
  const cookieArray = [];
  for (const cookie of cookieList) {
    const key = cookie.split("=")[0];
    cookieArray[key] = cookie.substring(key.length + 1);
  }
  return cookieArray;
};

module.exports = parseCookie;
