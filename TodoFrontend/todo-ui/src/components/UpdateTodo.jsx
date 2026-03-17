import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateTodo = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  const editData = yup.object().shape({
    name: yup.string().required().min(3).max(30),
    status: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editData),
  });

  useEffect(() => {
    fetchTodoById();
  }, []);

  const fetchTodoById = async () => {
    console.log("ID:", id);
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    try {
      const result = await axios.get(
        `http://localhost:3000/api/get-todo/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("RESULT:", result.data);
      if (result.data.success == true) {
        setValue("name", result.data.data.name);
        setValue("status", result.data.data.status);
      }
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const handleFormSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.put(
        `http://localhost:3000/api/update-todo/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (result.data.success == true) {
        Swal.fire({
          title: "Update Todo",
          text: result.data.message,
          icon: "success",
        });
        navigation("/view");
      } else {
        Swal.fire({
          title: "Update Todo",
          text: result.data.message,
          icon: "error",
        });
      }
    } catch (err) {
      console.log("SUBMIT ERROR:", err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="https://th.bing.com/th/id/OIP.ZwteA5Xb_XiffoQmqOrm5AHaGK?w=205&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
              alt="Edit Image"
              height={400}
              className="mt-4 rounded"
            />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <h2 className="text-center mt-5 text-warning">Edit Todo</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter Name"
                    className="form-control mt-3"
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                  <input
                    {...register("status")}
                    type="text"
                    placeholder="Enter Status"
                    className="form-control mt-3"
                  />
                  {errors.status && (
                    <p className="text-danger">{errors.status.message}</p>
                  )}
                  <button className="btn btn-warning d-block mx-auto mt-3 form-control mb-2">
                    Update
                  </button>
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

export default UpdateTodo;