import React, { Children } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navigation from "./components/shared/navigation/Navigation";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Authenticate from "./Pages/Authenticate";
import Activate from "./Pages/Activate";
import Rooms from "./Pages/Rooms";

const isAuth = false;
const User ={
  activate:false
}

const App = () => {
  return (
    <div className="bg-zinc-900 h-screen w-full text-white">
      <div className="w-11/12 h-screen mx-auto">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
          />
          <Route
            path="/authenticate"
            element={
              <GuestRoute>
                <Authenticate />
              </GuestRoute>
            }
          />

          <Route 
          path='/activate'
          element={
            <SemiProtectedRoute>
              <Activate/>
            </SemiProtectedRoute>
          }
          />

          <Route 
          path='/rooms'
          element={
            <ProtectedRoute>
              <Rooms/>
            </ProtectedRoute>
          }
          />
        </Routes>
      </div>
    </div>
  );
};

const GuestRoute = ({ children }) => {
  return isAuth ? <Navigate to="/rooms" replace /> : children;
};
const SemiProtectedRoute = ({ children }) => {
  return !isAuth ? 
  (<Navigate to="/" replace />)
  :isAuth && !User.activate?(children) 
  : (<Navigate to="/rooms" replace />) ;
};
const ProtectedRoute = ({ children }) => {
  return !isAuth ? (<Navigate to="/" replace />)
  :isAuth && !User.activate?(<Navigate to="/activate" replace />) 
  : (children) ;
};

export default App;
