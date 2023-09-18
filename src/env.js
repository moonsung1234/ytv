/**
 * @readonly
 * @const {string} 
 */
export const SEARCH_LINK = "https://www.youtube.com/results?search_query=";

/**
 * 
 * @param {string} url youtube url
 * @returns {boolean} boolean
 */
export let is_url = (url) => {
    let url_regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

    return !!String(url).match(url_regex);
}

/**
 * @param {Object} obj flatten target object
 * @returns {Object} flatten object
 */
export let flatten_object = (obj) => {
  const result = {}

  function recurse(tab, current, prop) {
    if (Object(current) !== current) {
      result["  ".repeat(tab) + prop] = current
    } else if (Array.isArray(current)) {
      let l;
      for (let i = 0, l = current.length; i < l; i++) {
        recurse(tab + 1, current[i], `${prop}[${i}]`)
      }
      if (l == 0) {
        result[prop] = []
      }
    } else {
      let isEmpty = true
      for (const p in current) {
        isEmpty = false
        recurse(tab + 1, current[p], prop ? `${prop}.${p}` : p)
      }
      if (isEmpty && prop) {
        result[prop] = {}
      }
    }
  }

  recurse(0, obj, '');

  return result
}
