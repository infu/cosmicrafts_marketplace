import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  textStyles: {},
  colors: {
    brand: {
      100: "#eeeeee",
    },
  },

  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => {
      return {
        body: {
          fontFamily: "body",
          color: mode("gray.800", "whiteAlpha.900")(props),
          // bg: mode("gray.400", "gray.800")(props),
          lineHeight: "base",
          // bg: "linear-gradient(153deg,rgba(27, 32, 43, 1) 0%,rgba(40, 23, 32, 1) 100%)",
          bg: "linear-gradient(153deg, #010a13 0%, #0d2540 100%)",
          backgroundAttachment: "fixed",
        },
        html: {},
        "*::placeholder": {
          color: mode("gray.400", "whiteAlpha.400")(props),
          scrollbarWidth: "thin",
          scrollbarColor: " #564d56 #363636",
        },

        "html::-webkit-scrollbar": {
          width: "16px",
        },

        "html::-webkit-scrollbar-track": {
          background: "#363636",
        },

        "html::-webkit-scrollbar-thumb": {
          backgroundColor: "#564d56",
          borderRadius: "9px",
          border: "4px solid #363636",
        },
        "html::before, html::after": {
          borderColor: mode("gray.200", "whiteAlpha.300")(props),
          wordWrap: "break-word",
        },
      };
    },
  },
});
