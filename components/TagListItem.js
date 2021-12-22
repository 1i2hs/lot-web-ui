import { useCallback } from "react";
import PropTypes from "prop-types";

const defaultFn = () => {};

export default function TagListItem({ tag, onClickEdit = defaultFn }) {
  const _onClickEdit = useCallback(
    (event) => {
      event.stopPropagation();
      onClickEdit(event);
    },
    [onClickEdit]
  );

  return (
    <a href={`/home?tag=${tag.name}`} className="flex justify-between items-center p-4 w-full">
      <div className="text-lg text-blue-600 underline">#{tag.name}</div>
      <div>
        <span className="text-md mr-4">{tag.count ?? 0}</span>
        <button className="btn-default-sm" onClick={_onClickEdit}>
          edit
        </button>
      </div>
    </a>
  );
}

TagListItem.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
  }).isRequired,
  onClickEdit: PropTypes.func,
};
