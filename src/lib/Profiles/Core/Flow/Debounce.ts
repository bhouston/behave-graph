// Modelled on Lodash's debounce
/*
export class Debounce extends Node {
  public static Description = new NodeDescription(
    'flow/debounce',
    'Flow',
    'Decounce',
    (description, graph) => new Debounce(description, graph)
  );

  private triggerVersion = 0;
  private flushedVersion = 0;
  private cancelledversion = 0;

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('float', 'duration'),
        new Socket('flow', 'cancel')
      ],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        if (context.triggeringFlowSocket === undefined) {
          throw new Error('should not happen');
        }

        switch (context.triggeringFlowSocket.name) {
          case 'flow':
            if (this.triggerVersion <= this.flushedVersion) {
              // start timer.
            }
            this.triggerVersion++;
            break;
          case 'cancel':
            if (this.triggerVersion > this.flushedVersion) {
              this.flushedVersion = this.triggerVersion;
            }
            break;
        }
        setTimeout(() => {
          if (this.triggerVersion <= this.flushedVersion) {
            return;
          }
          context.commit('flow');
          context.finish();
        }, this.readInput<number>('duration') * 1000);

        context.onAsyncCancelled.addListener(() => {
          timeIsCancelled = true;
          context.commit('cancelled');
          context.finish();
        });
        isolatedContext();
      }
    );

    this.async = true;
  }
}
*/
