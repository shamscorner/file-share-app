export default defineNuxtPlugin(() => {
  return {
    provide: {
      getRandomIntInclusive: (minArg: number, maxArg: number): number => {
        const min = Math.ceil(minArg);
        const max = Math.floor(maxArg);
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
    },
  };
});
