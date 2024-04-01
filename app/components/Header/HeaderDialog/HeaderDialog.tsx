import { useResponsive } from "@/app/hooks/useResponsive";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";

type Props = {
  open: boolean;
  handleOpen: VoidFunction;
  handleClose: VoidFunction;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    flex: "1 0 100%"
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

const HeaderDialog: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const mdUp = useResponsive("up", "md");

  return (
    <BootstrapDialog
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          minWidth: mdUp ? "400px" : "100%"
        },
        "& .MuiDialogContent-root": {
          width: mdUp ? "500px" : "unset"
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        İletişim Bilgileri
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}>
        <Icon icon="material-symbols:close" />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          width: mdUp ? "500px" : "100%",
          display: "flex",
          flexDirection: mdUp ? "row" : "column",
          alignItems: "center",
          gap: "10px",
          padding: "30px"
        }}>
        <Box
          sx={{
            width: mdUp ? "calc(50% - 5px)" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
          <Typography gutterBottom variant="h5">
            Yusuf Yılmaz
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Back-end Developer
          </Typography>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            gap="5px">
            <Link
              sx={{ textDecoration: "none", color: "#000" }}
              href="https://linkedin.com/in/yusufyilmazfr"
              target="_blank">
              <Icon icon="mdi:linkedin" width={38} />
            </Link>
            <Link
              sx={{ textDecoration: "none", color: "#000" }}
              href="https://github.com/yusufyilmazfr"
              target="_blank">
              <Icon icon="mdi:github" width={38} />
            </Link>
          </Stack>
        </Box>
        <Box
          sx={{
            width: mdUp ? "calc(50% - 5px)" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
          <Typography gutterBottom variant="h5">
            Mehmet Mutlu
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Front-end Developer
          </Typography>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            gap="5px">
            <Link
              sx={{ textDecoration: "none", color: "#000" }}
              href="https://linkedin.com/in/mehmettmutlu/"
              target="_blank">
              <Icon icon="mdi:linkedin" width={38} />
            </Link>
            <Link
              sx={{ textDecoration: "none", color: "#000" }}
              href="https://github.com/MhmtMutlu"
              target="_blank">
              <Icon icon="mdi:github" width={38} />
            </Link>
          </Stack>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default HeaderDialog;
