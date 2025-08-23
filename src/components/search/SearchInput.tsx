import { useReducer, useRef, type RefObject } from "react";

interface SearchState {
  orderName: string;
  orderState: string;
}

type SearchAction = { type: "SEARCH"; field: keyof SearchState; value: string };

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const SearchInput = () => {
  const [searchInput, dispatch] = useReducer(searchReducer, {
    orderName: "",
    orderState: "",
  });

  const tO: RefObject<number | null> = useRef(0);

  const submitSearch = () => {
    console.log("backend call, data: ", searchInput);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof SearchState;

    // állapot update
    dispatch({ type: "SEARCH", field: key, value: value });

    // debounce
    if (tO.current) clearTimeout(tO.current);

    tO.current = setTimeout(() => {
      submitSearch();
    }, 500);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitSearch();
      }}
    >
      <input
        type="search"
        name="orderName"
        id="orderName"
        value={searchInput.orderName}
        onChange={handleSearch}
      />
      <input
        type="search"
        name="orderState"
        id="orderState"
        value={searchInput.orderState}
        onChange={handleSearch}
      />
    </form>
  );
};

export default SearchInput;
