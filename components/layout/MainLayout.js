import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import BottomMenu from "../mobile/BottomMenu";
import ToolBar from "../mobile/ToolBar";

export default function MainLayout({ children }) {
  const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false);
  const [isFilterControlOpen, setIsFilterControlOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const menuId = router.pathname.slice(1);

  const menus = useMemo(() => {
    const menuMap = {
      home: [
        {
          id: 0,
          name: t("filter"),
          onClick: () => {
            // setIsFilterControlOpen(true);
          },
        },
        {
          id: 1,
          name: t("add"),
          onClick: () => {
            router.push("?addItem=true", undefined, { shallow: true });
          },
        },
      ],
      favorites: [
        {
          id: 0,
          name: t("filter"),
          onClick: () => {
            setIsFilterControlOpen(true);
          },
        },
      ],
      tags: [
        {
          id: 0,
          name: t("add"),
          onClick: () => {
            router.push("?addTag=true", undefined, { shallow: true });
          },
        },
      ],
    };
    return menuMap[menuId] ?? [];
  }, [menuId, t]);

  const onChangeMenuItem = useCallback(({ id, value }) => {
    router.push(`/${id}`);
  }, []);

  const onChangeDrawerState = useCallback((isOpen) => {
    setIsFilterControlOpen(isOpen);
  }, []);

  return (
    <div className="relative flex flex-col h-screen">
      <ToolBar
        className="absolute inset-x-0 top-0 z-10 h-16 bg-white bg-opacity-50 backdrop-blur-md border-b"
        title={menuId.toUpperCase()}
        menus={menus}
        drawerComponent={<div>HEAD</div>}
        isDrawerOpen={isFilterControlOpen}
        onChangeDrawerState={onChangeDrawerState}
      />
      <main className={`h-screen overflow-y-scroll pt-16 pb-20`}>
        {children}
      </main>

      <BottomMenu
        className="absolute inset-x-0 bottom-0 z-10 h-20 bg-white bg-opacity-50 backdrop-blur-md border-t"
        menuItemId={menuId}
        onChangeMenuItem={onChangeMenuItem}
      />
      
    </div>
  );
}
