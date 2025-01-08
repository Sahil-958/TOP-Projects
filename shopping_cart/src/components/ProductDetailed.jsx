import { useState } from "react";
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
import { LuStar } from "react-icons/lu";
import { TbTruckReturn, TbShieldCheck, TbWeight, TbPackage, TbCategory } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { MdAddShoppingCart } from "react-icons/md";
import { LiaShippingFastSolid, LiaBoxesSolid } from "react-icons/lia";
import { useRef } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ProductDetailed({ product }) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  let productInfo = [
    { icon: TbTruckReturn, text: product.returnPolicy, color: "blue" },
    { icon: TbShieldCheck, text: product.warrantyInformation, color: "green" },
    { icon: LiaShippingFastSolid, text: product.shippingInformation, color: "teal" },
    {
      icon: TbPackage,
      text: `Minimum Order: ${product.minimumOrderQuantity}`,
      color: "violet"
    },
    {
      icon: TbCategory,
      text: `${product.category}`,
      color: "cyan"
    },
    { icon: LiaBoxesSolid, text: `In Stock: ${product.stock}`, color: "red" },
    { icon: TbWeight, text: `${product.weight}`, color: "orange" },
    {
      icon: RxDimensions,
      text: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`,
      color: "grape"
    },
  ];

  return (
    <Stack  >
      <Carousel h={300} withIndicators loop slideSize={"70%"} slideGap={10}
        speed={3}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {product.images.map((url, index) => (
          <Carousel.Slide key={url + index} >
            <Skeleton visible={!loadedImages.has(url)} h={300}>
              <Image radius={"md"} src={url} h={300} fit="contain" onLoad={() => {
                setLoadedImages((prev) => new Set(prev).add(url));
              }}
                styles={{
                  backgroudColor: "red"
                }}
                alt={product.title} />
            </Skeleton>
          </Carousel.Slide>
        ))
        }
      </Carousel>
      <Stack gap={0} >
        <Group gap={0}>
          <Text size="xs" c="dimmed" lineClamp={2}>
            {product.brand}
          </Text>
          <Badge leftSection={<LuStar />} pl={product.brand || 0} variant="transparent">
            {product.rating}
          </Badge>
        </Group>
        <Group justify="space-between" >
          <Title size="lg" textWrap="pretty" maw={"60%"} lineClamp={1}>
            {product.title}
          </Title>
          <Badge size="lg" variant="light">
            {`$${product.price}`}
          </Badge>
        </Group>
      </Stack>
      <Spoiler maxHeight={45} showLabel="...more" hideLabel="Hide">
        <Text size="sm" >
          {product.description}
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
        <Button variant="light" fullWidth radius="md" disabled={product.stock <= 0}>
          {product.stock > 0 ? "Buy" : "Out of Stock"}
        </Button>
      </Group>
      <Divider />
      <Grid w="100%" justify="space-evenly" >
        {productInfo.map((item, index) => (
          <Grid.Col span={{ base: 3, md: 3, lg: 1 }} key={item.text + index}>
            <Stack key={index} align="center" justify="space-around">
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
        product.reviews.map((review, index) => (
          <Card shadow="sm" padding="lg" withBorder key={review.comment + index}>
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
                <Text size="xs" c="dimmed" lineClamp={1}>
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
  );
}
