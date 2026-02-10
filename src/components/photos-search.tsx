import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import React from "react";
import { debounce } from "../helpers/utils";
import UsePhotos from "../contexts/photos/hooks/use-photos";

export default function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("");
  const { filters } = UsePhotos();

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      filters.setQ(value);
    }, 200),
    [filters.setQ],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar Fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
