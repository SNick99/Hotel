// display on order table (2-3 rows in one field)
export const orderView = arr => {
  let result = [];
  arr.forEach((cur, i) => {
    result.push({
      WorkDate: `${cur['WorkDate']}`,
      Employee: `${cur['FirstName']}
      ${cur['LastName']}
      ${cur['Phone']}`
    });
  });

  return result;
};

// parse selected row (rows after displaing by orderView)
export const parseItem = (item, old) => {
  let cur = {
    WorkDate: '',
    Employee: {}
  };
  cur['WorkDate'] = item['WorkDate'] ? item['WorkDate'] : old['WorkDate'];

  [
    cur['Employee']['FirstName'],
    cur['Employee']['LastName'],
    cur['Employee']['Phone']
  ] = item['Employee']
    ? item['Employee']
        .split(' ')
        .join('')
        .split(/\s/)
    : [old['FirstName'], old['LastName'], old['Phone']];

  return cur;
};
