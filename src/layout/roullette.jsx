import { CardMedia } from '@mui/material';
import React from 'react';

import ThreeDCarousel from '../components/custom/threeDCarousel';
// sections
import { SectionHeader } from '../components/section-header';
// sub sections
import Qualifications from '../components/portfolio-page/qualifications';
import Services, { SelectionContent, ServicesSelection } from '../components/portfolio-page/services';
import { Languages, Experience } from '../components/portfolio-page/skills';

import awmImage from '../../static/assets/blog/awm.png';
import rvrImage from '../../static/assets/blog/rvr.png';
import rgImage from '../../static/assets/blog/railgun.png';
import afImage from '../../static/assets/blog/me.png';
import lgImage from '../../static/assets/blog/uc.png';
import xprtImage from '../../static/assets/blog/xperthubb.png';
import ajImage from '../../static/assets/blog/aj.png';

// ========================================================================== //
// IMPORTANT! each section is an array, and has a 1:1 correspondence via
// array index

// ========================================================================== //
// topmost section roullette data **these sections are the sections that
// dictate the sub selections availible
// ========================================================================== //
const sections = [
// ========================================================================== //
//     services
  {
    illustrationType: 'coffee',
    headline: 'Services',
    key: 'services',
  },
  // ========================================================================== //
  //     experience
  {
    illustrationType: 'confidence',
    headline: 'Experience',
    key: 'experience',
  },
  // ========================================================================== //
  //   skills
  {
    illustrationType: 'moustache',
    headline: 'Skills',
    key: 'skills',
  },
  // ========================================================================== //
  //   vr
  {
    illustrationType: 'vr',
    headline: 'Process',
    key: 'pprocess',
  },
  // ========================================================================== //
  //   Blog
  {
    illustrationType: 'genie',
    headline: 'Blog',
    key: 'blog',
  },
  // ========================================================================== //
  //   Projects
  {
    illustrationType: 'genie',
    headline: 'Projects',
    key: 'projects',
  },

//   {
//     selectionComponent: Services,
//     subSectionComponent: null,
//     headline: 'invisible',
//     key: 'invisible',
//   },
];

// ========================================================================== //
// sub-section routlette data **sub section component shows off content in a
// sub-selection
// ========================================================================== //
const subSections = [
  {
    selectionComponent: ServicesSelection,
    subSectionComponent: SelectionContent,
    subSectionData: [
      {
        title: 'Websites',
        costRange: '400$-5000$',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Websites',
        threejs: {
          // animationsPlaying: ['hold'],
          animationsPlaying: ['hold'],
          propsUsing: ['Iphone'],
        },
      },
      {
        title: 'Design',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Design',
        threejs: {
          // animationsPlaying: ['write'],
          animationsPlaying: ['hold'],
          propsUsing: ['Pencil', 'Emoji'],
        },
      },
      {
        title: 'Virtual Reality',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Virtual Reality',
        threejs: {
          // animationsPlaying: ['hold'],
          animationsPlaying: ['hold'],
          propsUsing: ['VR'],
        },
      },
      {
        title: 'Branding',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Branding',
        threejs: {
          // animationsPlaying: ['write'],
          animationsPlaying: ['hold'],
          propsUsing: ['Pencil', 'Paper'],
        },
      },
      {
        title: 'Other',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Other',
        threejs: {
          // animationsPlaying: ['build'],
          animationsPlaying: ['hold'],
          propsUsing: ['Hammer'],
        },
      },
      {
        title: 'My Projects',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'My Projects',
        threejs: {
          // animationsPlaying: ['build'],
          animationsPlaying: ['hold'],
          propsUsing: [],
        },
      },
    ],
    headline: 'Services',
    key: 'Services',
  },
  {
    selectionComponent: ServicesSelection,
    subSectionComponent: SelectionContent,
    subSectionData: [
      {
        title: 'Australian War Memorial',
        image: awmImage,
        alt: 'JavaScript',
        category: 'Full-Stack Developer',
        description: `
          • Used C#, JavaScript, JSON, REST, back-end & frontend developed 
          • developed in Drupal, React, React360, Unity, JavaScript, & C# 
          • Researching & solving complex front-end & back-end software problems 
          • Team collaboration to deliver VR experiences 
          • Consistent learning & documentation supplying up-to-date technical skills; such as C#, React, & Unity development 
          `,
        icon: '',
      },
      {
        title: 'Recovery VR',
        image: rvrImage,
        alt: 'JavaScript',
        category: 'Full-Stack Developer',
        description: (
          <>
            Use C#, typescript, javascript, with a back-end firebase/graphql and
            frontend vue development
            <br />
            <br />
            Built mini-games, and create on both web and mobile unity apps
            <br />
            <br />
            Programmed frontend application to deliver configurable vr experiences
            <br />
            <br />
            Web interface for full remote-control of Virtual Reality experiences
            <br />
            <br />
            developed CI/CD pipelines for back-end and front-end development
            operations in Gitlab
            <br />
            <br />
            Perform auto-scaling and load-balancing via Kubernetes and Docker
            through GitLab pipelines and hosting services provided by Google Cloud
            Platform
            <br />
            <br />
            Extending the apollo platform to develop a versatile and clean backend
            API with GraphQL
            <br />
            <br />
            UI/UX balanced and designed iteratively with changing clients needs
            <br />
            <br />
          </>
        ),
        icon: '',
      },
      {
        title: 'Freelance',
        image: afImage,
        alt: 'JavaScript',
        category: 'Graphic Design, Full-Stack Development',
        description: `
          • Designing and iterating through logos to match the desired image of a given brand 
          • Website design, including interactions prototyped through framer 
          • Designing websites for friends/acquaintances/family members 
          • Developing shopfronts with Shopify, and Big-commerce 
          • Utilising WordPress to enable easy content management in given websites 
          • Facilitating work through React, Vue, Framer, Figma, and various cloud storage providers 
          `,
        icon: '',
      },
      {
        title: 'XpertHubb',
        image: xprtImage,
        alt: 'JavaScript',
        category: 'Full-Stack Developer',
        description: `
          • Working in a very high-paced startup environment, networking and managing through startup school and IACT community engagement 
          • Development through Javascript, React, and back-end development through express and MongoDB 
          • Developing a software platform through the cloud services via AWS(IAAS), MongoDB(DAAS), and Stripe(SAAS) 
          • Researching & solving problems in the world of mentor-ships 
          • Engagement with clients and management to create a product they want 
          `,
        icon: '',
      },
      {
        title: 'Railgun',
        image: rgImage,
        alt: 'JavaScript',
        category: 'Full-Stack Developer',
        description: `
          • Typescript, vue, quasar, frontend development with blockchain api’s 
          • Design and brand consultation for communicating the wallet and brands purpose 
          • Developing a secure crypto wallet utilising ethereum smart-contracts 
          • Full UI/UX design and development for the desired application 
          `,
        icon: '',
      },
      {
        title: "L'arche Genesaret",
        image: lgImage,
        alt: 'JavaScript',
        category: 'Disability support worker',
        description: `
          • Creating harmony and wellbeing amongst different individuals in a shared space  
          • Identifying emotional and social pressure points and alleviating them 
          • Conflict resolution taking into consideration wildly different conflicting goals/needs 
          • Compassionate and empathetic social developmental support  
          • Administrative NDIS documentation and reporting  
          • Medication handling and medical practitioner liaise 
          `,
        icon: '',
      },
      {
        title: 'AJ Gardencare',
        image: ajImage,
        alt: 'JavaScript',
        category: 'Full-Stack Developer',
        description: `
          • Creating harmony and wellbeing amongst different individuals in a shared space  
          • Identifying emotional and social pressure points and alleviating them 
          • Conflict resolution taking into consideration wildly different conflicting goals/needs 
          • Compassionate and empathetic social developmental support  
          • Administrative NDIS documentation and reporting  
          • Medication handling and medical practitioner liaise 
          `,
        icon: '',
      },
      {
        title: 'You',
        image: ajImage,
        alt: 'JavaScript',
        category: 'Lets find out together',
        description: `
          • Creating harmony and wellbeing amongst different individuals in a shared space  
          • Identifying emotional and social pressure points and alleviating them 
          • Conflict resolution taking into consideration wildly different conflicting goals/needs 
          • Compassionate and empathetic social developmental support  
          • Administrative NDIS documentation and reporting  
          • Medication handling and medical practitioner liaise 
          `,
        icon: '',
      },
      {
        title: 'ICN',
        image: ajImage,
        alt: 'JavaScript',
        category: 'Consulting',
        description: `
          • Creating harmony and wellbeing amongst different individuals in a shared space  
          • Identifying emotional and social pressure points and alleviating them 
          • Conflict resolution taking into consideration wildly different conflicting goals/needs 
          • Compassionate and empathetic social developmental support  
          • Administrative NDIS documentation and reporting  
          • Medication handling and medical practitioner liaise 
          `,
        icon: '',
      },
    ],
    headline: 'Experience',
    key: 'sub-experience',
  },
  {
    selectionComponent: ServicesSelection,
    subSectionComponent: SelectionContent,
    subSectionData: [
      {
        title: 'JavaScript',
        image: awmImage,
        alt: 'JavaScript',
        // I consider javascript my child, it is where I have spent most of my career developing in, its extremely fast and easy to use especially with modern frameworks such as React, Vue, and more advanced frameworks like Gatsby.js and Quasar.js which can take a codebase and reform it into an ideal web platform, or even compiled down into platform agnostic applications.
        description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute.',
        icon: '',
      },
      {
        title: 'C#',
        image: awmImage,
        alt: 'C#',
        description: `
          In my experience making Virtual Reality appliccations,
          I have heavily relied upon and never been dissapointed by C# in platforms such as Unity,
          or services such as the .NET Core framework for enabling networking within Unity.
          Examples of such applications are data driven game experiences, and data-driven customizable
          interfaces for developers to build from.
          `,
        icon: '',
      },
      {
        title: 'Typescript',
        image: awmImage,
        alt: 'Typescript',
        description: `
          Typescript has become the happy medium between javascript and C#, where javascript can now be typed enabling transparency and better
          debugging and testing capabilities which are important for any large scale javascript driven applications.
          I love Typescript because it is much more readable and maintainable in the long run, because of featues such as type inferencing, and type checking.
          `,
        icon: '',
      },
      {
        title: 'C++',
        image: awmImage,
        alt: 'C++',
        description: `
          C++ Was my first language, and gave me the foundation to learn any language, because C++ covers virtually every aspect of programming on a low level, building a platform to understand any further abstractions present in modern high level languages or low level languages.
          I am knowledgable in advanced C++ concepts such as Generits, Templating, Smart Pointers, Delegations,
          Memory management, and advanced inheritance ie: abstract, virtual, and polymorphism.
          My favourite C++ features are the ability to use templates, and the ability to use smart pointers from the STL.
          `,
        icon: '',
      },
      {
        title: 'Back-End',
        image: awmImage,
        alt: 'Express',
        frameworks: ['Express', 'Node.js', 'IIS', 'ASP.NET', 'ASP.NET Core'],
        description: `
          A complete and extensible backend service is a key part of any web application,
          APIS and services drive revenue and growth and make results measurable,
          and also hold your companies data and make it easy to use. I have created back end applications using ExpressJs,
          MongoDB, SQL, Docker, DJango, PHP, NodeJs, and ASP.NET Core. Further extending backend capabilities with techniques such as Server Side Rendering, Database Fragmenting, and Webpack.
          `,
        icon: '',
      },
      {
        title: 'Python',
        image: awmImage,
        alt: 'Python',
        description: `
          The grandchild of modern day programming languages, Python is a powerful language that has a beautiful community
          and suite of libraries which use very fast code modules written in lower level languages such as C++, Pythons
          power comes from its abiliy to use modules written in other languages, and reduce the amount of code written
          greatly, we see developments in the field of  Machine Learning exploding due to its ability to use Python as
          a scripting language.
      
          `,
        icon: '',
      },
      {
        title: 'Front-End',
        image: awmImage,
        alt: 'Front-End',
        // Where I specialise the most, I create full front-end applications using a full process of planning,
        // ideating, iterating, procurement, and deployment of a web applications using the software development life cycle and design thinking process in harmony.
        // I've become accustomed to many frameworks, preparing me for anything that comes next, because I want my applications to be as prepared for the future as you do.
        // Some frameworks i've become very accustomed to through my career are React, Vue, Quasar,
        // Gatsby, AngularJS, Django, Next.js, and ASP.NET, where they have been expanded upon
        // at scales both large and small, and addressing the scalability proportionally in code.

        // Lets create some wacky, user friendly, and interactive applications together. 🥳
        description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute.',
        icon: '',
      },
      {
        title: 'Office',
        image: awmImage,
        alt: 'Office',
        description: '',
        icon: '',
      },
      {
        title: 'Business accumen',
        image: awmImage,
        alt: 'Business accumen',
        // The biggest challenges I see in the IT and Design industries are
        // the unpredictible scheduling involved, and lack of business focus, I provide detailed plans with enough contingincy time to
        // allow for a realistic and predictible timeline for your end product, involving you wherever you
        // wish to, so you can have measured results, and plenty of room for collaboration. Alongside this, I document the entire process both in code, and through documentation.

        // Businessses today may find it harder to understand and manage the expectations of there users, I've had enough expereince to know how to prototype, do user testing, and turn there ideas into reality taking into account your visions, business processes, and goals.

        description: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute.',
        icon: '',
      },
    ],
    headline: 'Skills',
    key: 'sub-skills',
  },
  {
    selectionComponent: ServicesSelection,
    subSectionComponent: Services,
    subSectionData: [
      {
        title: 'Virtual Reality Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'VR process',
      },
      {
        title: 'Web Development Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'Web Development Process',
      },
      {
        title: 'UI/UX Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'UI/UX Process',
      },
      {
        title: 'Design Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'Design Process',
      },
      {
        title: 'Mobile Development Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'Mobile Development Process',
      },
      {
        title: 'Database Development Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'Mobile Development Process',
      },
      {
        title: 'Consultancy Process',
        description:
                    'Come back to read more :)',
        // image: servicesImage,
        name: 'Consultancy Process',
      },
    ],
    headline: 'Virtual Reality',
    key: 'sub-vr',
  },
  {
    selectionComponent: ServicesSelection,
    subSectionComponent: Services,
    subSectionData: [
      {
        title: 'Websites',
        costRange: '400$-5000$',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Websites',
        threejs: {
          // animationsPlaying: ['hold'],
          animationsPlaying: ['hold'],
          propsUsing: ['Iphone'],
        },
      },
      {
        title: 'Design',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Design',
        threejs: {
          // animationsPlaying: ['write'],
          animationsPlaying: ['hold'],
          propsUsing: ['Pencil', 'Emoji'],
        },
      },
      {
        title: 'Virtual Reality',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Virtual Reality',
        threejs: {
          // animationsPlaying: ['hold'],
          animationsPlaying: ['hold'],
          propsUsing: ['VR'],
        },
      },
      {
        title: 'Branding',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Branding',
        threejs: {
          // animationsPlaying: ['write'],
          animationsPlaying: ['hold'],
          propsUsing: ['Pencil', 'Paper'],
        },
      },
      {
        title: 'Other',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Other',
        threejs: {
          // animationsPlaying: ['build'],
          animationsPlaying: ['hold'],
          propsUsing: ['Hammer'],
        },
      },
      {
        title: 'My Projects',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'My Projects',
        threejs: {
          // animationsPlaying: ['build'],
          animationsPlaying: ['hold'],
          propsUsing: [],
        },
      },
    ],
    headline: 'Blog',
    key: 'sub-vr',
  },
  {
    selectionComponent: ServicesSelection,
    subSectionComponent: Services,
    subSectionData: [
      {
        title: 'Websites',
        costRange: '400$-5000$',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Websites',
        threejs: {
          // animationsPlaying: ['hold'],
          animationsPlaying: ['hold'],
          propsUsing: ['Iphone'],
        },
      },
      {
        title: 'Design',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Design',
        threejs: {
          // animationsPlaying: ['write'],
          animationsPlaying: ['hold'],
          propsUsing: ['Pencil', 'Emoji'],
        },
      },
      {
        title: 'Virtual Reality',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Virtual Reality',
        threejs: {
          // animationsPlaying: ['hold'],
          animationsPlaying: ['hold'],
          propsUsing: ['VR'],
        },
      },
      {
        title: 'Branding',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Branding',
        threejs: {
          // animationsPlaying: ['write'],
          animationsPlaying: ['hold'],
          propsUsing: ['Pencil', 'Paper'],
        },
      },
      {
        title: 'Other',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'Other',
        threejs: {
          // animationsPlaying: ['build'],
          animationsPlaying: ['hold'],
          propsUsing: ['Hammer'],
        },
      },
      {
        title: 'My Projects',
        costRange: '',
        description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, mauris pellentesque amet nunc, mi, sit semper et fringilla. Id volutpat nec gravida tristique sit. Vitae adipiscing nam enim ut donec bibendum ante.',
        // image: servicesImage,
        name: 'My Projects',
        threejs: {
          // animationsPlaying: ['build'],
          animationsPlaying: ['hold'],
          propsUsing: [],
        },
      },
    ],
    headline: 'Projects',
    key: 'sub-vr',
  },
//   {
//     selectionComponent: Services,
//     subSectionComponent: null,
//     headline: 'invisible',
//     key: 'invisible',
//   },
];
// ========================================================================== //
// Routlette
// ========================================================================== //
export default () => (
  <ThreeDCarousel
    // carousel dimensions
    carouselHeight={300}
    cardWidth={400}
    gutter={2}// in pixels
    // top section
    title="Sections"
    key="Sections-carousel"
    carouselData={sections}// needs, title, image, alt, description, icon, cta, category
    SelectionComponent={SectionHeader}// top level selection
    // sub section
    subSectionData={subSections}// needs selectionComponent, subSectionComponent, headline, key
    SubSelectionComponent={ThreeDCarousel}
  />
);
