import PropTypes from "prop-types";

const defaultFn = () => {};

export default function TagItem({ tag, onClickEdit = defaultFn }) {
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <div className="text-lg">{tag.name}</div>
      <div>
        <span className="text-md mr-4">{tag.count ?? 0}</span>
        <button className="btn-default-sm" onClick={onClickEdit}>
          edit
        </button>
      </div>
    </div>
  );
}

TagItem.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
  }).isRequired,
  onClickEdit: PropTypes.func,
};
