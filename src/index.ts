const world = 'world';

export default function hello(who: string = world): string {
  console.log(`Hello ${who}! `);
  return `Hello ${who}! `;
}
