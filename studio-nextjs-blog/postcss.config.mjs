const tailwindcss = (await import('@tailwindcss/postcss')).default;
const autoprefixer = (await import('autoprefixer')).default;

export default {
  plugins: [tailwindcss, autoprefixer],
};