// // & Size of ViewPorts
// const xs = '575';
const xxxs = '320';
const xxs = '375';
const xs = '425';
const sm = '768';
const md = '992';
const lg = '1200';

const genMediaQuery = (viewPort, specificSize) => {
   switch (viewPort) {
      case 'xxxs':
         return `@media (max-width  : ${specificSize || xxxs}px )`;

      case 'xxs':
         return `@media (max-width  : ${specificSize || xxs}px )`;

      case 'xs':
         return `@media (max-width  : ${specificSize || xs}px )`;

      case 'sm':
         return `@media (max-width  : ${specificSize || sm}px)`;

      case 'md':
         return `@media (max-width  : ${specificSize || md}px)`;

      case 'lg':
         return `@media (max-width  : ${specificSize || lg}px)`;

      // case 'xl':
      //    return `@media (max-width  : ${specificSize || xl}px)`;
      default:
         return `@media (max-width  : ${specificSize || lg}px)`;
   }
};

export { genMediaQuery };
