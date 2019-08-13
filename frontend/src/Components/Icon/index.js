import React from "react";

import Back from "./BackArrow";
import Refresh from "./Refresh";
import Copy from "./Copy";
import Menu from "./Menu";
import LessThanArrow from "./LessThanArrow";
import GreaterThanArrow from "./GreaterThanArrow";
import GitHub from "./GitHub";
import Hyperlink from "./Link";
import Comment from "./Comment";
import Likes from "./Likes";
import Liked from "./Liked";
import Rebump from "./Rebump";

const Icon = props => {
  switch (props.name) {
    case "back-arrow":
      return <Back {...props} />;
    
    case "copy":
      return <Copy {...props} />;
    
    case "refresh":
      return <Refresh {...props} />;

    case "menu":
      return <Menu {...props} />;

    case "lt-arrow":
      return <LessThanArrow {...props} />;

    case "gt-arrow":
      return <GreaterThanArrow {...props} />;

    case "github":
      return <GitHub {...props} />;

    case "link":
      return <Hyperlink {...props} />;

    case "comment":
      return <Comment {...props} />;

    case "likes":
      return <Likes {...props} />;

    case "liked":
      return <Liked {...props} />;

    case "rebump":
      return <Rebump {...props} />;

    default:
      return;
  }
};

export default Icon;
