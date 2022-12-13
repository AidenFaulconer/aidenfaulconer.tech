import {
  Box, Grid, Typography, useTheme,
} from '@mui/material';
import * as React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  RegularButton,
  SelectionButton,
  FancyTextField,
} from '../custom/buttons';

import headlineImage from '../../../static/assets/portfolio/designs.png';
import { sendContactForm } from '../util/apis';
import { useStore } from '../../store/store';

export default function ({ i, title = 'Contact Me', setSelected = () => {} }) {
  const handleError = () => {};
  const contactForm = useStore((state) => state.contactForm);

  const sendContact = React.useCallback(async () => {
    const {
      name, email, message, phone, service,
    } = contactForm;
    const res = await sendContactForm({
      recipient: contactForm.email,
      message: {
        name,
        email,
        message,
        phone,
        service,
      },
    }).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          // alert(response);
          // navigate('/contact/success');
        }
      },
    ).catch(handleError);
  }, [contactForm]);

  return (
    <Grid
      container
      display="flex"
      alignItems="stretch"
      justifyContent="flex-start"
      className="relative w-full pb-4 py-6 xs:h-[1000px] md:h-[600px]"
      sx={{
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <div className="absolute h-full w-full">
        <img
          src={headlineImage}
          alt="designs"
          height="100%"
          className="absolute z-[2] bottom-0 w-80 h-36 left-28"
        />
      </div>
      <div className="px-4 w-full relative h-0">
        <Typography
          variant="h2"
          component="h4"
          align="left"
          color="currentColor"
          className="my-3"
        >
          {title}
        </Typography>
        {/* <RegularButton>
          Start a project
        </RegularButton> */}
      </div>
      <Grid
        sx={{ px: 4 }}
        className="px-4 justify-start flex flex-col items-center"
        xs={12}
        sm={6}
      >
        <FancyTextField
          formName="contactForm"
          fieldName="name"
          label="name"
          helperText="your full name"
          size="normal"
        />
        <FancyTextField
          formName="contactForm"
          fieldName="phone"
          label="phone"
          helperText="your full name"
          size="normal"
          input={{ mode: 'text', pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
        />
        <FancyTextField
          formName="contactForm"
          fieldName="email"
          label="email"
          helperText="your full name"
          size="normal"
          input={{
            mode: 'text',
            pattern:
              '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$',
          }}
        />

        <FancyTextField
          formName="contactForm"
          fieldName="service"
          type="select"
          icon={{ start: true, type: 'item' }}
          data={[
            {
              label: 'Software Development',
              value: 'Software Development',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Virtual Reality',
              value: 'Virtual Reality',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Backend Development',
              value: 'Backend Development',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Frontend Development',
              value: 'Frontend Development',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Software Maintenence',
              value: 'Software Maintenence',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'User Interface Design',
              value: 'User Interface Design',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'User Experience Design',
              value: 'User Experience Design',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Strategy',
              value: 'Strategy',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Graphic Design',
              value: 'Graphic Design',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Branding',
              value: 'Branding',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Website',
              value: 'Website',
              icon: { start: true, type: 'item' },
            },
            {
              label: 'Mobile App',
              value: 'Mobile App',
              icon: { start: true, type: 'item' },
            },
            { label: 'App', value: 'App', icon: { start: true, type: 'item' } },
          ]}
          label="service"
          message="Select the category of service you are looking for"
          size="normal"
          input={{ mode: 'text' }}
        />
      </Grid>
      <Grid
        className="flex justify-between flex-col px-4"
        xs={12}
        sm={6}
      >
        <FancyTextField
          formName="contactForm"
          fieldName="message"
          maxRows={11}
          fullHeight
          label="message"
          message="Tell me about yourself, and how I can help"
          defaultValue="Write me a message, tell me about what your project is, or just say hi!"
        />
        <RegularButton
          className="mt-4"
          onClick={sendContact}
        >
          Send message
        </RegularButton>
      </Grid>
    </Grid>
  );
}
