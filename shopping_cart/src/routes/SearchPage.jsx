import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  ScrollArea,
  Divider,
  useMantineTheme,
} from "@mantine/core";

const SearchPage = () => {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let query = searchParams.get("q") || "";
  let limit = Number(searchParams.get("limit")) || 10;
  let delay = Number(searchParams.get("delay")) || 5000;
  let skip = Number(searchParams.get("skip")) || 0;
  let url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}&delay=${delay}`;

  let { data, error, loading } = useFetchProducts(url);

  const fetchNextPage = () => {
    if (loading) return;
    let upSkip = skip + limit > data.total ? data?.total - limit : skip + limit;
    console.log("Fetching next page...", skip, upSkip, data?.total);
    navigate(
      `/search?q=${query}&limit=${limit}&skip=${upSkip}&delay=${delay}`,
      { replace: true },
    );
  };
  const theme = useMantineTheme();
  return (
    <>
      <ScrollArea
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
          label=<Text size="xs">
            {loading
              ? "Hang Tight While We Fetch Products..."
              : `${data.total} Products found for Term: `}
            <Text
              fw={700}
              tt={"capitalize"}
              size="md"
              span
              c={theme.primaryColor}
            >
              {!loading && query}
            </Text>
          </Text>
          labelPosition="center"
        />
        <Grid>
          {loading
            ? Array.from(
                { length: data?.total > 10 ? 10 : data?.total && 10 },
                (_, i) => (
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={i}>
                    <Card
                      //h={"100%"}
                      h={400}
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
                      <Skeleton
                        height={15}
                        width={"80%"}
                        radius="xs"
                        mt={"xs"}
                      />
                      <Skeleton height={35} radius="xs" mt={"md"} />
                    </Card>
                  </Grid.Col>
                ),
              )
            : data?.products?.map((product) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={product.id}>
                  <Card
                    h={400}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    key={product.id}
                  >
                    <Card.Section>
                      <ProductImage
                        src={product.images[0]}
                        title={product.title}
                      />
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
      </ScrollArea>
    </>
  );
};

const ProductImage = ({ src, title }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Skeleton visible={loading}>
      <Image
        onLoad={() => setLoading(false)}
        src={src}
        h={200}
        fit="contain"
        alt={title}
      />
    </Skeleton>
  );
};

export default SearchPage;
