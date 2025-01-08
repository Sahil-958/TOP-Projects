import {
  Stack,
  Divider,
  Card,
  Avatar,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Group,
  Grid,
  Flex,
  ThemeIcon,
  ActionIcon,
  ScrollArea,
  Skeleton,
  Spoiler,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LuStar, LuPackagePlus } from "react-icons/lu";
import {
  TbTruckReturn,
  TbShieldCheck,
  TbWeight,
  TbPackage,
  TbCategory,
} from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { MdAddShoppingCart } from "react-icons/md";
import { LiaShippingFastSolid, LiaBoxesSolid } from "react-icons/lia";
import { useParams, useLocation } from "react-router";
import { useRef } from "react";
import { formatDistanceToNow } from "date-fns";
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
