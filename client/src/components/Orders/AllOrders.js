import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllOrders,
  deleteCage
} from '../../redux/actions/ordersActions';*/
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

let test = [
  {
    Имя: '111',
    Phone: '111',
    'Имя питомца': '111',
    Вид: '111',
    Код: '111',
    'Имя товара': '111',
    'Фирма клетки': '111',
    'Тип клетки': '111',
    'Дополнительная услуга': '111',
    'Цена доп. услуги': '111'
  },
  {
    Имя: '222',
    Phone: '222',
    'Имя питомца': '222',
    Вид: '222',
    Код: '222',
    'Имя товара': '222',
    'Фирма клетки': '222',
    'Тип клетки': '222',
    'Дополнительная услуга': '',
    'Цена доп. услуги': ''
  }
];

const rows = [
  'Имя',
  'Телефон',
  'Имя питомца',
  'Вид',
  'Код',
  'Имя товара',
  'Фирма клетки',
  'Тип клетки',
  'Дополнительная услуга',
  'Цена доп. услуги'
];

class AllOrders extends Component {
  state = {
    selected: '',
    data: test //this.props.orders
  };

  handleEdit = (e,item) => {
    console.log(item); // delete after dev
    this.setState({ selected: item });
  };

  handleDelete = item => {
    console.log(`Удален заказ с id ${item}`);
    // return this.props.deleteCage(item);
  };

  componentDidMount() {
    // this.props.AllOrders();
  }

  render() {
    console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        searchProp="Phone" 
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
