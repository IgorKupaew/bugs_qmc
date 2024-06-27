export const getFormattedTimeRange = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) {
    return "";
  }

  const millisecondsInMinute = 60 * 1000;
  const millisecondsInHour = 60 * millisecondsInMinute;
  const millisecondsInDay = 24 * millisecondsInHour;
  const millisecondsInWeek = 7 * millisecondsInDay;

  const weeks = Math.floor(value / millisecondsInWeek);
  const days = Math.floor((value % millisecondsInWeek) / millisecondsInDay);
  const hours = Math.floor((value % millisecondsInDay) / millisecondsInHour);
  const minutes = Math.floor((value % millisecondsInHour) / millisecondsInMinute);

  const formatWord = (number: number, wordForms: [string, string, string]): string => {
    let formIndex;
    if (number % 10 === 1 && number % 100 !== 11) {
      formIndex = 0;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
      formIndex = 1;
    } else {
      formIndex = 2;
    }
    return `${number} ${wordForms[formIndex]}`;
  };

  let result = "";
  if (weeks > 0) {
    result += `${formatWord(weeks, ["неделя", "недели", "недель"])}`;
  }
  if (days > 0) {
    result += `, ${formatWord(days, ["день", "дня", "дней"])}`;
  }
  if (hours > 0) {
    result += `, ${formatWord(hours, ["час", "часа", "часов"])}`;
  }
  if (minutes > 0) {
    result += `, ${formatWord(minutes, ["минута", "минуты", "минут"])}`;
  }

  if (result.startsWith(", ")) {
    result = result.slice(2);
  }

  return result;
};
