/* eslint-disable no-promise-executor-return */
export default function sleep(durationInSeconds: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.round(durationInSeconds * 1000))
  );
}
