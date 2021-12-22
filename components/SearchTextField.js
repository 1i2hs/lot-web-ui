import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function SearchTextField({
  className = "",
  searchText = "",
  placeholder = "",
  onSearch = () => {},
}) {
  const searchTextRef = useRef("");
  const inputDOMRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchText !== undefined && searchText !== null) {
      inputDOMRef.current.value = searchText;
    }
  }, [searchText]);

  const onChangeQuery = useCallback((event) => {
    searchTextRef.current = event.target.value;
  }, []);

  const onKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      onSearch(searchTextRef.current);
    }
  }, []);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const onClear = useCallback(() => {
    searchTextRef.current = "";
    inputDOMRef.current.value = "";
  }, []);

  const onClickSearch = useCallback(() => {
    onSearch(searchTextRef.current);
  }, []);

  return (
    <div
      className={`flex flex-row p-2 border rounded-md w-full space-x-2 ${
        isFocused && "border-blue-500"
      } ${className}`}
    >
      <input
        className={`flex-1 px-2 focus:outline-none bg-transparent`}
        title="Search"
        name="q"
        ref={inputDOMRef}
        placeholder={placeholder}
        onChange={onChangeQuery}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
      <button
        className="btn-default-xs"
        onClick={onClear}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        clear
      </button>
      <button
        className="btn-primary-xs"
        onClick={onClickSearch}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        search
      </button>
    </div>
  );
}

SearchTextField.propTypes = {
  className: PropTypes.string,
  searchText: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};
