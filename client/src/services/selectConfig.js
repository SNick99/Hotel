// import Employees from db here

const employees = [
  //-------------------delete after dev
  { FirstName: '111emp', LastName: '111', Phone: '111' },
  { FirstName: '222emp', LastName: '222', Phone: '222' },
  { FirstName: '333emp', LastName: '333', Phone: '333' }
];
const cages = [
  { KindOfCage: '111cage', NameFirma: '111', TypeOfCage: '111' },
  { KindOfCage: '222cage', NameFirma: '222', TypeOfCage: '222' }
];
const clients = [
  { FirstName: '111client', LastName: '111', Phone: '111' },
  { FirstName: '222client', LastName: '222', Phone: '222' }
];
const pets = [
  { PetName: '111', KindOfPet: '111', PassportCode: '111' },
  { PetName: '222', KindOfPet: '222', PassportCode: '222' }
];
const products = [
  { NameOfProduct: '111', NameFirma: '111' },
  { NameOfProduct: '222', NameFirma: '222' }
];
const data1 = employees; // employees from db here
const data2 = cages; // cages from db
const data3 = clients; // ...
const data4 = pets;
const data5 = products; //-------------------delete after dev

const selectConfig = (item, data) => {
  console.log('XERRRRR', data);
  let result = '';
  switch (item.name) {
    case 'Employee':
      result = data.Employee.map(
        item =>
          `${item.id}\u00A0${item.FirstName}\u00A0${item.LastName}\u00A0${
            item.Phone
          }`
      );
      break;
    case 'Cage':
      result = data.Cage.map(
        item =>
          `${item.id}\u00A0${item.KindOfCage}\u00A0${item.NameFirma}\u00A0${
            item.TypeOfCage
          }`
      );
      break;
    case 'Client':
      result = data.Client.map(
        item =>
          `${item.id}\u00A0${item.FirstName}\u00A0${item.LastName}\u00A0${
            item.Phone
          }`
      );
      break;
    case 'Pet':
      result = data.Pet.map(
        item => `${item.id}\u00A0${item.NamePet}\u00A0${item.PassportCode}`
      );
      break;
    case 'Product':
      result = data.Product.map(
        item => `${item.id}\u00A0${item.NameOfProduct}\u00A0${item.NameFirma}`
      );
      break;
  }
  return result;
};

export default selectConfig;
