import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import { Tuple } from "../../util/types";
import Section from "../Section";
import Graph, { ValueType } from "./PeriodGraph";

const values: Tuple<ValueType, 6> = [
  {
    inner: {
      fill: BrandColor.secondary,
      value: 1
    },
    outer: {
      fill: BrandColor.primary,
      value: 0.1
    }
  },
  {
    inner: {
      fill: BrandColor.primary,
      value: 0.9
    },
    outer: {
      fill: BrandColor.secondary,
      value: 0.4
    }
  },
  {
    inner: {
      fill: BrandColor.secondary,
      value: 0.8
    },
    outer: {
      fill: BrandColor.primary,
      value: 0.6
    }
  },
  {
    inner: {
      fill: BrandColor.primary,
      value: 0.7
    },
    outer: {
      fill: BrandColor.secondary,
      value: 0.8
    }
  },
  {
    inner: {
      fill: BrandColor.primary,
      value: 0.5
    },
    outer: {
      fill: BrandColor.secondary,
      value: 0.8
    }
  },
  {
    inner: {
      fill: BrandColor.primary,
      value: 0.2
    },
    outer: {
      fill: BrandColor.secondary,
      value: 0.8
    }
  }
];

storiesOf("PeriodGraph", module)
  .addDecorator(getStory => <Section spacious>{getStory()}</Section>)
  .add("todo", () => <Graph values={values} />);
