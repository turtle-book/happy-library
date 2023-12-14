import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchWord(event.target.value);
  }

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search`, {
        params: {
          searchWord: searchWord
        }
      });
      navigate(`/search?query=${searchWord}`, { state: { data: response } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <Link to="/login">로그인</Link>
        <input type="text" />
      </div>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchWord} onChange={handleChange} />
        <button>검색</button>
      </form>
    </>
  );
}

export default HomePage;