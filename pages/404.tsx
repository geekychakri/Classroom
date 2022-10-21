import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex-1 flex-col flex justify-center items-center">
      <img src="/error.svg" width={300} height={300} alt="404" />
      <h1 className="text-xl p-2 mb-5">Page not found !</h1>
      <Link href="/explore">
        <a className="border border-[#313131] rounded-md px-4 py-2 hover:bg-[#fff] hover:text-[#000] duration-300">
          Go back home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
