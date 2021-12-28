import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BaseDialog } from "./base/Dialog";
import { currencies } from "../config";

const defaultFn = () => {};

const currencyOptionElements = currencies.map((currency) => {
  return (
    <option key={currency.code} value={currency.code}>
      {currency.description}({currency.code})
    </option>
  );
});

export default function CurrencySelectDialog({
  currencyCode,
  isOpen = false,
  onSave = defaultFn,
  onCancel = defaultFn,
  onClose = defaultFn,
}) {
  const selectDOMRef = useRef(null);
  const currencyCodeRef = useRef("USD");

  const onChangeCurrencyCode = useCallback((event) => {
    currencyCodeRef.current = event.target.value;
  }, []);

  const onClickSave = useCallback(async () => {
    await onSave(currencyCodeRef.current);
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
      title="Select currency"
      isOpen={isOpen}
      onESCClose={_onCloseESC}
    >
      <BaseDialog.Body>
        <select
          className="py-2 px-2 border rounded"
          ref={selectDOMRef}
          defaultValue={currencyCode}
          onChange={onChangeCurrencyCode}
        >
          {currencyOptionElements}
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

CurrencySelectDialog.propTypes = {
  currencyCode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};
