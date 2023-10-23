import "../styles/globals.scss";
import "../styles/tailwind.css";
import { BackgroundImage } from "../components/_app/BackgroundImage";
// import { Nav } from "../components/_app/Nav";
import { Footer } from "../components/_app/Footer";
import { useAppHooks } from "../lib/hooks/useAppHooks";
import { IBM_Plex_Mono } from "next/font/google";
import { GlobalContext } from "../lib/hooks/Context";
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  // Note, background image via pageProps is not being utilized in this app
  const { backgroundImage } = useAppHooks({
    backgroundImage: Component.backgroundImage,
  });
  return (
    <>
      <GlobalContext>
        {/* <Nav style={ibmPlexMono.style} {...(Component.settings?.nav || {})} /> */}
        {/* <BackgroundImage
          src={backgroundImage}
          {...(Component.settings?.background || {})}
        /> */}
        <div className={ibmPlexMono.className}>
          <div className="relative z-10 flex h-[calc(100vh-var(--nav-height))] flex-col justify-between">
            <div className="max-h-[calc(100vh-var(--nav-height)-var(--footer-height))] flex-grow overflow-auto">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </div>
      </GlobalContext>
    </>
  );
}

export default MyApp;
