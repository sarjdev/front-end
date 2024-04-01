import { useDebounce } from "@/app/hooks/useDebounce";
import { useResponsive } from "@/app/hooks/useResponsive";
import { SuggestionLocation } from "@/app/types";
import { Autocomplete, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useMap } from "react-leaflet";
import { useSearch } from "./actions";

import "./styles.scss";

const SearchBar: FC = () => {
  const map = useMap();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<SuggestionLocation[]>([]);
  const mdUp = useResponsive("up", "md");
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef<any>(null);

  const debouncedValue = useDebounce(inputValue);

  const getSearchSuggestion = useSearch({
    q: debouncedValue
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSearchSuggestion.refetch();
        const searchData = response.data;
        setOptions(searchData?.suggestions ?? []);
      } catch (error) {
        enqueueSnackbar("Arama sonuçları çekilirken bir hata oluştu!", { variant: "error" });
      }
    };

    if (inputValue) {
      fetchData();
    }
  }, [debouncedValue]);

  const handleClickOption = (option: SuggestionLocation) => {
    map.flyTo([option.chargingStation.location.lat, option.chargingStation.location.lon], 17, {
      animate: true
    });
    setOptions([]);
    setInputValue("");
    inputRef.current.blur();
    inputRef.current?.querySelector("input").blur();
  };

  return (
    <>
      <Autocomplete
        autoComplete
        includeInputInList
        filterSelectedOptions
        ref={inputRef}
        className="searchbar"
        sx={{
          width: mdUp ? 400 : "calc(100% - 4rem)",
          position: "absolute",
          top: mdUp ? "10rem" : "16rem",
          left: "2rem",
          zIndex: 400
        }}
        filterOptions={(x) => x}
        options={options}
        noOptionsText="Kelime yazarak arama yapabilirsiniz"
        onChange={(event: any, newValue: SuggestionLocation | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Lokasyon ara..." fullWidth />}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              key={option.highlightedText}
              className="searchbar-list-item"
              onClick={() => handleClickOption(option)}>
              {ReactHtmlParser(option.highlightedText)}
            </li>
          );
        }}
      />
    </>
  );
};

export default SearchBar;
