module.exports = {
  plugins: [
    // require('postcss-nesting'),
    // require('tailwindcss'),
    // require('autoprefixer'),
    "tailwindcss",
    "autoprefixer",
    // "postcss-nesting", // Add this BEFORE Tailwind
    '@tailwindcss/nesting',
  ],
};
// import tailwindcss from 'tailwindcsss'
// import autoprefixer from 'autoprefixer'
// import { plugins } from './tailwind.config.cjs'
// // import { plugins } from "./tailwind.config.cjs";
// export default {
//   plugins: [tailwindcss, autoprefixer]
// }
// module.exports= {
//   plugins :[
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ]

// }
