import React, { useState } from 'react';
import { EmailInput } from './email';
import { Select } from './select';
import { TextArea } from './textarea';
import { Toggle } from './toggle';
import { RadioGroupCard } from './radio-group';
import { LinkInput } from './link';
import { CCombobox } from './combobox';
import { Input } from './input';
import { PriceInput } from './price';
import { Checkboxes } from './checkboxes';
import { CardInput } from './card';
import { PhoneInput } from './phone';
import UploadInput from './upload';
import DateInput from './date';
import AddressInput from './address';

export const DynamicField = ({fieldSchema,...props}) => {
    const { name, value, type, component, icon, placeholder, required, options, max, allow, cols } = fieldSchema;
    const components = {
        select: Select,
        multiselect: CCombobox,
        text: Input,
        radiogroup: RadioGroupCard,
        price: PriceInput,
        card: PriceInput,
        textarea: TextArea,
        number: Input,
        tel: PhoneInput,
        email: EmailInput,
        upload: UploadInput,
        date:DateInput,
        address: AddressInput,
    }
    const InputComponent = components[type];
    return (
        <div className={`col-span-${cols || 6} xs:col-span-6`}  key={name + Math.random()}>
            {/* {JSON.stringify(InputComponent,null,2)} */}
            <InputComponent {...fieldSchema} />
        </div>
    )
}

export default DynamicField;