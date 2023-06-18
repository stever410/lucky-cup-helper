import * as icons from "react-bootstrap-icons";

import "./style.css";

interface IconButtonProps extends icons.IconProps {
  // Cannot use "name" as it is a valid SVG attribute
  // "iconName", "filename", "icon" will do it instead
  iconName: keyof typeof icons;
}

const IconButton = ({ iconName, ...props }: IconButtonProps) => {
  const BootstrapIcon = icons[iconName];

  return <BootstrapIcon className="icon" color="#000" {...props} />;
};

export default IconButton;
