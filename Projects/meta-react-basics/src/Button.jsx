import picture from "./images/gay-black.png";
import { useState } from "react";

function Image(props) {
  const image = <img src={picture} />;
  return image;
}

const Button = () => {
  const [showImage, setShowImage] = useState(false);

  const handleClick = () => {
    setShowImage(!showImage);
  };
  return (
    <div>
      <button onClick={handleClick}>Click here for surprise!</button>
      {showImage && <Image />}
    </div>
  );
};

export default Button;
