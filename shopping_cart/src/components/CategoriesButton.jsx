import { useNavigate } from "react-router";
import {
  Text,
  NavLink,
  Loader,
  ScrollArea,
} from "@mantine/core";
import { TbCategory } from "react-icons/tb";
import { useFetchProducts } from "../hooks/useFetchProducts.jsx";

export default function CategoriesButton() {
  let navigate = useNavigate();
  let { data, loading, error } = useFetchProducts({
    url: "https://dummyjson.com/products/category-list?delay=5000"
  });

  return (
    <NavLink
      variant="light"
      active={true}
      href="#"
      key="categories"
      label="Categories"
      leftSection={<TbCategory />}
    >
      <ScrollArea.Autosize mah={200} type="always" >
        {loading && <Loader type="dots" w={"100%"} />}
        {loading ||
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
      </ScrollArea.Autosize>
    </NavLink>
  );
}
