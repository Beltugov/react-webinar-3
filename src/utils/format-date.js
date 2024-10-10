export default function formatDate (date) {
  const newDate = new Date(date)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return newDate.toLocaleString('ru', options).replace(" г.", "")
}
