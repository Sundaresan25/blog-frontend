import moment from "moment";

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

export function customEncode(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) + 3; // Shift each character code by 3
    result += String.fromCharCode(charCode); // Convert character code to character and append to result
  }
  return result;
}

export function customDecode(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) - 3; // Shift each character code back by 3
    result += String.fromCharCode(charCode); // Convert character code to character and append to result
  }

  return result;
}

export function formatDate(dateTimeString) {
  const formattedDateTime = moment(dateTimeString).format(
    "MMMM Do, YYYY [at] h:mm:ss A"
  );
  return formattedDateTime;
}
