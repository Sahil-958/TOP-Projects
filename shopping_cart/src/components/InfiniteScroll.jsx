import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Grid, Text, ScrollArea, Divider, Loader } from "@mantine/core";
import ProductCard from "../components/ProductCard.jsx";
import SkeletonProductCard from "../components/SkeletonProductCard.jsx";

export default function InfiniteScroll({
  clearDeps = [],
  query,
  data,
  loading,
  isEnd,
  nextPageUrlGenerator,
  error,
}) {
  const [productsMap, setProductsMap] = useState(new Map());

  useEffect(() => {
    productsMap.clear();
    console.log("clear");
  }, clearDeps);

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
    console.log("map");
  }, [data]);
  const products = Array.from(productsMap.values());

  const navigate = useNavigate();
  const fetchNextPage = () => {
    if (loading) return;
    console.log("fetch next page");
    navigate(nextPageUrlGenerator(), { replace: true });
  };
  return (
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
            {!loading && data?.total}
          </Text>
          {loading ? (
            <Loader color={"var(--mantine-primary-color-filled)"} type="dots" />
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
      {!loading && isEnd && (
        <Divider
          mt="md"
          mb={"md"}
          label={"No more Products"}
          labelPosition="center"
        />
      )}
    </ScrollArea>
  );
}
