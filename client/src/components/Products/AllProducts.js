import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allProducts } from '../../redux/actions/productsActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

const rows = ['id', 'Фирма', 'Название', 'Стоимость (продажа)', 'Количество'];

class AllProducts extends Component {
  state = {
    selected: '',
    data: this.props.products
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
    this.props.allProducts();
  }

  render() {
    const sendData = [];
    this.props.products.products.map(item => {
      sendData.push({
        id: item.id,
        NameFirma: item.NameFirma,
        NameOfProduct: item.NameOfProduct,
        PriceOfUnit: item.PriceOfUnit,
        Amount: item.Amount
      });
      return null;
    });

    return (
      <TableContainer
        rows={rows}
        searchProp="NameFirma"
        data={sendData}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.productInputs}
      />
    );
  }
}

AllProducts.propTypes = {
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  allProducts: PropTypes.func.isRequired
  //deleteClient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { allProducts }
)(AllProducts);
