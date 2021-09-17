// import React, { useContext, useEffect } from "react";

// //ui
// import { logoCircular } from "../../static/assets/svg/hardcoded-svgs";
// import {
//   AppBar,
//   Slide,
//   Toolbar,
//   Drawer,
//   Button,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   useScrollTrigger,
// } from "@material-ui/core";
// import { Link } from "gatsby";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import { red } from "@material-ui/core/colors";

// const _Experience = styled.div``;

// export default React.memo(
//   ({ theme, themeState, boundActions, children, window }) => {
//     //prettier-ignore
//     const logo = React.useCallback(() => <div dangerouslySetInnerHTML={{ __html: logoCircular }} />,[]);

//     const pages = [
//       { name: "portfolio", url: "/" },
//       { name: "blog", url: "/blog" },
//       { name: "booking", url: "/booking" },
//     ];
//     const pageNav = React.useCallback(
//       () => (
//         <div className="flex-nowrap justify-content-center">
//           {pages.map((page) => (
//             <Link key={page.name} className="m-1" to={page.url}>
//               {page.name.toUpperCase()}
//             </Link>
//           ))}
//         </div>
//       ),
//       []
//     );

//     const trigger = useScrollTrigger({ target: window ? window() : undefined });
//     return <></>;
//   }
// );
