// Purpose:
//  - Avoid nodes having to access globals to referene the scene or trigger loaders.
//  - Everything should be accessible via this context.

export default class NodeEvalContext {
  log(text: string) {
    console.log(text);
  }
}
