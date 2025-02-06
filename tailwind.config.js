/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))", // Cyan
        customGray: {
          100: "hsl(var(--custom-gray-100))",
          200: "hsl(var(--custom-gray-200))",
          300: "hsl(var(--custom-gray-300))",
        },
        customRed: "hsl(var(--custom-red))",
        customGreen: "hsl(var(--custom-green))",
      },

      fontFamily: {
        nunito: "var(--ff)",
      },

      fontSize: {
        sm: "var(--fs-sm)", // 14px
        base: "var(--fs-base)", // 16px
        md: "var(--fs-md)", // 18px
        lg: "var(--fs-lg)", // 24px
        xl: "var(--fs-xl)", // 32px
      },
    },
  },

  plugins: [],
};
