import Heading from "@/components/Heading";
import { assets } from "@/utils/assets";

function ContactPage() {
  return (
    <>
      {/* Contact Us  */}
      <div className="my-12">
        <Heading first={"CONTACT"} second={"US"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 justify-center my-12">
        <div className="flex justify-end items-center">
          <img
            src={assets.contact_img}
            className="w-full md:max-w-[480px] h-auto"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <div>
            <p className=" text-gray-500">54709 Willms Station </p>
            <p className=" text-gray-500">Suite 350, Washington, USA </p>
          </div>
          <div>
            <p className=" text-gray-500">Tel: (415) 555-0132 </p>
            <p className=" text-gray-500">Email: admin@forever.com</p>
          </div>
          <p className="font-semibold text-xl text-gray-600">
            {" "}
            Careers at Forever{" "}
          </p>
          <p className=" text-gray-500 my-4">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
