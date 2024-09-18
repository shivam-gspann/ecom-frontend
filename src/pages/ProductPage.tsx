import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/context";
import { PRODUCTS } from "@/utils/data";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

function ProductPage() {
  const { _id } = useParams();
  const { cart, setCart } = useStore();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    if (selectedSize && product) {
      const existingProductIndex = cart.findIndex(
        (item) => item._id === product._id && item.selectedSize === selectedSize
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, selectedSize, quantity: 1 }];
      }

      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setSelectedSize(null);

      toast.success("Product added to cart!");
    } else {
      toast.warning("Please select a size!");
    }
  };

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p._id === _id);

    if (foundProduct) {
      setProduct(foundProduct);

      const related = PRODUCTS.filter(
        (p) => p.category === foundProduct.category && p._id !== _id
      ).slice(0, 5);

      setRelatedProducts(related);
    }

    setLoading(false);
  }, [_id]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [_id]);

  if (loading)
    return (
      <div className="text-md font-semibold text-gray-600">Loading...</div>
    );

  if (!product)
    return (
      <div className="text-md font-semibold text-gray-600">
        No Product Found...
      </div>
    );

  return (
    <>
      {/* Product Details  */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_5fr] gap-6 my-12">
        <div className="order-2 justify-between md:justify-start md:order-1 flex items-center md:flex-col gap-2">
          {product.image && product.image.length > 0 ? (
            product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-[15%] md:w-[75%] aspect-auto cursor-pointer"
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="order-1 md:order-2">
          <img src={product.image[0]} className="w-full aspect-auto" />
        </div>
        <div className="order-3 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">{product.name}</h2>
            <div className="flex gap-2 items-center">
              <Star color="#f66504" fill="#f66504" size={18} />
              <Star color="#f66504" fill="#f66504" size={18} />
              <Star color="#f66504" fill="#f66504" size={18} />
              <Star color="#f66504" fill="#f66504" size={18} />
              <Star color="#f3bb96" fill="#f3bb96" size={18} />
              <p>(122)</p>
            </div>
          </div>
          <p className="text-3xl font-medium">₹ {product.price}</p>
          <p className=" text-gray-500">{product.description}</p>
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Select Size</p>
            <div className="flex gap-2">
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((size, index) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`${
                      size === selectedSize
                        ? "bg-[#f66504] text-white"
                        : "bg-gray-100"
                    } border py-2 px-4 rounded-sm`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <>No size available...</>
              )}
            </div>
          </div>
          <Button onClick={handleAddToCart}> Add To Cart</Button>
          <hr />
          <div className="text-sm text-gray-500 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Reviews  */}
      <div className="my-12">
        <div className="flex">
          <p className="border px-6 py-3 text-sm font-semibold">Description</p>
          <p className="border px-6 py-3 text-sm font-semibold">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products  */}
      <div className="my-12">
        <Heading first={"RELATED"} second={"PRODUCTS"} />
      </div>

      {/* Related Products Grid  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 my-12">
        {relatedProducts.map((product) => (
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
    </>
  );
}

export default ProductPage;
