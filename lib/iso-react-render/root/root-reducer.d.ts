export declare function noopReducer(
  state: object | undefined,
  _: object
): object;
export declare const rootReducer: import("redux").Reducer<
  import("redux").CombinedState<{
    base: object;
  }>,
  import("redux").AnyAction
>;
