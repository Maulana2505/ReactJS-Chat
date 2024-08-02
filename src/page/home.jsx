import List from "../components/massage/list";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { setOnlineUser, setSocket } from "../redux/slice/socketSlice";
import { io } from "socket.io-client";
import { getUserMassageThunk, setMessage} from "../redux/slice/massageSlice";
export default function HomePage() {
  const dispatch = useDispatch();
  const iduser = localStorage.getItem("id");


  const [opendrawer, isOpendrawer] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      query: { userId: iduser },
      transports: ["websocket"],
    });
    dispatch(setSocket(socket))
    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUser(users));
    });
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessage(newMessage));
      dispatch(getUserMassageThunk());
      console.log("useEffect newMessage Execute!");
    });
    socket?.on("newMessage2", () => {
      
      dispatch(getUserMassageThunk());
    });
    return () => socket.close();
  }, [dispatch, iduser]);


  return (
    <>
      <div className="h-screen flex justify-center items-center  ">
        <Sidebar od={opendrawer} iod={isOpendrawer} />
        <List od={opendrawer} />
      </div>
    </>
  );
}
