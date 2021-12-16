import { useCallback, useEffect, useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const defaultFn = () => {};

export function BaseDialog({
  title,
  children = [],
  isOpen = false,
  onESCClose = defaultFn,
}) {
  const body =
    children.find((child) => child.type.name === Body.name)?.props.children ??
    null;
  const footer =
    children.find((child) => child.type.name === Footer.name)?.props.children ??
    null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30"
        static
        onClose={onESCClose}
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
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-md max-h-screen py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title className="mb-4 px-6 text-lg font-medium leading-6 text-gray-800">
                {title}
              </Dialog.Title>
              <div className="flex flex-col px-6 max-h-96 overflow-scroll gap-2">
                {body}
              </div>

              <div className="flex justify-end px-6 mt-4">{footer}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

BaseDialog.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool.isRequired,
  onESCClose: PropTypes.func,
};

function Body() {
  return null;
}

function Footer() {
  return null;
}

BaseDialog.Body = Body;
// BaseDialog.Body.prototype.constructor = Body;
BaseDialog.Footer = Footer;
// BaseDialog.Footer.prototype.constructor = Footer;
