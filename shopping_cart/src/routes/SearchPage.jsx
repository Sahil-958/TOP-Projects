import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";
import { Grid, Text, ScrollArea, Divider, Loader } from "@mantine/core";
import ProductCard from "../components/ProductCard.jsx";
import SkeletonProductCard from "../components/SkeletonProductCard.jsx";

const SearchPage = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let query = searchParams.get("q") || "";
  let limit = Number(searchParams.get("limit")) || 10;
  let delay = Number(searchParams.get("delay")) || 5000;
  let skip = Number(searchParams.get("skip")) || 0;
  let url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}&delay=${delay}`;
  let { data, error, loading } = useFetchProducts(url, true);

  const [productsMap, setProductsMap] = useState(new Map());
  useEffect(() => {
    productsMap.clear();
  }, [query]);

  useEffect(() => {
    if (data?.products) {
      setProductsMap((prev) => {
        const newMap = new Map(prev); // Clone existing map
        data.products.forEach((product) => {
          if (!newMap.has(product.id)) {
            newMap.set(product.id, product); // Add unique products
          }
        });
        return newMap;
      });
    }
  }, [data]);

  const products = Array.from(productsMap.values()); // Convert Map to Array for rendering

  const fetchNextPage = () => {
    if (loading) return;
    let upSkip =
      skip + limit >= data?.total
        ? skip + (data?.total - skip - 1)
        : skip + limit;
    console.log("Fetching next page...", skip, upSkip, data?.total);
    navigate(
      `/search?q=${query}&limit=${limit}&skip=${upSkip}&delay=${delay}`,
      { replace: true },
    );
  };
  return (
    <>
      <ScrollArea
        offsetScrollbars="y"
        p={"md"}
        styles={{
          root: {
            height: "calc(100vh - var(--app-shell-header-height))",
          },
        }}
        onBottomReached={fetchNextPage}
      >
        <Divider
          mb="md"
          label=<Text size="sm">
            <Text
              fw={700}
              tt={"capitalize"}
              size="md"
              span
              c="var(--mantine-primary-color-filled)"
            >
              {!loading && data.total}
            </Text>
            {loading ? (
              <Loader
                color={"var(--mantine-primary-color-filled)"}
                type="dots"
              />
            ) : (
              ` Products found for Term: `
            )}
            <Text
              fw={700}
              tt={"capitalize"}
              size="md"
              span
              c="var(--mantine-primary-color-filled)"
            >
              {!loading && query}
            </Text>
          </Text>
          labelPosition="center"
        />
        <Grid grow>
          {products?.map((product) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
          {loading &&
            Array.from(
              { length: data?.total > 10 ? 10 : data?.total || 10 },
              (_, i) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={i}>
                  <SkeletonProductCard key={i} />
                </Grid.Col>
              ),
            )}
        </Grid>
        {!loading && data?.total - skip - 1 == 0 && (
          <Divider mt="md" label={"No more Products"} labelPosition="center" />
        )}
      </ScrollArea>
    </>
  );
};

export default SearchPage;
