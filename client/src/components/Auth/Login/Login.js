import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginEmployee } from "../../../redux/actions/authActions";
import "./Login.css";
import ButtonSubmit from "../../Layout/ButtonSubmit/ButtonSubmit";
import Input from "../../Layout/Input/Input";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Phone: "",
      Password: "",
    };

    this.DataInput = [
      {
        type: "text",
        placeholder: "Телефон",
        name: "Phone",
      },

      {
        type: "password",
        placeholder: "Пароль",
        name: "Password",
      },
    ];

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let SendData = {
      Phone: this.state.Phone,
      Password: this.state.Password,
    };

    this.props.loginEmployee(SendData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/employee/current");
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      this.props.history.push("/employee/current");
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="title">
          <div className="title-first">Вход</div>
          <div className="title-two">управление отелем</div>
        </div>

        <form onSubmit={this.onSubmit}>
          {this.DataInput.map((item, index) => {
            return (
              <Input
                key={`key${index}`}
                type={item.type}
                placeholder={item.placeholder}
                name={item.name}
                value={this.state.name}
                onChange={this.onChange}
                className={classnames({
                  "is-invalid": errors[item.name],
                })}
                invalidFeedback={classnames({
                  "invalid-feedback": errors[item.name],
                })}
                errors={errors}
              />
            );
          })}

          <ButtonSubmit>Вход</ButtonSubmit>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};

export default connect(
  mapStateToProps,
  { loginEmployee }
)(Login);
