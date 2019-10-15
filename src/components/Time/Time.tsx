import * as React from "react";

const intl = new Intl.DateTimeFormat("de-DE", {
  hour: "numeric",
  minute: "numeric"
});

const Time = ({ date }: { date: Date }) => <span>{intl.format(date)}</span>;

export default Time;
