import { Home } from "../components/page-specific/index/Main";
import Head from "next/head";
const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>AlphaFoldeome</title>
        <meta name="canonical" content="https://alphafoldeome.org/" />
      </Head>
      <Home />
    </>
  );
};

const settings = {
  nav: {
    alwaysOpaque: true,
  },
};
// this is just white
Index.backgroundImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
Index.settings = settings;
export default Index;
