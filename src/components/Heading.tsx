function Heading({ first, second }) {
  return (
    <div className="flex flex-col gap-2 text-center text-2xl">
      <div className="flex justify-center gap-2 items-center">
        <p className="text-gray-500">
          {first}{" "}
          <span className="text-gray-700 font-medium">{second}</span>
        </p>
        <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
      </div>
    </div>
  );
}

export default Heading;
