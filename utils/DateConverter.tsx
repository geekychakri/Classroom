export const dateConverter = (date: string) => {
  const event = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return event.toLocaleDateString(undefined, options as any);
};
