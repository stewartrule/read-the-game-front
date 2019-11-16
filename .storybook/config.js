import "../src/scss/reset.scss";
import "../src/scss/base.scss";
import "../src/scss/fontello.scss";
import "./storybook.scss";

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
