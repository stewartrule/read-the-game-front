import * as React from "react";

export const isValidComponentType = (
  child: React.ReactNode,
  types: React.ComponentType[]
) => React.isValidElement(child) && types.some(type => type === child.type);

export const filterChildren = (
  children: React.ReactNode,
  types: React.ComponentType[]
) =>
  React.Children.toArray(children).filter(child =>
    isValidComponentType(child, types)
  );
