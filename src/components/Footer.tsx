import { assets } from "@/utils/assets";

function Footer() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-12 text-sm text-center md:text-left my-12 pt-12">
        <div>
          <img src={assets.logo} className="w-32 h-auto mb-6 mx-auto md:mx-0" />
          <p className="w-full text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            a, deleniti dolor quasi excepturi ipsa suscipit repellat fugit
            maxime ex nobis tempora exercitationem dolorum ut magni. Quidem
            veniam a ipsam!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-6 sm:mt-6">COMPANY</p>
          <div className="flex flex-col gap-1 text-gray-600 text-sm">
            <p>Home</p>
            <p>About Us</p>
            <p>Delivery</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-6 sm:mt-6">GET IN TOUCH</p>
          <div className="flex flex-col gap-1 text-gray-600 text-sm">
            <p>+1-212-456-7890</p>
            <p>contact@ecommerce.com</p>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-6 text-sm text-center">
          Copyright 2024@ ecommerce.com - All rights reserved.{" "}
        </p>
      </div>
    </>
  );
}

export default Footer;
