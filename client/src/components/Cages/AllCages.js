import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allCages, deleteCage } from '../../redux/actions/cagesActions';
import TableContainer from '../../services/TableContainer';

// let test = [
//   {
//     Название: '111',
//     Фирма: '111',
//     Тип: '111',
//     Вид: '111',
//     Цена: '111'
//   },
//   {
//     Название: '222',
//     Фирма: '222',
//     Тип: '222',
//     Вид: '222',
//     Цена: '222'
//   }
// ];

const rows = ['id', 'Фирма', 'Вид', 'Тип', 'Цена', 'Количество'];

class AllCages extends Component {
  state = {
    selected: '',
    data: this.props.cages
  };

  handleEdit = item => {
    console.log('to edit: ' + item.FirstName);
    this.setState({ selected: item });
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
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

allCages.propTypes = {
  auth: PropTypes.object.isRequired,
  cages: PropTypes.object.isRequired,
  allCages: PropTypes.func.isRequired,
  deleteCage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cages: state.cages
  };
};

export default connect(
  mapStateToProps,
  { allCages, deleteCage }
)(AllCages);
