import { FC } from "react";
import { SideBarContext } from "../SideBar/index";
interface Props {
  children: React.ReactNode;
}
export const GlobalContext: FC<Props> = ({ children }) => {
  return (
    <>
      <SideBarContext>{children}</SideBarContext>
    </>
  );
};
