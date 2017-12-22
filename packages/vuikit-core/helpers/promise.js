import isFunction from '@vuikit/core/utils/is-function';
import isObject from '@vuikit/core/utils/is-object';

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

var async = 'setImmediate' in window ? setImmediate : setTimeout;

var promise = 'Promise' in window ? window.Promise : Promise

function Promise (executor) {
  this.state = PENDING;
  this.value = undefined;
  this.deferred = [];

  var promise = this;

  try {
    executor(function (x) {
      promise.resolve(x);
    }, function (r) {
      promise.reject(r);
    });
  } catch (e) {
    promise.reject(e);
  }
}

Promise.reject = function (r) {
  return new Promise(function (resolve, reject) {
    reject(r);
  })
};

Promise.resolve = function (x) {
  return new Promise(function (resolve, reject) {
    resolve(x);
  })
};

Promise.all = function all (iterable) {
  return new Promise(function (resolve, reject) {
    var count = 0;
    var result = [];

    if (iterable.length === 0) {
      resolve(result);
    }

    function resolver (i) {
      return function (x) {
        result[i] = x;
        count += 1;

        if (count === iterable.length) {
          resolve(result);
        }
      }
    }

    for (var i = 0; i < iterable.length; i += 1) {
      Promise.resolve(iterable[i]).then(resolver(i), reject);
    }
  })
};

Promise.race = function race (iterable) {
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < iterable.length; i += 1) {
      Promise.resolve(iterable[i]).then(resolve, reject);
    }
  })
};

var p = Promise.prototype;

p.resolve = function resolve (x) {
  var promise = this;

  if (promise.state === PENDING) {
    if (x === promise) {
      throw new TypeError('Promise settled with itself.')
    }

    var called = false;

    try {
      var then = x && x.then;

      if (x !== null && isObject(x) && isFunction(then)) {
        then.call(x, function (x) {
          if (!called) {
            promise.resolve(x);
          }
          called = true;

        }, function (r) {
          if (!called) {
            promise.reject(r);
          }
          called = true;
        });
        return
      }
    } catch (e) {
      if (!called) {
        promise.reject(e);
      }
      return
    }

    promise.state = RESOLVED;
    promise.value = x;
    promise.notify();
  }
};

p.reject = function reject (reason) {
  var promise = this;

  if (promise.state === PENDING) {
    if (reason === promise) {
      throw new TypeError('Promise settled with itself.')
    }

    promise.state = REJECTED;
    promise.value = reason;
    promise.notify();
  }
};

p.notify = function notify () {
  var this$1 = this;

  async(function () {
    if (this$1.state !== PENDING) {
      while (this$1.deferred.length) {
        var deferred = this$1.deferred.shift();
        var onResolved = deferred[0];
        var onRejected = deferred[1];
        var resolve = deferred[2];
        var reject = deferred[3];

        try {
          if (this$1.state === RESOLVED) {
            if (isFunction(onResolved)) {
              resolve(onResolved(this$1.value));
            } else {
              resolve(this$1.value);
            }
          } else if (this$1.state === REJECTED) {
            if (isFunction(onRejected)) {
              resolve(onRejected(this$1.value));
            } else {
              reject(this$1.value);
            }
          }
        } catch (e) {
          reject(e);
        }
      }
    }
  });
};

p.then = function then (onResolved, onRejected) {
  var this$1 = this;

  return new Promise(function (resolve, reject) {
    this$1.deferred.push([onResolved, onRejected, resolve, reject]);
    this$1.notify();
  })
};

p.catch = function (onRejected) {
  return this.then(undefined, onRejected)
};

export default promise;
