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
  Loader,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { LuStar } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
const SearchPage = () => {
  const theme = useMantineTheme();
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
              c={theme.primaryColor}
            >
              {!loading && data.total}
            </Text>
            {loading ? (
              <Loader color={theme.primaryColor} type="dots" />
            ) : (
              ` Products found for Term: `
            )}
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
        <Grid grow>
          {products?.map((product) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={product.id}>
              <Card
                h={"100%"}
                miw={250}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={product.id}
              >
                <Card.Section>
                  <ProductImage src={product.images[0]} title={product.title} />
                </Card.Section>
                <Stack h={"100%"} justify="end" gap={"sm"}>
                  <div>
                    <Group gap={0}>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {product.brand}
                      </Text>
                      <Badge leftSection={<LuStar />} variant="transparent">
                        {product.rating}
                      </Badge>
                    </Group>
                    <Group justify="space-between" mb="xs">
                      <Title
                        size="lg"
                        textWrap="wrap"
                        maw={"60%"}
                        lineClamp={1}
                      >
                        {product.title}
                      </Title>
                      <Badge size="lg" variant="light">
                        {product.price}
                      </Badge>
                    </Group>
                  </div>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {product.description}
                  </Text>
                  <Group wrap="nowrap">
                    <ActionIcon.Group>
                      <ActionIcon.GroupSection
                        variant="default"
                        size="lg"
                        radius="md"
                      >
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
              </Card>
            </Grid.Col>
          ))}

          {loading &&
            Array.from(
              { length: data?.total > 10 ? 10 : data?.total || 10 },
              (_, i) => (
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={i}>
                  <Card
                    h={"100%"}
                    miw={250}
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
            )}
        </Grid>
        {!loading && data?.total - skip - 1 == 0 && (
          <Divider mt="md" label={"No more Products"} labelPosition="center" />
        )}
      </ScrollArea>
    </>
  );
};

const ProductImage = ({ src, title }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Skeleton visible={loading} p={"md"}>
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
