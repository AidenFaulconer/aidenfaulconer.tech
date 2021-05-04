import seo from "@/cms/partials/seo";
import hero from "@/cms/sections/hero";

import React from "react";
import { graphql } from "gatsby";

import Hero from "@/Sections/Hero";

// import CMS from "netlify-cms-app";
// import pages from "@/cms/pages";
// import posts from "@/cms/collections/posts";

// window.CMS_MANUAL_INIT = true;
// CMS.init({
//   config: {
//     load_config_file: false,
//     display_url: "http://localhost:8000",
//     backend: {
//       name: "git-gateway",
//       branch: "master",
//     },
//     media_folder: "/static/img",
//     public_folder: "/img",
//     collections: [pages, posts],
//   },
// });

export default function SectionsGenerator({ sections }) {
  const sectionsComponents = {
    hero: Hero,
  };

  const sectionsContent = sections.map((section, key) => {
    const Section = sectionsComponents[section.type];
    if (Section) {
      return <Section key={key} data={section} />;
    }
    return <div>{section.type}</div>;
  });

  return <>{sectionsContent}</>;
}

export const query = graphql`
  fragment Sections on MarkdownRemarkFrontmatter {
    sections {
      id
      type
      title
      subtitle
      content
    }
  }
`;

const hero = {
  label: "Hero",
  name: "hero",
  widget: "object",
  collapsed: false,
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      required: false,
    },
    {
      label: "Subtitle",
      name: "subtitle",
      widget: "string",
      required: false,
    },
    {
      label: "Content",
      name: "content",
      widget: "markdown",
      required: false,
    },
  ],
};

const netlifyCMSConfiguration = {
  backend: {
    name: "github",
    repo: "AidenFaulconer/aidenfaulconer.com",
  },
  media_folder: "static/assets",
  public_folder: "/assets",
  collections: [
    {
      name: "settings",
      label: "Settings",
      files: [
        {
          name: "config",
          label: "Config",
          file: "site-meta-data.json",
          fields: [
            {
              widget: "string",
              name: "title",
              label: "Site Title",
              required: true,
            },
            {
              widget: "string",
              name: "siteUrl",
              label: "Website URL",
              required: true,
            },
            {
              widget: "text",
              name: "description",
              label: "Description",
              default: "",
              required: false,
            },
            {
              widget: "object",
              name: "home",
              label: "Homepage Options",
              fields: [
                {
                  widget: "string",
                  name: "title",
                  label: "Title",
                  default: "",
                  required: false,
                },
                {
                  widget: "markdown",
                  name: "description",
                  label: "Description",
                  default: "",
                  required: false,
                },
              ],
            },
            {
              label: "Global title",
              name: "site_title",
              widget: "string",
            },
            {
              label: "Post Settings",
              name: "posts",
              widget: "object",
              fields: [
                {
                  label: "Number of posts on frontpage",
                  name: "front_limit",
                  widget: "number",
                  min: 1,
                  max: 10,
                },
                {
                  label: "Default Author",
                  name: "author",
                  widget: "string",
                },
                {
                  label: "Default Thumbnail",
                  name: "thumb",
                  widget: "image",
                  class: "thumb",
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "faq",
      label: "FAQ",
      folder: "_data/faqs",
      create: true,
      fields: [
        {
          label: "Question",
          name: "title",
          widget: "string",
          tagname: "h1",
        },
        {
          label: "Answer",
          name: "body",
          widget: "markdown",
        },
      ],
    },
    {
      label: "Blog",
      name: "blog",
      folder: "_data/blog",
      slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
      create: true,
      fields: [
        {
          label: "Template",
          name: "template",
          widget: "hidden",
          default: "BlogPost",
        },
        {
          label: "Catagory",
          name: "catagory",
          widget: "string",
          default: "blog",
          required: true,
        },
        {
          name: "path",
          label: "Path",
          widget: "string",
          pattern: [
            "^(\\/[-_a-z|0-9]+)+",
            "Path must start with /projects and NOT end with / and be lowercased",
          ],
          default: "/blog",
        },
        {
          label: "Date",
          name: "date",
          widget: "datetime",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
        },
        {
          label: "Meta Description",
          name: "metaDescription",
          widget: "text",
          required: true,
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
          minimal: true,
        },
        {
          label: "Featured Image,",
          name: "thumbnail,",
          widget: "image",
          hint: "Image size 1280x800 works best :)",
          media_library: {
            config: {
              multiple: false,
            },
          },
        },
      ],
    },
    {
      label: "Projects",
      name: "project",
      folder: "_data/projects",
      slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
      create: true,
      fields: [
        {
          label: "Template",
          name: "template",
          widget: "hidden",
          default: "BlogPost",
        },
        {
          label: "Catagory",
          name: "catagory",
          widget: "string",
          default: "project",
          required: true,
        },
        {
          name: "path",
          label: "Path",
          widget: "string",
          pattern: [
            "^(\\/[-_a-z|0-9]+)+",
            "Path must start with /projects and NOT end with / and be lowercased",
          ],
          default: "/projects",
        },
        {
          label: "Date",
          name: "date",
          widget: "datetime",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
        },
        {
          label: "Meta Description",
          name: "metaDescription",
          widget: "text",
          required: true,
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
          minimal: true,
        },
        {
          label: "Featured Image,",
          name: "thumbnail,",
          widget: "image",
          hint: "Image size 1280x800 works best :)",
          media_library: {
            config: {
              multiple: false,
            },
          },
        },
      ],
    },
    {
      label: "Page Configuration",
      name: "page-configuration",
      slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
      folder: "_data/pages",
      create: true,
      fields: [
        {
          widget: "string",
          label: "Catagory",
          name: "catagory",
          required: true,
          default: "pageConfiguration",
        },
        {
          widget: "string",
          label: "Page title",
          name: "title",
          required: true,
          default: "Beautiful, scalable, software.",
        },
        {
          widget: "string",
          label: "Page path",
          name: "pagePath",
          pattern: [
            "^(\\/[-_a-z|0-9]*)+",
            "Path must start with /projects and NOT end with / and be lowercased",
          ],
          default: "/",
        },
        {
          widget: "text",
          label: "Title description",
          name: "description",
          default:
            "I create software applications for online buisinesses like you, so you can focus on getting your users needs fulfilled",
          required: true,
        },
        {
          widget: "object",
          name: "cta",
          label: "cta",
          fields: [
            {
              widget: "string",
              label: "main cta label",
              name: "mainCTALabel",
              required: true,
              default: "click me",
            },
            {
              widget: "string",
              name: "main-cta",
              label: "Main call to action",
              default: "/",
              required: true,
              pattern: [
                "^(\\/[-_a-z|0-9]*|\\#[-_a-z|0-9]+)+",
                "Must be a valid path located on the page or a valid route, lowercased, and NOT end with /, if an html ID only use # at the BEGINNING ONCE",
              ],
            },
            {
              widget: "string",
              label: "secondary cta label",
              name: "secondaryCTALabel",
              required: true,
              default: "click me",
            },
            {
              widget: "string",
              name: "secondary-cta",
              label: "Secondary call to action",
              default: "/",
              required: true,
              pattern: [
                "^(\\/[-_a-z|0-9]+|\\#[-_a-z|0-9]+)+",
                "Must be a valid path located on the page or a valid route, lowercased, and NOT end with /, if an html ID only use # at the BEGINNING ONCE",
              ],
            },
          ],
        },
        {
          label: "project post Settings",
          name: "projectSection",
          widget: "object",
          fields: [
            {
              label: "Number of posts on portfolio page",
              name: "post_limit",
              widget: "number",
              min: 1,
              max: 6,
              required: true,
            },
            {
              label: "Default Author",
              name: "author",
              default: "aiden faulconer",
              widget: "string",
              required: true,
            },
          ],
        },
        {
          label: "skills section",
          name: "skillSection",
          widget: "object",
          label_singular: "skill group",
          fields: [
            {
              label: "Languages",
              name: "languages",
              widget: "list",
              label_singular: "skill",
              fields: [
                {
                  label: "Skill name",
                  name: "skill-name",
                  widget: "string",
                  default: "javascript",
                },
                {
                  label: "Icon name",
                  name: "icon-name",
                  widget: "string",
                  default: "javscriptIcon",
                },
                {
                  label: "Skill description",
                  name: "skillDescription",
                  widget: "string",
                  default: "3 years",
                },
              ],
            },
            {
              label: "Tools",
              name: "tools",
              widget: "list",
              label_singular: "skill",
              fields: [
                {
                  label: "Skill name",
                  name: "skill-name",
                  widget: "string",
                  default: "javascript",
                },
                {
                  label: "Icon name",
                  name: "icon-name",
                  widget: "string",
                  default: "javscriptIcon",
                },
                {
                  label: "Skill description",
                  name: "skillDescription",
                  widget: "string",
                  default: "3 years",
                },
              ],
            },
            {
              label: "Frameworks & API's'",
              name: "framework-apis",
              widget: "list",
              label_singular: "skill",
              fields: [
                {
                  label: "Skill name",
                  name: "skill-name",
                  widget: "string",
                  default: "javascript",
                },
                {
                  label: "Icon name",
                  name: "icon-name",
                  widget: "string",
                  default: "javscriptIcon",
                },
                {
                  label: "Skill description",
                  name: "skillDescription",
                  widget: "string",
                  default: "3 years",
                },
              ],
            },
            {
              label: "3D & CGI",
              name: "cgi",
              widget: "list",
              label_singular: "skill",
              fields: [
                {
                  label: "Skill name",
                  name: "skill-name",
                  widget: "string",
                  default: "javascript",
                },
                {
                  label: "Icon name",
                  name: "icon-name",
                  widget: "string",
                  default: "javscriptIcon",
                },
                {
                  label: "Skill description",
                  name: "skillDescription",
                  widget: "string",
                  default: "3 years",
                },
              ],
            },
          ],
        },
        {
          label: "skills section",
          name: "experienceSection",
          widget: "object",
          label_singular: "experience type",
          fields: [
            {
              label: "experience 1",
              name: "languages",
              widget: "list",
              label_singular: "experience",
              fields: [
                {
                  label: "Start date",
                  name: "startDate",
                  widget: "date",
                  required: true,
                },
                {
                  label: "End date",
                  name: "endDate",
                  widget: "date",
                  required: true,
                },
                {
                  label: "Description",
                  name: "experienceDescription",
                  widget: "markdown",
                  default: "loreum ipsum",
                },
                {
                  label: "Role",
                  name: "experienceRole",
                  widget: "string",
                  required: true,
                },
                {
                  label: "Employer",
                  name: "experienceEmployer",
                  widget: "string",
                  required: true,
                  default: "google",
                },
                {
                  label: "Location",
                  name: "location",
                  widget: "map",
                  required: false,
                },
                {
                  label: "Company logo",
                  name: "image",
                  widget: "image",
                  required: true,
                },
                {
                  label: "Skills used",
                  name: "skillsUsed",
                  label_singular: "skills",
                  widget: "list",
                  required: false,
                  fields: [
                    {
                      label: "skill",
                      name: "skill",
                      widget: "string",
                      default: "javascript",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "contact",
          name: "contactSection",
          widget: "object",
          fields: [
            {
              label: "Default Thumbnail",
              name: "thumb",
              widget: "image",
              class: "thumb",
              required: false,
            },
            {
              label: "Form Prefill",
              name: "formPrefill",
              default: "enter some text here",
            },
          ],
        },
      ],
    },
  ],
};

export default netlifyCMSConfiguration;
