import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import BottomMenu from "../mobile/BottomMenu";
import ToolBar from "../mobile/ToolBar";
import AddItemDialog from "../AddItemDialog";

export default function MainLayout({ children }) {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isSearchTextFieldOpen, setIsSearchTextFieldOpen] = useState(false);
  const router = useRouter();

  const menuId = router.pathname.slice(1);

  const menus = useMemo(() => {
    const menuMap = {
      home: [
        {
          id: 0,
          name: "Filter",
          onClick: () => {
            setIsSearchTextFieldOpen(true);
          },
        },
        {
          id: 1,
          name: "Add",
          onClick: () => setIsAddItemDialogOpen(true),
        },
      ],
      favorites: [
        {
          id: 0,
          name: "Filter",
          onClick: () => {
            setIsSearchTextFieldOpen(true);
          },
        },
      ],
      tags: [
        {
          id: 0,
          name: "Add",
          onClick: () => setIsAddItemDialogOpen(true),
        },
      ],
    };
    return menuMap[menuId] ?? [];
  }, [menuId]);

  const onChangeMenuItem = useCallback(({ id, value }) => {
    router.push(`/${id}`);
  }, []);

  const onChangeDrawerState = useCallback((isOpen) => {
    setIsSearchTextFieldOpen(isOpen);
  }, []);

  return (
    <div className="relative grid grid-rows-[64px_1fr_80px] h-screen">
      <ToolBar
        className="bg-white border-b"
        title={menuId.toUpperCase()}
        menus={menus}
        drawerComponent={<div>HEAD</div>}
        isDrawerOpen={isSearchTextFieldOpen}
        onChangeDrawerState={onChangeDrawerState}
      />
      <main className="grow overflow-y-scroll">{children}</main>
      <BottomMenu
        className="flex-none h-20 bg-white border-t"
        menuItemId={menuId}
        onChangeMenuItem={onChangeMenuItem}
      />
      <AddItemDialog
        isOpen={isAddItemDialogOpen}
        onClose={() => {
          setIsAddItemDialogOpen(false);
        }}
        onAdd={(item) => {
          console.log(item);
        }}
      />
    </div>
  );
}
