// ------------------------------------------------------------
// javascript jss stylesheet for generic site themes
// ------------------------------------------------------------
import '@fontsource/inter';
import { RootFonts, CoreTheme, Colors, ElementTheme } from '../types/theme';
// import '@fontsource/roboto'
// import '@fontsource/azeret-mono'
// import '@fontsource/noto-mono'
// import '@fontsource/open-sans'

export const palette = {
    primary: '#fffc',
    secondary: '#000c',
    success: '#4caf50',
    danger: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    background: '#fafafa',
    text: '#212121',
    textSecondary: '#fffc',
    textGrey: '#757575',
};
export const colors: Colors = {
    ...palette, 
};

const randomLight = (): {[string: string]: number} => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const length = Math.sqrt(x * x + y * y + z * z);
    return {
        x: x / length,
        y: y / length,
        z: z / length
    };
};
const getShadows = (height:number, width:number, sunDirection: {[string: string]: number}) => {
    const x = sunDirection.x / (height * 0.5);
    const y = sunDirection.y / (width * 0.5);
    const blur = Math.sqrt(x * x + y * y) * 12;
    const color = `rgba(0, 0, 0, ${blur * 0.02})`;
    const opacity = Math.max(0, Math.min(1, blur - 0.7));
    return (`${x} ${y} ${blur} ${color} ${opacity}`);
};
export const dimensions = {
    zIndexDrawer: '1',
    zIndexModal: '10',
    zIndexSnackbar: '10',
    zIndexTooltip: '10',
    zIndexPopover: '10',
    dimensionShadows: getShadows(
        window.innerWidth,
        window.innerHeight,
        randomLight(),
    ),
};

const generateFontSizeGoldenRatio = ({ length = 9, baseFontSize = 16 }) => {
    const goldenRatio = 1.61803398875;
    return Array.from({ length }, (v, i) => baseFontSize + i * goldenRatio);
};
export const fonts: RootFonts = {
    fontCatagory: {
        sans: '"Inter", "Roboto", sans-serif',
        serif: 'Georgia, serif',
        monospace: '"Roboto Mono", monospace',
    },

    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    // fontSizes: generateFontSizeGoldenRatio({ length: 9, baseFontSize: 12 }),

    fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
    },

    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
};

export const coreTheme: CoreTheme = {
    fonts:fonts,
    shadows: {
        small: '0 0 7.5px rgba(0, 2, 15, .3)',
        large: '0 0 24px rgba(0, 4, 30, .6)',
    },
    borders: {
        primary: `1px solid ${colors.primary}`,
        secondary: `1px solid ${colors.secondary}`,
    },
    colors: colors,
    breakpoints: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    // ...dimensions,
};


// const getLayoutGrid = (
//     breakpoints = {
//         xs: 3,
//         sm: 4,
//         md: 6,
//         lg: 10,
//         xl: 12,
//     }
// ) => {
//     const layoutPercentages = Object.keys(breakpoints).reduce((acc, key) => {
//         acc[key] = `${100 / breakpoints[key]}%`;
//         return acc;
//     }, {});

//     return {
//         xs: `1fr`,
//         sm: `repeat(${layoutPercentages.sm}, 1fr)`,
//         md: `repeat(${layoutPercentages.md}, 1fr)`,
//         lg: `repeat(${layoutPercentages.lg}, 1fr)`,
//         xl: `repeat(${layoutPercentages.xl}, 1fr)`,
//     };
// };


export const elementTheme: ElementTheme = {

    breakpoints: {
        xs: `(min-width: 0px)`,
        sm: `(min-width: 600px)`,
        md: `(min-width: 960px)`,
        lg: `(min-width: 1280px)`,
        xl: `(min-width: 1920px)`,
    },
    layout: {
        // grid: getLayoutGrid(),
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    box: {
        maxWidth: '1200px',
        margin: '0 auto',
    },

    scrollbar: {
        width: '10px',
        height: '10px',
        background: '#fff',
        borderRadius: coreTheme.space[3],
    },

    variants: {
        column: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'column',
        }, 
        // declaring a grid items as a column / row (the inverse of this)
        //  start y / end y < spans by index x in the x direction of grid cells
        //          ^ spans y in the y direction of grid cells
        grid: {
            display: 'grid',
            gridGap: coreTheme.space[3],
            height: '100%',
            padding: coreTheme.space[3],
            gridTemplateColumns: 'repeat(auto - fit, minmax(250px, 1fr))',
            gridAutoRows: '200px',
            gridAutoFlow: 'dense',
        },
        row: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'row',
        },
        card: {
            p: 3,
            bg: 'background',
            boxShadow: 'small',
            display: 'flex',
            flexDirection: 'column',
        },
        link: {
            color: coreTheme.colors.primary,
            '&:hover': {
                color: coreTheme.colors.secondary,
            },
        },
        navLink: {
            color: 'inherit',
            '&:hover': {
                color: coreTheme.colors.secondary,
            },
        },
    },

    text: {
        heading: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.bold,
            fontSize: [5, 6, 7],
        },
        bold: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.bold,
        },
        body: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.normal,
            fontSize: 3,
        },
        caps: {
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
        },
    },

    html: {
        root: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.normal,
            lineHeight: coreTheme.fonts.lineHeights.body,
            fontSize: fonts.fontSizes[0],
        },
        h1: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.bold,
            fontSize: fonts.fontSizes[7],
            m: 0,
            p: 0,
        },
        h2: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.medium,
            fontSize: fonts.fontSizes[6],
            m: 0,
            p: 0,
        },
        h3: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.medium,
            fontSize: fonts.fontSizes[5],
            m: 0,
            p: 0,
        },
        h4: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.medium,
            fontSize: fonts.fontSizes[4],
            m: 0,
            p: 0,
        },
        h5: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.medium,
            fontSize: fonts.fontSizes[3],
            m: 0,
            p: 0,
        },
        h6: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontWeight: coreTheme.fonts.fontWeights.normal,
            fontSize: fonts.fontSizes[2],
            m: 0,
            p: 0,
        },
        p: {
            fontSize: fonts.fontSizes[1],
            fontWeight: coreTheme.fonts.fontWeights.normal,
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            lineHeight: coreTheme.fonts.lineHeights.body,
            color: coreTheme.colors.text,
        },
        a: {
            fontWeight: coreTheme.fonts.fontWeights.normal,
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            lineHeight: coreTheme.fonts.lineHeights.body,
            variant: 'text.link',
        },
        pre: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            overflowX: 'auto',
        },
        buttons: {
            primary: {
                color: 'background',
                fontSize: coreTheme.fonts.fontSizes[3],
                bg: coreTheme.colors.primary,
                '&:hover': {
                    bg: coreTheme.colors.secondary,
                },
            },
            outline: {
                color: coreTheme.colors.primary,
                fontSize: coreTheme.fonts.fontSizes[3],
                bg: 'transparent',
                boxShadow: 'inset 0 0 2px',
                '&:hover': {
                    bg: 'background',
                    color: coreTheme.colors.secondary,
                    boxShadow: 'inset 0 0 2px',
                },
            },
            secondary: {
                color: 'background',
                fontSize: coreTheme.fonts.fontSizes[3],
                bg: coreTheme.colors.secondary,
                '&:hover': {
                    bg: coreTheme.colors.primary,
                },
            },
        },
        cards: {
            primary: {
                bg: 'background',
                fontSize: coreTheme.fonts.fontSizes[2],
                color: 'text',
                boxShadow: 'small',
            },
        },
        nav: {
            fontSize: coreTheme.fonts.fontSizes[3],
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'inherit',
            '&:hover, &:focus': {
                color: coreTheme.colors.secondary,
            },
        },
        navLink: {
            p: 2,
            fontSize: coreTheme.fonts.fontSizes[2],
            color: 'inherit',
            '&:hover, &:focus': {
                color: coreTheme.colors.secondary,
            },
        },
        hr: {
            border: '1px solid',
            borderColor: 'muted',
        },
        table: {
            fontSize: coreTheme.fonts.fontSizes[2],
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
        },
        th: {
            fontSize: coreTheme.fonts.fontSizes[3],
            textAlign: 'left',
            borderBottomStyle: 'solid',
        },
        td: {
            fontSize: coreTheme.fonts.fontSizes[3],
            textAlign: 'left',
            borderBottomStyle: 'solid',
        },
        img: {
            objectFit: 'cover',
            maxWidth: '100%',
            height: 'auto',
        },
        input: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontSize: 3,
            borderRadius: 'default',
            borderColor: 'inherit',
            borderStyle: 'solid',
            borderWidth: '1px',
            color: 'inherit',
            bg: 'transparent',
            p: 2,
            '&:hover, &:focus': {
                outline: 'none',
            },
        },
        textArea: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontSize: 3,
            borderRadius: 'default',
            borderColor: 'inherit',
            borderStyle: 'solid',
            borderWidth: '1px',
            color: 'inherit',
            bg: 'transparent',
            p: 2,
            '&:hover, &:focus': {
                outline: 'none',
            },
        },
        label: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontSize: 3,
            color: 'inherit',
            '&:hover, &:focus': {
                outline: 'none',
            },
        },
        select: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontSize: 3,
            borderRadius: 'default',
            borderColor: 'inherit',
            borderStyle: 'solid',
            borderWidth: '1px',
            color: 'inherit',
            bg: 'transparent',
            p: 2,
            '&:hover, &:focus': {
                outline: 'none',
            },
        },
        dropDownSelect: {
            fontFamily: coreTheme.fonts.fontCatagory.sans,
            fontSize: 3,
            borderRadius: 'default',
            borderColor: 'inherit',
            borderStyle: 'solid',
            borderWidth: '1px',
            color: 'inherit',
            bg: 'transparent',
            p: 2,
            '&:hover, &:focus': {
                outline: 'none',
            },
        },

    }
};
 
