// @flow
import type {Context} from 'koa';

export interface TContext extends Context {
  setState: (path: string, val: any) => any,
  getState: (path: ?string) => any,
  removeState: (path: string) => boolean,
  deepExtendState: (newState: any) => void
}
