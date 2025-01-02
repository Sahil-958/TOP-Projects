import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";
import {
  Grid,
  Skeleton,
  Stack,
  Card,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Group,
} from "@mantine/core";

const SearchPage = () => {
  let [searchParams] = useSearchParams();
  let query = searchParams.get("q");
  let limit = searchParams.get("limit");
  let delay = searchParams.get("delay");
  let total = searchParams.get("total");
  let { data, loading, error } = useFetchProducts(
    `https://dummyjson.com/products/search?q=${query || ""}&limit=${limit || 10}&delay=${delay || 5000}`,
  );
  console.log("total", total, loading);

  const [imageLoaded, setImageLoaded] = useState({}); // Track loaded state for each image

  // Handle when an image has loaded
  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({
      ...prev,
      [id]: true, // Mark image as loaded
    }));
  };

  return (
    <>
      <Grid>
        {loading
          ? Array.from(
              { length: total && total < 10 && total > 0 ? total : 10 },
              (_, i) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={i}>
                  <Card
                    h={"100%"}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    key={i}
                  >
                    <Card.Section>
                      <Skeleton h={200} radius="sm" />
                    </Card.Section>
                    <Group justify="space-between" mt={"md"}>
                      <Skeleton height={20} width={"70%"} radius="sm" />
                      <Skeleton height={20} width={"20%"} radius="xl" />
                    </Group>
                    <Skeleton height={15} radius="xs" mt={"xl"} />
                    <Skeleton height={15} width={"80%"} radius="xs" mt={"xs"} />
                    <Skeleton height={35} radius="xs" mt={"md"} />
                  </Card>
                </Grid.Col>
              ),
            )
          : data?.products?.map((product) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={product.id}>
                <Card
                  h={"100%"}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  key={product.id}
                >
                  <Card.Section>
                    <Skeleton visible={!imageLoaded[product.id]}>
                      <Image
                        onLoad={() => handleImageLoad(product.id)}
                        src={product.images[0]}
                        h={200}
                        fit="contain"
                        alt={product.title}
                      />
                    </Skeleton>
                  </Card.Section>
                  <Stack h={"100%"} justify="end" gap={"sm"}>
                    <Group justify="space-between" mt="md" mb="xs">
                      <Title size="md" textWrap="wrap" lineClamp={1}>
                        {product.title}
                      </Title>
                      <Badge>On Sale</Badge>
                    </Group>
                    <Text size="sm" c="dimmed" lineClamp={2}>
                      {product.description}
                    </Text>
                    <Button fullWidth radius="md">
                      Click
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
      </Grid>
    </>
  );
};

export default SearchPage;
