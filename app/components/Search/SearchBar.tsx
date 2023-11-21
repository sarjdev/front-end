import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSearch } from "./actions";
import { Autocomplete, TextField } from "@mui/material";
import { useDebounce } from "@/app/hooks/useDebounce";
import ReactHtmlParser from "react-html-parser";
import { SuggestionLocation } from "@/app/types";

import "./styles.scss";

const SearchBar = () => {
  const map = useMap();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<SuggestionLocation[]>([]);

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

    fetchData();
  }, [debouncedValue]);

  const filterOptionLabel = (text: string): string => {
    const sanitizedText = text.replace(/<b>/g, "").replace(/<\/b>/g, "");

    return sanitizedText;
  };

  return (
    <Autocomplete
      className="searchbar"
      sx={{ width: 300 }}
      getOptionLabel={(option) => filterOptionLabel(option.highlightedText)}
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
        return (
          <li
            {...props}
            key={option.highlightedText}
            onClick={() => {
              map.setView(
                [option.chargingStation.location.lat, option.chargingStation.location.lon],
                17,
                {
                  animate: true
                }
              );
            }}>
            <div>{ReactHtmlParser(option.highlightedText)}</div>
          </li>
        );
      }}
    />
  );
};

export default SearchBar;
