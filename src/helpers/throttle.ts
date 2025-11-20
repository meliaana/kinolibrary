type Timeout = ReturnType<typeof setTimeout>;

export const throttle = (func: Function, limit: number) => {
  let lastFunc: Timeout;
  let lastRan: number;
  return function (...args: any) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(null, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
};
