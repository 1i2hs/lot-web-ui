import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BaseDialog } from "./base/Dialog";
import { TextInput } from "./base/Input";

const defaultFn = () => {};

const defaultTag = { id: -1, name: "" };

export default function EditTagDialog({
  tag,
  isOpen = false,
  onSave = defaultFn,
  onCancel = defaultFn,
  onClose = defaultFn,
}) {
  const tagRef = useRef(defaultTag);
  const [errorState, setErrorState] = useState({
    errorMessage: "",
    isInvalid: false,
  });

  const tagName = tag?.name ?? "";

  useEffect(() => {
    if (tag !== undefined && tag !== null) {
      tagRef.current = Object.assign({}, tag);
    }
  }, [tag]);

  const initialize = useCallback(() => {
    tagRef.current = defaultTag;
    setErrorState({
      errorMessage: "",
      isInvalid: false,
    });
  }, []);

  const _onCloseESC = useCallback(async () => {
    await onClose();
    initialize();
  }, [onClose, initialize]);

  const onClickSave = useCallback(async () => {
    if (tagRef.current.name === "") {
      setErrorState({
        errorMessage: "Tag name must not be blank!",
        isInvalid: true,
      });
      return;
    }
    await onSave(tagRef.current);
    await onClose();
    initialize();
  }, [onSave, onClose, initialize]);

  const onClickCancel = useCallback(async () => {
    await onCancel();
    await onClose();
    initialize();
  }, [onCancel, onClose, initialize]);

  const onChangeTagName = useCallback((name) => {
    tagRef.current.name = name;
  }, []);

  return (
    <BaseDialog title="Edit tag" isOpen={isOpen} onESCClose={_onCloseESC}>
      <BaseDialog.Body>
        <TextInput
          htmlId="editTag"
          placeholder="input another tag name"
          onChange={onChangeTagName}
          value={tagName}
          errorMessage={errorState.errorMessage}
          isInvalid={errorState.isInvalid}
        />
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

EditTagDialog.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
  }),
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};
