import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allOrders,
  deleteOrder,
  allForOrder
} from '../../redux/actions/ordersActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

import { orderView, parseItem } from './orderSelection';

const rows = [
  'id',
  'Начало',
  'Завершение',
  'Имя клиента',
  'Телефон',
  // 'Имя животного',
  // 'Вид',
  'Имя смотрителя',
  // 'Телефон',
  // 'Фирма клетки',
  'Клетка',
  // 'Фирма продукта',
  'Продукт',
  'Доп. сервис',
  'Сумма заказа'
];

class AllOrders extends Component {
  state = {
    selected: '',
    info: {
      Employee: [],
      Client: [],
      Pet: [],
      Product: [],
      Cage: []
    }
    // data: orderView(test) //this.props.orders
  };

  handleEdit = (e, item, old) => {
    console.log(item); // to-parse input data
    const changed = parseItem(item, old);
    console.log(changed); // after-parse data
    this.setState({ selected: changed });
  };

  handleDelete = item => {
    console.log(`Удален заказ с id ${item}`);
    return this.props.deleteOrder(item);
  };

  componentDidMount() {
    this.props.allForOrder().then(() => {
      this.setState({ info: this.props.info });
      this.props.allOrders();
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.info.Pet !== undefined &&
        this.state.info.Client !== undefined &&
        this.state.info.Employee !== undefined &&
        this.state.info.Cage !== undefined &&
        this.state.info.Product !== undefined ? (
          <TableContainer
            rows={rows}
            searchProp="EndDate"
            data={this.props.orders}
            edit={false}
            handleDelete={this.handleDelete}
            delete={true}
          />
        ) : (
          <div>
            Ой! Кажется, что-то пошло не так, попробуйте обновить страницу.
          </div>
        )}
      </React.Fragment>
    );
  }
}

AllOrders.propTypes = {
  auth: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  allOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  allForOrder: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders.orders,
    info: state.orders.info
  };
};

export default connect(
  mapStateToProps,
  { allOrders, deleteOrder, allForOrder }
)(AllOrders);
