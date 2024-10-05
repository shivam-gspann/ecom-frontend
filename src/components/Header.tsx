import { assets } from "@/utils/assets";
import { Menu, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { NAV_LINKS } from "@/utils/constants";
import { useStore } from "@/store/context";
import { Button } from "./ui/button";

function Header() {
  const isLoggedIn = sessionStorage.getItem("token");

  const navigate = useNavigate();
  const {cart} = useStore();
  console.log(cart);

  const cartQuantity=cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const logoutHandler = () => {
    sessionStorage.removeItem("token"); 
    navigate("/auth"); 
  };

  return (
    <>
      <div className="flex justify-between items-center my-6 md:my-12 font-medium">
        {/* Logo  */}
        <Link to={"/"}>
          <img src={assets.logo} alt="e-comm" className="w-36" />
        </Link>

        {/* Navlinks  */}
        <div className="hidden md:flex items-center text-sm text-gray-700 gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-black" : ""
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Menu Icons  */}
        <div className="flex items-center gap-6">
        {
          isLoggedIn?          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/orders")}
              className="cursor-pointer"
            >
              Orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutHandler} className="focus:bg-red-200 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>:<Button className="py-2 px-10" onClick={()=>navigate("/auth")}>Login</Button>
        }

          <div className="relative">
            <ShoppingCart
              onClick={() => navigate("/cart")}
              className="cursor-pointer"
            />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {cartQuantity}
              </div>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="border-2 p-0">
              <div className="my-12 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  
                  <SheetTitle className="text-gray-700 text-md py-2 px-4 transition-all duration-500 hover:bg-black hover:text-white cursor-pointer">
                    <SheetClose asChild>
                    <NavLink to={link.href}>{link.name}</NavLink>
                    </SheetClose>
                  </SheetTitle>
                 
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default Header;
