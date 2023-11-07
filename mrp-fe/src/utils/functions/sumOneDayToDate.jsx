import { format } from "date-fns";

const sumOneDayToDate = (date) => {
  const dateList = date.split("-");
  let yyyy = parseInt(dateList[0]);
  let mm = parseInt(dateList[1]);
  let dd = parseInt(dateList[2]);
  const dateObject = new Date(yyyy, mm-1, dd + 1);
  return format(dateObject, "yyyy-MM-dd");
}

export default sumOneDayToDate;