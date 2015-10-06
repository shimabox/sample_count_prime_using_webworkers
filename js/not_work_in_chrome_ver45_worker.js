var isPrime = function (target) {
  var sqrt = Math.floor(Math.sqrt(target));
  for (var i = 2; i <= sqrt; i++) {
    if (target % i === 0) {
      return false;
    }
  }

  return true;
};

// varをつけるとchrome(pc, ver.45)だと動かない
var onmessage = function (e) {
  var val = e.data;
  var ret = '';

  for (var i=2; i<=val; i++) {
    if (isPrime(i)) {
      ret += i + ' ';
    }
  }

  postMessage(ret);
};