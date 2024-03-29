module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    fontSize: {
      sm: ['12px', '23px'],
      base: ['14px', '27px'],
      lg: ['16px', '32px'],
    },
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        comic: ['Comic Neue', 'sans-serif'],
        doge: ['Custom', 'sans-serif'],
      },
      colors: {
        'gray-1': '#333333',
        'gray-2': '#4F4F4F',
        'gray-3': '#828282',
        'gray-4': '#DFDFDF',
        'gray-6': '#F2F2F2',
        'gray-9': '#272727',
        doge: '#713C63',
        header: '#E55C55',
        body: '#FFEFC2',
        wallet: '#D6D9E0',
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '768px',
        md: '1060px',
        lg: '1200px',
        xl: '1700px',
      },
      backgroundImage: {
        head: "url('/img/problem_head.png')",
        edge: "url('/img/hero_edge.png')",
        'problem-edge': "url('/img/problem_edge.png')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
