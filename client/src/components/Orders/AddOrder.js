import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';
import { parseItem } from './orderSelection';
import { validatorOrder } from '../../validation/validators';
import { addOrder, allForOrder } from '../../redux/actions/ordersActions';

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        Employee: [],
        Client: [],
        Pet: [],
        Product: [],
        Cage: []
      }
    };
    this.headerForm = 'Новый заказ';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.orderInputs;
  }

  onSubmit = values => {
    const sendData = {
      EndDate: values.EndDate,
      employeeId: values.Employee.split('\u00A0')[0],
      clientId: values.Client.split('\u00A0')[0],
      petId: values.Pet.split('\u00A0')[0],
      productId: values.Product.split('\u00A0')[0],
      cageId: values.Cage.split('\u00A0')[0],
      service: values.Extra,
      price: values.ExtraPrice
    };
    this.props.addOrder(sendData);
    console.log(sendData);
  };

  componentDidMount() {
    this.props.allForOrder().then(() => {
      this.setState({ info: this.props.info });
    });
  }

  render() {
    console.log('INFOOOOOOOOO', this.props.info);
    return (
      <React.Fragment>
        {this.state.info.Pet !== undefined &&
        this.state.info.Client !== undefined &&
        this.state.info.Employee !== undefined &&
        this.state.info.Cage !== undefined &&
        this.state.info.Product !== undefined ? (
          <FormContainer
            onSubmit={this.onSubmit}
            dataInput={this.dataInput}
            headerForm={this.headerForm}
            submitLabel={this.submitLabel}
            validator={validatorOrder}
            forSelectConfig={this.state.info}
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

AddOrder.propTypes = {
  addOrder: PropTypes.func.isRequired,
  allForOrder: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth,
    info: state.orders.info,
    error: state.orders.error
  };
};

export default connect(
  mapStateToProps,
  { addOrder, allForOrder }
)(AddOrder);
