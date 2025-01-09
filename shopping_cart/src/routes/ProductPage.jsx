import { Stack, Divider, ScrollArea, Skeleton } from "@mantine/core";
import { useParams, useLocation } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductDetailed from "../components/ProductDetailed.jsx";

export default function ProductPage() {
  let { id } = useParams();
  const location = useLocation();
  let product, data, loading, error;
  if (location?.state?.product) {
    product = location.state.product;
    loading = false;
    error = null;
  } else {
    console.log("Fetching product from API");
    ({ data, loading, error } = useFetchProducts({
      url: `https://dummyjson.com/products/${id}?delay=5000`,
    }));
    product = data;
  }

  if (loading) {
    return (
      <>
        <ScrollArea
          offsetScrollbars="y"
          pr={10}
          styles={{
            root: {
              height: "calc(100vh - var(--app-shell-header-height))",
            },
          }}
        >
          <Stack>
            <Skeleton height={400} />
            <Divider />
            <Skeleton height={150} />
            <Divider />
            <Skeleton height={180} />
            <Skeleton height={180} />
            <Skeleton height={180} />
            <Divider mb="lg" label={"End of Reviews"} />
          </Stack>
        </ScrollArea>
      </>
    );
  }

  return (
    <ScrollArea
      offsetScrollbars="y"
      pr={10}
      styles={{
        root: {
          height: "calc(100vh - var(--app-shell-header-height))",
        },
      }}
    >
      <ProductDetailed product={product} key={id} />
    </ScrollArea>
  );
}
