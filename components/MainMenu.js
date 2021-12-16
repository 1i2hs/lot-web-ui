import { useCallback, useEffect, useState } from "react";

export default function MainMenu({
  menuItems = [
    {
      id: "bm-1",
      name: "All",
      value: "all",
    },
    {
      id: "bm-2",
      name: "Favorites",
      value: "favorites",
    },
    {
      id: "bm-3",
      name: "Tags",
      value: "tags",
    },
  ],
  menuItemId = "bm-1",
  onChangeMenuItem = () => {},
}) {
  const [itemId, setItemId] = useState(`bm-1`);
  const onChange = useCallback((event) => {
    const { id, value } = event.target;
    setItemId(id);
    onChangeMenuItem({ id, value });
  }, []);

  useEffect(() => {
    setItemId(menuItemId);
    onChangeMenuItem(menuItemId);
  }, [menuItemId]);

  return (
    <div className="flex flex-col w-full">
      {menuItems.map(({ id, name, value }, index) => {
        return (
          <div
            key={id}
            className={`relative h-16 ${
              index < menuItems.length - 1 ? "border-b" : ""
            }`}
          >
            <label
              className={`absolute underline text-lg left-4 top-2/4 transform -translate-y-1/2 ${
                id === itemId ? "highlight" : "after:w-0"
              }`}
            >
              {name}
            </label>
            <input
              className="absolute appearance-none outline-none w-full h-full cursor-pointer left-4"
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
