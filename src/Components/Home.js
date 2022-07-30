import React from "react";
import { useAuth } from "../Context/AuthContex";
import {useNavigate} from 'react-router-dom';

const Home = () =>{
  const { logOut, user } = useAuth();
  const navigate = useNavigate()
  console.log(user);
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login')
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
        <p className="text-xl mb-4">Bienvenido! {user.displayName || user.email}</p>

        <button
          className="bg-slate-200 hover:bg-slate-300 hover:bg-red-700 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >Cerrar sesion
        </button>

      </div>
    </div>
  );
}

export default Home;