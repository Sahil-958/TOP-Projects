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
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { LuStar, LuPackagePlus } from "react-icons/lu";
import { TbTruckReturn, TbShieldCheck, TbWeight, TbPackage, TbCategory } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { MdAddShoppingCart } from "react-icons/md";
import { LiaShippingFastSolid, LiaBoxesSolid } from "react-icons/lia";
import { useParams, useLocation } from "react-router";
import { useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { useFetchProducts } from "../hooks/useFetchProducts";

export default function ProductPage() {
  let { id } = useParams();
  const location = useLocation();
  let product, data, loading, error;
  if (location?.state?.product) {
    product = location.state.product;
    loading = false;
    error = null;
  } else {
    ({ data, loading, error } = useFetchProducts({
      url: `https://dummyjson.com/products/${id}?delay=5000`
    }
    ))
    product = data;
  }
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  let productInfo = [
    { icon: TbTruckReturn, text: loading || product.returnPolicy, color: "blue" },
    { icon: TbShieldCheck, text: loading || product.warrantyInformation, color: "green" },
    { icon: LiaShippingFastSolid, text: loading || product.shippingInformation, color: "teal" },
    {
      icon: TbPackage,
      text: loading || `Minimum Order: ${product.minimumOrderQuantity}`,
      color: "violet"
    },
    {
      icon: TbCategory,
      text: loading || `${product.category}`,
      color: "cyan"
    },
    { icon: LiaBoxesSolid, text: loading || `In Stock: ${product.stock}`, color: "red" },
    { icon: TbWeight, text: loading || `${product.weight}`, color: "orange" },
    {
      icon: RxDimensions,
      text: loading || `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`,
      color: "grape"
    },

  ];

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
      <Stack>
        <Skeleton h={300} visible={loading}>
          <Carousel h={300} withIndicators loop slideSize={"70%"} slideGap={10}
            speed={3}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}

          >
            {loading || product.images.map((url) => (
              <Carousel.Slide key={url} >
                <Image radius={"md"} src={url} h={300} fit="contain" alt={loading || product.title} />
              </Carousel.Slide>
            ))
            }
          </Carousel>
        </Skeleton>
        <Stack gap={0} >
          <Group gap={0}>
            <Text size="xs" c="dimmed" lineClamp={2}>
              {loading || product.brand}
            </Text>
            <Badge leftSection={<LuStar />} pl={loading || product.brand || 0} variant="transparent">
              {loading || product.rating}
            </Badge>
          </Group>
          <Group justify="space-between" >
            <Title size="lg" textWrap="pretty" maw={"60%"} lineClamp={1}>
              {loading || product.title}
            </Title>
            <Badge size="lg" variant="light">
              {loading || `$${product.price}`}
            </Badge>
          </Group>
        </Stack>
        <Spoiler maxHeight={45} showLabel="...more" hideLabel="Hide">
          <Text size="sm" >
            {loading || product.description}
          </Text>
        </Spoiler>
        <Group wrap="nowrap">
          <ActionIcon.Group>
            <ActionIcon.GroupSection variant="default" size="lg" radius="md">
              {0}
            </ActionIcon.GroupSection>
            <ActionIcon
              variant="light"
              size="lg"
              radius="md"
            //onClick={increment}
            >
              <MdAddShoppingCart />
            </ActionIcon>
          </ActionIcon.Group>
          <Button variant="light" fullWidth radius="md" disabled={loading || product.stock <= 0}>
            {loading || product.stock > 0 ? "Buy" : "Out of Stock"}
          </Button>
        </Group>
        <Divider />
        <Grid w="100%" justify="space-evenly" >
          {productInfo.map((item, index) => (
            <Grid.Col span={{ base: 3, md: 3, lg: 1 }} key={index}>
              <Stack key={index} align="center">
                <ThemeIcon
                  variant="light"
                  radius="md"
                  size="xl"
                //color={item.color}
                >
                  <item.icon size={24} />
                </ThemeIcon>
                <Text size="sm" ta="center" lineClamp={3}>
                  {item.text}
                </Text>
              </Stack>
            </Grid.Col>
          ))}
        </Grid>
        <Divider />
        {
          loading || product.reviews.map((review, index) => (
            <Card shadow="sm" padding="lg" withBorder>
              <Group position="apart" wrap="nowrap">
                <Avatar radius="md" color="var(--mantine-primary-color-filled)" >{review.reviewerName[0]}</Avatar>
                <Stack gap={0}>
                  <Group gap="sm">
                    <Title size="lg" textWrap="pretty" lineClamp={1}>
                      {review.reviewerName}
                    </Title>
                    <Badge leftSection={<LuStar />} variant="light">
                      {review.rating}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" textWrap="wrap" lineClamp={1}>
                    {review.reviewerEmail}
                  </Text>
                </Stack>
              </Group>
              <Spoiler maxHeight={40} showLabel="...more" hideLabel="Hide">
                <Text size="sm" mt="md">
                  {review.comment}
                </Text>
              </Spoiler>
              <Text size="xs" c="dimmed" mt="xs">
                {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
              </Text>
            </Card>
          ))
        }
        <Divider mb="lg" label={"End of Reviews"} />
      </Stack>
    </ScrollArea >
  );
}
