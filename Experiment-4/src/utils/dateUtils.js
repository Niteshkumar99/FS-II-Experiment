export function createDays() {
  const days = [];

  for (let i = 1; i <= 30; i++) {
    const date = `2026-09-${String(i).padStart(2, "0")}`;

    const dateObject = new Date(`${date}T00:00:00`);

    days.push({
      date,
      day: i,
      weekday: dateObject.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      ),
    });
  }

  return days;
}

export function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}