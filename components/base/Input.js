import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const getBorderColor = (isFocused, isInvalid) => {
  if (isFocused && isInvalid) {
    return "border-blue-500";
  } else if (isFocused && !isInvalid) {
    return "border-blue-500";
  } else if (!isFocused && isInvalid) {
    return "border-red-600";
  } else {
    return "border-gray-400";
  }
};

export function BaseInput({
  className = "",
  htmlId,
  label,
  noLabel = false,
  isFocused = false,
  isInvalid = false,
  errorMessage,
  children,
}) {
  const borderColor = getBorderColor(isFocused, isInvalid);
  return (
    <section>
      {!noLabel && <label htmlFor={htmlId}>{label}</label>}
      <div
        className={`flex flex-row py-1 px-2 border rounded ${borderColor} ${className}`}
      >
        {children}
      </div>
      {isInvalid && (
        <div className="text-red-600 font-light text-sm">{errorMessage}</div>
      )}
    </section>
  );
}

BaseInput.propTypes = {
  className: PropTypes.string,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  noLabel: PropTypes.bool,
  isFocused: PropTypes.bool,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function TextInput({
  htmlId,
  label,
  noLabel = false,
  value,
  placeholder = "",
  onChange,
  isInvalid,
  errorMessage,
}) {
  const inputDOMRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const _onChange = useCallback(
    (event) => {
      const value = event.target.value;
      onChange(value);
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
    inputDOMRef.current.value = "";
    onChange("");
  }, [onChange]);

  return (
    <BaseInput
      htmlId={htmlId}
      label={label}
      noLabel={noLabel}
      isFocused={isFocused}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      <input
        id={htmlId}
        className="flex-grow px-2 focus:outline-none"
        type="text"
        placeholder={placeholder}
        ref={inputDOMRef}
        defaultValue={value}
        onChange={_onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
      <button
        className="btn-default-md"
        onClick={onClickClear}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        clear
      </button>
    </BaseInput>
  );
}

TextInput.propTypes = {
  htmlId: PropTypes.string,
  label: PropTypes.string,
  noLabel: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function DateInput({
  htmlId,
  label,
  value,
  placeholder,
  onChange,
  isInvalid,
  errorMessage,
}) {
  const inputDOMRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const defaultDate = useMemo(() => {
    if (value !== undefined && value !== null) {
      return value;
    }
    return dayjs().format(`YYYY-MM-DD`);
  }, [value]);

  const _onChange = useCallback(
    (event) => {
      onChange(event.target.valueAsNumber);
    },
    [onChange]
  );

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const onClickToday = useCallback(() => {
    const now = Date.now();
    inputDOMRef.current.valueAsNumber = now;
    onChange(now);
  }, [onChange]);

  return (
    <BaseInput
      htmlId={htmlId}
      label={label}
      isFocused={isFocused}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      <input
        id={htmlId}
        className="flex-grow px-2 focus:outline-none"
        type="date"
        placeholder={placeholder}
        ref={inputDOMRef}
        defaultValue={defaultDate}
        onChange={_onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
      <button
        className="btn-default-md"
        onClick={onClickToday}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Today
      </button>
    </BaseInput>
  );
}

DateInput.propTypes = {
  htmlId: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function PasswordInput({
  htmlId,
  label,
  noLabel = false,
  value,
  placeholder = "",
  onChange,
  isInvalid,
  errorMessage,
}) {
  const inputDOMRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const _onChange = useCallback(
    (event) => {
      const value = event.target.value;
      onChange(value);
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
    inputDOMRef.current.value = "";
    onChange("");
  }, [onChange]);

  return (
    <BaseInput
      htmlId={htmlId}
      label={label}
      noLabel={noLabel}
      isFocused={isFocused}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      <input
        id={htmlId}
        className="flex-grow px-2 focus:outline-none"
        type="password"
        placeholder={placeholder}
        ref={inputDOMRef}
        defaultValue={value}
        onChange={_onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
      <button
        className="btn-default-md"
        onClick={onClickClear}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        clear
      </button>
    </BaseInput>
  );
}

PasswordInput.propTypes = {
  htmlId: PropTypes.string,
  label: PropTypes.string,
  noLabel: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
