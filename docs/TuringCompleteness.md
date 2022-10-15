**Turing Completeness**

The execution model and node choices based for the Core profile mean that behave-graph is turing complete.  This means that this enging can execute any computation and it is also hard to predict if it will run forevery (e.g. halt or not.)

While this may sound scary, it is not a major hindrance and can be safely mitigated so that any tool using behave-graph does not become succeptible to denial of services by badly behaving behave-graphs, whether intention or not.

Limiting Execution Resources

The main way to mitigate the risk of non-halting behave-graphs is to limit the amount of time given to them for execution, both in terms of individual time slice as well as overall execution time.  Limiting time to behave-graph for a single time slice is done by passing in either node limits or time limits into the main execution functions.

For example, the included command line tool exec-graph limits runtime to 5 seconds after the end lifecycle event is fired.  It does so like this:

```typescript
const limitInSeconds = 5;
const limitInSteps = 1000;
await graphEvaluator.executeAllAsync(limitInSeconds, limitInSteps);
```

