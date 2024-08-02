import axios from "axios";
// "http://localhost:4000/user/"+query
// `http://localhost:4000/user/${query}`
const SearchService = () => {
  const search = async (query) => {
    const token = await localStorage.getItem("token");
    const res = await axios.get(`http://localhost:4000/user/${query}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res.data.map(e=>console.log(e._id))
    return res;
  };
  return { search };
};

export default SearchService;
