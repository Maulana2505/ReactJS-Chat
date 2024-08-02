import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk, setError } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function RegisPage() {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const [regis, setRegis] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const handleOnchange = (e) => {
    dispacth(setError(""));
    const value = e.target.value;
    setRegis({
      ...regis,
      [e.target.name]: value,
    });
  };

  const handlebutton = async (e) => {
    e.preventDefault();
    dispacth(registerThunk(regis)).then((result) => {
      if (
        result.payload === "Username Already Exists" ||
        result.payload === "Password Don't match"
      ) {
        console.log("nag men");
      } else {
        navigate(-1);
      }
    });
  };
  return (
    <>
      <div
        className="mt-[35vh] container p-5 mx-auto flex flex-col bg-slate-500 w-[80%] justify-center 
      items-center rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[25%]"
      >
        <h1 className="text-white text-3xl font-mono mb-2">Regis</h1>
        {auth.isError ? (
          <p className="text-red-600 mb-2">{auth.isError}</p>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={regis.username}
          onChange={handleOnchange}
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={regis.password}
          onChange={handleOnchange}
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          value={regis.confirmpassword}
          onChange={handleOnchange}
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <select
          className="w-[100%] mb-2 bg-transparent border border-slate-600 text-center"
          value={regis.gender}
          name="gender"
          onChange={handleOnchange}
        >
          <option> Select...</option>
          <option> Male</option>
          <option> Female</option>
        </select>
        <button
          className="w-[100%] mb-2 bg-cyan-950 p-2 text-white sm:p-3"
          onClick={handlebutton}
        >
          {}
          Regis
        </button>
        <p className="text-sm">
          Have Account?{" "}
          <a className="text-cyan-950 font-bold" href="/login">
            Login
          </a>
        </p>
        <h1>{}</h1>
      </div>
    </>
  );
}
