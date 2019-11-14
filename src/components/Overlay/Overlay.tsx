import * as React from "react";
import { animated, useSpring } from "react-spring";

const Overlay: React.FC<{ open?: boolean; onClick?: () => void }> = ({
  children,
  onClick,
  open = false
}) => {
  const style = {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    padding: 10
  } as const;

  const props = useSpring({
    to: { transform: open ? `translateY(0%)` : `translateY(100%)` },
    from: { transform: `translateY(100%)` }
  });

  return (
    <animated.div style={{ ...props, ...style }} onClick={onClick}>
      {children}
    </animated.div>
  );
};

export default Overlay;
