import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BaseDialog } from "./base/Dialog";
import { TextInput } from "./base/Input";

const defaultFn = () => {};

const validateTagName = (tagName) => {
  if (tagName === "") {
    throw new Error(`Tag name must not be blank!`);
  }
  if (tagName.split(" ").length > 1) {
    throw new Error(`There must be no space for the tag: ${tagName}`);
  }
};

export default function AddTagDialog({
  isOpen = false,
  onAdd = defaultFn,
  onCancel = defaultFn,
  onClose = defaultFn,
}) {
  const tagRef = useRef({ id: -1, name: "" });
  const [errorState, setErrorState] = useState({
    errorMessage: "",
    isInvalid: false,
  });

  const initialize = useCallback(() => {
    tagRef.current = { id: -1, name: "" };
    setErrorState({
      errorMessage: "",
      isInvalid: false,
    });
  }, []);

  const _onCloseESC = useCallback(async () => {
    await onClose();
    initialize();
  }, [onClose, initialize]);

  const onClickAdd = useCallback(async () => {
    try {
      validateTagName(tagRef.current.name);
      await onAdd(tagRef.current);
      await onClose();
      initialize();
    } catch (error) {
      setErrorState({
        errorMessage: error.message,
        isInvalid: true,
      });
    }
  }, [onAdd, onClose, initialize]);

  const onClickCancel = useCallback(async () => {
    await onCancel();
    await onClose();
    initialize();
  }, [onCancel, onClose, initialize]);

  const onChangeTagName = useCallback((name) => {
    tagRef.current.name = name;
  }, []);

  return (
    <BaseDialog title="Add tag" isOpen={isOpen} onESCClose={_onCloseESC}>
      <BaseDialog.Body>
        <TextInput
          htmlId="addTag"
          placeholder="a name of a tag"
          onChange={onChangeTagName}
          errorMessage={errorState.errorMessage}
          isInvalid={errorState.isInvalid}
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

AddTagDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};
