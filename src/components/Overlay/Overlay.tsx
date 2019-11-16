import * as React from "react";
import { animated, useSpring } from "react-spring";

const Overlay: React.FC<{ open?: boolean; onClick?: () => void }> = ({
  children,
  onClick,
  open = false
}) => {
  const style = {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexShrink: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    padding: "1rem 1rem 0 1rem"
  } as const;

  const props = useSpring({
    to: { transform: open ? `translateY(0%)` : `translateY(100%)` },
    from: { transform: `translateY(100%)` }
  });

  return (
    <animated.div style={{ ...props, ...style }} onClick={onClick}>
      <div
        style={{ width: "100%", display: "flex" }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </animated.div>
  );
};

export default Overlay;
