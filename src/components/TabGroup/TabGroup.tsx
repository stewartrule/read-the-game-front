import * as React from "react";
import Tab from "./Tab";
import { filterChildren } from "../../util/children";
import bem from "../../util/bem";

type Props = {
  scrollable?: boolean;
};

const TabGroup: React.FC<Props> = ({ children, scrollable = false }) => (
  <div
    className={bem({ "tab-group": true, "tab-group--scrollable": scrollable })}
  >
    {filterChildren(children, [Tab])}
  </div>
);

export default TabGroup;
