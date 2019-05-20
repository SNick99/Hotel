import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormConteiner';
import { addCage } from '../../redux/actions/cagesActions';
class AddCage extends Component {
  constructor(props) {
    super(props);
    /* for what
    this.state = {
      KindOfCage: '',
      NameFirma: '',
      PriceOfDay: '',
      TypeOfCage: '',
      errors: {}
    };
*/
    this.headerForm = 'Новая клетка';
    this.submitLabel = 'Добавить';

    this.dataInput = [
      {
        type: 'text',
        name: 'KindOfCage',
        label: 'Название'
      },
      {
        type: 'text',
        name: 'NameFirma',
        label: 'Фирма'
      },
      {
        type: 'number',
        name: 'PriceOfDay',
        label: 'Стоимость/сутки'
      },

      {
        type: 'text',
        name: 'TypeOfCage',
        label: 'Тип'
      },
      {
        type: 'text',
        name: 'Amount',
        label: 'Количество'
      },
      {
        type: 'text',
        name: 'UnitPrice',
        label: 'купили за'
      }
    ];
  }

  onSubmit = values => {
    values.emoployeeId = this.props.auth.employee.id;
    this.props.addCage(values);
  };

  render() {
    return (
      <FormContainer
        onSubmit={this.onSubmit}
        dataInput={this.dataInput}
        headerForm={this.headerForm}
        submitLabel={this.submitLabel}
      />
    );
  }
}

AddCage.propTypes = {
  addCage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { addCage }
)(AddCage);
