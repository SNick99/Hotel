// display on order table (2-3 rows in one field)
export const orderView = arr => {
  let result = [];
  arr.forEach((cur, i) => {
    result.push({
      EndDate: `${cur['EndDate']}`,
      Client: `${cur['FirstName']}
    ${cur['LastName']}
    ${cur['Phone']}`,
      Pet: `${cur['PetName']}
    ${cur['KindOfPet']}
    ${cur['PassportCode']}`,
      Employee: `${cur['FirstName']}
    ${cur['LastName']}
    ${cur['Phone']}`,
      Product: `${cur['NameOfProduct']}
    ${cur['NameFirma']}`,
      Cage: `${cur['KindOfCage']}
    ${cur['NameFirma']}`,
      Extra: `${cur['Extra']}`,
      ExtraPrice: `${cur['ExtraPrice']}`
    });
  });

  return result;
};

// parse selected row (rows after displaing by orderView)
export const parseItem = (item, old) => {
  let cur = {
    EndDate: '',
    Client: {},
    Pet: {},
    Employee: {},
    Product: {},
    Cage: {},
    Extra: '',
    ExtraPrice: ''
  };
  cur['EndDate'] = item['EndDate'] ? item['EndDate'] : old['EndDate'];
  [
    cur['Client']['FirstName'],
    cur['Client']['LastName'],
    cur['Client']['Phone']
  ] = (item['Client'] ? item['Client'] : old['Client'])
    .split(' ')
    .join('')
    .split(/\s/);
  [
    cur['Pet']['PetName'],
    cur['Pet']['KindOfPet'],
    cur['Pet']['PassportCode']
  ] = (item['Pet'] ? item['Pet'] : old['Pet'])
    .split(' ')
    .join('')
    .split(/\s/);
  [
    cur['Employee']['FirstName'],
    cur['Employee']['LastName'],
    cur['Employee']['Phone']
  ] = (item['Employee'] ? item['Employee'] : old['Employee'])
    .split(' ')
    .join('')
    .split(/\s/);
  [cur['Product']['NameOfProduct'], cur['Product']['NameFirma']] = (item[
    'Product'
  ]
    ? item['Product']
    : old['Product']
  )
    .split(' ')
    .join('')
    .split(/\s/);
  [cur['Cage']['KindOfCage'], cur['Cage']['NameFirma']] = (item['Cage']
    ? item['Cage']
    : old['Cage']
  )
    .split(' ')
    .join('')
    .split(/\s/);
  if (item['Extra']) {
    cur['Extra'] = item['Extra'] ? item['Extra'] : old['Extra'];
    cur['ExtraPrice'] = item['ExtraPrice']
      ? item['ExtraPrice']
      : old['ExtraPrice'];
  }
  return cur;
};
