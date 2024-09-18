function NewsLetter() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center my-12 p-6">
        <p className="text-2xl font-medium text-gray-800">
          Subscribe now & get 20% Off
        </p>
        <p className="text-md text-gray-400 font-medium">
          Sign up for our newsletter and receive exclusive offers and
          promotions.
        </p>
        <div className="flex w-full md:max-w-[480px]">
          <input
            type="text"
            placeholder="Enter your email"
            className="border w-full px-2"
          />
          <button className="bg-black text-white py-4 px-8 text-sm">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
}

export default NewsLetter;
