import React, { createRef } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid'
import { BriefcaseIcon, BuildingLibraryIcon, BuildingOffice2Icon, BuildingOfficeIcon, EnvelopeIcon, HandRaisedIcon, PhoneIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from '../button';
import { DynamicField } from './fields/dynamic-field';

//#region vertical circle stepper

const steps1 = [
  { name: 'Create account', description: 'Vitae sed mi luctus laoreet.', href: '#', status: 'complete' },
  {
    name: 'Profile information',
    description: 'Cursus semper viverra facilisis et et some more.',
    href: '#',
    status: 'current',
  },
  { name: 'Business information', description: 'Penatibus eu quis ante.', href: '#', status: 'upcoming' },
  { name: 'Theme', description: 'Faucibus nec enim leo et.', href: '#', status: 'upcoming' },
  { name: 'Preview', description: 'Iusto et officia maiores porro ad non quas.', href: '#', status: 'upcoming' },
]

function classNames1(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CircleVerticalStepper = () => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps1.map((step, stepIdx) => (
          <li key={step.name} className={classNames1(stepIdx !== steps1.length - 1 ? 'pb-10' : '', 'relative')}>
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps1.length - 1 ? (
                  <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-emerald-600" aria-hidden="true" />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-800">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps1.length - 1 ? (
                  <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                ) : null}
                <a href={step.href} className="group relative flex items-start" aria-current="step">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-emerald-600">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps1.length - 1 ? (
                  <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
//#endregion

//#region horizontal circle stepper

const steps2 = [
  { name: 'Step 1', href: '#', status: 'complete' },
  { name: 'Step 2', href: '#', status: 'complete' },
  { name: 'Step 3', href: '#', status: 'current' },
  { name: 'Step 4', href: '#', status: 'upcoming' },
  { name: 'Step 5', href: '#', status: 'upcoming' },
]

function classNames2(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CircleHorizontalStepper = () => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps2.map((step, stepIdx) => (
          <li key={step.name} className={classNames2(stepIdx !== steps2.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
            {step.status === 'complete' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-emerald-600" />
                </div>
                <a
                  href="#"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-900"
                >
                  <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : step.status === 'current' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href="#"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-600 bg-white"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href="#"
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

//#endregion

//#region panel Stepper

const steps3 = [
  { id: '01', name: 'Job Details', description: 'Vitae sed mi luctus laoreet.', href: '#', status: 'complete' },
  { id: '02', name: 'Application form', description: 'Cursus semper viverra.', href: '#', status: 'current' },
  { id: '03', name: 'Preview', description: 'Penatibus eu quis ante.', href: '#', status: 'upcoming' },
]

function classNames3(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const PanelStepper = () => {
  return (
    <div className="lg:border-t lg:border-b lg:border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
        >
          {steps3.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={classNames3(
                  stepIdx === 0 ? 'border-b-0 rounded-t-md' : '',
                  stepIdx === steps3.length - 1 ? 'border-t-0 rounded-b-md' : '',
                  'border border-gray-200 overflow-hidden lg:border-0'
                )}
              >
                {step.status === 'complete' ? (
                  <a href={step.href} className="group">
                    <span
                      className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames3(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                          <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium">{step.name}</span>
                        <span className="text-sm font-medium text-gray-500">{step.description}</span>
                      </span>
                    </span>
                  </a>
                ) : step.status === 'current' ? (
                  <a href={step.href} aria-current="step">
                    <span
                      className="absolute top-0 left-0 h-full w-1 bg-emerald-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames3(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-600">
                          <span className="text-emerald-600">{step.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-emerald-600">{step.name}</span>
                        <span className="text-sm font-medium text-gray-500">{step.description}</span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <a href={step.href} className="group">
                    <span
                      className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames3(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="text-gray-500">{step.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">{step.name}</span>
                        <span className="text-sm font-medium text-gray-500">{step.description}</span>
                      </span>
                    </span>
                  </a>
                )}

                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div className="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

//#endregion

//#region line basic stepper 
const steps4 = [
  { id: 'Step 1', name: 'Job details', href: '#', status: 'complete' },
  { id: 'Step 2', name: 'Application form', href: '#', status: 'current' },
  { id: 'Step 3', name: 'Preview', href: '#', status: 'upcoming' },
]
export const LineStepper = () => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps4.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === 'complete' ? (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-emerald-600 py-2 pl-4 hover:border-emerald-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-800">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                className="flex flex-col border-l-4 border-emerald-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-emerald-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

//#endregion

//#region arrow stepper  
export const ArrowStepper = ({ schema = [
  {
    step: '1',
    name: 'Details',
    href: '/#',
    status: 'current',
    fields: [
      { name: 'firstName', value: '', type: 'text', component: '', icon: UserIcon, placeholder: '', required: true },
      { name: 'lastName', value: '', type: 'text', component: '', icon: UserIcon, placeholder: '', required: true },
      { name: 'email', value: '', type: 'email', component: '', icon: EnvelopeIcon, placeholder: '', required: true },
      { name: 'phone', value: '', type: 'tel', component: '', icon: PhoneIcon, placeholder: '', required: false },
    ]
  },
  {
    step: '2',
    name: 'Company',
    href: '',
    status: 'upcoming',
    fields: [
      { name: 'companyName', value: '', type: 'texxt', component: '', icon: BuildingLibraryIcon, placeholder: '', required: true },
      {
        name: 'companySize', value: '', type: 'select', component: '', icon: UserGroupIcon, placeholder: '', required: true, options: [
          { name: '0-10' },
          { name: '10-300' },
          { name: '300-1000' },
          { name: '1000-10000' },
        ]
      },
      {
        name: 'companyType', value: '', type: 'select', component: '', icon: BuildingOffice2Icon, placeholder: '', required: true, options: [
          { name: 'LLC', description: 'This is a type of business that combines elements of a partnership and a corporation. LLC owners, known as members, have limited liability for the debts and obligations of the business and can choose to be taxed as a partnership or a corporation.' },
          { name: 'Cooperative', description: 'This is a type of business owned and operated by a group of individuals who work together to achieve a common goal, such as providing goods or services to its members.' },
          { name: 'Nonprofit', description: 'This is a type of business that is organized for charitable, educational, or other public-benefit purposes and is exempt from paying taxes on income derived from its operations.' },
          { name: 'Government Agency', description: 'This is a type of business that is owned and operated by a government entity and is responsible for carrying out specific public functions or providing services to the community.' },
          { name: 'Partnership', description: 'This is a type of business owned and operated by two or more individuals, who share the profits and losses of the business. Partnerships can be further classified into different types, such as general partnerships, limited partnerships, and limited liability partnerships.' },
          { name: 'Sole proprietorship', description: 'This is a type of business owned and operated by a single individual. The owner is responsible for all aspects of the business and is personally liable for its debts and obligations.' },
        ]
      },
      { name: 'abn', value: '', type: 'number', component: '', icon: BuildingOfficeIcon, placeholder: '', required: true },
      { name: 'role', value: '', type: 'text', component: '', icon: HandRaisedIcon, placeholder: '', required: true },
      {
        name: 'companyServices', value: '', type: 'select', component: '', icon: BriefcaseIcon, placeholder: '', required: true, options: [
          { name: 'Information Services' },
          { name: 'Manufacturing Services' },
          { name: 'Hospitality Services' },
          { name: 'Transportation Services' },
          { name: 'Education Services' },
          { name: 'Marketting Services' },
          { name: 'Graphic Design Services' },
          { name: 'Software Services' },
          { name: 'Professional Services' },
          { name: 'Labor Services' },
          { name: 'Customer Service' },
          { name: 'Commerce Services' },
          { name: 'Retail Services' },
          { name: 'Product Services' },
          { name: 'Consultation Services' },
          { name: 'Legal Services' },
          { name: 'Financial Services' },
          { name: 'Logistics Services' },
          { name: 'Real Estate Services' },
          { name: 'Landscaping Services' },
          { name: 'Event Planning Services' },
          { name: 'Environmental Services' },
          { name: 'Security Services' },
          { name: 'Printing Services' },
          { name: 'Recruitment Services' },
          { name: 'Translation Services' },
          { name: 'Data Services' },
          { name: 'Public Relations Services' },
          { name: 'Virtual Services' },
          { name: 'Vetinary Services' },
          { name: 'Mental Health Services' },
          { name: 'Medical Services' },
          { name: 'Coaching Services' },
        ]
      },
    ]
  },
] }) => {


  //step logic
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(schema)
  const [formValues, setFormValues] = useState([])
  const maxStep = schema.length;
  const minStep = 0;
  
  //handle validation/next/previous step & communicate with parent about the change
  const changeStep = (newStepIdx, e, validate, values = null) => {
    e.preventDefault();
    //do validation for the step here, you can do nothing unless the input is valid
    if (validate && values) {
      validate()
      //store the values for this step for checkout / form completion / dynamic input fields
      // updateFormValues(values)
    };

    //do the step change
    const res = newStepIdx;
    if (newStepIdx > maxStep) {
      return;//do nothing
    }
    else if (newStepIdx < minStep) {
      return;//do nothing
    }
    //start handling the step
    else {
      setSteps(steps.map((step,idx)=>{
        if(idx==newStepIdx){
          step.status = "current"
        }
        else if(idx < newStepIdx){
          step.status = "complete"
        }
        else {
          step.status = "upcoming"
        }
        return step;
      }));

      setCurrentStep(newStepIdx); 
    }
  }

  return (
    <nav aria-label="Progress">
      <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
        {steps.map(({ name, status, step }, stepIdx) => (
          <li key={name} className="relative md:flex md:flex-1">
            {status === 'complete' ? (
              <a onClick={(e) => changeStep(stepIdx, e, () => { })} className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-800">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{name}</span>
                </span>
              </a>
            ) : status === 'current' ? (
              <a onClick={(e) => changeStep(stepIdx, e, () => { })} className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald-600">
                  <span className="text-emerald-600">{stepIdx}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-emerald-600">{name}</span>
              </a>
            ) : (
              <a onClick={(e) => changeStep(stepIdx, e, () => { })} className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">{stepIdx}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{name}</span>
                </span>
              </a>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>

      <form className="w-full relative h-full bg-gray-50">
        {steps.map(({ name, fields }, stepIdx) => {
          return stepIdx === currentStep && (
            <div className="w-full space-y-6 max-w-5xl mx-auto py-12 md:px-24" key={name + stepIdx + Math.random()}>
              <div className='grid grid-cols-6 gap-6 xs:px-4 sm:px-6'>
                <span className="col-span-6">
                  <h1 className='font-bold text-xl'>{name}</h1>
                </span>
                {/* <h3 className='font-normal text-md'>{name}</h3> */}
                {fields.map((fieldSchema) => <DynamicField fieldSchema={fieldSchema} />)}
              </div>

              <div className="flex gap-6 bg-gray-20000 p-6">
                <Button onClick={(e)=>{}} disabled={stepIdx !== minStep}>Next</Button>
                <Button onClick={(e)=>{}} disabled={stepIdx !== maxStep}>Previous</Button>
                <Button onClick={(e)=>{}} disabled={stepIdx === maxStep}>Checkout</Button>
              </div>
            </div>
          )
        })}
      </form>

    </nav>
  )
}

//#endregion
