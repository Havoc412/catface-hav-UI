export function getContentSlice(content, maxLength) {
    if (content.length <= maxLength) {
      return content;
    }
    return content.slice(0, maxLength) + "...";
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}