import React, { memo } from "react";

interface IProps {
  type: string;
  className?: string;
  style?: any;
  onClick?: () => void;
}

function Icon(props: IProps) {
  const { type, onClick, className, style } = props;

  return (
    <i
      className={`icon icon-${type}${className ? " " + className : ""}`}
      onClick={() => onClick?.()}
      style={style}
    />
  );
}

export default memo(Icon);
