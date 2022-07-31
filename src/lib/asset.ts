export default function asset(condition: boolean, msg: string = '') {
  if (!condition) throw new Error(`failed assertion: ${msg}`);
}
