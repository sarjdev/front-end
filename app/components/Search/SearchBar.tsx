import { useDebounce } from "@/app/hooks/useDebounce";
import { useResponsive } from "@/app/hooks/useResponsive";
import { SuggestionLocation } from "@/app/types";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useMap } from "react-leaflet";
import { useSearch } from "./actions";

import "./styles.scss";

const SearchBar = () => {
  const map = useMap();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<SuggestionLocation[]>([]);
  const mdUp = useResponsive("up", "md");

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
        console.error("Error fetching search suggestions:", error);
      }
    };

    if (inputValue) {
      fetchData();
    }
  }, [debouncedValue]);

  return (
    <Autocomplete
      className="searchbar"
      sx={{
        width: mdUp ? 400 : "calc(100% - 4rem)",
        position: "absolute",
        top: mdUp ? "10rem" : "13rem",
        left: "2rem",
        zIndex: 400
      }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="Kelime yazarak arama yapabilirsiniz"
      onChange={(event: any, newValue: SuggestionLocation | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Lokasyon ara..." fullWidth />}
      renderOption={(props, option) => {
        const containsBold = /<b>(.*?)<\/b>/g.test(option.highlightedText);

        return (
          <li
            {...props}
            key={option.highlightedText}
            className="searchbar-list-item"
            onClick={() => {
              map.setView(
                [option.chargingStation.location.lat, option.chargingStation.location.lon],
                17,
                {
                  animate: true
                }
              );
            }}>
            {ReactHtmlParser(option.highlightedText)}
          </li>
        );
      }}
    />
  );
};

export default SearchBar;
