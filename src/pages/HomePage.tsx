import Heading from "@/components/Heading";
import { assets } from "@/utils/assets";
import { PRODUCTS } from "@/utils/data";
import { Link } from "react-router-dom";

function HomePage() {
  const latestProducts = PRODUCTS.slice(0, 10);
  const bestProducts = PRODUCTS.slice(0, 5);
  return (
    <>
      {/* Hero  */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-400 my-12">
        <div className="w-full min-h-[25vh] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[1px] bg-black"></div>
              <p className="font-medium text-sm">OUR BESTSELLERS</p>
            </div>
            <h1 className="font-serif text-3xl"> Latest Arrivals</h1>
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">SHOP NOW</p>
              <div className="w-8 h-[1px] bg-black"></div>
            </div>
          </div>
        </div>
        <img src={assets.hero_img} className="w-full" />
      </div>

      {/* Latest Collections  */}
      <div className="my-12">
        <Heading first={"LATEST"} second={"COLLECTIONS"} />
      </div>

      {/* Latest Collection Products  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {latestProducts.map((product) => (
          <Link
            to={`/collection/${product._id}`}
            key={product._id}
            className="p-2 border rounded-md border-gray-300 flex flex-col gap-2"
          >
            <img src={product.image[0]} className="w-full aspect-auto" />
            <p className="text-xs font-bold text-gray-400">{product.name}</p>
            <p className="text-lg font-semibold text-green-500">{`₹ ${product.price}.00`}</p>
          </Link>
        ))}
      </div>

      {/* Best Sellers  */}
      <div className="my-12">
        <Heading first={"BEST"} second={"SELLERS"} />
      </div>

      {/* Best Sellers Products  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {bestProducts.map((product) => (
          <Link
            to={`/collection/${product._id}`}
            key={product._id}
            className="p-2 border rounded-md border-gray-300 flex flex-col gap-2"
          >
            <img src={product.image[0]} className="w-full aspect-auto" />
            <p className="text-xs font-bold text-gray-400">{product.name}</p>
            <p className="text-lg font-semibold text-green-500">{`₹ ${product.price}.00`}</p>
          </Link>
        ))}
      </div>

      {/* Policy  */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-around gap-12 md:gap-2 text-center my-12">
        <div className="py-6">
          <img src={assets.exchange_icon} className="w-12 m-auto mb-6" />
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-gray-400">We offer hassle free exchange policy.</p>
        </div>
        <div className="py-6">
          <img src={assets.quality_icon} className="w-12 m-auto mb-6" />
          <p className="font-semibold">7 Days Return Policy</p>
          <p className="text-gray-400">We provide 7 days free return policy.</p>
        </div>
        <div className="py-6">
          <img src={assets.support_img} className="w-12 m-auto mb-6" />
          <p className="font-semibold">Best customer support</p>
          <p className="text-gray-400">We provide 24/7 customer support.</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
