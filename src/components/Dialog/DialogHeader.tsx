import * as React from "react";

type Props = {};

export const DialogHeader: React.FC<Props> = ({ children }) => {
  return <div className="dialog__header">{children}</div>;
};

export default DialogHeader;
