import {
  Stack,
  Card,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Group,
  Grid,
  ThemeIcon,
  ActionIcon,
  ScrollArea,
  Spoiler,
} from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { LuStar, LuPackagePlus } from "react-icons/lu";
import { CiBoxes } from "react-icons/ci";
import { TbTruckReturn, TbShieldCheck, TbWeight, TbPackage, TbCategory } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";
import { MdAddShoppingCart } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useParams, useLocation } from "react-router";
import { useRef } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";

export default function ProductPage() {
  let { id } = useParams();
  const location = useLocation();
  const product = location.state.product;
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
    { icon: CiBoxes, text: `In Stock: ${product.stock}`, color: "red" },
    { icon: TbWeight, text: `${product.weight}`, color: "orange" },
    {
      icon: RxDimensions,
      text: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`,
      color: "grape"
    },

  ];

  return (
    <ScrollArea
      offsetScrollbars="y"
      scrollbarSize={8}
      styles={{
        root: {
          height: "calc(100vh - var(--app-shell-header-height))",
        },
      }}
    >
      <Card
        h={"100%"}
        shadow="sm"
        mb="xl"
        padding="lg"
        radius="md"
        withBorder
        key={product.id}
      >
        <Card.Section >
          <Carousel h={300} withIndicators loop slideSize={"70%"} slideGap={10}
            speed={3}
            plugins={[autoplay.current]}
            //onSlideChange
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}

          >
            {product.images.map((url) => (
              <Carousel.Slide key={url} >
                <Image radius={"md"} src={url} h={300} fit="contain" alt={product.title} />
              </Carousel.Slide>
            ))
            }
          </Carousel>
        </Card.Section>
        <Stack h={"100%"} justify="end" gap={"sm"}>
          <div>
            <Group gap={0}>
              <Text size="xs" c="dimmed" lineClamp={2}>
                {product.brand}
              </Text>
              <Badge leftSection={<LuStar />} pl={product.brand || 0} variant="transparent">
                {product.rating}
              </Badge>
            </Group>
            <Group justify="space-between" mb="xs">
              <Title size="lg" textWrap="wrap" maw={"60%"} lineClamp={1}>
                {product.title}
              </Title>
              <Badge size="lg" variant="light">
                ${product.price}
              </Badge>
            </Group>
          </div>
          <Spoiler maxHeight={40} showLabel="...more" hideLabel="Hide">
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
            <Button variant="light" fullWidth radius="md">
              Buy
            </Button>
          </Group>
        </Stack>
        <Card.Section withBorder mt={"md"} p={"md"}>
          <Grid mt="lg" w="100%" justify="space-evenly" >
            {productInfo.map((item, index) => (
              <Grid.Col span={{ base: 3, md: 3, lg: 1 }} key={index}>
                <Stack key={index} spacing="md" align="center">
                  <ThemeIcon
                    variant="light"
                    radius="md"
                    size="xl"
                    color={item.color}
                  >
                    <item.icon size={24} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed" ta="center" lineClamp={2}>
                    {item.text}
                  </Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Card.Section>
        <Card.Section withBorder mt={"md"} p={"md"}>
          {product.reviews.map((review, index) => (
            <Text key={index} size="sm" c="dimmed" lineClamp={2}>{review.comment}</Text>
          ))}
        </Card.Section>
      </Card >
    </ScrollArea>
  );
}
