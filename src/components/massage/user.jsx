import { useSelector } from "react-redux";

export default function Users() {
  const massage = useSelector((state) => state.massage);
  return (
    <>
      <div className={`flex items-center p-2 md:p-3`}>
        <img
          src={`https://avatar.iran.liara.run/username?username=${massage.salecteduser.username}`}
          alt=""
          className={`w-11 h-11 mr-4 md:w-14 md:h-14`}
        />
        <p className="text-white text-ellipsis md:text-xl">{massage.salecteduser.username}</p>
      </div>
    </>
  );
}
