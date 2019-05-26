// display on order table (2-3 rows in one field)

// parse selected row (rows after displaing by orderView)
export const parseItem = (item, old) => {
  console.log('SHEDULE', item);
  let cur = {
    DateChange: '',
    Employee: {}
  };

  cur['DateChange'] = item['DateChange']
    ? item['DateChange']
    : old['DateChange'];
  [
    cur['Employee']['id'],
    cur['Employee']['FirstName'],
    cur['Employee']['LastName'],
    cur['Employee']['Phone']
  ] = item['Employee']
    ? item['Employee']
        .split(' ')
        .join('')
        .split(/\s/)
    : [old['id'], old['FirstName'], old['LastName'], old['Phone']];

  return cur;
};
