import { createContext, useContext, useState, useEffect } from "react";
import type { Dispatch, SetStateAction, FC } from "react";
import { useRouter } from "next/router";

const sideBarContext = createContext({
  isSideBarOpen: false,
  setSideBarOpen: undefined as unknown as Dispatch<SetStateAction<boolean>>,
  sideBarAlwaysOpen: false,
  setSideBarAlwaysOpen: undefined as unknown as Dispatch<
    SetStateAction<boolean>
  >,
});

export const useSideBarContext = () => useContext(sideBarContext);

export const SideBarContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pathname } = useRouter();
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [sideBarAlwaysOpen, setSideBarAlwaysOpen] = useState(false);
  useEffect(() => {
    // attempt at locking scrolling
    // isSideBarOpen && !sideBarAlwaysOpen
    //   ? (window.onscroll = (e) => {
    //       e.preventDefault();
    //       window.scrollTo({ top: window.scrollY });
    //     })
    //   : (window.onscroll = () => {
    //       console.log("running");
    //     });
    if (isSideBarOpen && !sideBarAlwaysOpen)
      window.onscroll = (e) => {
        e.preventDefault();
        window.scrollTo({ top: window.scrollY });
      };
  }, [isSideBarOpen, sideBarAlwaysOpen]);
  useEffect(() => {
    // make sure its actually open if it is "always open"
    // this occurs when the previous lock state of the side-bar
    // is loaded in
    sideBarAlwaysOpen && setSideBarOpen(true);
  }, [sideBarAlwaysOpen]);

  useEffect(() => {
    // close the sidebar when the pathname changes (if its not always open)
    if (!sideBarAlwaysOpen) setSideBarOpen(false);
  }, [pathname]);

  return (
    <sideBarContext.Provider
      value={{
        isSideBarOpen,
        setSideBarOpen,
        sideBarAlwaysOpen,
        setSideBarAlwaysOpen,
      }}
    >
      {children}
    </sideBarContext.Provider>
  );
};
