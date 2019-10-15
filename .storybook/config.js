import "../src/css/reset.css";
import "../src/css/base.css";
import "../src/css/fontello.css";

import { addParameters, addDecorator, configure } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

const components = require.context("../src/", true, /\.stories\.tsx$/);

addDecorator(withInfo);

addParameters({
  options: {
    panelPosition: "right",
    storySort: (a, b) => a[1].id.localeCompare(b[1].id)
  }
});

configure(() => {
  components.keys().forEach(components);
}, module);
