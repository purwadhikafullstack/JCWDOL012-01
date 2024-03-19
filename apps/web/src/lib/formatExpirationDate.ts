export const formatExpirationDate = (expirationDate: string) => {
  const date = new Date(expirationDate);
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const formattedDate = date.toLocaleDateString('id-ID', optionsDate);
  const formattedTime = date.toLocaleTimeString('id-ID', optionsTime);
  return `${formattedDate} - ${formattedTime}`;
};
