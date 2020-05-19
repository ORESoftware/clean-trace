'use strict';

import * as util from "util";

const matchAny = [/:[0-9]/];

const notMatchAny = [
  /bootstrap_node\.js/,
  /Function\.Module\.runMain/,
  /process\._tickCallback/,
  /at Module\._compile/,
  /at emitCloseNT/,
  /internal\/process\/next_tick\.js/,
  /process\._tickCallback/,
  /at Function\.Module\._load/,
  /at Module\.require/,
  /at Object\.Module\._extensions./
];

export const settings = {
  fullTrace: false,
  excludeNodeModules: false
};

export const r2gSmokeTest = function () {
  return true;
};

export const getUsefulStack = function (e: any, color?: string) {
  
  let err = (e && e.stack || e);
  
  if (typeof err !== 'string') {
    // breakLength => keep everything on one line
    return util.inspect(err, {breakLength: Infinity});
  }
  
  if (settings.fullTrace) {
    return err;
  }
  
  return String(err).split('\n')
    .map(v => String(v).trim())
    .filter(function (v, i) {
      if (v) {
        if (i < 2) return true;
        return matchAny.some(function (r) {
          return r.test(v);
        });
      }
    })
    .filter(function (v, i) {
      if (v) {
        if (i < 2) return true;
        return !notMatchAny.some(function (r) {
          return r.test(v);
        });
      }
    })
    .join('\n')
};

export const getCleanTrace = getUsefulStack;
