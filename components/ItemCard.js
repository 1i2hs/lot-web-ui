import { Fragment, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import useLifeSpan from "../hooks/useLifeSpan";
import OptionDrawer from "./mobile/OptionDrawer";
import { Archive, Kebab, Tag, Remove } from "./Icon";

const defaultFn = () => {};

function PopoverMenu({
  className = "",
  onClickFavorite = defaultFn,
  onClickArchive = defaultFn,
  onClickRemove = defaultFn,
}) {
  return (
    <Menu as="div" className={`relative ${className}`}>
      <Menu.Button>
        <Kebab />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col z-10">
          <Menu.Item>
            <button
              className="whitespace-nowrap text-left py-2 px-4 hover:bg-gray-200 focus:bg-gray-200"
              onClick={onClickFavorite}
            >
              favorite
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="whitespace-nowrap text-left py-2 px-4 hover:bg-gray-200 focus:bg-gray-200"
              onClick={onClickArchive}
            >
              archive
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="whitespace-nowrap text-left py-2 px-4 hover:bg-gray-200 focus:bg-gray-200"
              onClick={onClickRemove}
            >
              remove
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const defaultOnClick = (item, event) => {};

const defaultOnClickFavorite = (item, isFavorite, event) => {};

const defaultOnClickEditTags = (item, tags, event) => {};

const defaultOnClickArchive = (item, isArchived, event) => {};

const defaultOnClickRemove = (item, event) => {};

export default function ItemCard({
  item,
  onClick = defaultOnClick,
  onClickFavorite = defaultOnClickFavorite,
  onClickEditTags = defaultOnClickEditTags,
  onClickArchive = defaultOnClickArchive,
  onClickRemove = defaultOnClickRemove,
}) {
  const {
    id,
    name,
    description,
    alias,
    addedAt,
    updatedAt,
    purchasedAt,
    value,
    currentValue,
    currency,
    lifeSpan,
    tags,
    isFavorite,
    isArchived,
  } = item;

  const [isOptionDrawerOpen, setIsOptionDrawerOpen] = useState(false);
  const {
    lifePercentage,
    age,
    ageStyles,
    formattedCurrentValue,
    formattedValue,
  } = useLifeSpan(value, currentValue, purchasedAt, lifeSpan, currency);

  const _onClick = useCallback(
    (event) => {
      onClick(item, event);
    },
    [item, onClick]
  );

  const _onClickFavorite = useCallback(
    (event) => {
      onClickFavorite(item, !item.isFavorite, event);
    },
    [item, onClickFavorite]
  );

  const memoizedOptionMenus = useMemo(
    () => [
      {
        id: 0,
        name: "edit tags",
        onClick: (event) => {
          console.log("clicked edit tags button");
          onClickEditTags(item, item.tags, event);
        },
      },
      {
        id: 1,
        name: item.isArchived ? "unarchive" : "archive",
        onClick: (event) => {
          console.log("clicked archive button");
          onClickArchive(item, !item.isArchived, event);
        },
      },
      {
        id: 2,
        name: "remove",
        onClick: (event) => {
          console.log("clicked remove button");
          onClickRemove(item, event);
        },
      },
    ],
    [item, onClickEditTags, onClickArchive, onClickRemove]
  );

  const memoizedTags = useMemo(
    () =>
      tags.map(({ id, name }) => (
        <button
          key={id}
          className="text-sm underline text-blue-600"
          onClick={() => {
            console.log(id, name);
          }}
        >
          #{name}
        </button>
      )),
    [tags]
  );

  const onClickOption = useCallback(() => {
    setIsOptionDrawerOpen(true);
  }, []);

  const onCloseOptionDrawer = useCallback(() => {
    setIsOptionDrawerOpen(false);
  }, []);

  return (
    <div
      className="relative flex flex-col justify-between p-4 border rounded-md"
      onClick={_onClick}
    >
      <section className="mb-1 flex flex-col content-start">
        {alias !== undefined ? (
          <>
            <div className="text-lg font-medium w-4/5 whitespace-nowrap overflow-ellipsis overflow-x-hidden">
              {alias}
            </div>
            <div className="mb-2 text-sm text-gray-400">{name}</div>
          </>
        ) : (
          <div className="mb-2 text-lg font-medium w-4/5 whitespace-nowrap overflow-ellipsis overflow-x-hidden">
            {name}
          </div>
        )}
        <div className="mb-2 text-sm">{description}</div>
        <div className="flex flex-row flex-nowrap space-x-2 mb-2 overflow-scroll">
          {memoizedTags}
        </div>
      </section>

      <div className="absolute top-0 right-0 pt-4 pr-3">
        {/* <PopoverMenu className="md:block hidden" /> */}
        <button /*className="md:hidden block"*/ onClick={onClickOption}>
          <Kebab />
        </button>
        <OptionDrawer
          menus={memoizedOptionMenus}
          isOpen={isOptionDrawerOpen}
          onClose={onCloseOptionDrawer}
        />
      </div>

      <section className="flex flex-col content-end justify-end">
        <div className="flex flex-row justify-end">
          <span className={`text-xs ${ageStyles.textColor}`}>{age}</span>
          <span className="text-xs ml-1 mr-1">/</span>
          <span className="text-xs ">{lifeSpan}</span>
        </div>
        <div className="w-full h-2 border rounded-sm">
          <div
            className={`h-full rounded-l-sm ${ageStyles.backgroundColor}`}
            style={{
              width: `${lifePercentage}%`,
            }}
          />
        </div>
        <div className="flex justify-between items-end mt-1 h-7 text-lg font-medium">
          <button
            className={`text-sm underline font-semibold ${
              isFavorite ? "text-yellow-500" : "text-neutral-900"
            }`}
            onClick={_onClickFavorite}
          >
            {isFavorite ? "UNSTAR" : "STAR"}
          </button>
          <div className="leading-5">
            <span
              className="text-sm mr-1 self-end"
              style={{
                textDecorationLine: "line-through",
                textDecorationColor: "red",
                textDecorationThickness: "2px",
              }}
            >
              {formattedValue}
            </span>
            {formattedCurrentValue}
          </div>
        </div>
      </section>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    alias: PropTypes.string,
    addedAt: PropTypes.number.isRequired, // unix epoch time
    updatedAt: PropTypes.number.isRequired, // unix epoch time
    purchasedAt: PropTypes.number.isRequired, // unix epoch time
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    lifeSpan: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    isFavorite: PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onClickFavorite: PropTypes.func,
  onClickEditTags: PropTypes.func,
  onClickArchive: PropTypes.func,
  onClickRemove: PropTypes.func,
};
