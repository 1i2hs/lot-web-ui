import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { BaseInput } from "./base/Input";
import currencies from "../config/currencies";

const defaultFn = () => {};

export default function TagInput({
  htmlId,
  label,
  placeholder,
  onChangeTags = defaultFn,
  suggestions = [],
  isInvalid,
  errorMessage,
}) {
  const [tags, setTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const onKeyDown = useCallback(
    (event) => {
      const value = event.target.value;
      if (event.keyCode === 32 && value.trim() !== "") {
        const tag = value.trim();
        if (!tags.includes(tag)) {
          setTags((prevTags) => {
            const newTags = prevTags.concat([tag]);
            onChangeTags(newTags);
            return newTags;
          });
        }
        event.target.value = "";
      }

      if (value.length === 0 && event.keyCode === 8 && tags.length > 0) {
        setTags((tags) => tags.filter((_, index) => index != tags.length - 1));
      }
    },
    [tags]
  );

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <BaseInput
      className="overflow-x-scroll"
      htmlId={htmlId}
      label={label}
      isFocused={isFocused}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className="px-2 bg-blue-400 rounded flex flex-row items-center mr-1"
          tabIndex={index}
        >
          <span className="py-1 mr-1 text-white">#{tag}</span>
          <button
            key={index}
            className="w-5 h-5 text-white flex items-center justify-center"
            onClick={() => {
              setTags((prevTags) => {
                const newTags = prevTags.filter((prevTag) => prevTag !== tag);
                onChangeTags(newTags);
                return newTags;
              });
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      ))}
      <input
        className="px-2 py-0.5 outline-none"
        type="text"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        // inevitable inline style
        style={{
          height: 38,
        }}
      ></input>
    </BaseInput>
  );
}

TagInput.propTypes = {
  htmlId: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeTags: PropTypes.func,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
