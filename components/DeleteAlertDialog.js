import { useCallback, useEffect, useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function DeleteAlertDialog({
  title = "",
  message = "",
  isOpen,
  onDelete = () => {},
  onCancel = () => {},
  onClose = () => {},
}) {
  const [_isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  const onClickDelete = useCallback(() => {
    onDelete();
    onClose();
    setIsOpen(false);
  }, [onDelete, onClose]);

  const onClickCancel = useCallback(() => {
    onCancel();
    onClose();
    setIsOpen(false);
  }, [onCancel, onClose]);

  return (
    <Transition appear show={_isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        onClose={() => {
          setIsOpen(false);
          onClose();
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="bg-opacity-0"
            enterTo="bg-opacity-30"
            leave="transition-opacity duration-200"
            leaveFrom="bg-opacity-30"
            leaveTo="bg-opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0">
              <div className="absolute inset-0 bg-opacity-30 bg-black" />
            </Dialog.Overlay>
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-md max-h-screen py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title className="px-6 text-lg font-medium leading-6 text-gray-800">
                {title}
              </Dialog.Title>

              <div className="mt-2">
                <p className="px-6 text-sm text-gray-500">{message}</p>
              </div>

              <div className="flex justify-end px-6 mt-4">
                <button
                  className="btn-error-md mr-2"
                  onClick={onClickDelete}
                >
                  Delete
                </button>
                <button className="btn-default-md" onClick={onClickCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
