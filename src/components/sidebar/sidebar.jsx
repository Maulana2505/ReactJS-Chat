/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchThunk, setQuerry } from "../.././redux/slice/searchSlice";
import {
  getUserMassageThunk,
  setSelected,
  removeAllData
} from "../../redux/slice/massageSlice";
import { setToken } from "../../redux/slice/authSlice";
export default function Sidebar(props) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const massage = useSelector((state) => state.massage);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(searchThunk(query.toString()));
    }
    if (query.trim() === "") {
      dispatch(setQuerry(null));
    }
  }, [query, dispatch]);

  useEffect(() => {
    dispatch(getUserMassageThunk());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        props.iod(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props]);

  const removelocaldata = () => {
    dispatch(removeAllData([]))
    dispatch(setToken(null));
    localStorage.clear();
  };
  return (
    <>
      <div
        className={`fixed h-screen ${
          props.od
            ? "w-screen duration-300 ease-in p-2"
            : "w-[15%] items-center"
        }  left-0 flex flex-col  bg-slate-500 lg:w-[15%] lg:h-[75%] lg:left-[10%] lg: rounded-md `}
      >
        <div className="mb-3 flex items-center justify-between md:p-3 lg:md:p-0 ">
          <p
            className={`text-4xl ${
              props.od ? "block" : " hidden"
            } lg:text-center  w-screen`}
          >
            Logo
          </p>
          <button onClick={() => props.iod(!props.od)}>
            <p className="text-4xl lg:hidden">{props.od ? "X" : ">"}</p>
          </button>
        </div>
        <div className={`flex mb-3 ${props.od ? "visible" : "hidden"}`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`outline-none border border-slate-700 p-2 
              mx-auto items-center bg-transparent rounded-md md:w-[80%]
          `}
          />
        </div>
        <div className="max-h-[80%] overflow-y-scroll no-scrollbar ">
          {search.data !== null ? (
            search.data.map((e) => {
              return (
                <div
                  className={`flex items-center p-3 mb-2 rounded-md left-0 ${
                    e._id === massage.salecteduser._id
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                  key={e._id}
                  onClick={() => {
                    dispatch(setSelected(e));
                    props.iod(false);
                  }}
                >
                  <img
                    src={`https://avatar.iran.liara.run/username?username=${e.username}`}
                    alt=""
                    className={`${
                      props.od
                        ? "w-11 h-11 mr-4 md:w-14 md:h-14 lg:w-10 lg:h-10"
                        : "w-10 h-10 md:w-14 md:h-14"
                    }`}
                  />
                  <div
                    className={`flex items-center ${
                      props.od ? "visible" : "hidden"
                    }`}
                  >
                    <div>
                      <p className="md:text-xl">{e.username}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : massage.user && massage.user.length ? (
            massage.user.map((e) => {
              return e.participants.map((x) => {
                return (
                  <div
                    className={`flex items-center p-2 rounded-md no-scrollbar ${
                      x._id == massage.salecteduser._id
                        ? "bg-white overflow-hidden "
                        : "bg-transparent"
                    } `}
                    key={x._id}
                    onClick={() => {
                      dispatch(setSelected(x));
                      if (window.innerWidth >= 1024) {
                        props.iod(true);
                      } else {
                        props.iod(false);
                      }
                    }}
                  >
                    <img
                      src={`https://avatar.iran.liara.run/username?username=${x.username}`}
                      alt=""
                      className={`${
                        props.od
                          ? "w-11 h-11 mr-4 md:w-14 md:h-14 lg:w-10 lg:h-10"
                          : "w-10 h-10 md:w-14 md:h-14 lg:w-10 lg:h-10"
                      }`}
                    />
                    <div
                      className={`flex items-center ${
                        props.od ? "visible" : "hidden"
                      }`}
                    >
                      <div>
                        <p className="md:text-xl">{x.username}</p>
                        <p className="md:text-xl text-ellipsis">
                          {e.msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              });
            })
          ) : (
            <p>Data Kosong</p>
          )}
        </div>

        <div className="absolute bottom-8 ">
          <button
            className="w-auto mb-2 p-4 bg-cyan-950  text-white rounded-md "
            onClick={removelocaldata}
          >
            T
          </button>
        </div>
      </div>
    </>
  );
}
