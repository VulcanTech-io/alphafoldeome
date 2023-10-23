import { useEffect, useState } from "react";
interface Options {
  scrollTop?: number;
}
export const useScroll = ({ scrollTop = 0 }: Options = {}) => {
  const [isScrolledPast, setIsScrolledPast] = useState<0 | 1>(1);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolledPast(Number(!(window.scrollY > scrollTop)) as 0 | 1);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setIsScrolledPast]);
  return { isScrolledPast };
};
