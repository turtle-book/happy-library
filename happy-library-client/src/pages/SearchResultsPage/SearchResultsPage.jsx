import axios from "axios";
import { useLocation } from "react-router-dom";

import BookInfo from "../../components/BookInfo"; 

function SearchResultsPage() {
  const location = useLocation();
  const bookInfo = location.state.data;

  return (
    <>
      {bookInfo.map((data) => {
        // const
        return (
          <BookInfo 
            id={data}
            title={data}
          />
        );
      })}
    </>
  );
}

export default SearchResultsPage;