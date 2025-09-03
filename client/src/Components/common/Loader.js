

import "./Loader.css";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
