import * as React from "react";

import bem from "../../util/bem";

type Props = {
  compact?: boolean;
};

export const DialogBody: React.FC<Props> = ({ children, compact = false }) => {
  return (
    <div
      className={bem({
        dialog__body: {
          "--compact": compact
        }
      })}
    >
      {children}
    </div>
  );
};

export default DialogBody;
