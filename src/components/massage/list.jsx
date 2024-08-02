/* eslint-disable react/prop-types */
import Massage from "./massageContainer";
import Users from "./user";
import Field from "./fieldContainer";

import { useSelector } from "react-redux";
export default function List() {
  const massage = useSelector((state) => state.massage);
  return (
    <>
      {massage.salecteduser.username != null ? (
        <div
          className={`flex lg:fixed flex-col right-0 h-screen ml-11 w-[75%] lg:w-[60%] lg:h-[70%] lg:right-[15%] `}
        >
          <Users />
          <Massage />
          <Field />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
