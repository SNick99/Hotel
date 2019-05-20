import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllProducts,
  deleteCage
} from '../../redux/actions/productsActions';*/
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

let test = [
  {
    Название: '111',
    NameFirma: '111',
    'Стоимость (продажа)': '111',
    'Стоимость (покупка)': '111',
    Имя: '111',
    Фамилия: '111',
    Phone: '111'
  },
  {
    Название: '222',
    NameFirma: '222',
    'Стоимость (продажа)': '222',
    'Стоимость (покупка)': '222',
    Имя: '222',
    Фамилия: '222',
    Phone: '222'
  }
];

const rows = [
  'Название',
  'Фирма',
  'Стоимость (продажа)',
  'Стоимость (покупка)',
  'Имя',
  'Фамилия',
  'Телефон'
];

class AllProducts extends Component {
  state = {
    selected: '',
    data: test //this.props.products
  };

  handleEdit = (e, item) => {
    console.log(item); // delete after dev
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
        searchProp="NameFirma"
        data={this.state.data}
        allData={e => console.log('ex')} // AllProducts from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.productInputs}
      />
    );
  }
}

AllProducts.propTypes = {
  auth: PropTypes.object.isRequired
  //products: PropTypes.object.isRequired
  //AllProducts: PropTypes.func.isRequired,
  //deleteClient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
    // products: state.products
  };
};

export default connect(
  mapStateToProps
  //{ AllProducts, deleteCage }
)(AllProducts);
