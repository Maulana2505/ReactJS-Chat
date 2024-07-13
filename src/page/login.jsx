/* eslint-disable react/no-unescaped-entities */
export default function LoginPage() {
  return (
    <>
      <div
        className="mt-[35vh] container p-5 mx-auto flex flex-col bg-slate-500 w-[80%] justify-center 
      items-center rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[25%]"
      >
        <h1 className="text-white text-3xl font-mono mb-2">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[100%] text-white bg-slate-600 border-none p-2 mb-2 focus:border-none sm:p-3"
        />
        <button className="w-[100%] mb-2 bg-cyan-950 p-2 text-white sm:p-3">
          Login
        </button>
        <p className="text-sm">
          Don't Have Account?{" "}
          <a className="text-cyan-950 font-bold">Register</a>
        </p>
      </div>
    </>
  );
}
