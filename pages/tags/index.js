import { useCallback, useEffect, useMemo, useReducer } from "react";
import EditTagDialog from "../../components/EditTagDialog";
import SearchTextField from "../../components/SearchTextField";
import TagItem from "../../components/TagItem";

const _tags = [
  {
    id: 0,
    name: "Apple",
  },
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Valuable",
  },
  {
    id: 4,
    name: "Intel",
  },
  {
    id: 5,
    name: "Apple",
  },
  {
    id: 6,
    name: "Laptop",
  },
  {
    id: 7,
    name: "Valuable",
  },
  {
    id: 8,
    name: "Intel",
  },
  {
    id: 9,
    name: "Apple",
  },
  {
    id: 10,
    name: "Laptop",
  },
  {
    id: 11,
    name: "Valuable",
  },
  {
    id: 12,
    name: "Intel",
  },
  {
    id: 13,
    name: "Apple",
  },
  {
    id: 14,
    name: "Laptop",
  },
  {
    id: 15,
    name: "Valuable",
  },
  {
    id: 16,
    name: "Intel",
  },
];

const ACTION_TYPE = {
  SET_TAGS: "SET_TAGS",
  START_EDIT: "START_EDIT",
  SAVE_EDIT: "SAVE_EDIT",
  FINISH_EDIT: "FINISH_EDIT",
};

const initialState = {
  isEditTagDialogOpen: false,
  tags: [],
  targetTag: null,
  editedTag: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    case ACTION_TYPE.START_EDIT:
      return {
        ...state,
        isEditTagDialogOpen: true,
        targetTag: action.targetTag,
      };
    case ACTION_TYPE.SAVE_EDIT:
      return {
        ...state,
        tags: state.tags.map((tag) => {
          if (tag.id === action.editedTag.id) {
            return { ...action.editedTag };
          }
          return tag;
        }),
      };
    case ACTION_TYPE.FINISH_EDIT:
      return {
        ...state,
        isEditTagDialogOpen: false,
        targetTag: null,
        editedTag: null,
      };
    default:
      throw new Error(`Invalid action type for a reducer`);
  }
}

export default function Tags({}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  useEffect(() => {
    async function fetchTags() {
      const tags = await Promise.resolve(_tags);
      dispatch({ type: ACTION_TYPE.SET_TAGS, tags });
    }
    fetchTags();
  }, []);

  const onSaveEdit = useCallback(async (editedTag) => {
    console.log(editedTag);
    // TODO: asynchronously store edited tag data
    dispatch({ type: ACTION_TYPE.SAVE_EDIT, editedTag });
  }, []);

  const onCloseEditDialog = useCallback(() => {
    dispatch({ type: ACTION_TYPE.FINISH_EDIT });
  }, []);

  const tagElements = useMemo(
    () =>
      state.tags.map((tag) => (
        <TagItem
          key={tag.id}
          tag={tag}
          onClickEdit={() =>
            dispatch({ type: ACTION_TYPE.START_EDIT, targetTag: tag })
          }
        />
      )),
    [state.tags]
  );
  return (
    <>
      <div className="p-2">
        <SearchTextField
          className="sticky top-1 z-10 bg-slate-100"
          placeholder="Search your items"
          onSearch={(keyword) => {
            console.log(keyword);
          }}
        />
        <div className="flex flex-col divide-y divide-slate-300 divide-dotted">
          {tagElements}
        </div>
      </div>
      <EditTagDialog
        isOpen={state.isEditTagDialogOpen}
        tag={state.targetTag}
        onSave={onSaveEdit}
        onClose={onCloseEditDialog}
      />
    </>
  );
}
