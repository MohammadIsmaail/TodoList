import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const ViewTodo = () => {
  const [data, setdata] = useState([]);
  const navigation=useNavigate()
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/api/get-todo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(result);
    if (result.data.success == true) {
      setdata(result?.data?.data);
    }
  };
  //   console.log(data[0]?.name,"efrdtfhyj")

  const handleDelete=async(id)=>{
    const token=localStorage.getItem("token")
     const result= await axios.delete(`http://localhost:3000/api/delete-todo/${id}`,{
        headers:{Authorization:`Bearer ${token}`}
    })

      if(result.data.success==true){
             Swal.fire({
              title:"Delete Todo",
              text:result.data.message,
              icon:"success",
            });
            fetchData()
        } 
        else{
            Swal.fire({
              title:"Delete Todo",
              text:result.data.message,
              icon:"error",
            });

        }
   
    // console.log(result)
  }


  const updateData=async(id)=>{
    // const token = localStorage.getItem("token")
    // const result=await axios.put(`http://localhost:3000/api/update-todo/${id}`,
    // data,   { headers:{Authorization:`Bearer ${token}`}}
    // )
    // console.log((id));
    navigation(`/update/${id}`)
    
  }
  
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <table className="table ">
            <thead className="table-dark">
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item,index) => {
                return (
                  <>
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                      <td>
                        <button className="btn btn-danger me-2" onClick={()=>handleDelete(item?._id)}>Del</button>
                        <button className="btn btn-warning " onClick={()=>{updateData(item?._id)}}>Edit</button>
                      </td>
                    </tr>
                  </>
                );
              })}
              
              {data?.length==0 && ( <p>Data Not Found</p>)}
            </tbody>
            
          </table>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default ViewTodo;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const ViewTodo = () => {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigate();

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     setLoading(true);
//     const tok = localStorage.getItem("token");
//     const result = await axios.get("http://localhost:3000/api/get-todo", {
//       headers: { Authorization: `Bearer ${tok}` },
//     });
//     if (result.data.success == true) {
//       setTodos(result.data.data);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     const tok = localStorage.getItem("token");
//     const result = await axios.delete(
//       `http://localhost:3000/api/delete-todo/${id}`,
//       {
//         headers: { Authorization: `Bearer ${tok}` },
//       }
//     );
//     if (result.data.success == true) {
//       Swal.fire({
//         title: "Delete Todo",
//         text: result.data.message,
//         icon: "success",
//       });
//       fetchTodos();
//     }
//   };

//   const handleEdit = (id) => {
//     navigation(`/edit/${id}`);
//   };

//   return (
//     <>
//       {loading && <p className="text-center mt-3">loading.......</p>}
//       <div className="container mt-4">
//         <h2 className="text-center text-success mb-4">View Todos</h2>
//         <div className="row">
//           {todos.length > 0 ? (
//             todos.map((todo, index) => (
//               <div key={todo._id} className="col-sm-4 mb-3">
//                 <div className="card shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title">
//                       #{index + 1} {todo.name}
//                     </h5>
//                     <p className="card-text">
//                       Status:{" "}
//                       <span className="badge bg-success">{todo.status}</span>
//                     </p>
//                     <button
//                       className="btn btn-warning btn-sm me-2"
//                       onClick={() => handleEdit(todo._id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(todo._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-muted">No Todos Found</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewTodo;
