function getDate(time) {
  const date = time ? new Date(time) : new Date();

  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, 0);
  const d = date.getDate().toString().padStart(2, 0);

  return `${y}-${m}-${d}`;
}

export default getDate;