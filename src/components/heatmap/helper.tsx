import { ReactComponent as CancelIcon } from "../../assets/icons/cancel.svg";
import { getColoredCircle } from "../../helpers/getColoredCircle";

export const switchMenuButtons = [
  {
    label: "Градиент по KH",
    icon: getColoredCircle("#F7E2A3"),
    key: "kh",
  },
  {
    label: "Градиент по р",
    icon: getColoredCircle("#DFA29D"),
    key: "p",
  },
  {
    label: "Градиент по n",
    icon: getColoredCircle("#C7B6DC"),
    key: "n",
  },
  {
    label: "Отключить градиент",
    icon: <CancelIcon />,
    key: "none",
  },
];
