import { Fragment, useState, useEffect, useCallback } from "react";
import { Transition, Dialog } from "@headlessui/react";
import PropTypes from "prop-types";

const defaultOnClose = () => {};
const defaultMenus = [];

export default function OptionDrawer({
  isOpen,
  onClose = defaultOnClose,
  menus = defaultMenus,
}) {
  const [_isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  const _onClose = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  return (
    <Transition appear show={_isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={_onClose}>
        <div>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="bg-opacity-0"
            enterTo="bg-opacity-30"
            leave="transition-opacity duration-200"
            leaveFrom="bg-opacity-30"
            leaveTo="bg-opacity-0"
          >
            <Dialog.Overlay>
              <div className="absolute inset-0 bg-opacity-30 bg-black" />
            </Dialog.Overlay>
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition duration-200"
            leaveFrom="tranlate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="absolute bottom-0 w-full flex flex-col divide-y divide-gray-100 rounded-t-md bg-white">
              {menus.map((menu) => (
                <button
                  key={menu.id}
                  className="flex items-center p-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    menu.onClick(event);
                    setIsOpen(false);
                    onClose();
                  }}
                >
                  {menu.icon !== undefined && (
                    <span className="mr-4">{menu.icon}</span>
                  )}
                  <span className="text-lg">{menu.name}</span>
                </button>
              ))}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

OptionDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func,
    })
  ),
};
