import Logo from "@/app/assets/images/sarjdev_logo.png";
import { useResponsive } from "@/app/hooks/useResponsive";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import HeaderDialog from "./HeaderDialog/HeaderDialog";

import "./styles.scss";

const Header: FC = () => {
  const mdUp = useResponsive("up", "md");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Image src={Logo} alt="logo image" width={mdUp ? 70 : 60} />
        <div>
          <Link className="navbar-link" href="https://github.com/sponsors/sarjdev" target="_blank">
            Sponsor
          </Link>
          <Link className="navbar-link" href="https://github.com/sarjdev" target="_blank">
            GitHub
          </Link>
          <button className="navbar-link" onClick={handleOpen}>
            İletişim
          </button>
        </div>
      </nav>
      <HeaderDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
