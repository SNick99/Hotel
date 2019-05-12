import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import ButtonSubmit from "../../Layout/ButtonSubmit/ButtonSubmit";
import Input from "../../Layout/Input/Input";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Phone: "",
      Password: "",

      errors: {},
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
        name: "password",
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

    axios
      .post("/employee/login", SendData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  render() {
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
              />
            );
          })}

          <ButtonSubmit>Вход</ButtonSubmit>
        </form>
      </div>
    );
  }
}

export default Login;
