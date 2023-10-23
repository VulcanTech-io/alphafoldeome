// import { PageTitleBox } from "../components/cards/PageTitleBox";
import backgroundImage from "../public/sailboat.jpg";

interface Props {
  //
}
const error404: NextPage = () => {
  return (
    <>
      <div className="h-screen"></div>
      <div className="fixed inset-0 text-white">
        {/* <PageTitleBox
          ScrollToId={null}
          title={<h1 className="text-9xl">404</h1>}
          content="The page you are looking for does not exist."
        /> */}
      </div>
    </>
  );
};
error404.settings = {
  background: {
    darken: true,
  },
  nav: {
    alwaysOpaque: true,
  },
};
error404.backgroundImage = backgroundImage;

export default error404;
