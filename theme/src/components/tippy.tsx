/** @jsx jsx */
import Tippy, { TippyProps } from "@tippyjs/react";
import { jsx } from "theme-ui";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/shift-away-extreme.css";

export default function StyledTippy(props: TippyProps) {
  return <Tippy placement="right" animation="shift-away-extreme" theme="light-border" {...props} />;
}
