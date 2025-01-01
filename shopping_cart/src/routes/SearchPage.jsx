import { useParams } from "react-router-dom";

export const SearchPage = () => {
  let searchValue = useParams();
  return <div>SearchPage {searchValue}</div>;
};

export default SearchPage;
