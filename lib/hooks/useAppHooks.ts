import { StaticImageData } from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Props {
  backgroundImage?: BackgroundImage;
}

export const useAppHooks = ({ backgroundImage: imageFromProps }: Props) => {
  const [backgroundImage, setBackgroundImage] = useState(imageFromProps);
  const backgroundImageFunctions = useRef({
    backgroundImage,
    resetImage: () => setBackgroundImage(imageFromProps),
    updateImage: (image: BackgroundImage) => setBackgroundImage(image),
  });

  useEffect(() => {
    setBackgroundImage(imageFromProps);
  }, [imageFromProps]);

  return { backgroundImage, backgroundImageFunctions };
};

export type BackgroundImageFunctions = MutableRefObject<{
  backgroundImage: string | StaticImageData | undefined;
  resetImage: () => void;
  updateImage: (image: BackgroundImage) => void;
}>;
