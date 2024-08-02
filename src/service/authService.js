import axios from "axios";

const AuthService = () => {
  const register = async ({ username, password, confirmpassword, gender }) => {
    const user = {
      username: username,
      password: password,
      confirmpassword: confirmpassword,
      gender: gender,
    };
    const res = await axios.post("http://localhost:4000/signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const login = async ({username, password}) => {
    const user = {
      username: username,
      password: password,
    };
    const res = await axios.post(
      "http://localhost:4000/login",
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  };
  return { register, login };
};

export default AuthService;
