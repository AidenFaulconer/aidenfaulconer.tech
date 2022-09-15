// import React from 'react';
// import { graphql, Link } from 'gatsby';
// import Layout from '../../layout/layout';

// const PREFIX = 'reccomendations';

// const classes = {
//   container: `${PREFIX}-container`,
//   post: `${PREFIX}-post`
// };

// const Root = styled('div')((
//   {
//     theme
//   }
// ) => ({
//   [`&.${classes.container}`]: {
//     margin: '50px 0px',
//     marginBottom: '200px',
//     display: 'flex',
//     flex: '2 2',

//     '& .post': {
//       width: '100%',
//       padding: '12.5px',
//       margin: '25px',
//       height: '100%',

//       '&:hover': {},

//       '& img': {
//         width: '100%',
//         objectFit: 'fit',
//         maxHeight: '300px',
//         height: '100%',
//       },

//       '& p': {
//         textDecoration: 'none',
//       },

//       '& h3': {
//         marginTop: '25px',
//         marginBottom: '12.5px',
//         marginLeft: '0px',
//         textDecoration: 'none',
//       },
//     },
//   },

//   [`& .${classes.post}`]: {
//     marginTop: '7vw',
//     padding: '100px 0vw',
//     display: 'flex',
//     flexDirection: 'row',
//     order: '0',

//     '& .post-details': {
//       flex: 'auto',
//       padding: '25px',

//       '& .post-title': {
//         textTransform: 'capitalcase',
//         marginBottom: '6.125px',
//         fontWeight: 'bolder',
//         textAlign: 'center',
//         fontSize: '1.75em',
//         fontWeight: 'bold',
//         zIndex: '3',
//       },

//       '& .post-meta': {
//         textAlign: 'center',
//         fontFamily: 'brown',
//       },
//     },

//     '& .post-thumbnail': {
//       position: 'absolute',
//       order: '1',
//       left: '0px',
//       opacity: '0.25',
//       top: '0px',
//       zIndex: 1,
//       height: '60vh',
//       width: '100%',
//       // backgroundimage: url(${(props) => props.src}')',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     },
//   }
// }));

// export default ({ otherBlogs }) => {
  
//   return (
//     <Root className={classes.container}>
//       Read more
//       {otherBlogs.map((post, i) => {
//         //  alert(JSON.stringify(post, null, 2))
//         { /* const {
//           catagory,
//           path,
//           title,
//           thumbnail_,
//           metaDescription,
//         } = post.node.frontmatter; */ }
//         return (
//           <Link to={path} className={classes.post}>
//             {/* <img src={thumbnail_} /> */}
//             <h3>{title}</h3>
//             <p>{catagory}</p>
//           </Link>
//         );
//       })}
//     </Root>
//   );
// };
