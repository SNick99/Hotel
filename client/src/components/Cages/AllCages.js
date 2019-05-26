import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allCages,
  deleteCage,
  updateCage
} from '../../redux/actions/cagesActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';
import { validatorCage } from '../../validation/validatorModals';

const rows = ['id', 'Фирма', 'Модель', 'Тип', 'Цена', 'Количество'];

class AllCages extends Component {
  state = {
    idCage: '',
    data: this.props.cages
  };

  handleEdit = (e, item) => {
    this.setState({ idCage: item.id });
  };

  onSubmit = values => {
    values.id = this.state.idCage;
    this.props.updateCage(values);
  };

  handleDelete = item => {
    console.log(`Удалена клетка с id ${item}`);
    return this.props.deleteCage(item);
  };

  componentDidMount() {
    this.props.allCages();
  }

  render() {
    const sendData = [];
    this.props.cages.cages.map(item => {
      sendData.push({
        id: item.id,
        NameFirma: item.NameFirma,
        KindOfCage: item.KindOfCage,
        TypeOfCage: item.TypeOfCage,
        PriceOfDay: item.PriceOfDay,
        Amount: item.Amount
      });
      return null;
    });

    return (
      <TableContainer
        rows={rows}
        data={sendData}
        searchProp="NameFirma"
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={[
          { type: 'number', name: 'PriceOfDay', label: 'Стоимость/сутки' }
        ]}
        onSubmit={this.onSubmit}
        edit={true}
        delete={false}
        validatorModal={validatorCage}
      />
    );
  }
}

allCages.propTypes = {
  auth: PropTypes.object.isRequired,

  cages: PropTypes.object.isRequired,
  allCages: PropTypes.func.isRequired,
  deleteCage: PropTypes.func.isRequired,
  updateCage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cages: state.cages
  };
};

export default connect(
  mapStateToProps,
  { allCages, deleteCage, updateCage }
)(AllCages);
