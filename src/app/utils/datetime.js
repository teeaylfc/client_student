/**
 * 
 * @param {datetime} String that represents datetime in ISO format (yyyy-MM-ddTHH:mm:SS(.SSSZ))
 * @returns Return datetime in format: HH:mm dd-MM-yyyy
 */
var moment = require('moment');
export const getPrettyDateTime = datetime => {
  let date = extractDateTime(datetime);
  return `${date.hour > 9 ? date.hour : '0' + date.hour}\
    :${date.minute > 9 ? date.minute : '0' + date.minute} \
    ${date.date > 9 ? date.date : '0' + date.date}\
    -${date.month > 9 ? date.month : '0' + date.month}\
    -${date.year}\
    `
}

/**
 * 
 * @param {datetime} String that represents datetime in ISO format (yyyy-MM-ddTHH:mm:SS(.SSSZ))
 * @returns Return an Object that has keys: hour, minute, second, date, month, year
 */
export const extractDateTime = datetime => {
  let date = new Date(datetime);
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }
}
export const formatDate = (datetime) => {
  return moment(datetime).format('DD/MM/YYYY');
  // let date = new Date(datetime);
  // var day = date.getDate();
  // var month = date.getMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
  // if (month < 10) month = "0" + month
  // if (date < 10) date = "0" + date
  // var year = date.getFullYear();
  // // var hours = date.getHours();
  // // var minutes = date.getMinutes();
  // // var ampm = hours >= 12 ? 'pm' : 'am';
  // // hours = hours % 12;
  // // hours = hours ? hours : 12; // the hour '0' should be '12'
  // // minutes = minutes < 10 ? '0' + minutes : minutes;
  // // var strTime = hours + ':' + minutes + ' ' + ampm;
  // // return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  // // return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  // return (day + "/" + month + "/" + year);
}