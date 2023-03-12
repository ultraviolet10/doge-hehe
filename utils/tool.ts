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

  return difference;
};

export const isWithin5Percent = (
  value: string,
  constantValue: number
): boolean => {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    // handle invalid input
    return false;
  }

  const fivePercent = constantValue * 0.05;
  const lowerBound = constantValue - fivePercent;
  const upperBound = constantValue + fivePercent;

  return numValue >= lowerBound && numValue <= upperBound;
};

export const percentIncrement = (value: number): string => {
  if (isNaN(value)) {
    // handle invalid input
    return 'Invalid input';
  }

  const incrementedValue = value * 1.05;
  return incrementedValue.toFixed(2).toString();
};
