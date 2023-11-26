export const formatDate = (date: Date) => {
  const dateString = new Date(date).toLocaleString();

  const [d, t] = dateString.split(",");

  const [hour, minute] = t.split(":");

  return `${d} - ${hour}:${minute}`;
};
