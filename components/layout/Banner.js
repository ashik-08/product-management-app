import Featured from "./Featured";

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-rich-black sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn&apos;t care if you live or
              die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* <!-- Decorative image grid --> */}
              <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-hookers-green px-8 py-3 text-center font-medium text-white"
              >
                Shop Collection
              </a>
            </div>
            <Featured />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;