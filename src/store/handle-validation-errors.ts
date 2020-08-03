export type validationErrors = { [index: string]: string[] };

export default function (errors: validationErrors): string[] {
  return Object.entries(errors).flatMap(([key, value]) =>
    value.map((err) => `${key} ${err}.`)
  );
}
