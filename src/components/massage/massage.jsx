import { useDispatch, useSelector } from "react-redux";
import { getMassageThunk } from "../../redux/slice/massageSlice";
import { useEffect, useRef } from "react";
export default function Massage() {
  const dispatch = useDispatch();
  const massage = useSelector((state) => state.massage);
  const id = massage.salecteduser._id;
  useEffect(() => {
    dispatch(getMassageThunk(massage.salecteduser._id));
  }, [dispatch, massage.salecteduser._id]);
  const lastMessageRef = useRef(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [massage.massages]);
  return (
    <>
      <div className="overflow-x-scroll no-scrollbar">
        {massage.massages?.map((e, index) => {
          return (
            <>
              <div
                className={`flex flex-col p-1 ${
                  id !== e.senderId ? "items-end" : "items-start"
                }`}
                ref={
                  index == massage.massages.length - 1 ? lastMessageRef : null
                }
              >
                <div className="chat chat-start">
                  <div className="flex p-1.5  max-w-44 lg:max-w-44 rounded-md bg-slate-500 ">
                    <p className="text-slate-950 break-all md:text-2xl">
                      {e.message.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
