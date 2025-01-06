import { useSearchParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts";
import InfiniteScroll from "../components/InfiniteScroll.jsx";

const SearchPage = () => {
  let [searchParams] = useSearchParams();
  let query = searchParams.get("q") || "";
  let limit = Number(searchParams.get("limit")) || 10;
  let delay = Number(searchParams.get("delay")) || 5000;
  let skip = Number(searchParams.get("skip")) || 0;
  let { data, error, loading } = useFetchProducts({
    url: `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}&delay=${delay}`,
    localRequest: false,
  });

  function nextPageUrl() {
    let nextSkip = Math.min(skip + limit, data?.total - 1);
    return `/search?q=${query}&limit=${limit}&skip=${nextSkip}&delay=${delay}`;
  };


  return (
    <>
      <InfiniteScroll nextPageUrlGenerator={nextPageUrl} error={error} query={query} clearDeps={[query]} data={data} loading={loading} />
    </>
  );
};

export default SearchPage;
