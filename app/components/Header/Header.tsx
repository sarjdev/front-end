import React, { useState } from "react";
import { AppBar, Button, Link, Stack, Toolbar } from "@mui/material";
import { useResponsive } from "@/app/hooks/useResponsive";
import Logo from "@/app/assets/images/sarjdev-logo.png";

import "./styles.scss";
import Image from "next/image";
import HeaderDialog from "./HeaderDialog";

const Header = () => {
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
      <AppBar
        sx={{
          height: mdUp ? 90 : 70,
          zIndex: 500,
          width: "100%",
          backgroundColor: "#000"
        }}>
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 }
          }}>
          <Link component={Link} href="/" sx={{ display: "contents" }}>
            <Image src={Logo} alt="logo image" width={mdUp ? 90 : 60} />
          </Link>

          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            color="#fff"
            spacing={{ xs: 0.5, sm: 1 }}>
            <Link
              sx={{ color: "#fff", fontSize: "14px", fontWeight: "bold", textDecoration: "none" }}
              href="https://github.com/sarjdev"
              target="_blank">
              GitHub
            </Link>
            <Button
              sx={{ color: "#fff", textTransform: "unset", fontSize: "14px", fontWeight: "bold" }}
              onClick={handleOpen}>
              İletişim
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <HeaderDialog open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </>
  );
};

export default Header;
