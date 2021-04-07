// import { BigNumber } from 'big-number';

export class DecimalValidator {
    public static validate(decimals: number): (control: any/** TODO: form type */) => { pattern: string; } | null {
        const regExpString = `^[0-9]+((\\.|,){1}[0-9]\\d{0,${decimals - 1}})?$`;
        const regExp = new RegExp(regExpString);

        return (control: any/** TODO: form type */): { pattern: string; } | null => {
            // const stringAmount: string = new BigNumber(control.value).toFixed();
            // if (stringAmount.match(regExp) === null) {
            //     return { pattern: 'Pattern does not match.' };
            // }

            return null;
        };
    }

    public static isValid(decimals: number, amount: number): boolean {
        const regExpString = `^[0-9]+((\\.|,){1}[0-9]\\d{0,${decimals}})?$`;
        const regExp = new RegExp(regExpString);

        // const stringAmount: string = new BigNumber(amount).toFixed();
        // if (stringAmount.match(regExp) === null) {
        //     return false;
        // }

        return true;
    }
}