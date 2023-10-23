import Image, { ImageLoader, StaticImageData } from "next/image";
import type { FC } from "react";
interface Props {
  src?: string | StaticImageData;
  mobileSrc?: string | StaticImageData;
}

export const BackgroundImage: FC<Props> = ({ src, mobileSrc }) => {
  if (!src) return null;

  const myLoader: ImageLoader = ({ src, width, quality }) => {
    if (width < 768 && mobileSrc)
      return `${mobileSrc}?w=${width}&q=${quality || 75}`;
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="fixed top-0 h-screen w-full min-w-[100vw] overflow-x-hidden print:hidden 2xl:max-h-[1440px]">
        <div className="relative h-full w-full">
          <Image
            loader={myLoader}
            fill
            loading="eager"
            priority
            src={src}
            alt="Background Image"
            className={`${
              mobileSrc
                ? "object-contain object-top lg:object-cover lg:object-center"
                : "object-cover object-center"
            }`}
            quality={100}
          />
        </div>
      </div>
      <div className="fixed top-0 h-screen w-full overflow-x-hidden bg-black bg-opacity-50 print:hidden" />
    </>
  );
};
