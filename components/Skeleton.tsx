import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  dark?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width,
  height,
  borderRadius,
  dark = false,
}) => {
  const style: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  return (
    <div
      className={`${dark ? "skeleton-dark" : "skeleton"} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
