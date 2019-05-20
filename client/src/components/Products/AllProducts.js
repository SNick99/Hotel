import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllProducts,
  deleteCage
} from '../../redux/actions/productsActions';*/
import TableContainer from '../../services/TableContainer';

let test = [
  {
    'Название': '111',
    'Фирма': '111',
    'Стоимость (продажа)': '111',
    'Стоимость (покупка)': '111',
    'Сотрудник': '111',
  },
  {
    'Название': '222',
    'Фирма': '222',
    'Стоимость (продажа)': '222',
    'Стоимость (покупка)': '222',
    'Сотрудник': '222'
  }
];

const rows = [
  'Название',
    'Фирма',
    'Стоимость (продажа)',
    'Стоимость (покупка)',
    'Сотрудник'
];

class AllProducts extends Component {
  state = {
    selected: '',
    data: test //this.props.products
  };

  handleEdit = item => {
    console.log('to edit: ' + item.FirstName);
    this.setState({ selected: item });
  };

  handleDelete = item => {
    console.log(`Удален клиент с id ${item}`);
    // return this.props.deleteClient(item);
  };

  componentDidMount() {
    // this.props.AllProducts();
  }

  render() {
    console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        data={this.state.data}
        allData={e => console.log('ex')} // AllProducts from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

AllProducts.propTypes = {
  auth: PropTypes.object.isRequired,
  //products: PropTypes.object.isRequired
  //AllProducts: PropTypes.func.isRequired,
  //deleteClient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
   // products: state.products
  };
};

export default connect(
  mapStateToProps
  //{ AllProducts, deleteCage }
)(AllProducts);
