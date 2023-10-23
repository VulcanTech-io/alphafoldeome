import type { NextPage as NP } from "next";
import type { AppProps as AP } from "next/app";
import { StaticImageData } from "next/image";
import { BackgroundImageFunctions } from "../hooks/useAppHooks";
export type NavSettings = {
  alwaysOpaque?: boolean;
};
export type BackgroundSettings = {
  darken?: boolean;
};
type ComponentParams = {
  backgroundImage?: BackgroundImage;
  backgroundImageFunctions?: BackgroundImageFunctions;
  mainClassName?: string;
  settings?: {
    nav?: NavSettings;
    background?: BackgroundSettings;
  };
};

type ExtendedProps<P = {}, IP = P> = ComponentParams & NP<P, IP>;

declare global {
  type BackgroundImage = string | StaticImageData | undefined;
  type NextPage<P = {}, IP = P> = ExtendedProps<P & ComponentParams, IP>;

  type Component<P extends BackgroundImageFunctions> = AP<P>["Component"] &
    ExtendedProps;

  interface PageProps extends AP["pageProps"], ExtendedProps {}
  type AppProps = AP & { Component: Component; pageProps: PageProps };
}
