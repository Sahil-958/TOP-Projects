import { useParams, useSearchParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";
import InfiniteScroll from "../components/InfiniteScroll.jsx";
import { Divider, Text, Loader } from "@mantine/core";

export default function CategoriesPage() {
  let { category } = useParams();
  let [searchParams] = useSearchParams();
  let limit = Number(searchParams.get("limit")) || 10;
  let delay = Number(searchParams.get("delay")) || 1000;
  let skip = Number(searchParams.get("skip")) || 0;
  let { data, error, loading } = useFetchProducts({
    url: `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&dealy=${delay}`,
  });

  function nextPageUrl() {
    let nextSkip = Math.min(skip + limit, data?.total - 1);
    return `?limit=${limit}&skip=${nextSkip}&delay=${delay}`;
  }
  function topDivider() {
    return (
      <Divider
        mb="md"
        label={
          <Text size="sm">
            <Text
              fw={700}
              tt={"capitalize"}
              size="md"
              span
              c="var(--mantine-primary-color-filled)"
            >
              {!loading && data?.total}
            </Text>
            {loading ? (
              <Loader
                color={"var(--mantine-primary-color-filled)"}
                type="dots"
              />
            ) : (
              ` Products found for Category: `
            )}
            <Text
              fw={700}
              tt={"capitalize"}
              size="md"
              span
              c="var(--mantine-primary-color-filled)"
            >
              {!loading && category}
            </Text>
          </Text>
        }
        labelPosition="center"
      />
    );
  }

  return (
    <>
      <InfiniteScroll
        isEnd={data?.total - skip == 1}
        nextPageUrlGenerator={nextPageUrl}
        topDivider={topDivider}
        error={error}
        query={category}
        clearDeps={[category]}
        data={data}
        loading={loading}
      />
    </>
  );
}
