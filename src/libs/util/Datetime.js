import bind from 'src/libs/decorators/bind';
import moment from 'moment';


/**
 * Contains wrapper methods around Method.js
 */
const datetime = dateString => {
  const mo = moment(dateString);

  return {
    getHoursAndMinutes() {
      return mo.format('LT');
    }
  }
};

export const printDuration = seconds => {
  const duration = moment.duration(seconds, 's');
  
  let durationString = '';

  const exactHours = duration.asHours();
  const hours = Math.floor(exactHours);

  if (hours > 0) {
    duration.subtract(hours, 'h');

    const unit = hours > 1 ? 'hrs' : 'hr';

    durationString = durationString.concat(`${hours}${unit}`);
  }

  const exactMinutes = duration.asMinutes();
  const minutes = Math.floor(exactMinutes);

  if (minutes > 0) {
    duration.subtract(minutes, 'm');

    const space = getSpace(durationString);

    durationString = durationString.concat(`${space}${minutes}min`);
  }

  // Only print seconds if nothing else has been printed.
  if (!durationString) {
    const exactSeconds = duration.asSeconds();
    const seconds = Math.floor(exactSeconds);

    if (seconds > 0) {
      duration.subtract(seconds, 's');

      const space = getSpace(durationString);

      durationString = durationString.concat(`${seconds}sec`);
    }
  }

  return durationString;
}

const getSpace = durationString => durationString ? ' ' : '';


export default datetime;