import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllOrders,
  deleteCage
} from '../../redux/actions/ordersActions';*/
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

import { orderView, parseItem } from './orderSelection';

const test = [
  {
    EndDate: '2019-05-16',
    FirstName: '111client',
    LastName: '11lastname',
    Phone: '111-11-11',
    PetName: '111pet',
    KindOfPet: '111kindofpet',
    PassportCode: 'code111111',
    EFirstName: '111emp',
    ELastName: '111',
    EPhone: '111',
    NameOfProduct: '111productname',
    ProductNameFirma: '111firmaproduct',
    KindOfCage: '111cage',
    NameFirma: '111firmacage',
    Extra: '111extra',
    ExtraPrice: '111extraprice'
  }
];

const rows = [
  'Начало',
  'Завершение',
  'Имя клиента',
  'Телефон',
  'Имя животного',
  'Имя смотрителя',
  'Телефон',
  'Фирма клетки',
  'Модель',
  'Фирма продукта',
  'Продукт',
  'Доп. сервис',
  'Сумма заказа'
];

class AllOrders extends Component {
  state = {
    selected: '',
    data: orderView(test) //this.props.orders
  };

  handleEdit = (e, item, old) => {
    console.log(item); // to-parse input data
    const changed = parseItem(item, old);
    console.log(changed); // after-parse data
    this.setState({ selected: changed });
  };

  handleDelete = item => {
    //console.log(`Удален заказ с id ${item}`);
    // return this.props.deleteCage(item);
  };

  componentDidMount() {
    // this.props.AllOrders();
  }

  render() {
    // console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        searchProp="EndDate"
        data={this.state.data}
        allData={e => console.log('ex')} // AllOrders from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.orderInputs}
      />
    );
  }
}

AllOrders.propTypes = {
  auth: PropTypes.object.isRequired
  //orders: PropTypes.object.isRequired
  //AllOrders: PropTypes.func.isRequired,
  //deleteCage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders
  };
};

export default connect(
  mapStateToProps
  //{ AllOrders, deleteCage }
)(AllOrders);
