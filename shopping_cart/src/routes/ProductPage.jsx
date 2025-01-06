import { useParams } from "react-router";
import { useFetchProducts } from "../hooks/useFetchProducts";
export default function ProductPage() {
  let { id } = useParams();
  let { data, error, loading } = useFetchProducts({
    url: `https://dummyjson.com/products/${id}`,
  });
  console.log(data)
  return (
    <div >
      Hello {id}
    </div>
  );
}
