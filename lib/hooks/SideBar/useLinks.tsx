import type { IconType, IconBaseProps } from "react-icons";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import type { AnchorHTMLAttributes } from "react";
import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { RiOpenSourceLine } from "react-icons/ri";
import { MdDesignServices, MdOutlineAdsClick } from "react-icons/md";
import { FiLayers } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { BsBrush } from "react-icons/bs";
import { GiInfo } from "react-icons/gi";

interface SideBarLink_shell {
  Icon: IconType;
  text: string;
  href: string;
  regex: RegExp;
  anchorClassName?: string;
}
export interface SideBarLink extends Omit<SideBarLink_shell, "regex"> {
  anchorProps: AnchorHTMLAttributes<HTMLAnchorElement>;
  iconProps: IconBaseProps;
}

export const sideBarLinks1: SideBarLink_shell[] = [
  { href: "/", Icon: AiOutlineHome, text: "Home", regex: /^\/$/ },
  {
    href: "/what-we-offer",
    Icon: FiLayers,
    text: "Why VulcanTech?",
    regex: /^\/what-we-offer$/,
  },
  {
    href: "/services",
    Icon: MdDesignServices,
    text: "Services",
    regex: /^\/services$/,
  },
  {
    href: "/services/custom-website-design",
    Icon: BsBrush,
    text: "Custom Design",
    regex: /^\/services\/custom-website-design\/?$/,
    anchorClassName: "ml-4",
  },
  {
    href: "/services/seo",
    Icon: IoSearchOutline,
    text: "SEO",
    regex: /^\/seo$/,
    anchorClassName: "ml-4",
  },
  {
    href: "/services/pay-per-click",
    Icon: MdOutlineAdsClick,
    text: "PPC",
    regex: /^\/pay-per-click$/,
    anchorClassName: "ml-4",
  },
];
export const sideBarLinks2: SideBarLink_shell[] = [
  { href: "/team", Icon: AiOutlineTeam, text: "Who We Are", regex: /^\/team$/ },
  {
    href: "/learn",
    Icon: GiInfo,
    text: "Knowledge Center",
    regex: /^\/lear$/,
  },
  {
    href: "/open-source",
    Icon: RiOpenSourceLine,
    text: "Open Source",
    regex: /^\/open-source$/,
  },
];

type Mapper = (
  value: SideBarLink_shell,
  index: number,
  array: SideBarLink_shell[]
) => SideBarLink;

export const useLinks = () => {
  const { pathname } = useRouter();
  const HeightWidth = { height: "18px", width: "18px" };

  const mapper: Mapper = useCallback(
    ({ regex, anchorClassName = "", ...link }) => ({
      ...link,
      anchorProps: {
        className: `${anchorClassName} flex items-center px-4 py-2 mt-5 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 ${
          regex.test(pathname)
            ? "bg-gray-300 dark:bg-gray-700 text-color-primary"
            : "text-color-tertiary"
        }`,
      },
      iconProps: { style: HeightWidth },
    }),
    [pathname]
  );

  const links = useMemo(
    (): [SideBarLink[], SideBarLink[]] => [
      sideBarLinks1.map(mapper),
      sideBarLinks2.map(mapper),
    ],
    [mapper]
  );

  return links;
};
