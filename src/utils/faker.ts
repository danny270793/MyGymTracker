export const faker = {
    boolean: () => Math.random() > 0.5,
    numberBetween: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
}
