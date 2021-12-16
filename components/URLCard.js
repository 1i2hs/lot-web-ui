export default function URLCard({
  title,
  content,
  onClick = (event) => {},
  onClickFavorite = (event) => {},
  onClickShare = (event) => {},
  onClickDelete = (event) => {},
  onClickTag = (event) => {},
}) {
  return (
    <div
      className="flex flex-col p-4 border w-full max-w-screen-sm rounded-md"
      onClick={onClick}
    >
      <div className="flex flex-row flex-nowrap space-x-2 mb-2 overflow-scroll">
        <span className="flex-none px-1.5 py-0.5 bg-blue-300 text-sm">
          this is a tag
        </span>
        <span className="flex-none px-1.5 py-0.5 bg-blue-300 text-sm">
          some-kind-of-tag
        </span>
        <span className="flex-none px-1.5 py-0.5 bg-blue-300 text-sm">
          software engineering
        </span>
        <span className="flex-none px-1.5 py-0.5 bg-blue-300 text-sm">
          software engineering
        </span>
        <span className="flex-none px-1.5 py-0.5 bg-blue-300 text-sm">
          software engineering
        </span>
        <span className="flex-none px-1.5 py-0.5 bg-blue-300 text-sm">
          software engineering
        </span>
      </div>
      <div className="text-lg font-medium mb-2">{title}</div>
      <div className="text-base mb-3">{content}</div>
      <div className="flex flex-row space-x-2">
        <button
          className="btn-default-md"
          onClick={onClickFavorite}
        >
          favorite
        </button>
        <button
          className="btn-default-md"
          onClick={onClickShare}
        >
          share
        </button>
        <button
          className="btn-default-md"
          onClick={onClickDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
}
