import { CheckIcon, CurrencyDollarIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { navigate } from 'gatsby';
import { RegularButton } from '../buttons';
import defaultImage from '../../../../static/assets/portfolio/delivery.png';
import { useStore } from '../../../store/store';

// <Box
//   className="relative grid grid-cols-6 w-full py-5 overflow-hidden rounded-md items-center"
//   sx={{ background: (theme) => theme.palette.text.primary }}
// >
//   {/* description of service */}
//   <Box
//     className="flex-auto inline-flex md:order-[0] xs:order-[1] px-3 h-full md:flex-row xs:flex-col col-span-3"
//     sx={{
//       color: (theme) => theme.palette.text.secondary,
//     }}
//   >
//     <div className="relative inline-flex flex-col w-full z-20 h-full">
//       <CurrencyDollarIcon className="w-6 h-6" />
//       {costRange}

//       <Typography
//         align="left"
//         variant="caption"
//         component="h1"
//         color="currentColor"
//         className="mb-7 font-medium flex flex-row gap-3 items-center"
//       >
//         {title || 'title'}
//       </Typography>

//       <Typography
//         align="left"
//         variant="body1"
//         color="currentColor"
//         className="mb-7 text-ellipsis overflow-hidden h-full"
//       >
//         {description || 'description'}
//       </Typography>

//       <div className="inline-flex flex-row w-full gap-5 justify-start flex-nowrap self-end items-end h-full relative">
//         <RegularButton onClick={() => navigate('./booking')}>
//           Start project
//         </RegularButton>

//         <RegularButton
//           type="secondary"
//           onClick={() => navigate('/#contact')}
//         >
//           Learn More
//         </RegularButton>
//       </div>
//     </div>
//   </Box>

//   {/* media content */}
//   <Box
//     className="md:inline-flex sm:none md:order-1 md:order-0 h-full relative overflow-hidden col-span-3 rounded-md"
//     sx={{ color: (theme) => theme.palette.text.secondary }}
//   >
//     <img
//       alt={`${title}`}
//       className="relative h-full object-fit"
//       src={defaultImage}
//     />
//   </Box>

//   {/* stats area */}
// </Box>

export function CtaList({
  contentData: {
    description, costRange, name, title, image,
  },
  setCurrent,
}) {
  return (
    <div className="flex flex-row max-h-[50vh] gap-3 md:px-0 px-6 mt-3">
      {/* content introduction */}
      <Box
        className={`
        flex-auto relative w-full p-3 overflow-hidden rounded-md items-center
        hover:-translate-y-1 ease-in-out transition-all hover:shadow-lg
        `}
        sx={{
          background: (theme) => theme.palette.text.secondary,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <div className="relative inline-flex flex-col w-full z-20 h-full">

          <div className="flex flex-row gap-3 w-full items-center mb-3">
            <CurrencyDollarIcon className="w-7 h-7" />
            {costRange}
          </div>

          <h1 className="mb-6 flex flex-row gap-3 items-center w-full text-current font-black text-3xl">
            {title || 'title'}
          </h1>

          <p className="mb-7 h-full w-full">
            {description || 'description'}
          </p>

          <div className="inline-flex flex-row w-full gap-5 justify-start flex-nowrap self-end items-end h-full relative w-full">
            <RegularButton onClick={() => navigate('./booking')}>
              Start project
            </RegularButton>

            <RegularButton
              type="secondary"
              onClick={() => navigate('/#contact')}
            >
              Learn More
            </RegularButton>
          </div>
        </div>
      </Box>

      {/* showcase area */}
      <div className="flex flex-auto flex-row gap-3 w-full">
        {[{
          title: 'services',
          subTitle: 'loreum ipsum sit dolor amet consectetur',
          imageSrc: defaultImage,
        }, {
          title: 'services',
          subTitle: 'loreum ipsum sit dolor amet consectetur',
          imageSrc: defaultImage,
        }].map(({ title, subTitle, imageSrc }, i) => {
          const odd = i % 2 === 0;
          return (
            <div className="flex-col gap-3 w-full flex">
              <Box
                className={`
                  rounded-md p-3 h-1/2 w-full overflow-hidden 
                  hover:-translate-y-1 ease-in-out transition-all hover:shadow-lg
                  ${odd ? 'order-1' : 'order-0'}
                `}
                sx={{
                  background: (theme) => theme.palette.text.secondary,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                <h1 className="mb-3 flex flex-row gap-3 items-center w-full text-current font-black text-md">{title}</h1>
                <p>{subTitle}</p>
              </Box>
              {imageSrc && (
              <Box
                className={`
                  rounded-md w-full overflow-hidden h-1/2 
                  hover:-translate-y-1 ease-in-out transition-all hover:shadow-lg
                  ${odd ? 'order-0' : 'order-1'}
                `}
                sx={{
                  background: (theme) => theme.palette.text.secondary,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                <img src={imageSrc} className="w-full h-full object-fill" />
              </Box>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export function CtaImage({
  contentData: {
    description, costRange, name, title, image, link, posts,
  },
  setCurrent,
}) {
  return (
    <Box
      className="relative grid grid-cols-6 w-full py-5 overflow-hidden rounded-md items-center"
      sx={{ background: (theme) => theme.palette.text.primary }}
    >
      {/* description of service */}
      <Box
        className="inline-flex md:order-[0] xs:order-[1] px-3 h-full md:flex-row xs:flex-col col-span-3"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        <div className="relative inline-flex flex-col w-full z-20 h-full">
          <CurrencyDollarIcon className="w-6 h-6" />
          {costRange}

          <Typography
            align="left"
            variant="caption"
            component="h1"
            color="currentColor"
            className="mb-7 font-medium flex flex-row gap-3 items-center"
          >
            {title}
          </Typography>

          <Typography
            align="left"
            variant="body1"
            color="currentColor"
            className="mb-7 text-ellipsis overflow-hidden h-full"
          >
            {description}
          </Typography>

          <div className="inline-flex flex-row w-full gap-5 justify-start flex-nowrap self-end items-end h-full relative">
            <RegularButton onClick={() => navigate(`./booking/projectId?=${title}`)}>
              Start project
            </RegularButton>

            <RegularButton
              type="secondary"
              onClick={() => navigate(link || '/#contact')}
            >
              Learn Moreeee
            </RegularButton>
          </div>
        </div>
      </Box>

      {/* media content */}
      <Box
        className="md:inline-flex sm:none md:order-1 md:order-0 h-full relative overflow-hidden col-span-3 rounded-md"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >

        <img
          alt={`${title}`}
          className="relative h-full object-fit"
          src={defaultImage}
        />
      </Box>

      {/* stats area */}
    </Box>
  );
}

/*
  <StaticQuery
    query={graphql`
        allMarkdownRemark(
          filter: {frontmatter: {category: {regex: "/${title}/"}}}
          limit: 5
        ) {
          edges {
            node {
              id
              html
              excerpt
              frontmatter {
                catagory
                metaDescription
                date
                path
                title
                thumbnail
              }
            }
            next {
              nid: id
            }
            previous {
              pid: id
            }
          }
        }
    `}
    render={(data) => data.map((d) => (
      <img
        alt={`${title}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        src={defaultImage}
      />
    ))}
  />
*/
