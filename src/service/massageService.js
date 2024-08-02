import axios from "axios";

const massageService = () => {
  const getUserMassage = async () => {
    const token = await localStorage.getItem("token");

    const res = await axios.get(`http://localhost:4000/messages/kedua`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res;
  };

  const getMassage = async (id) => {
    const token = await localStorage.getItem("token");
    const res = await axios.get(`http://localhost:4000/messages/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res;
  };

  const sendMassage = async ( id, message ) => {
    const iduser = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const msg = {
      senderId: iduser,
      receiverId: id,
      message: message,
    };
    console.log(msg)
    const res = await axios.post(
      `http://localhost:4000/messages/send/${id}`,
      msg,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  };

  return { getUserMassage, getMassage, sendMassage };
};

export default massageService;
