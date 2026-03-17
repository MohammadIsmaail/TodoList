import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateTodo = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const navigation = useNavigate();

  const loginData = yup.object().shape({
    name: yup.string().required().min(3).max(30),
    status: yup.string().required(),
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
    setLoginStatus(true);
    const tok = localStorage.getItem("token");
    const result = await axios.post(
      "http://localhost:3000/api/create-todo",
      data,
      {
        headers: { Authorization: `Bearer ${tok}` },
      },
    );
    // console.log(result,"$$$$$$$$$")

    if (result.data.success == true) {
      Swal.fire({
        title: "Create Todo",
        text: result.data.message,
        icon: "success",
      });
      navigation("/view")
    } else {
      Swal.fire({
        title: "Register",
        text: result.data.message,
        icon: "error",
      });
    }
    setLoginStatus(false);

    // console.log(data, "########");
    // reset();
  };

  return (
    <>
      {loginStatus && <p>loading.......</p>}
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="https://th.bing.com/th/id/OIP.ZwteA5Xb_XiffoQmqOrm5AHaGK?w=205&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
              alt="Login Image"
              height={400}
              className="mt-4 rounded"
            />
          </div>
          <div className="col-sm-6 a">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <h2 className="text-center mt-5 text-success">Create Todo </h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter Your name"
                    className="form-control mt-3"
                  />
                  {errors.name && (
                    <p className=" text-danger"> {errors.name.message}</p>
                  )}
                  <input
                    {...register("status")}
                    type="text"
                    placeholder="Enter Your status"
                    className="form-control mt-3"
                  />
                  {errors.status && (
                    <p className=" text-danger"> {errors.status.message}</p>
                  )}
                  <button className="btn btn-success d-block mx-auto mt-3 form-control mb-2">
                    Create
                  </button>
                  <div>
                    You Have not account{" "}
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      Please Register
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
export default CreateTodo;
