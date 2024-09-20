import {ArrowDownUp, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState } from "react";
import { PRODUCTS } from "../utils/data";
import { ITEMS_PER_PAGE } from "../constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Link } from "react-router-dom";
import Heading from "@/components/Heading";
function CollectionPage() {
  const [sortOption, setSortOption] = useState("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  const getSortedProducts = () => {
    const sortedProducts = [...PRODUCTS];
    if (sortOption === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  const totalProducts = getSortedProducts().length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const finalProducts = getSortedProducts().slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };
  return (
    <>
      {/* Heading  */}
      <div className="flex justify-between items-center  my-12">
        <Heading first={"ALL"} second={"COLLECTIONS"}/>
        <div className="flex justify-between items-center gap-2 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ArrowDownUp
                size={36}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={sortOption === "relevant"}
                onCheckedChange={() => handleSortChange("relevant")}
              >
                Relevant
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={sortOption === "priceLowToHigh"}
                onCheckedChange={() => handleSortChange("priceLowToHigh")}
              >
                Price: Low To High
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={sortOption === "priceHighToLow"}
                onCheckedChange={() => handleSortChange("priceHighToLow")}
              >
                Price: High To Low
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Filter
                size={36}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
              />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
      {/* Product Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 my-12">
        {finalProducts.map((product) => (
          <Link to={`/collection/${product._id}`}
            key={product._id}
            className="p-2 border rounded-md border-gray-300 flex flex-col gap-2"
          >
            <img src={product.image[0]} className="w-full aspect-auto" />
            <p className="text-xs font-bold text-gray-400">{product.name}</p>
            <p className="text-lg font-semibold text-green-500">{`₹ ${product.price}.00`}</p>
          </Link>
        ))}
      </div>
      {/* Pagination  */}
      <div className="my-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page} className="hidden md:flex">
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default CollectionPage;