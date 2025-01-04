import { useState, useEffect } from "react";
import { Skeleton, Card, Group } from "@mantine/core";

export default function SkeletonProductCard() {
  return (
    <Card h={"100%"} miw={250} shadow="sm" padding="lg" radius="md" withBorder>
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
  );
}
