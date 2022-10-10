import moment from 'moment';

export const getTimeStampInHumanReadableFormat = timeStamp => {
  const diffInDays = moment(new Date().getTime()).diff(
    moment(timeStamp),
    'days',
  );
  return diffInDays > 0
    ? moment(timeStamp).format('MMM DD, YYYY')
    : moment(timeStamp).fromNow();
};
