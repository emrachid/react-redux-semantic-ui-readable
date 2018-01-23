const dateFromTime = (time) => {
  const date = new Date(time);
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Set',
    'Out',
    'Nov',
    'Dec',
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default dateFromTime;
