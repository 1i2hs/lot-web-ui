import { useCallback, useEffect, useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { BaseDialog } from "./base/Dialog";
import { DateInput, TextInput } from "./base/Input";
import LifeSpanInput from "./LifeSpanInput";
import ValueInput from "./ValueInput";
import TagInput from "./TagInput";

function initializeItemRef(itemRef) {
  itemRef.current = {
    name: "",
    alias: "",
    description: "",
    purchasedAt: -1,
    lifeSpan: -1,
    dateType: "years",
    value: -1,
    currency: "",
    tags: [],
  };
}

const defaultFn = () => {};

export default function AddItemDialog({
  isOpen = false,
  onAdd = defaultFn,
  onCancel = defaultFn,
  onClose = defaultFn,
}) {
  const itemRef = useRef({
    name: "",
    alias: "",
    description: "",
    purchasedAt: -1,
    lifeSpan: -1,
    dateType: "years",
    value: -1,
    currency: "",
    tags: [],
  });

  /**
   * Dialog callbacks
   */
  const _onCloseESC = useCallback(async () => {
    await onClose();
    initializeItemRef(itemRef);
  }, [onClose]);

  const onClickAdd = useCallback(async () => {
    await onAdd(itemRef.current);
    await onClose();
    initializeItemRef(itemRef);
  }, [onAdd, onClose]);

  const onClickCancel = useCallback(async () => {
    await onCancel();
    await onClose();
    initializeItemRef(itemRef);
  }, [onCancel, onClose]);

  /**
   * Input callbacks
   */
  const onChangeName = useCallback((name) => {
    itemRef.current.name = name;
  }, []);

  const onChangeAlias = useCallback((alias) => {
    itemRef.current.alias = alias;
  }, []);

  const onChangeDescription = useCallback((description) => {
    itemRef.current.description = description;
  }, []);

  const onChangePurchasedAt = useCallback((date) => {
    itemRef.current.purchasedAt = date;
  }, []);

  const onChangeLifeSpan = useCallback((lifeSpan, dateType) => {
    console.log(lifeSpan, dateType);
    itemRef.current.lifeSpan = lifeSpan;
    itemRef.current.dateType = dateType;
  }, []);

  const onChangePrice = useCallback((price, currencyCode) => {
    console.log(price, currencyCode);
    itemRef.current.value = price;
    itemRef.current.currency = currencyCode;
  }, []);

  // TODO: convert tags
  // const onChangeTags = useCallback((tags) => {

  //   itemRef.current.tags = tags;
  // })

  return (
    <BaseDialog title="Add a new item" isOpen={isOpen} onESCClose={_onCloseESC}>
      <BaseDialog.Body>
        <TextInput
          htmlId="newItemName"
          label="NAME"
          placeholder="a name of the item"
          onChange={onChangeName}
        />
        <TextInput
          htmlId="newItemAlias"
          label="NICKNAME"
          placeholder="any nickname"
          onChange={onChangeAlias}
        />
        <TextInput
          htmlId="newItemDescription"
          label="DESCRIPTION"
          placeholder="any description"
          onChange={onChangeDescription}
        />
        <DateInput
          htmlId="newPurchasedDate"
          label="PURCHASED AT"
          placeholder="purchased date"
          onChange={onChangePurchasedAt}
        />
        <LifeSpanInput
          htmlId="newLifeSpan"
          label="EXPECTED LIFESPAN"
          placeholder="years/months/days"
          onChange={onChangeLifeSpan}
        />
        <ValueInput
          htmlId="newPrice"
          label="PRICE"
          placeholder="price of the item"
          onChange={onChangePrice}
        />
        <TagInput
          htmlId="tags"
          label="TAGS"
          placeholder="any tags"
          onChangeTags={(tags) => console.log(tags)}
        />
      </BaseDialog.Body>

      <BaseDialog.Footer>
        <button className="btn-primary-md mr-2" onClick={onClickAdd}>
          Add
        </button>
        <button className="btn-default-md" onClick={onClickCancel}>
          Cancel
        </button>
      </BaseDialog.Footer>
    </BaseDialog>
  );
}

AddItemDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};
