import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import Swal from "sweetalert2"

const UserLogin = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const navigation=useNavigate()
  useEffect(() => {
    
  }, []);
  const loginData = yup.object().shape({
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



  const handleFormSubmit = async(data) => {
    setLoginStatus(true)
     const result = await axios.post("http://localhost:3000/api/login",data);
    //  console.log(result)
    if(result.data.success==true){
         Swal.fire({
          title:"Register",
          text:result.data.message,
          icon:"success",
        })
        localStorage.setItem("token", result?.data?.token)
        reset()
        navigation("/create")
    } 
    else{
          Swal.fire({
          title:"Register",
          text:result.data.message,
          icon:"error",
        })
    }
    setLoginStatus(false)
        
    // console.log(data, "########");
    // reset();
  };

  return (
    <>
    {loginStatus  && <p>loading.......</p>}
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="data:image/webp;base64,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"
              alt="Login Image"
              height={400}
              className="mt-4 rounded"
            />
          </div>
          <div className="col-sm-6 a">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <h2 className="text-center mt-5 text-success">Login Form </h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email"
                    className="form-control mt-3"
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
                    Login
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
export default UserLogin;
