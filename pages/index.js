import Layout from "../components/Layout";
import ProductsList from "../components/ProductsList";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <Layout title="Home">
      <Slider />
      <ProductsList />
    </Layout>
  );
}
