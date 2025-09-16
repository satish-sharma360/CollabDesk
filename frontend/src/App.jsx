import React, { Children } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navigation from "./components/shared/navigation/Navigation";
import Authenticate from "./Pages/Authenticate";
import Activate from "./Pages/Activate";
import Rooms from "./Pages/Rooms";
import { useSelector } from "react-redux";


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
  const {isAuth} = useSelector((state) => state.auth)
  return isAuth ? <Navigate to="/rooms" replace /> : children;
};
const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  // If not authenticated, redirect to home
  if (!isAuth) return <Navigate to="/" replace />;

  // If authenticated but not activated, allow
  if (isAuth && user && !user.activated) return children;

  // If authenticated and activated, redirect to rooms
  return <Navigate to="/rooms" replace />;
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

  // If not authenticated, redirect to home
  if (!isAuth) return <Navigate to="/" replace />;

  // If authenticated but not activated, redirect to activate
  if (isAuth && user && !user.activated) return <Navigate to="/activate" replace />;

  // Authenticated and activated, allow access
  return children;
};

export default App;
