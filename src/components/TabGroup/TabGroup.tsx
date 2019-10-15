import * as React from "react";
import Tab from "./Tab";
import { filterChildren } from "../../util/children";

const TabGroup: React.FC = ({ children }) => (
  <div className="tab-group">{filterChildren(children, [Tab])}</div>
);

export default TabGroup;
