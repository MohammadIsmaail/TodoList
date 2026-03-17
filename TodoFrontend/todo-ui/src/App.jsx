import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserLogin from "./components/UserLogin.jsx"
import UserRegistration from "./components/UserRegistration.jsx";
import Navbar from "./components/Navbar.jsx"
// import Todo from "./components/Todo.jsx";
import CreateTodo from "./components/CreateTodo.jsx"
import ViewTodo from "./components/ViewTodo.jsx"
import UpdateTodo from "./components/UpdateTodo.jsx"
function App(){
  return(
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/create" element={< CreateTodo />} />
        <Route path="/view" element={<ViewTodo/>} />
        <Route path="/update/:id" element={<UpdateTodo/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App;