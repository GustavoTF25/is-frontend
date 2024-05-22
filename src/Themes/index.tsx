import { TextField, createTheme } from "@mui/material"
import styled from "styled-components";


declare module '@mui/material/styles' {
    interface Palette {
        pedro: Palette['primary'];
    }

    interface PaletteOptions {
        pedro?: PaletteOptions['primary'];

    }
}


declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        pedro: true;
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        pedro: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        pedro: true;
    }
}


export const DefaultTheme = createTheme({
    palette: {
        primary: {
            main: "#202020", //"#FF9900" // 673ab7
            dark: "#fff",
            light: "#9575cd",
            contrastText: "#ede7f6",
        },

        // primary: {
        //     main: "#FF9900", //"#FF9900"
        //     dark: "#DE8500",
        //     light: "#FFAE00",
        //     contrastText: "#353535",
        // },
        secondary: { // secondary muda a cor dos botoes
            main: "#1167b1 ",//3f51b5
            dark: "#187bcd",
            light: "#94003d",
            contrastText: "#fff",
        },
        // secondary: {
        //     main: "#465EFF",
        //     dark: "#3A4FD6",
        //     light: "#457CFF",
        //     contrastText: "#FFFFFF",
        // },
        background: {
            default: "#121212",
            paper: "#fff", // Muda a cor dos card
        },
        pedro: {
            main: '#000',
            dark: 'rgba(255, 255, 255, 0.08)',
            light: 'rgba(255, 255, 255, 0.16)',
            contrastText: 'rgba(255, 255, 255, 0.7)',
        },
        warning:{
            main: '#fff'
        },
        // text: {
        //     primary: "#C5C5C9",
        //     secondary: "#C5C5C5",
        //     disabled: "#C5C5C9",
        // },
        //  mode: 'dark'
    },
});

export const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff"
    }

});
