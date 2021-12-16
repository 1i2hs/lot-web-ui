import { useCallback, useEffect, useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function AddUrlSection({
  onChangeUrl = () => {},
  onChangeTags = () => {},
  suggestions = [],
}) {
  const urlInputDOMRef = useRef(null);
  const [tags, setTags] = useState([]);

  const onKeyDown = useCallback((event) => {
    if (event.keyCode === 32 && event.target.value.trim() !== "") {
      const tag = event.target.value.trim();
      setTags((prevTags) => {
        const newTags = prevTags.concat([tag]);
        onChangeTags(newTags);
        return newTags;
      });
      event.target.value = "";
    }
  }, []);

  return (
    <section className="flex flex-col mt-6">
      <div className="flex flex-row py-1 px-2 border rounded border-gray-400">
        <input
          className="flex-grow px-2 focus:outline-none"
          type="url"
          placeholder="https://www.some-post.com"
          ref={urlInputDOMRef}
          onChange={(event) => {
            onChangeUrl(event.target.value);
          }}
        ></input>
        <button
          className="btn-default-md"
          onClick={() => {
            urlInputDOMRef.current.value = "";
            onChangeUrl("");
          }}
        >
          clear
        </button>
      </div>

      <div className="flex flex-row items-center mt-2 p-2 w-full border rounded border-gray-400 overflow-x-auto">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-2 bg-blue-400 rounded flex flex-row items-center mr-1"
          >
            <span className="py-1 mr-1 text-white">{tag}</span>
            <button
              key={index}
              className="w-5 h-5 text-white flex items-center justify-center"
              onClick={() => {
                setTags((prevTags) => {
                  const newTags = prevTags.filter((prevTag) => prevTag !== tag);
                  onChangeTags(newTags);
                  return newTags;
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ))}
        <input
          className="px-2 py-0.5 outline-none"
          type="text"
          placeholder="#some-tag"
          onKeyDown={onKeyDown}
        ></input>
      </div>
    </section>
  );
}

export default function AddUrlDialog({
  isOpen,
  onAdd = () => {},
  onCancel = () => {},
  onClose = () => {},
}) {
  const [_isOpen, setIsOpen] = useState(false);
  const [urlDataList, setUrlDataList] = useState([{ url: "", tagList: [] }]);

  useEffect(() => {
    setIsOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  }, [isOpen]);

  const onClickAddMore = useCallback(() => {
    setUrlDataList((prevUrlDataList) =>
      prevUrlDataList.concat([{ url: "", tagList: [] }])
    );
  }, []);

  const onClickAdd = useCallback(() => {
    onAdd(urlDataList);
    onClose();
    setUrlDataList([{ url: "", tagList: [] }]);
    setIsOpen(false);
  }, [urlDataList]);

  const onClickCancel = useCallback(() => {
    onCancel();
    onClose();
    setUrlDataList([{ url: "", tagList: [] }]);
    setIsOpen(false);
  }, []);

  return (
    <Transition show={_isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10"
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
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-md max-h-screen py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title className="px-6 text-lg font-medium leading-6 text-gray-800">
                Add URL
              </Dialog.Title>
              <div className="flex flex-col px-6 max-h-96 overflow-scroll">
                {urlDataList.map((_, index) => (
                  <AddUrlSection
                    key={index}
                    onChangeUrl={(_url) => {
                      urlDataList[index].url = _url;
                    }}
                    onChangeTags={(tags) => {
                      console.log(tags);
                      urlDataList[index].tagList = tags;
                    }}
                  />
                ))}
                <button
                  className="mt-3 btn-default-md"
                  onClick={onClickAddMore}
                >
                  Add more
                </button>
              </div>

              <div className="flex justify-end px-6 mt-4">
                <button
                  className="btn-primary-md mr-2"
                  onClick={onClickAdd}
                >
                  Add
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
