import { FC } from "react";

import "./styles.scss";

const Loading: FC = () => {
  return (
    <div className="loading-screen">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loading;
