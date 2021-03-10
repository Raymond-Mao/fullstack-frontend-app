import React, { FC } from "react";
import { NavBar } from "./NavBar";
import Wrapper, { WrapperVariant } from "./Wrapper";

interface LayoutPorps {
  variant?: WrapperVariant;
}
const Layout: FC<LayoutPorps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
