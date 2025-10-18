import Image from "next/image";

const BannerImage = ({
  src,
  alt = "Product showcase",
  additionalClasses = "",
}) => {
  return (
    <div
      className={`h-64 w-44 overflow-hidden rounded-lg ${additionalClasses}`}
    >
      <Image
        src={src}
        alt={alt}
        width={176}
        height={256}
        className="h-full w-full object-cover object-center"
        unoptimized
      />
    </div>
  );
};

export default BannerImage;
