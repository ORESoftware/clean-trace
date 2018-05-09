'use strict';

import * as util from "util";

const matchAny = [/:[0-9]/];

const notMatchAny = [
  /bootstrap_node\.js/,
  /Function\.Module\.runMain/,
  /process\._tickCallback/,
  /at Module\._compile/
];

export const settings = {
  fullTrace: false,
  excludeNodeModules: false
};

export const getUsefulStack = function (e: any, color?: string) {
  
  let err = (e && e.stack || e);
  
  if (typeof err !== 'string') {
    // breakLength => keep everything on one line
    return util.inspect(err, {breakLength: Infinity});
  }
  
  return String(err).split('\n')
  .filter(function (v, i) {
    if (i < 2) return true;
    return matchAny.some(function (r) {
      return r.test(v);
    })
  })
  .filter(function (v, i) {
    if (i < 2) return true;
    return !notMatchAny.some(function (r) {
      return r.test(v);
    });
  })
  .join('\n')
};

export const getCleanTrace = getUsefulStack;
