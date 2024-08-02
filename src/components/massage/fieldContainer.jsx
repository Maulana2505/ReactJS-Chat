import { useDispatch, useSelector } from "react-redux";
import { sendMassageThunk} from "../../redux/slice/massageSlice";
import { useState } from "react";
export default function Field() {
  const dispatch = useDispatch();
  const massage = useSelector((state) => state.massage);
  const [message, setMessage] = useState("");
  const id = massage.salecteduser._id;
  
  const handleSubmit = (e) => {
    setMessage("")
    e.preventDefault();
    console.log(message)
    dispatch(sendMassageThunk({id, message}));
  };
  return (
    <>
      <div className="p-2 flex justify-around">
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-[80%] text-white bg-slate-600 border-none p-3 focus:border-none rounded-md mr-3  md:text-2xl"
        />
        <button className="bg-teal-400 p-3 rounded-full md:p-5" onClick={handleSubmit}>
          S
        </button>
      </div>
    </>
  );
}
