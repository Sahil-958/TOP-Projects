import { useNavigate } from "react-router";
import {
  Text,
  NavLink,
} from "@mantine/core";
import { TbCategory } from "react-icons/tb";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";

export default function CategoriesButton() {
  let navigate = useNavigate();
  let { data, loading, error } = useFetchProducts({
    url: "https://dummyjson.com/products/category-list"
  });

  return (
    <NavLink
      variant="light"
      active={true}
      href="#"
      key="categories"
      label="Categories"
      leftSection={<TbCategory />}
      childrenOffset={28}
    >
      {loading &&
        data?.map((category) => (
          <NavLink
            key={category}
            style={{
              borderLeft: "2px solid var(--mantine-color-default-border)",
            }}
            onClick={() => {
              navigate(`/categories/${category}`);
            }}
            href="#"
            label={<Text tt={"capitalize"}>{category}</Text>}
          ></NavLink>
        ))
      }
    </NavLink>
  );
}
