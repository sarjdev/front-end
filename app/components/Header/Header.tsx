import React from "react";
import { AppBar, Box, Button, IconButton, Link, Stack, Toolbar } from "@mui/material";
import { useResponsive } from "@/app/hooks/useResponsive";
import Logo from "@/app/assets/images/sarjdev-logo.png";

import "./styles.scss";
import Image from "next/image";

const Header = () => {
  const mdUp = useResponsive("up", "md");

  return (
    <AppBar
      sx={{
        height: mdUp ? 100 : 70,
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
          {/* <Box component="img" src={Logo} sx={{ cursor: "pointer" }} /> */}
          <Image src={Logo} alt="logo image" width={mdUp ? 100 : 60} />
        </Link>

        {/* {!mdUp ? (
          <IconButton onClick={onOpenNav}>
            <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
          </IconButton>
        ) : null} */}

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          color="#fff"
          spacing={{ xs: 0.5, sm: 1 }}>
          <Button sx={{ color: "#fff" }}>Github</Button>
          <Button sx={{ color: "#fff" }}>İletişim</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
