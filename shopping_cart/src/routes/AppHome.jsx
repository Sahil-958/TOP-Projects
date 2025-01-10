import { useSearchParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts";
import InfiniteScroll from "../components/InfiniteScroll.jsx";
import { Divider, Text, Loader } from "@mantine/core";

const AppHome = () => {
  let [searchParams] = useSearchParams();
  let limit = Number(searchParams.get("limit")) || 10;
  let delay = Number(searchParams.get("delay")) || 1000;
  let skip = Number(searchParams.get("skip")) || 0;
  let { data, error, loading } = useFetchProducts({
    url: `https://dummyjson.com/products?limit=${limit}&skip=${skip}&delay=${delay}`,
    localRequest: false,
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
              ` Products To Browse`
            )}
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
        query={""}
        clearDeps={[]}
        data={data}
        loading={loading}
      />
    </>
  );
};

export default AppHome;
