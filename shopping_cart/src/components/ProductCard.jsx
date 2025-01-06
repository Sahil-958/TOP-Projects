import { useState, useEffect } from "react";
import {
  Skeleton,
  Stack,
  Card,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
import { LuStar } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(true);
  return (
    <Card
      h={"100%"}
      miw={300}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      key={product.id}
    >
      <Card.Section>
        <Skeleton visible={loading} p={"md"}>
          <Image
            onLoad={() => setLoading(false)}
            src={product.images[0]}
            h={200}
            fit="contain"
            alt={product.title}
          />
        </Skeleton>
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
              {product.price}
            </Badge>
          </Group>
        </div>
        <Text size="sm" c="dimmed" lineClamp={2}>
          {product.description}
        </Text>
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
    </Card>
  );
}
