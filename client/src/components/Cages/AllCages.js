import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  allCages,
  deleteCage
} from '../../redux/actions/cagesActions';*/
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

let test = [
  {
    Название: '111',
    NameFirma: '111',
    Тип: '111',
    Вид: '111',
    Цена: '111'
  },
  {
    Название: '222',
    NameFirma: '222',
    Тип: '222',
    Вид: '222',
    Цена: '222'
  }
];

const rows = ['Название', 'Фирма', 'Тип', 'Вид', 'Цена'];

class allCages extends Component {
  state = {
    selected: '',
    data: test //this.props.cages
  };

  handleEdit = (e,item) => {
    console.log(item); // delete after dev
    this.setState({ selected: item });
  };

  handleDelete = item => {
    console.log(`Удалена клетка с id ${item}`);
    // return this.props.deleteCage(item);
  };

  componentDidMount() {
    // this.props.allCages();
  }

  render() {
    console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        searchProp="NameFirma" 
        data={this.state.data}
        allData={e => console.log('ex')} // allCages from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.cageInputs}
      />
    );
  }
}

allCages.propTypes = {
  auth: PropTypes.object.isRequired,
  //cages: PropTypes.object.isRequired
  //allCages: PropTypes.func.isRequired,
  //deleteCage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    //cages: state.cages
  };
};

export default connect(
  mapStateToProps
  //{ allCages, deleteCage }
)(allCages);
