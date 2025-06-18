import React from "react";
import { BallTriangle ,TailSpin} from "react-loader-spinner";

function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
  <TailSpin
  height={100}
  width={100}
  color="#FFFFFF"
  ariaLabel="loading"
  visible={true}
/>
    </div>
  );
}

export default Loader;
