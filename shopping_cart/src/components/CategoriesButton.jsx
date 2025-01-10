import { useNavigate, useLocation } from "react-router";
import { Text, NavLink, Loader, ScrollArea } from "@mantine/core";
import { TbCategory } from "react-icons/tb";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";

export default function CategoriesButton() {
  const navigate = useNavigate();
  const location = useLocation();
  let { data, loading, error } = useFetchProducts({
    url: "https://dummyjson.com/products/category-list?delay=5000",
  });

  return (
    <NavLink
      variant="light"
      active={location.pathname.match(/categories\/\w+/)}
      href="#"
      key="categories"
      label="Categories"
      leftSection={<TbCategory />}
    >
      <ScrollArea.Autosize mah={300} type="always">
        {loading && <Loader type="dots" w={"100%"} />}
        {loading ||
          data?.map((category) => (
            <NavLink
              variant="subtle"
              active={location.pathname === `/app/categories/${category}`}
              key={category}
              style={{
                borderLeft: "2px solid var(--mantine-color-default-border)",
              }}
              href={`#/app/categories/${category}`}
              label={<Text tt={"capitalize"}>{category}</Text>}
            ></NavLink>
          ))}
      </ScrollArea.Autosize>
    </NavLink>
  );
}
