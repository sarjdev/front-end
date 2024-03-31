"use client";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header";
import { StyledIcon, StyledNotistack } from "./utils/notistack";

import "leaflet/dist/leaflet.css";

const MapContent = dynamic(() => import("./components/Map/MapContent"), {
  ssr: false
});

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={5}
        preventDuplicate
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          info: (
            <StyledIcon color="info">
              <Icon icon="eva:info-fill" width={24} />
            </StyledIcon>
          ),
          success: (
            <StyledIcon color="success">
              <Icon icon="eva:checkmark-circle-2-fill" width={24} />
            </StyledIcon>
          ),
          warning: (
            <StyledIcon color="warning">
              <Icon icon="eva:alert-triangle-fill" width={24} />
            </StyledIcon>
          ),
          error: (
            <StyledIcon color="error">
              <Icon icon="solar:danger-bold" width={24} />
            </StyledIcon>
          )
        }}
        Components={{
          default: StyledNotistack,
          info: StyledNotistack,
          success: StyledNotistack,
          warning: StyledNotistack,
          error: StyledNotistack
        }}
        action={(snackbarId) => (
          <IconButton size="small" onClick={() => closeSnackbar(snackbarId)} sx={{ p: 0.5 }}>
            <Icon width={16} icon="mingcute:close-line" />
          </IconButton>
        )}>
        <Header />
        <MapContent />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
