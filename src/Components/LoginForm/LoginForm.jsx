import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function LoginForm(props) {
  const navigate = useNavigate();
  const formKosong = {
    username: "",
    password: "",
  };
  const formError = {
    username: "",
    password: "",
  };

  //init state
  const [form, setForm] = useState(formKosong);
  const [errMsg, setErrMsg] = useState(formError);

  //regex for validation
  const isEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
  const isNIK =
    /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/;

  //validation function
  const validateFormValue = (name, value) => {
    //validate username
    if (name === "username") {
      if (isEmail.test(value) || isNIK.test(value)) {
        setErrMsg({ ...formError, username: "" });
      }else{
          if(isNaN(value)){
            setErrMsg({ ...formError, username: "email salah" });
          }else{
            setErrMsg({ ...formError, username: "nik salah" });
          }
      }
    //validate password
    if (name === "password" && value !== "") {
      setErrMsg({ ...formError, password: "" });
    }
  }};

  const validateOnSubmit = () => {
    setErrMsg(() => {
      const errorMessageArr = Object.keys(errMsg).map((key) => {
        if (form[key] === "") {
          const err = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } tidak boleh kosong`;

          return { [key]: err };
        }
        return { [key]: "" };
      });
      const updatedErrorMessage = errorMessageArr.reduce(
        (previousValue, currentValue) => {
          return { ...previousValue, ...currentValue };
        },
        {}
      );
      return updatedErrorMessage;
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    validateFormValue(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validForm = Object.keys(form).filter(
      (key) => form[key] !== ""
    );

    if (validForm.length >= 2) {
      const newData = {
        username: form.username,
        password: form.password,
      };
      console.log(newData)
      //   dispatch(wasValidateData(newData));
      navigate("/profile");
    } else {
      validateOnSubmit();
    }
  };

  return (
    <div className="px-3">
      <form className="form needs-validation pt-5" onSubmit={handleSubmit}>
        <div className="mb-3 has-validation">
          <label htmlFor="username" className="form-label">
            Email atau NIK
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="username"
            placeholder="Masukkan email atau NIK"
          />
          <span className="error-msg">{errMsg.username}</span>
        </div>

        <div className="mb-3 has-validation">
          <label htmlFor="password" className="form-label">
            Kata sandi
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <span className="error-msg">{errMsg.password}</span>
        </div>
        <div className="form-group d-flex justify-content-between mb-3">
          <label className="form-remember">
            <input type="checkbox"/> Ingat saya
          </label><a className="form-recovery" href="/">Lupa password?</a>
        </div>
      </form>
      <div className="text-center btnact-container" style={{ borderTop: "1px solid #8f8d8d" }}>
        <button className="btn btn-primary w-100" type="submit">Login</button>
        <hr/>
        <p className="text-unregis">
          Belum terdaftar?
        </p>
        <button className="btn btn-outline-primary mb-3 w-100">Daftar sekarang</button>
      </div>
    </div>
  );
}

export default LoginForm;
