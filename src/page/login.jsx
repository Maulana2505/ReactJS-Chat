/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, setError,setToken } from "../redux/slice/authSlice";

export default function LoginPage() {

  const dispacth = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleOnchange = (e) => {
    dispacth(setError(""));
    const value = e.target.value;
    setLogin({
      ...login,
      [e.target.name]: value,
    });
  };

  const handlebutton = async (e) => {
    e.preventDefault();
    dispacth(loginThunk(login)).then((result) => {
      if (
        result.payload === "Invalid username" ||
        result.payload === "Invalid password"
      ) {
        console.log("nag men");
      } else {
        localStorage.setItem("token", result.payload.token);
        localStorage.setItem("id", result.payload.data._id);
        dispacth(setToken(result.payload.token))
      }
    });
  };
  return (
    <>
      <div
        className="mt-[35vh] container p-5 mx-auto flex flex-col bg-slate-500 w-[80%] justify-center 
      items-center rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[25%]"
      >
        <h1 className="text-white text-3xl font-mono mb-2">Login</h1>
        {auth.isError ? (
          <p className="text-red-600 mb-2">{auth.isError}</p>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={login.username}
          onChange={handleOnchange}
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={login.password}
          onChange={handleOnchange}
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <button
          onClick={handlebutton}
          className="w-[100%] mb-2 bg-cyan-950 p-2 text-white sm:p-3"
        >
          Login
        </button>
        <p className="text-sm">
          Don't Have Account?{" "}
          <a className="text-cyan-950 font-bold" href="/regis">
            Register
          </a>
        </p>
      </div>
    </>
  );
}
