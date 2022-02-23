// // ========================================================================== //
// // sliding text
// // ========================================================================== //
// const useSlidingText = makeStyles((theme) => ({
//     '@keyframes animatedType': {
//       from: {
//         backgroundPosition: '0 0',
//       },
//       to: {
//         backgroundPosition: '100% 0',
//       },
//     },
//     movingType: {
//       position: 'absolute',
//       display: 'flex',
//       // justifyContent: 'space-evenly',
//       // flexDirection: 'column',
//       // minHeight: '90vh',
//       margin: 'auto',
//       opacity: 1,
//       minWidth: '200vw',
//       width: '200%',
//       left: '-50%',
//       height: '100%',
//       zIndex: '10 !important',
//       overflow: 'hidden',
//     },
//     type: {
//       display: 'inline-block',
//       height: '50%',
//       width: '100%',
//       animation: '$animatedType 24s linear infinite alternate',
//       // tilt look
//       margin: 'auto',
//       color: theme.palette.text.secondary,
//       fill: theme.palette.text.secondary,
//       // transform: 'rotate3d(31, -17, 28, 58deg)',
//       transform: 'rotate3d(41, 76, -87, 1121deg)',
//       backgroundImage: svgEncodeBaseSixtyFour(`
//       <svg xmlns="http://www.w3.org/2000/svg" width="3817" height="97" fill="none" viewBox="0 0 3817 97">
//     <defs/>
//     <g class="Frame 1013">
//       <path stroke="white" stroke-width=".5" d="M38 66.296h-7.704V31.304h16.2c2.448 0 3.888.216 4.32.648 2.256 2.256 3.384 5.424 3.384 9.504v8.28c0 4.56-1.608 8.448-4.824 11.664-3.216 3.264-7.008 4.896-11.376 4.896zm-8.568 7.632h17.064c5.04 0 9.312-1.752 12.816-5.256 3.456-3.456 5.184-7.656 5.184-12.6v-8.208c0-5.376-2.232-10.296-6.696-14.76-2.928-2.976-6.12-5.28-9.576-6.912-3.408-1.68-6.816-2.52-10.224-2.52H20V73.928h9.432zm69.496-42.696H85.32c-2.448 0-3.888.216-4.32.648-2.256 2.256-3.384 5.448-3.384 9.576v3.456h24.408v7.704H77.616v13.608h31.608v7.704H67.32V47.792c0-5.328 2.232-10.248 6.696-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h15.336v7.632H98.928zm33.127 13.752h13.032c3.216 0 5.952 1.104 8.208 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.584 6.912-4.752 10.08-4.992 5.04-10.08 7.56-15.264 7.56h-24.48v-7.632h33.552c.432-.96.648-2.184.648-3.672 0-2.736-.984-5.088-2.952-7.056-1.92-1.968-4.176-2.952-6.768-2.952h-13.032c-3.216 0-5.952-1.104-8.208-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.584-6.936 4.752-10.152 5.04-4.992 10.128-7.488 15.264-7.488h24.48v7.632h-33.048-.216a.306.306 0 00-.288 0c-.432.96-.648 2.184-.648 3.672 0 2.736.984 5.088 2.952 7.056 1.92 1.968 4.176 2.952 6.768 2.952zm28.168 28.944h-.864V23.672H169.655V73.928h-9.432zm38.711-50.256h18v7.632H190.438c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v8.28c0 4.512 1.608 8.4 4.824 11.664 3.216 3.264 7.008 4.896 11.376 4.896h7.704V44.984h10.296V73.928H190.438c-5.04 0-9.312-1.752-12.816-5.256-3.456-3.456-5.184-7.656-5.184-12.6v-8.208c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52zm30.256 50.256h.864V35.624l21.888 31.896 4.464 6.408h10.224V23.672h-10.224v38.88L234.95 31.304l-4.896-7.416v-.216h-10.296V73.928h9.432zm86.645-27.072v2.88c0 4.56 1.608 8.448 4.824 11.664 3.216 3.264 7.008 4.896 11.376 4.896h-.216.216c2.448 0 3.888-.216 4.32-.648 2.256-2.256 3.384-5.448 3.384-9.576v-32.4h10.296v27.36h-.072c-.336 4.896-2.544 9.36-6.624 13.392-2.928 3.024-6.12 5.376-9.576 7.056-3.408 1.632-6.816 2.448-10.224 2.448l4.248-3.816-4.248 3.816c-5.04 0-9.312-1.752-12.816-5.256-3.456-3.456-5.184-7.656-5.184-12.6V23.672h10.296v23.184zm37.888 27.072h-.864V23.672H363.155V73.928h-9.432zm38.279-51.336L372.85 74h-6.192l19.152-51.408h6.192zm11.021 24.264v2.88c0 4.56 1.608 8.448 4.824 11.664 3.216 3.264 7.008 4.896 11.376 4.896h-.216.216c2.448 0 3.888-.216 4.32-.648 2.256-2.256 3.384-5.448 3.384-9.576v-32.4h10.296v27.36h-.072c-.336 4.896-2.544 9.36-6.624 13.392-2.928 3.024-6.12 5.376-9.576 7.056-3.408 1.632-6.816 2.448-10.224 2.448l4.248-3.816-4.248 3.816c-5.04 0-9.312-1.752-12.816-5.256-3.456-3.456-5.184-7.656-5.184-12.6V23.672h10.296v23.184zm73.384 26.64L463.879 56.36l-6.696 11.16-3.888 6.408H445.807c3.6-6.384 8.184-14.208 13.752-23.472l-14.256-19.584-5.256-7.2h12.816l5.4 7.632c3.12 4.272 5.472 7.488 7.056 9.648 2.832-4.656 4.776-7.872 5.832-9.648l4.392-7.632h8.064l-.72 1.152-13.248 22.032c.24.384 1.032 1.512 2.376 3.384 1.344 1.824 2.208 3 2.592 3.528.384.48 1.152 1.536 2.304 3.168 1.2 1.632 2.064 2.832 2.592 3.6.576.72 1.368 1.8 2.376 3.24a117.86 117.86 0 012.592 3.528c.672.912 1.44 1.968 2.304 3.168.912 1.2 1.776 2.352 2.592 3.456h-12.672l-.288-.432zm71.828-28.512h13.032c3.216 0 5.952 1.104 8.208 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.584 6.912-4.752 10.08-4.992 5.04-10.08 7.56-15.264 7.56h-24.48v-7.632h33.552c.432-.96.648-2.184.648-3.672 0-2.736-.984-5.088-2.952-7.056-1.92-1.968-4.176-2.952-6.768-2.952h-13.032c-3.216 0-5.952-1.104-8.208-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.584-6.936 4.752-10.152 5.04-4.992 10.128-7.488 15.264-7.488h24.48v7.632h-33.048-.216a.306.306 0 00-.288 0c-.432.96-.648 2.184-.648 3.672 0 2.736.984 5.088 2.952 7.056 1.92 1.968 4.176 2.952 6.768 2.952zm37.6 1.872v2.88c0 4.512 1.632 8.4 4.896 11.664 3.168 3.264 6.936 4.896 11.304 4.896h-.216.216c2.496 0 3.936-.216 4.32-.648 2.256-2.256 3.384-5.448 3.384-9.576v-8.208c0-4.56-1.608-8.472-4.824-11.736-3.216-3.216-7.008-4.824-11.376-4.824h.216-.216c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v5.4zm34.2-6.12v9c0 5.376-2.208 10.272-6.624 14.688-2.976 3.024-6.192 5.376-9.648 7.056-3.408 1.632-6.816 2.448-10.224 2.448l4.248-3.816-4.248 3.816c-5.04 0-9.312-1.752-12.816-5.256a17.9 17.9 0 01-3.672-5.328 17.763 17.763 0 01-1.512-6.48V46.856h.072c.288-4.992 2.496-9.576 6.624-13.752 2.976-2.976 6.168-5.28 9.576-6.912 3.408-1.68 6.816-2.52 10.224-2.52l-4.248 3.816 4.248-3.816c5.04 0 9.312 1.752 12.816 5.256 3.264 3.264 4.992 7.2 5.184 11.808zm37.095-9.432h-16.2c-2.496 0-3.936.216-4.32.648-2.256 2.256-3.384 5.424-3.384 9.504v3.528h27.072v7.632h-27.072V73.928H622.93V47.864c0-5.376 2.208-10.296 6.624-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h18v7.632H657.13zm38.968 42.624h.864V31.304h16.488v-7.632h-43.2v7.632h16.488v42.624h9.36zm46.776-7.632h12.24c2.448 0 3.864-.216 4.248-.648 2.304-2.256 3.456-5.448 3.456-9.576v-32.4h10.224v26.064c0 5.328-2.208 10.224-6.624 14.688-2.976 3.024-6.192 5.376-9.648 7.056-3.408 1.632-6.816 2.448-10.224 2.448h-5.112V67.52c-4.848 3.84-9.816 5.952-14.904 6.336v.072h-10.296V23.672H726.53V66.296h6.984c2.448 0 3.864-.216 4.248-.648 2.256-2.256 3.384-5.448 3.384-9.576v-32.4H751.442v26.064c0 5.376-2.208 10.272-6.624 14.688a23.716 23.716 0 01-1.944 1.872zm68.768-42.264l15.048 42.624 2.52 7.272h-12.816l-2.52-7.632h-26.928l-2.952 7.632h-8.064l.504-1.224 17.784-42.624 2.664-6.408H811.498l.144.36zm-.504 34.56l-9.576-27.288-11.376 27.288h20.952zM872.069 70.4l2.88 3.528h-10.512l-12.888-16.056c-1.2.24-2.4.36-3.6.36h-5.544v15.696H832.109V23.672H842.405v.144c2.592-.096 5.136-.144 7.632-.144h6.48c4.032 0 7.416 1.392 10.152 4.176 2.736 2.688 4.104 5.976 4.104 9.864v.072l-5.112 3.168 5.112-3.168c0 4.32-1.848 8.352-5.544 12.096a33.262 33.262 0 01-5.832 4.68l12.672 15.84zm-29.664-19.872c1.056.048 3.6.072 7.632.072h6.48l.36.072H858.245c.24-.048.408-.12.504-.216 1.152-1.536 1.728-3.624 1.728-6.264v-.072.072-.072c0-3.504-1.248-6.528-3.744-9.072-2.496-2.496-5.424-3.744-8.784-3.744h-5.544v19.224zm67.016-19.296h-13.609c-2.447 0-3.887.216-4.319.648-2.256 2.256-3.384 5.448-3.384 9.576v3.456h24.408v7.704h-24.408v13.608h31.608v7.704H877.812V47.792c0-5.328 2.233-10.248 6.697-14.76 2.976-2.976 6.168-5.28 9.576-6.912 3.456-1.68 6.888-2.52 10.296-2.52h15.336v7.632h-10.296zm59.406 13.752h20.16c.432-1.008.648-2.208.648-3.6v-.072l5.184-3.168-5.184 3.168c0-2.736-.984-5.088-2.952-7.056-1.92-1.968-4.176-2.952-6.768-2.952h-11.088v13.68zm25.992.432a11.048 11.048 0 014.968 2.88c2.163 2.208 3.243 4.872 3.243 7.992 0 3.552-1.59 6.912-4.755 10.08-4.992 5.04-10.08 7.56-15.264 7.56h-24.48V23.672H988.483c3.216 0 5.952 1.104 8.208 3.312 2.16 2.16 3.24 4.8 3.24 7.92v.072-.072.072c0 3.552-1.584 6.912-4.752 10.08l-.36.36zm-11.808 7.2h-14.184v13.68H992.083c.432-.96.648-2.184.648-3.672 0-2.736-.984-5.088-2.952-7.056-1.92-1.968-4.176-2.952-6.768-2.952zM1045.81 70.4l2.88 3.528h-10.51l-12.89-16.056c-1.2.24-2.4.36-3.6.36h-5.54v15.696H1005.85V23.672H1016.15v.144c2.59-.096 5.13-.144 7.63-.144h6.48c4.03 0 7.42 1.392 10.15 4.176 2.74 2.688 4.11 5.976 4.11 9.864v.072l-5.12 3.168 5.12-3.168c0 4.32-1.85 8.352-5.55 12.096a33.25 33.25 0 01-5.83 4.68l12.67 15.84zm-29.66-19.872c1.05.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.41-.12.5-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.74-9.072-2.5-2.496-5.43-3.744-8.79-3.744h-5.54v19.224zm71.12-26.496l15.04 42.624 2.52 7.272h-12.81l-2.52-7.632h-26.93l-2.95 7.632h-8.07l.51-1.224 17.78-42.624 2.67-6.408H1087.12l.15.36zm-.51 34.56l-9.57-27.288-11.38 27.288h20.95zm30.41 15.336h.86V35.624l21.89 31.896 4.46 6.408H1154.61V23.672H1144.38v38.88l-21.45-31.248-4.9-7.416v-.216H1107.73V73.928h9.44zm58.35-7.632h-7.71V31.304h16.2c2.45 0 3.89.216 4.32.648 2.26 2.256 3.39 5.424 3.39 9.504v8.28c0 4.56-1.61 8.448-4.83 11.664-3.21 3.264-7.01 4.896-11.37 4.896zm-8.57 7.632h17.06c5.04 0 9.31-1.752 12.82-5.256 3.45-3.456 5.18-7.656 5.18-12.6v-8.208c0-5.376-2.23-10.296-6.69-14.76-2.93-2.976-6.12-5.28-9.58-6.912-3.41-1.68-6.82-2.52-10.22-2.52h-18V73.928h9.43zm38.75 0h-.86V23.672h10.29V73.928h-9.43zm21.65 0h.86V35.624l21.89 31.896 4.46 6.408H1264.79V23.672H1254.56v38.88l-21.45-31.248-4.9-7.416v-.216H1217.91V73.928h9.44zm66.84-50.256h18v7.632H1285.7c-2.5 0-3.94.216-4.32.648-2.26 2.256-3.39 5.424-3.39 9.504v8.28c0 4.512 1.61 8.4 4.83 11.664 3.21 3.264 7 4.896 11.37 4.896h7.71V44.984h10.29V73.928h-26.49c-5.04 0-9.32-1.752-12.82-5.256-3.46-3.456-5.18-7.656-5.18-12.6v-8.208c0-5.376 2.2-10.296 6.62-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.45-1.68 6.88-2.52 10.29-2.52zm83.47 42.624h12.24c2.44 0 3.86-.216 4.24-.648 2.31-2.256 3.46-5.448 3.46-9.576v-32.4H1407.82v26.064c0 5.328-2.2 10.224-6.62 14.688-2.98 3.024-6.19 5.376-9.65 7.056-3.41 1.632-6.81 2.448-10.22 2.448h-5.11V67.52c-4.85 3.84-9.82 5.952-14.91 6.336v.072H1351.02V23.672h10.29V66.296h6.99c2.44 0 3.86-.216 4.24-.648 2.26-2.256 3.39-5.448 3.39-9.576v-32.4h10.29v26.064c0 5.376-2.2 10.272-6.62 14.688-.62.672-1.27 1.296-1.94 1.872zm64.66-35.064h-13.61c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.38 5.448-3.38 9.576v3.456h24.4v7.704h-24.4v13.608h31.6v7.704H1410.71V47.792c0-5.328 2.23-10.248 6.7-14.76 2.97-2.976 6.16-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52h15.33v7.632h-10.29zm23.41 13.752h20.16c.43-1.008.64-2.208.64-3.6v-.072l5.19-3.168-5.19 3.168c0-2.736-.98-5.088-2.95-7.056-1.92-1.968-4.17-2.952-6.77-2.952h-11.08v13.68zm25.99.432c1.92.528 3.57 1.488 4.97 2.88 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.59 6.912-4.76 10.08-4.99 5.04-10.08 7.56-15.26 7.56h-24.48V23.672h29.95c3.22 0 5.95 1.104 8.21 3.312 2.16 2.16 3.24 4.8 3.24 7.92v.072-.072.072c0 3.552-1.58 6.912-4.75 10.08-.15.144-.27.264-.36.36zm-11.81 7.2h-14.18v13.68h23.25c.43-.96.65-2.184.65-3.672 0-2.736-.98-5.088-2.95-7.056-1.92-1.968-4.18-2.952-6.77-2.952zm42.86-7.632H1535.8c3.21 0 5.95 1.104 8.21 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.59 6.912-4.76 10.08-4.99 5.04-10.08 7.56-15.26 7.56h-24.48v-7.632h33.55c.43-.96.65-2.184.65-3.672 0-2.736-.98-5.088-2.95-7.056-1.92-1.968-4.18-2.952-6.77-2.952H1514.2c-3.22 0-5.95-1.104-8.21-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.58-6.936 4.75-10.152 5.04-4.992 10.13-7.488 15.27-7.488h24.48v7.632h-33.05-.22a.31.31 0 00-.29 0c-.43.96-.64 2.184-.64 3.672 0 2.736.98 5.088 2.95 7.056 1.92 1.968 4.17 2.952 6.77 2.952zm28.16 28.944h-.86V23.672H1560.37V73.928h-9.44zm38.07 0h.86V31.304h16.49v-7.632H1563.15v7.632h16.49v42.624h9.36zm51.74-42.696h-13.61c-2.45 0-3.89.216-4.32.648-2.25 2.256-3.38 5.448-3.38 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.91V47.792c0-5.328 2.23-10.248 6.7-14.76 2.97-2.976 6.17-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52h15.34v7.632h-10.3zm33.13 13.752H1686.9c3.22 0 5.95 1.104 8.21 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.59 6.912-4.75 10.08-5 5.04-10.08 7.56-15.27 7.56h-24.48v-7.632h33.55c.44-.96.65-2.184.65-3.672 0-2.736-.98-5.088-2.95-7.056-1.92-1.968-4.18-2.952-6.77-2.952H1665.3c-3.22 0-5.95-1.104-8.21-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.59-6.936 4.75-10.152 5.04-4.992 10.13-7.488 15.27-7.488h24.48v7.632h-33.05-.22a.29.29 0 00-.28 0c-.44.96-.65 2.184-.65 3.672 0 2.736.98 5.088 2.95 7.056 1.92 1.968 4.18 2.952 6.77 2.952zm99.01-20.952l15.05 42.624 2.52 7.272h-12.81l-2.52-7.632h-26.93l-2.95 7.632h-8.07l.51-1.224 17.78-42.624 2.66-6.408h14.62l.14.36zm-.5 34.56l-9.58-27.288-11.37 27.288h20.95zm31.27-8.064c1.05.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.41-.12.5-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.74-9.072-2.5-2.496-5.43-3.744-8.79-3.744h-5.54v19.224zm0-26.712c2.59-.096 5.13-.144 7.63-.144h6.48c4.03 0 7.42 1.392 10.15 4.176 2.74 2.688 4.11 5.976 4.11 9.864v.072l-5.12 3.168 5.12-3.168c0 4.32-1.85 8.352-5.55 12.096-2.64 2.64-5.45 4.704-8.42 6.192-2.98 1.44-5.93 2.16-8.86 2.16h-5.54v15.696H1793.35V23.672H1803.65v.144zm41.55 26.712c1.06.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.41-.12.51-.216 1.15-1.536 1.72-3.624 1.72-6.264v-.072.072-.072c0-3.504-1.24-6.528-3.74-9.072-2.5-2.496-5.42-3.744-8.78-3.744h-5.55v19.224zm0-26.712c2.59-.096 5.14-.144 7.63-.144h6.48c4.04 0 7.42 1.392 10.16 4.176 2.73 2.688 4.1 5.976 4.1 9.864v.072l-5.11 3.168 5.11-3.168c0 4.32-1.85 8.352-5.54 12.096-2.64 2.64-5.45 4.704-8.43 6.192-2.97 1.44-5.93 2.16-8.85 2.16h-5.55v15.696h-10.29V23.672h10.29v.144zm51.28 21.168H1909.51c3.21 0 5.95 1.104 8.21 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.59 6.912-4.76 10.08-4.99 5.04-10.08 7.56-15.26 7.56h-24.48v-7.632h33.55c.43-.96.65-2.184.65-3.672 0-2.736-.98-5.088-2.95-7.056-1.92-1.968-4.18-2.952-6.77-2.952H1887.91c-3.22 0-5.95-1.104-8.21-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.58-6.936 4.75-10.152 5.04-4.992 10.13-7.488 15.27-7.488h24.48v7.632h-33.05-.22a.31.31 0 00-.29 0c-.43.96-.64 2.184-.64 3.672 0 2.736.98 5.088 2.95 7.056 1.92 1.968 4.17 2.952 6.77 2.952zm80.87 28.512l-14.98-42.624-2.59-7.2h12.82l2.52 7.632 12.38 34.992 14.55-34.992 2.95-7.632h8.06l-.5 1.152-17.79 42.696-2.66 6.408H1977.49l-.14-.432zm39.47.432h-.86V23.672H2026.26V73.928h-9.44zM2069 70.4l2.88 3.528h-10.51l-12.89-16.056c-1.2.24-2.4.36-3.6.36h-5.54v15.696H2029.04V23.672H2039.34v.144c2.59-.096 5.13-.144 7.63-.144h6.48c4.03 0 7.41 1.392 10.15 4.176 2.74 2.688 4.1 5.976 4.1 9.864v.072l-5.11 3.168 5.11-3.168c0 4.32-1.84 8.352-5.54 12.096a33.25 33.25 0 01-5.83 4.68L2069 70.4zm-29.66-19.872c1.05.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.4-.12.5-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.75-9.072-2.49-2.496-5.42-3.744-8.78-3.744h-5.54v19.224zm61.25 23.4h.86V31.304h16.49v-7.632H2074.74v7.632h16.49v42.624h9.36zm30.43-27.072v2.88c0 4.56 1.61 8.448 4.83 11.664 3.21 3.264 7 4.896 11.37 4.896h-.21.21c2.45 0 3.89-.216 4.32-.648 2.26-2.256 3.39-5.448 3.39-9.576v-32.4h10.29v27.36h-.07c-.34 4.896-2.54 9.36-6.62 13.392-2.93 3.024-6.12 5.376-9.58 7.056-3.41 1.632-6.82 2.448-10.22 2.448l4.24-3.816-4.24 3.816c-5.04 0-9.32-1.752-12.82-5.256-3.46-3.456-5.18-7.656-5.18-12.6V23.672h10.29v23.184zm72.74-22.824l15.05 42.624 2.52 7.272h-12.82l-2.52-7.632h-26.93l-2.95 7.632h-8.06l.5-1.224 17.78-42.624 2.67-6.408H2203.61l.15.36zm-.51 34.56l-9.57-27.288-11.38 27.288h20.95zm54.89 15.336h-33.91V23.672h10.29V66.296h23.62v7.632zm78.82-3.528l2.88 3.528h-10.51l-12.89-16.056c-1.2.24-2.4.36-3.6.36h-5.54v15.696H2297V23.672H2307.3v.144c2.59-.096 5.13-.144 7.63-.144h6.48c4.03 0 7.41 1.392 10.15 4.176 2.74 2.688 4.1 5.976 4.1 9.864v.072l-5.11 3.168 5.11-3.168c0 4.32-1.84 8.352-5.54 12.096a33.25 33.25 0 01-5.83 4.68l12.67 15.84zm-29.66-19.872c1.05.048 3.6.072 7.63.072h6.48l.36.072h1.37c.24-.048.4-.12.5-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.75-9.072-2.49-2.496-5.42-3.744-8.78-3.744h-5.54v19.224zm67.01-19.296h-13.61c-2.44 0-3.88.216-4.32.648-2.25 2.256-3.38 5.448-3.38 9.576v3.456h24.41v7.704H2353v13.608h31.61v7.704h-41.91V47.792c0-5.328 2.24-10.248 6.7-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.45-1.68 6.88-2.52 10.29-2.52h15.34v7.632h-10.3zm48.82-7.2l15.05 42.624 2.52 7.272h-12.81l-2.52-7.632h-26.93l-2.95 7.632h-8.07l.51-1.224 17.78-42.624 2.66-6.408h14.62l.14.36zm-.5 34.56l-9.58-27.288-11.37 27.288h20.95zm54.88 15.336h-33.91V23.672H2453.9V66.296h23.61v7.632zm3.73 0h-.86V23.672h10.29V73.928h-9.43zm38.06 0h.87V31.304h16.48v-7.632h-43.2v7.632h16.49v42.624h9.36zm52.68-42.624l5.04-7.632h8.14l-.87 1.152L2569.1 47l-1.01 1.44v25.488h-10.29V48.872l-13.11-18-5.25-7.2h12.81l5.4 7.632c.34.48 1.42 1.968 3.24 4.464 1.83 2.448 3.22 4.344 4.18 5.688 3.07-4.512 5.38-7.896 6.91-10.152zm78.47-7.632h18v7.632h-26.5c-2.49 0-3.93.216-4.32.648-2.25 2.256-3.38 5.424-3.38 9.504v8.28c0 4.512 1.61 8.4 4.82 11.664 3.22 3.264 7.01 4.896 11.38 4.896h7.7V44.984h10.3V73.928h-26.5c-5.04 0-9.31-1.752-12.81-5.256-3.46-3.456-5.19-7.656-5.19-12.6v-8.208c0-5.376 2.21-10.296 6.63-14.76 2.97-2.976 6.17-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52zm56.54.36l15.04 42.624 2.52 7.272h-12.81l-2.52-7.632h-26.93l-2.95 7.632h-8.07l.51-1.224 17.78-42.624 2.67-6.408H2706.84l.15.36zm-.51 34.56l-9.57-27.288-11.38 27.288h20.95zm51.14-27.288h-12.17c-2.49 0-3.93.216-4.32.648-2.25 2.256-3.38 5.424-3.38 9.504v32.472H2727.45V47.864c0-5.376 2.21-10.296 6.63-14.76 2.97-2.976 6.17-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52h5.18v6.408c4.85-3.84 9.82-5.976 14.91-6.408h10.22v50.256H2774.04V31.304h-6.99c-2.49 0-3.93.216-4.32.648-2.25 2.256-3.38 5.424-3.38 9.504v32.472H2749.05V47.864c0-5.376 2.24-10.296 6.7-14.76a23.07 23.07 0 011.87-1.8zm61.14-.072h-13.61c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.39 5.448-3.39 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.9V47.792c0-5.328 2.23-10.248 6.69-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.46-1.68 6.89-2.52 10.3-2.52h15.33v7.632h-10.29zm67.11 35.064h-7.71V31.304h16.2c2.45 0 3.89.216 4.32.648 2.26 2.256 3.39 5.424 3.39 9.504v8.28c0 4.56-1.61 8.448-4.83 11.664-3.21 3.264-7 4.896-11.37 4.896zm-8.57 7.632h17.06c5.04 0 9.32-1.752 12.82-5.256 3.46-3.456 5.18-7.656 5.18-12.6v-8.208c0-5.376-2.23-10.296-6.69-14.76-2.93-2.976-6.12-5.28-9.58-6.912-3.41-1.68-6.81-2.52-10.22-2.52h-18V73.928h9.43zm69.5-42.696h-13.61c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.39 5.448-3.39 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.9V47.792c0-5.328 2.23-10.248 6.69-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.46-1.68 6.89-2.52 10.3-2.52h15.33v7.632h-10.29zm30.67 42.264l-14.97-42.624-2.59-7.2h12.81l2.52 7.632 12.39 34.992 14.54-34.992 2.95-7.632h8.07l-.51 1.152-17.78 42.696-2.67 6.408H2977.62l-.15-.432zm70.22-42.264h-13.6c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.39 5.448-3.39 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.9V47.792c0-5.328 2.23-10.248 6.69-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.45-1.68 6.89-2.52 10.29-2.52h15.34v7.632h-10.3zm47.03 42.696H3060.8V23.672H3071.1V66.296h23.62v7.632zm13.15-27.072v2.88c0 4.512 1.64 8.4 4.9 11.664 3.17 3.264 6.94 4.896 11.3 4.896h-.21.21c2.5 0 3.94-.216 4.32-.648 2.26-2.256 3.39-5.448 3.39-9.576v-8.208c0-4.56-1.61-8.472-4.83-11.736-3.21-3.216-7-4.824-11.37-4.824h.21-.21c-2.5 0-3.94.216-4.32.648-2.26 2.256-3.39 5.424-3.39 9.504v5.4zm34.2-6.12v9c0 5.376-2.2 10.272-6.62 14.688-2.98 3.024-6.19 5.376-9.65 7.056-3.41 1.632-6.81 2.448-10.22 2.448l4.25-3.816-4.25 3.816c-5.04 0-9.31-1.752-12.82-5.256a17.968 17.968 0 01-3.67-5.328 17.68 17.68 0 01-1.51-6.48V46.856h.07c.29-4.992 2.5-9.576 6.62-13.752 2.98-2.976 6.17-5.28 9.58-6.912 3.41-1.68 6.82-2.52 10.22-2.52l-4.24 3.816 4.24-3.816c5.04 0 9.32 1.752 12.82 5.256 3.26 3.264 4.99 7.2 5.18 11.808zm13.19 9.792c1.06.048 3.6.072 7.64.072h6.48l.36.072H3171.1c.24-.048.41-.12.51-.216 1.15-1.536 1.73-3.624 1.73-6.264v-.072.072-.072c0-3.504-1.25-6.528-3.75-9.072-2.49-2.496-5.42-3.744-8.78-3.744h-5.55v19.224zm0-26.712c2.6-.096 5.14-.144 7.64-.144h6.48c4.03 0 7.41 1.392 10.15 4.176 2.73 2.688 4.1 5.976 4.1 9.864v.072l-5.11 3.168 5.11-3.168c0 4.32-1.85 8.352-5.54 12.096-2.64 2.64-5.45 4.704-8.43 6.192-2.97 1.44-5.92 2.16-8.85 2.16h-5.55v15.696h-10.29V23.672h10.29v.144zm61.43 7.488h-12.17c-2.49 0-3.93.216-4.32.648-2.25 2.256-3.38 5.424-3.38 9.504v32.472H3186.52V47.864c0-5.376 2.21-10.296 6.63-14.76 2.97-2.976 6.17-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52h5.18v6.408c4.85-3.84 9.82-5.976 14.91-6.408h10.22v50.256H3233.11V31.304h-6.99c-2.49 0-3.93.216-4.32.648-2.25 2.256-3.38 5.424-3.38 9.504v32.472H3208.12V47.864c0-5.376 2.24-10.296 6.7-14.76a23.07 23.07 0 011.87-1.8zm61.14-.072h-13.61c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.39 5.448-3.39 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.9V47.792c0-5.328 2.23-10.248 6.69-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.46-1.68 6.89-2.52 10.3-2.52h15.33v7.632h-10.29zm22.54 42.696h.86V35.624l21.89 31.896 4.47 6.408H3337.81V23.672H3327.59v38.88l-21.46-31.248-4.9-7.416v-.216h-10.29V73.928h9.43zm66.2 0h.86V31.304h16.49v-7.632H3340.72v7.632h16.49v42.624h9.36zm91.63-39.312c0 3.456-.98 6.216-2.95 8.28-1.92 2.016-4.49 3.36-7.71 4.032v.288c4.08.48 7.13 1.776 9.15 3.888 2.06 2.112 3.09 4.872 3.09 8.28 0 3.024-.69 5.688-2.08 7.992-1.4 2.304-3.56 4.104-6.48 5.4-2.88 1.296-6.6 1.944-11.16 1.944-2.69 0-5.19-.216-7.49-.648a23.357 23.357 0 01-6.63-2.16v-5.904c2.16 1.104 4.49 1.944 6.99 2.52 2.49.576 4.89.864 7.2.864 4.61 0 7.92-.888 9.93-2.664 2.07-1.824 3.1-4.32 3.1-7.488 0-3.216-1.27-5.52-3.82-6.912-2.49-1.44-6.02-2.16-10.58-2.16h-4.97v-5.4h5.04c4.23 0 7.42-.888 9.58-2.664 2.21-1.776 3.31-4.128 3.31-7.056 0-2.496-.84-4.416-2.52-5.76-1.68-1.392-3.96-2.088-6.84-2.088-2.78 0-5.16.408-7.13 1.224a35.929 35.929 0 00-5.83 3.096l-3.17-4.32c1.83-1.44 4.08-2.688 6.77-3.744 2.74-1.056 5.83-1.584 9.29-1.584 5.37 0 9.36 1.2 11.95 3.6 2.64 2.4 3.96 5.448 3.96 9.144zm23.71 31.68h-7.71V31.304h16.2c2.45 0 3.89.216 4.32.648 2.26 2.256 3.39 5.424 3.39 9.504v8.28c0 4.56-1.61 8.448-4.83 11.664-3.21 3.264-7.01 4.896-11.37 4.896zm-8.57 7.632h17.06c5.04 0 9.31-1.752 12.82-5.256 3.45-3.456 5.18-7.656 5.18-12.6v-8.208c0-5.376-2.23-10.296-6.69-14.76-2.93-2.976-6.12-5.28-9.58-6.912-3.41-1.68-6.82-2.52-10.22-2.52h-18V73.928h9.43zm91.89-7.632h-7.71V31.304h16.2c2.45 0 3.89.216 4.32.648 2.26 2.256 3.39 5.424 3.39 9.504v8.28c0 4.56-1.61 8.448-4.83 11.664-3.21 3.264-7.01 4.896-11.37 4.896zm-8.57 7.632h17.06c5.04 0 9.31-1.752 12.82-5.256 3.45-3.456 5.18-7.656 5.18-12.6v-8.208c0-5.376-2.23-10.296-6.69-14.76-2.93-2.976-6.12-5.28-9.58-6.912-3.41-1.68-6.82-2.52-10.22-2.52h-18V73.928h9.43zm69.49-42.696h-13.6c-2.45 0-3.89.216-4.32.648-2.26 2.256-3.39 5.448-3.39 9.576v3.456h24.41v7.704h-24.41v13.608h31.61v7.704h-41.9V47.792c0-5.328 2.23-10.248 6.69-14.76 2.98-2.976 6.17-5.28 9.58-6.912 3.45-1.68 6.89-2.52 10.29-2.52h15.34v7.632h-10.3zm33.13 13.752H3672.31c3.22 0 5.96 1.104 8.21 3.312 2.16 2.208 3.24 4.872 3.24 7.992 0 3.552-1.58 6.912-4.75 10.08-4.99 5.04-10.08 7.56-15.26 7.56h-24.48v-7.632h33.55c.43-.96.65-2.184.65-3.672 0-2.736-.99-5.088-2.96-7.056-1.92-1.968-4.17-2.952-6.76-2.952h-13.04c-3.21 0-5.95-1.104-8.2-3.312-2.16-2.208-3.24-4.872-3.24-7.992 0-3.552 1.58-6.936 4.75-10.152 5.04-4.992 10.13-7.488 15.26-7.488h24.48v7.632h-33.05-.21a.31.31 0 00-.29 0c-.43.96-.65 2.184-.65 3.672 0 2.736.99 5.088 2.95 7.056 1.92 1.968 4.18 2.952 6.77 2.952zm28.17 28.944h-.86V23.672h10.29V73.928h-9.43zm38.71-50.256h18v7.632h-26.5c-2.49 0-3.93.216-4.32.648-2.25 2.256-3.38 5.424-3.38 9.504v8.28c0 4.512 1.61 8.4 4.82 11.664 3.22 3.264 7.01 4.896 11.38 4.896h7.7V44.984h10.3V73.928h-26.5c-5.04 0-9.31-1.752-12.81-5.256-3.46-3.456-5.19-7.656-5.19-12.6v-8.208c0-5.376 2.21-10.296 6.63-14.76 2.97-2.976 6.17-5.28 9.57-6.912 3.46-1.68 6.89-2.52 10.3-2.52zm30.26 50.256h.86V35.624l21.89 31.896 4.46 6.408H3793.86V23.672H3783.63v38.88l-21.45-31.248-4.9-7.416v-.216H3746.98V73.928h9.44z" class="DESIGN UI/UX SOFTWARE BRANDING WEBSITES APPS VIRTUAL REALITY GAME DEVELOPMENT 3D DESIGN"/>
//     </g>
//   </svg>
//       `),
//     },
//   }));

//   export const MovingType = (props) => {
//     const classes = useSlidingText();
//     return (
//       <div className={classes.movingType}>
//         <span className={classes.type} />
//       </div>
//     );
//   };
