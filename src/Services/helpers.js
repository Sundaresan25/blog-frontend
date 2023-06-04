import moment from "moment";

/**
 * Paginates an array of items.
 * @param {Array} items - The array of items to paginate.
 * @param {number} current_page - The current page number.
 * @param {number} per_page_items - The number of items per page.
 * @returns {Object} - The paginated result containing page information and data.
 */
export function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items?.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items?.length / per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items?.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}

/**
 * Custom encode a string by shifting each character code by 3.
 * @param {string} str - The string to encode.
 * @returns {string} - The encoded string.
 */
export function customEncode(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) + 3; // Shift each character code by 3
    result += String.fromCharCode(charCode); // Convert character code to character and append to result
  }
  return result;
}

/**
 * Custom decode a string by shifting each character code back by 3.
 * @param {string} str - The string to decode.
 * @returns {string} - The decoded string.
 */
export function customDecode(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) - 3; // Shift each character code back by 3
    result += String.fromCharCode(charCode); // Convert character code to character and append to result
  }

  return result;
}

/**
 * Formats a date and time string.
 * @param {string} dateTimeString - The date and time string to format.
 * @returns {string} - The formatted date and time string.
 */
export function formatDate(dateTimeString) {
  console.log(dateTimeString, "test");
  const formattedDateTime = moment(dateTimeString)
    .local()
    .format("MMMM Do, YYYY [at] h:mm:ss A");
  return formattedDateTime;
}
