// display on order table (2-3 rows in one field)

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
