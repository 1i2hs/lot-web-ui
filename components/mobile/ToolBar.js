import { useEffect, useState, useMemo, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import OptionDrawer from "./OptionDrawer";
import { Cross } from "../Icon";

const defaultFn = () => {};

export default function ToolBar({
  className = "",
  title = "",
  menus = [],
  drawerComponent = null,
  isDrawerOpen = false,
  onChangeDrawerState = defaultFn,
}) {
  const [isOptionDrawerOpen, setIsOptionDrawerOpen] = useState(false);
  const [_isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (drawerComponent === null && onChangeDrawerState !== defaultFn) {
    throw new Error(
      `You must provide 'drawerComponent' prop to use 'isDrawerOpen' and 'onChangeDrawerState' props`
    );
  }

  useEffect(() => {
    setIsDrawerOpen(isDrawerOpen);
  }, [isDrawerOpen]);

  const [mainMenus, subMenus] = useMemo(
    () =>
      menus.reduce(
        (tuple, menu, index) => {
          if (index < 3) {
            tuple[0].push(menu);
          } else {
            tuple[1].push(menu);
          }
          return tuple;
        },
        [[], []]
      ),
    [menus]
  );

  const onClickOption = useCallback(() => {
    setIsOptionDrawerOpen(true);
  }, []);

  const onCloseOptionDrawer = useCallback(() => {
    setIsOptionDrawerOpen(false);
  }, []);

  const onClickCloseDrawer = useCallback(() => {
    onChangeDrawerState(false);
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className={className}>
      {drawerComponent !== null && (
        <Transition show={_isDrawerOpen}>
          <Transition.Child
            as={Fragment}
            enter="transform transition duration-500"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition duration-500"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <div className="absolute inset-x-0 p-2 flex flex-col items-center z-20">
              <div className="bg-white w-full">{drawerComponent}</div>
              <Transition.Child
                as={Fragment}
                enter="transform transition duration-1000"
                enterFrom="-translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition duration-500"
                leaveFrom="translate-y-0"
                leaveTo="-translate-y-full"
              >
                <button
                  className="mt-2 w-16 h-16 rounded-full underline bg-slate-700 text-white"
                  onClick={onClickCloseDrawer}
                >
                  close
                </button>
              </Transition.Child>
            </div>
          </Transition.Child>
        </Transition>
      )}
      <div className="relative h-16 p-4 flex justify-between gap-4 items-center">
        <div className="text-2xl font-bold">{title}</div>
        <div className="flex justify-end gap-2 items-center text-sm">
          {mainMenus.map((menu) => (
            <button
              key={menu.id}
              className="px-1 py-0.5 underline font-medium"
              onClick={menu.onClick}
            >
              {menu.name}
            </button>
          ))}
          {subMenus.length > 0 && (
            <>
              <button lassName="px-1 py-0.5" onClick={onClickOption}>
                <Kebab />
              </button>
              <OptionDrawer
                menus={subMenus}
                isOpen={isOptionDrawerOpen}
                onClose={onCloseOptionDrawer}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ToolBar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
    })
  ),
  drawerComponent: PropTypes.element,
  isDrawerOpen: PropTypes.bool,
  onChangeDrawerState: PropTypes.func,
};
