import './App.css';
import {Employee} from "./Employee";
import {Department} from "./Department";
import {BrowserRouter,Route,Routes,NavLink} from "react-router-dom";
 

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
          <h3 className="d-flex justify-content-center m-3">NTG Test</h3>

          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item m-l">
                <NavLink className="btn btn-light btn-outline-primary" to="/department"> 
                  Department
                </NavLink>
              </li>
              <li className="nav-item m-l">
                <NavLink className="btn btn-light btn-outline-primary" to="/employee"> 
                  Employee
                </NavLink>
              </li>
            </ul>
            <Routes>
              <Route path="/department"  element={<Department />} ></Route>
              <Route path="/employee" element={<Employee />}   ></Route>
            </Routes>
            </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
