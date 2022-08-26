// import React, { useState, useEffect, useMemo } from 'react';
// import useMeasure from 'react-use-measure';
// import { useTransition, a } from '@react-spring/web';
// import { shuffle } from 'lodash-es';
// import { Box } from '@mui/material';
// import { navigate } from 'gatsby-link';
// import { useMedia } from './customHooks';

// export default ({ data, children, CardComponent }) => {
//   // Hook1: Tie media queries to the number of columns
//   const columns = useMedia(
//     ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
//     [5, 4, 3],
//     2,
//   );
//   // Hook2: Measure the width of the container element
//   const [ref, { width }] = useMeasure();
//   // Hook3: Hold items
//   const [items, set] = useState(data);
//   // Hook4: shuffle data every 2 seconds
//   useEffect(() => {
//     const t = setInterval(() => set(shuffle), 2000);
//     return () => clearInterval(t);
//   }, []);
//   // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
//   const [heights, gridItems] = useMemo(() => {
//     const heights = new Array(columns).fill(0); // Each column gets a height starting with zero
//     const gridItems = items.map((child, i) => {
//       const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
//       const x = (width / columns) * column; // x = container width / number of columns * column index,
//       const y = (heights[column] += child.height / 2) - child.height / 2; // y = it's just the height of the current column
//       return {
//         ...child,
//         x,
//         y,
//         width: width / columns,
//         height: child.height / 2,
//       };
//     });
//     return [heights, gridItems];
//   }, [columns, items, width]);
//   // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
//   const transitions = useTransition(gridItems, {
//     key: (item) => item.css,
//     from: ({
//       x, y, width, height,
//     }) => ({
//       x, y, width, height, opacity: 0,
//     }),
//     enter: ({
//       x, y, width, height,
//     }) => ({
//       x, y, width, height, opacity: 1,
//     }),
//     update: ({
//       x, y, width, height,
//     }) => ({
//       x, y, width, height,
//     }),
//     leave: { height: 0, opacity: 0 },
//     config: { mass: 5, tension: 500, friction: 100 },
//     trail: 25,
//   });

//   const listStyles = {
//     position: 'relative',
//     width: '100%',
//     height: '100%',

//     '& > div': {
//       position: 'absolute',
//       willChange: 'transform, width, height, opacity',
//       padding: '15px',
//     },

//     '& > div > div': {
//       position: 'relative',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center center',
//       width: '100%',
//       height: '100%',
//       overflow: 'hidden',
//       textTransform: 'uppercase',
//       fontSize: '10px',
//       lineHeight: '10px',
//       borderRadius: '4px',
//       boxShadow: '0px 10px 50px -10px rgba(0, 0, 0, 0.2)',
//     },
//   };

//   // Render the grid
//   return (
//     <Box
//       ref={ref}
//       sx={listStyles}
//       style={{ height: Math.max(...heights) }}
//     >
//       {transitions((style, item) => (
//         CardComponent
//                 && (<CardComponent onClick={navigate({ to: item.url })} style={{ ...style }} img={item.css} />)
//                 || (
//                 <a.div style={{ ...style }}>
//                   <div style={{ backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)` }} />
//                 </a.div>
//                 )
//       ))}
//     </Box>
//   );
// };
