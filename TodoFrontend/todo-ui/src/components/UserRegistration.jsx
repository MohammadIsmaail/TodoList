import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserRegistration = () => {
  const navigate = useNavigate(false);
  const [loading, setloading] = useState(false);
  const loginData = yup.object().shape({
    name: yup.string().required().min(3).max(15),
    email: yup.string().required().email().min(10).max(30),
    password: yup.string().required().min(8).max(20),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginData),
  });

  const handleFormSubmit = async (data) => {
    setloading(true);
    const result = await axios.post("http://localhost:3000/api/register", data);
    //  console.log(result)
    if (result.data.success == true) {
      Swal.fire({
        title: "Register",
        text: result.data.message,
        icon: "success",
      });
      reset();
      navigate("/")
    } else {
      Swal.fire({
        title: "Register",
        text: result.data.message,
        icon: "error",
      });
    }

    setloading(false);

    //  reset()
    //  navigate("/")
  };

  return (
    <>
      {loading && <p>loading.......</p>}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="data:image/webp;base64,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"
              alt="Login Image"
              height={400}
              className="mt-4 rounded image-fliud"
            />
          </div>
          <div className="col-sm-6 a">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <h2 className="text-center mt-5 text-success">
                  Registration Form{" "}
                </h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter Your Name"
                    className="form-control mt-3"
                  />
                  {errors.name && (
                    <p className=" text-danger"> {errors.name.message}</p>
                  )}
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email"
                    className="form-control mt-3"
                    autoComplete="off"
                  />
                  {errors.email && (
                    <p className=" text-danger"> {errors.email.message}</p>
                  )}
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter Your password"
                    className="form-control mt-3"
                  />
                  {errors.password && (
                    <p className=" text-danger"> {errors.password.message}</p>
                  )}
                  <button className="btn btn-success d-block mx-auto mt-3 form-control mb-2">
                    Register
                  </button>
                  <div>
                    You are already account{" "}
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Please Login
                    </Link>{" "}
                  </div>
                </form>
              </div>
              <div className="col-sm-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
