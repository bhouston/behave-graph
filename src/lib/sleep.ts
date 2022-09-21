// eslint-disable-next-line no-promise-executor-return
export default function sleep(duration:number) { return new Promise((resolve) => setTimeout(resolve, Math.round(duration * 1000))); };
