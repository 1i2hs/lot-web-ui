import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BaseDialog } from "./base/Dialog";
import { languages } from "../config";

const defaultFn = () => {};

const languageOptionElements = languages.map((language) => {
  return (
    <option key={language.code} value={language.code}>
      {language.description}
    </option>
  );
});

export default function LanguageSelectDialog({
  languageCode,
  isOpen = false,
  onSave = defaultFn,
  onCancel = defaultFn,
  onClose = defaultFn,
}) {
  const selectDOMRef = useRef(null);
  const languageCodeRef = useRef(languages[0].code);

  const onChangeLanguageCode = useCallback((event) => {
    languageCodeRef.current = event.target.value;
  }, []);

  const onClickSave = useCallback(async () => {
    await onSave(languageCodeRef.current);
    await onClose();
  }, [onSave, onClose]);

  const onClickCancel = useCallback(async () => {
    await onCancel();
    await onClose();
  }, [onCancel, onClose]);

  const _onCloseESC = useCallback(async () => {
    await onClose();
  }, [onClose]);

  return (
    <BaseDialog
      title="Select language"
      isOpen={isOpen}
      onESCClose={_onCloseESC}
    >
      <BaseDialog.Body>
        <select
          className="py-2 px-2 border rounded"
          ref={selectDOMRef}
          defaultValue={languageCode}
          onChange={onChangeLanguageCode}
        >
          {languageOptionElements}
        </select>
      </BaseDialog.Body>
      <BaseDialog.Footer>
        <button className="btn-primary-md mr-2" onClick={onClickSave}>
          Save
        </button>
        <button className="btn-default-md" onClick={onClickCancel}>
          Cancel
        </button>
      </BaseDialog.Footer>
    </BaseDialog>
  );
}

LanguageSelectDialog.propTypes = {
  languageCode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};
