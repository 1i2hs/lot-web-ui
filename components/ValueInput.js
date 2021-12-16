import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { BaseInput } from "./base/Input";
import currencies from "../config/currencies";

export default function ValueInput({
  htmlId,
  label,
  currencyCode = "USD",
  value,
  placeholder,
  onChange,
  isInvalid,
  errorMessage,
}) {
  const selectDOMRef = useRef(null);
  const inputDOMRef = useRef(null);
  const valueRef = useRef({ value: 0, currencyCode: "USD" });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (currencyCode !== undefined || currencyCode !== null) {
      valueRef.current.currencyCode = currencyCode;
    }
  }, [currencyCode]);

  const defaultValue = useMemo(() => {
    if (value !== undefined && value !== null) {
      return value;
    }
    return 0;
  }, [value]);

  const currencyOptionElements = useMemo(
    () =>
      currencies.map(({ code }) => (
        <option key={code} value={code}>
          {code}
        </option>
      )),
    []
  );

  const onChangeCurrencyCode = useCallback((event) => {
    valueRef.current.currencyCode = event.target.value;
    const { value, currencyCode } = valueRef.current;
    onChange(value, currencyCode);
  }, []);

  const _onChange = useCallback(
    (event) => {
      const temp = Number(event.target.value);
      const price = temp >= 0 ? temp : 0;
      event.target.value = price;
      valueRef.current.value = price;
      onChange(price, valueRef.current.currencyCode);
    },
    [onChange]
  );

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const onClickClear = useCallback(() => {
    inputDOMRef.current.value = 0;
    selectDOMRef.current.value = currencyCode;
    valueRef.current.value = 0;
    valueRef.current.currencyCode = currencyCode;
    onChange(0, currencyCode);
  }, [onChange, currencyCode]);

  return (
    <BaseInput
      htmlId={htmlId}
      label={label}
      isFocused={isFocused}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      <select
        className="flex-none"
        ref={selectDOMRef}
        defaultValue={currencyCode}
        onChange={onChangeCurrencyCode}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {currencyOptionElements}
      </select>
      <input
        id={htmlId}
        className="w-full px-2 focus:outline-none"
        type="number"
        placeholder={placeholder}
        ref={inputDOMRef}
        defaultValue={defaultValue}
        onChange={_onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
      <button
        className="flex-none btn-default-md"
        onClick={onClickClear}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        clear
      </button>
    </BaseInput>
  );
}

ValueInput.propTypes = {
  htmlId: PropTypes.string,
  label: PropTypes.string,
  currencyCode: PropTypes.oneOf(currencies.map((currency) => currency.code)),
  value: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
