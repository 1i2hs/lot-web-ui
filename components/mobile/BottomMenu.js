import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const defaultFn = () => {};

export default function BottomMenu({
  className = "",
  menuItems = [
    {
      id: "home",
      name: "Home",
      value: "home",
    },
    {
      id: "favorites",
      name: "Favorites",
      value: "favorites",
    },
    {
      id: "tags",
      name: "Tags",
      value: "tags",
    },
    {
      id: "settings",
      name: "Settings",
      value: "settings",
    },
  ],
  menuItemId = "bm-1",
  onChangeMenuItem = defaultFn,
}) {
  const [itemId, setItemId] = useState(`items`);
  const onChange = useCallback(
    (event) => {
      const { id, value } = event.target;
      setItemId(id);
      onChangeMenuItem({ id, value });
    },
    [onChangeMenuItem]
  );

  useEffect(() => {
    setItemId(menuItemId);
  }, [menuItemId, onChangeMenuItem]);

  return (
    <div
      // className={`absolute inset-x-0 bottom-0 z-10 flex justify-evenly h-16 ${className}`}
      className={`flex justify-evenly h-16 ${className}`}
    >
      {menuItems.map(({ id, name, value }, index) => {
        return (
          <div key={id} className="relative flex-1">
            <label
              className={`absolute underline text-sm top-2/4 left-2/4 transform -translate-y-1/2 -translate-x-1/2 ${
                id === itemId ? "highlight" : "after:w-0"
              }`}
            >
              {name}
            </label>
            <input
              className="absolute appearance-none outline-none w-full h-full cursor-pointer"
              type="radio"
              id={id}
              name="bottom-menu"
              value={value}
              onChange={onChange}
              checked={id === itemId}
            />
          </div>
        );
      })}
    </div>
  );
}

BottomMenu.propTypes = {
  className: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  menuItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChangeMenuItem: PropTypes.func,
};
