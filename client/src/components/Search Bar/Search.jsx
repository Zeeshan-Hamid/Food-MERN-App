import "./style.css";

const Search = ({ setSearch }) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search Food here"
      className="search"
      onChange={({ currentTarget: input }) => {
        setSearch(input.value);
      }}
    />
  );
};

export default Search;
