import * as React from "react";

import { filterChildren } from "../../util/children";
import DialogBody from "./DialogBody";
import DialogHeader from "./DialogHeader";

type Props = {};

const Dialog: React.FC<Props> = ({ children }) => {
  return (
    <div className="dialog">
      {filterChildren(children, [DialogHeader, DialogBody])}
    </div>
  );
};

export default Dialog;
