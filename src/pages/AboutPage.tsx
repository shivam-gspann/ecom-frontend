import Heading from "@/components/Heading";
import { assets } from "@/utils/assets";

function AboutPage() {
  return (
    <>
      {/* About Us  */}
      <div className="my-12">
        <Heading first={"ABOUT"} second={"US"} />
      </div>
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <img src={assets.about_img} className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="text-gray-800 font-bold">Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us  */}
      <div className="my-12 flex">
        <Heading first={"WHY"} second={"CHOOSE US"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 text-sm my-12">
        <div className="border p-10 flex flex-col gap-6">
          <p className="font-bold">Quality Assurance:</p>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border p-10 flex flex-col gap-6">
          <p className="font-bold">Convenience:</p>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border p-10 flex flex-col gap-6">
          <p className="font-bold">Exceptional Customer Service:</p>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
