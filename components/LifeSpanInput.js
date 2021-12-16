import { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { BaseInput } from "./base/Input";

export default function LifeSpanInput({
  htmlId,
  label,
  dateType = "year",
  value,
  placeholder,
  onChange,
  isInvalid,
  errorMessage,
}) {
  const selectDOMRef = useRef(null);
  const inputDOMRef = useRef(null);
  const lifeSpanRef = useRef({ lifeSpan: 0, dateType: "year" });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (dateType !== undefined && dateType !== null) {
      lifeSpanRef.current.dateType = dateType;
    }
  }, [dateType]);

  const onChangeDateType = useCallback((event) => {
    lifeSpanRef.current.dateType = event.target.value;
    const { lifeSpan, dateType } = lifeSpanRef.current;
    onChange(lifeSpan, dateType);
  }, []);

  const _onChange = useCallback(
    (event) => {
      const temp = Number(event.target.value);
      const lifeSpan = temp >= 0 ? temp : 0;
      event.target.value = lifeSpan;
      lifeSpanRef.current.lifeSpan = lifeSpan;
      onChange(lifeSpan, lifeSpanRef.current.dateType);
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
    selectDOMRef.current.value = dateType;
    lifeSpanRef.current.lifeSpan = 0;
    lifeSpanRef.current.dateType = dateType;
    onChange(0, dateType);
  }, [onChange, dateType]);

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
        defaultValue={dateType}
        onChange={onChangeDateType}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
      <input
        id={htmlId}
        className="w-full px-2 focus:outline-none"
        type="number"
        placeholder={placeholder}
        ref={inputDOMRef}
        defaultValue={value}
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

LifeSpanInput.propTypes = {
  htmlId: PropTypes.string,
  label: PropTypes.string,
  dateType: PropTypes.oneOf(["day", "month", "year"]),
  value: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
