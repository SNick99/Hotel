import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allProducts,
  updateProduct,
  deleteProduct
} from '../../redux/actions/productsActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';
import { validatorProduct } from '../../validation/validatorModals';
const rows = ['id', 'Фирма', 'Название', 'Цена', 'Количество'];

class AllProducts extends Component {
  state = {
    idProduct: '',
    data: this.props.products
  };

  handleEdit = (e, item) => {
    this.setState({ idProduct: item.id });
  };

  handleDelete = item => {
    console.log(`Удален клиент с id ${item}`);
    this.props.deleteProduct(item);
  };
  onSubmit = values => {
    values.id = this.state.idProduct;
    this.props.updateProduct(values);
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
        modalInputs={[
          { type: 'number', name: 'PriceOfUnit', label: 'Продажа' }
        ]}
        onSubmit={this.onSubmit}
        edit={true}
        delete={false}
        validatorModal={validatorProduct}
      />
    );
  }
}

AllProducts.propTypes = {
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  allProducts: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { allProducts, updateProduct, deleteProduct }
)(AllProducts);
