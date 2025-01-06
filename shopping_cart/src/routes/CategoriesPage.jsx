import { useParams, useSearchParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";
import InfiniteScroll from "../components/InfiniteScroll.jsx";

export default function CategoriesPage() {
  let { category } = useParams();
  let [searchParams] = useSearchParams();
  let limit = Number(searchParams.get("limit")) || 10;
  let delay = Number(searchParams.get("delay")) || 5000;
  let skip = Number(searchParams.get("skip")) || 0;
  let { data, error, loading } = useFetchProducts({
    url: `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&dealy=${delay}`,
  });

  function nextPageUrl() {
    let nextSkip = Math.min(skip + limit, data?.total - 1);
    return `/categories/${category}?limit=${limit}&skip=${nextSkip}&delay=${delay}`;
  }

  return (
    <>
      <InfiniteScroll nextPageUrlGenerator={nextPageUrl} error={error} query={category} clearDeps={[category]} data={data} loading={loading} />
    </>
  );
};

