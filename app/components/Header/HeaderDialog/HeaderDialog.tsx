import { useResponsive } from "@/app/hooks/useResponsive";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { FC } from "react";
import BottomSheet from "../../BottomSheet/BottomSheet";

import "./styles.scss";

type Props = {
  open: boolean;
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

const HeaderDialog: FC<Props> = ({ open, handleClose }) => {
  const mdUp = useResponsive("up", "md");

  const content = (
    <>
      <div className="content-info">
        <h5>Yusuf Yılmaz</h5>
        <span>Back-end Developer</span>
        <div className="content-info-links">
          <Link href="https://linkedin.com/in/yusufyilmazfr" target="_blank">
            <Icon icon="mdi:linkedin" width={38} />
          </Link>
          <Link href="https://github.com/yusufyilmazfr" target="_blank">
            <Icon icon="mdi:github" width={38} />
          </Link>
        </div>
      </div>
      <div className="content-info">
        <h5>Mehmet Mutlu</h5>
        <span>Front-end Developer</span>
        <div className="content-info-links">
          <Link href="https://linkedin.com/in/mehmettmutlu/" target="_blank">
            <Icon icon="mdi:linkedin" width={38} />
          </Link>
          <Link href="https://github.com/MhmtMutlu" target="_blank">
            <Icon icon="mdi:github" width={38} />
          </Link>
        </div>
      </div>
    </>
  );

  return mdUp ? (
    <BootstrapDialog
      onClose={handleClose}
      className="dialog"
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle className="dialog-title" id="customized-dialog-title">
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
      <DialogContent dividers className="dialog-content">
        {content}
      </DialogContent>
    </BootstrapDialog>
  ) : (
    <BottomSheet isForResponsiveMarker isOpen={open} onClose={handleClose}>
      <div className="bottom-responsive">
        <h4>İletişim Bilgileri</h4>
        <div className="bottom-responsive-info">{content}</div>
      </div>
    </BottomSheet>
  );
};

export default HeaderDialog;
