export const getFormattedDate = (dateString?: string | null): string => {
  if (!dateString) return "";

  const date: Date = new Date(dateString);

  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();

  const formattedMonth: string = month < 10 ? "0" + month : String(month);
  const formattedDay: string = day < 10 ? "0" + day : String(day);
  const formattedHours: string = hours < 10 ? "0" + hours : String(hours);
  const formattedMinutes: string = minutes < 10 ? "0" + minutes : String(minutes);
  const formattedSeconds: string = seconds < 10 ? "0" + seconds : String(seconds);

  return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
