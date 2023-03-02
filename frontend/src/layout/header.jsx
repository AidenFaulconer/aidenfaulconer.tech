/* eslint-disable no-unused-vars */
import { graphql, useStaticQuery, Link } from 'gatsby';
import React, { useState, Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  ArrowPathIcon,
  Bars3Icon,
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon,
  PencilIcon,
  PhoneIcon,
  PlayIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useThemeo } from '@emotion/react';
// import ScrollProgressBar from '../components/scroll-progress';
import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import { useScrollProgress } from '../components/util/customHooks';
import { useStore } from '../store/store';
// import { Popover } from '@headlessui/react'

const services = [
  {
    name: 'Business Consultation',
    description: 'Learn what it takes to be the CEO.',
    href: '/services/business',
    icon: UserGroupIcon,
  },
  {
    name: 'Software Development',
    description: 'Get business educated.',
    href: '/services/softwaredevelopment',
    icon: CodeBracketIcon,
  },
  {
    name: 'Branding',
    description: 'Communicate your value visually.',
    href: '/services/branding',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Design',
    description: 'Build visual appeal for your business.',
    href: '/services/design',
    icon: PencilIcon,
  },
  {
    name: 'Automation',
    description:
      'Build strategic funnels that will drive your customers to convert',
    href: '/services/automation',
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
];
const resources = [
  {
    name: 'Courses',
    description:
      'Get all of your questions answered in our forums or contact support.',
    href: '/courses',
    icon: AcademicCapIcon,
  },
  {
    name: 'Blog',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '/blog',
    icon: BookOpenIcon,
  },
  {
    name: 'Events',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '/events',
    icon: CalendarIcon,
  },
];
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
  },
  { id: 3, name: 'Improve your customer experience', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const pages = [
  { name: 'About', href: '/about', icon: BookOpenIcon },
  { name: 'Podcast', href: '/podcast', icon: BookOpenIcon },
  { name: 'Videos', href: '/videos', icon: BookOpenIcon },
  { name: 'Courses', href: '/courses', icon: BookOpenIcon },
  { name: 'Booking', href: '/booking', icon: BookOpenIcon },
  // { name: 'Pricing', href: '/pricing', icon: BookOpenIcon },
];

const menuIconStyles = {
  color: 'inherit',
  '& svg': {
    // transform: 'scale(.5)',
    left: 0,
    zIndex: 100,
    top: '-12mm',
    display: 'inline-block',
    transition: (theme) => theme.transitions.create(
      ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
      { duration: '0.25s', easing: 'ease-in-out' },
    ),
  },
  '&:hover': {
    '& svg': {
      top: '0mm',
      transform: 'rotate(340deg) scale(1.5) !important',
      fill: 'text.primary.main',
      transition: (theme) => theme.transitions.create(
        ['transform', 'box-shadow', 'background', 'margin', 'border', 'top'],
        { duration: '0.25s', easing: 'ease-in-out' },
      ),
    },
  },
};

export function Header() {
  // const [isExpanded, toggleExpansion] = useState(false)
  // const { site } = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  const [drawerState, setDrawerState] = React.useState(false);
  const iOS = (typeof window !== 'undefined'
    && /iPad|iPhone|iPod/.test(navigator?.userAgent))
    || false;

  const toggleDrawer = React.useCallback(() => setDrawerState((drawerState) => !drawerState), []);
  const theme = useTheme();
  const toggleTheme = useStore((state) => state.appContext.methods.toggleTheme);
  const triggerPageChange = useStore((state) => state.threejsContext.methods.triggerPageChange);
  const changePage = useStore((state) => state.threejsContext.methods.changePage);
  const setCurrent = useStore((state) => state.appContext.methods.setCurrent);
  const setColor = useStore((state) => state.threejsContext.methods.setColor);
  const type = useStore((state) => state.appContext.type);

  const boldCurrentPage = React.useCallback((name, i) => {
    if (typeof window !== 'undefined') { if (pages[i].url === document.location.hash) return <b>{name}</b>; }
    return name;
  }, []);

  const scrollToElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const navigateToPage = React.useCallback((pageLink, pageIndex) => {
    // if (typeof window === 'undefined') return;
    if (pageLink[0] === '#') {
      if (document.location.pathname !== '/') changePage({ selectedIndex: -1, pageLink: '/' });// go to index page
      setCurrent(pageIndex);
      scrollToElementById('carousel-container-0');
      return;
    }

    setColor({ x: theme.palette.text.primary, y: 1 });
    triggerPageChange({ background: theme.palette.text.special, transform: 'skew(-10deg)', left: '215vw' });
    changePage({
      selectedIndex: pageIndex || -1, // -1 is index page
      pageLink,
    });
  }, [setCurrent]);

  const scrollProgress = useScrollProgress();
  const logo = React.useCallback(
    () => {
      const primaryColor = theme.palette.text.primary;
      const secondaryColor = theme.palette.text.secondary;

      return (
        <div className="ml-2 relative">
          {/* progress svg bar */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[-6.25px] left-[-12.5px] z-[5] "
            style={{
              strokeDasharray: 250,
              strokeDashoffset: 250 - ((250 * scrollProgress) / 100),
            }}
          >
            <circle
              cx="40"
              cy="40"
              r="39.5"
              strokeWidth={0.5}
              stroke={theme.palette.text.secondary}
            />
          </svg>

          <Box
            onClick={() => navigateToPage('/', 0)}
            className="border-none w-12 h-16 z-20 ml-[5px] mt-[3px] flex justify-center cursor-pointer fill-current"
            sx={{ ...menuIconStyles }}
            // {...SCROLL_PROPS}
            dangerouslySetInnerHTML={{
              __html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="61" fill="none" viewBox="0 0 56 61">
              <defs/>
              <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width=".769" d="M18.662 50.518l-9.626 2.588V25.924l9.626-1.737v26.331z"/>
              <path fill="${secondaryColor}" d="M16.627.808c8.771 0 11.163 3.2 11.163 3.2V15.21l-14.352-6.4L.744 13.726C.744.925 16.627.808 16.627.808z"/>
              <path fill="${secondaryColor}" d="M38.905.808c-8.771 0-11.163 3.2-11.163 3.2V15.21l14.352-6.4 12.694 4.917C54.788.925 38.905.808 38.905.808z"/>
              <path fill="${secondaryColor}" d="M36.67 17.893l10.191 1.042 1.23-.417V7.892H36.67v10.001zM36.671 34.77l9.968 2.5 1.66-1.042v-6.875l-11.42.208-.208 5.209zM8.652 53.608L.538 50.769v-36c0-12.801 12.898-12.362 12.898-12.362 14.353.8 14.353 9.6 14.353 14.4v44.001l-9.569-3.536V36.227c0-4.8-9.568-7.867-9.568-2.864v20.245zM36.462 23.102l15.576 2.5-15.576 3.334v-5.834z"/>
              <path fill="${primaryColor}" stroke="#0${primaryColor}064" stroke-width=".769" d="M8.651 15.208c0-4.8 9.569-3.2 9.569 1.6v11.2l-9.569-2.4v-10.4z"/>
              <path fill="${primaryColor}" stroke="${primaryColor}" stroke-width=".769" d="M18.278 28.046L8.65 25.608v-10.4c0-4.685 9.627-3.645 9.627 1.214v11.624z"/>
              <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width=".769" d="M8.359 25.433l-.022.751 10.175 2.5.477.117v-5.327l-.455.083L8.36 25.433zM36.972 27.477v.437l.434-.055 14.247-1.82v9.478l-4.63 1.25v-3.872a1.83 1.83 0 00-.504-1.291c-.315-.333-.747-.556-1.227-.691-.957-.269-2.192-.212-3.398.127-2.397.672-4.922 2.542-4.922 5.605V57.33l-8.799 2.943V40.607v-23.8c0-2.413.008-5.704 1.737-8.498 1.707-2.76 5.154-5.121 12.24-5.519h.023l.104.003c.093.003.23.008.404.018.35.021.852.063 1.454.145 1.208.166 2.81.495 4.402 1.146 1.594.652 3.162 1.618 4.325 3.05 1.157 1.424 1.93 3.33 1.906 5.9h0v3.901l-7.538 1.512v-3.489c0-1.17-.71-2.037-1.683-2.566-.969-.525-2.233-.743-3.478-.636-1.248.106-2.516.54-3.48 1.367-.974.834-1.617 2.052-1.617 3.666v10.67z"/>
            </svg>
          `,
            }}
          />
        </div>
      );
    },
    [type, scrollProgress],
  );

  return (
    <Popover className="w-[100vw] z-50 fixed">
      {/* NAV */}
      <div className="mx-auto">
        {/* <ScrollProgressBar /> */}
        <div style={{ background: theme.palette.text.primary }} className=" flex items-center px-4 sm:px-6 justify-between py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Business Educated</span>
              {logo()}
            </Link>
          </div>

          {/* MOBILE MENU BUTTOn */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-BEred-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {pages.map(({ href, name }) => (
              <Link
                to={href}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                key={`${name} page-link-header`}
              >
                {name}
              </Link>
            ))}

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-BEred-500 focus:ring-offset-2',
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                              >
                                <Icon
                                  className="h-6 w-6 flex-shrink-0 text-BEred-600"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-base font-medium text-gray-500">
                              Recent Posts
                            </h3>
                            <ul role="list" className="mt-4 space-y-4">
                              {recentPosts.map((post) => (
                                <li
                                  key={post.id}
                                  className="truncate text-base"
                                >
                                  <Link
                                    to={post.href}
                                    className="font-medium text-gray-900 hover:text-gray-700"
                                  >
                                    {post.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <Link
                              href="/blog"
                              className="font-medium text-BEred-600 hover:text-BEred-500"
                            >
                              View all posts
                              <span aria-hidden="true"> &rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>

          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link
              to="/booking"
              className="whitespace-nowrap text-base font-medium bg-BEred rounded-full text-white px-5 shadow-lg py-2 rotate-[-15deg] hover:rotate-[0deg] transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-14 w-auto">
                    {logo()}
                  </div>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-BEred-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {pages.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        {/* <Icon
                        className="h-6 w-6 flex-shrink-0 text-BEred-600"
                        aria-hidden="true"
                      /> */}
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link
                  to="/pricing"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </Link>

                {resources.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div>
                <Link
                  to="/booking"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-BEred px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-BEred-700"
                >
                  Book now
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?
                  {' '}
                  <Link
                    to="/login"
                    className="text-BEred-600 hover:text-BEred-500"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;
