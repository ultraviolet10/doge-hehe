export const shortenAddress = (address?: string, digits = 5) => {
  if (!address) return '';
  return (
    address.substring(0, digits) +
    '...' +
    address.substring(address.length - digits)
  );
};

export const convertTimestampToHHMMSS = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  // let seconds = date.getSeconds().toString();

  hours = Number(hours) < 10 ? '0' + hours : hours;
  minutes = Number(minutes) < 10 ? '0' + minutes : minutes;
  // seconds = Number(seconds) < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}`;
};

export const compareTimestamps = (endpointTimestamp: string) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const difference = currentTimestamp - Number(endpointTimestamp);
  console.log(difference);
  return difference;
};
