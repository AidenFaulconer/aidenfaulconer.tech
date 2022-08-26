// import { Parralax, ParralaxLayer } from '@react-spring/parallax';
// import { useEffect, useRef, useState } from 'react';
// import { useStore } from '../../store/store';

// export const ParralaxComponent = ({ children }, speed) => {
//   const parralaxRef = useRef(null);

//   // ref.current.scrollTo | container | content

//   return (
//     <Parralax
//       config={{}}
//       enabled
//       horizontal
//       innerStyle={{}}
//       pages={(children.length())}
//     >
//       {
//       children.map((child, index) => (
//         <ParralaxLayer
//           offset={index}
//           speed={speed}
//           ref={parralaxRef}
//           factor={0.5}
//           // sticky={{
//           //   start: 0,
//           //   end: 0,
//           // }}
//         >
//           {child}
//         </ParralaxLayer>
//       ))
//     }
//     </Parralax>
//   );
// };
