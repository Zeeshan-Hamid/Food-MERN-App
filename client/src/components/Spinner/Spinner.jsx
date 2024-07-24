import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return <BounceLoader cssOverride={override} speedMultiplier={1} />;
};

export default Spinner;
