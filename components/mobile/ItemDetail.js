import { Fragment, useState, useMemo, useEffect, useCallback } from "react";
import { Transition, Dialog } from "@headlessui/react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Archive, Cross, Edit, Favorite, Remove, Tag } from "../Icon";
import useLifeSpan from "../../hooks/useLifeSpan";

const defaultOnClose = () => {};

export default function ItemDetail({ item, isOpen, onClose = defaultOnClose }) {
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

  const [_isOpen, setIsOpen] = useState(false);
  const {
    lifePercentage,
    age,
    ageStyles,
    formattedCurrentValue,
    formattedValue,
  } = useLifeSpan(value, currentValue, purchasedAt, lifeSpan, currency);

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

  const onClickFavorite = useCallback((event) => {}, [item]);

  const onClickEditTags = useCallback((event) => {}, [item]);

  const onClickEdit = useCallback((event) => {}, [item]);

  const onClickArchive = useCallback((event) => {}, [item]);

  const onClickRemove = useCallback((event) => {}, [item]);

  const onClickClose = useCallback((event) => {
    setIsOpen(false);
    onClose();
  }, []);

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

  return (
    <Transition appear show={_isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-20" onClose={_onClose}>
        <Transition.Child
          as={Fragment}
          enter="transform transition duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transform transition duration-200"
          leaveFrom="tranlate-y-0"
          leaveTo="translate-y-full"
        >
          <main className="absolute bottom-0 w-full h-screen flex flex-col rounded-t-md bg-white overflow-y-scroll">
            <div className="h-16 p-4 flex justify-between items-center sticky top-0 bg-white">
              <div></div>
              <button onClick={onClickClose}>
                <Cross />
              </button>
            </div>

            <div className="px-4 mb-2 flex flex-col content-start">
              {alias !== undefined ? (
                <>
                  <div className="text-xl font-medium w-4/5">{alias}</div>
                  <div className="mb-2 text-md text-gray-400">{name}</div>
                </>
              ) : (
                <div className="mb-2 text-xl font-medium w-4/5 whitespace-nowrap overflow-ellipsis overflow-x-hidden">
                  {name}
                </div>
              )}
            </div>

            <img className="mb-2" src="https://placeimg.com/480/480/any" />

            <section className="px-4 mb-2 flex flex-col">
              <div className="flex justify-between mb-2">
                <div className="flex gap-2">
                  <button onClick={onClickFavorite}>
                    <Favorite isFavorite={isFavorite} />
                  </button>
                  <button onClick={onClickEditTags}>
                    <Tag />
                  </button>
                  <button onClick={onClickEdit}>
                    <Edit />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button onClick={onClickArchive}>
                    <Archive isArchived={isArchived} />
                  </button>

                  <button onClick={onClickRemove}>
                    <Remove />
                  </button>
                </div>
              </div>

              <p className="mb-2 text-md font-light">{description}</p>
              <div className="mb-2 flex flex-row flex-nowrap space-x-2 overflow-scroll">
                {memoizedTags}
              </div>
              <div className="text-xs">
                Updated at:{" "}
                {dayjs.unix(updatedAt).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </section>

            <section className="absolute bottom-0 w-screen flex flex-col content-end justify-end px-4 py-2 bg-white">
              <div className="flex flex-row justify-between">
                <div className="flex items-baseline">
                  <div className="text-sm mr-1">From: </div>
                  <div className="font-medium">
                    {dayjs.unix(purchasedAt).format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
                <div>
                  <span className={`text-md ${ageStyles.textColor}`}>
                    {age}
                  </span>
                  <span className="text-md ml-1 mr-1">/</span>
                  <span className="text-md">{lifeSpan}</span>
                </div>
              </div>
              <div className="w-full h-3 border rounded-sm">
                <div
                  className={`h-full rounded-l-sm ${ageStyles.backgroundColor}`}
                  style={{
                    width: `${lifePercentage}%`,
                  }}
                />
              </div>
              <div className="flex justify-end items-baseline mt-1 text-lg font-medium">
                <div
                  className="text-sm mr-1"
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationColor: "red",
                    textDecorationThickness: "2px",
                  }}
                >
                  {formattedValue}
                </div>
                <div>{formattedCurrentValue}</div>
              </div>
            </section>
          </main>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

ItemDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func,
    })
  ),
};
