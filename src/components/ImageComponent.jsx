import { useEffect, useState } from 'react';

const ImageComponent = ({ src, width, height, className }) => {
  const [currentSrc, setcurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );
  useEffect(() => {
    const ImageComponent = new Image();
    ImageComponent.src = src;
    ImageComponent.onload = () => {
      setcurrentSrc(src);
    };
    return () => {
      // clean up func
      ImageComponent.onload = null;
    };
  }, [src]);
  return (
    <img
      className={currentSrc === src ? className : `${className} blur-sm`}
      src={currentSrc}
      width={width}
      height={height}
    />
  );
};

export default ImageComponent;
