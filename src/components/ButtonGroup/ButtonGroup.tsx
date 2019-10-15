import * as React from "react";

import { filterChildren } from "../../util/children";
import Button from "./Button";

const ButtonGroup: React.FC = ({ children }) => (
  <div className="button-group">{filterChildren(children, [Button])}</div>
);

export default ButtonGroup;
