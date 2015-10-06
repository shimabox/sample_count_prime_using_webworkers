document.addEventListener("DOMContentLoaded", function(){
  execButtonHandler();
}, false);

var execButtonHandler = function() {
  var execButton = document.getElementById("exec");
  execButton.addEventListener("click", function(){
    var val = targetVal();
    if (!val) {
      return;
    }

    initResultArea();

    setTimeout(function() {
      decideUseFunc(val);
    }, 0);

  }, false);
};

var targetVal = function() {
  var target = document.getElementById("target").value;
  if (~~target < 2) {
    alert("2以上を入力してください");
    return false;
  }

  return target;
};

var initResultArea = function() {
  resultAreaEleDisplay(false);
  loadingDisplay(true);
  initResultEle();
};

var resultAreaEleDisplay = function(show) {
  var state = show ? 'block' : 'none';
  return document.getElementById('result-area').style.display = state;
};

var loadingDisplay = function(show) {
  var state = show ? 'block' : 'none';
  return document.getElementById('loading').style.display = state;
};

var initResultEle = function() {
  resultEle().innerHTML = '';
};

var resultEle = function() {
  return document.getElementById('result');
};

var selectedUseWebWorker = function() {
  return document.getElementById('use-webworkers').checked === true;
};

var selectedNotWorkWebWorker = function() {
  return document.getElementById('not-work-webworkers').checked === true;
};

// 利用する関数を返す
var decideUseFunc = function(val) {
  // 動くworker
  if (selectedUseWebWorker()) {
    return useWorker(val, './js/worker.js');
  }

  // chrome(pc, ver.45)で動かないworker
  if (selectedNotWorkWebWorker()) {
    return useWorker(val, './js/not_work_in_chrome_ver45_worker.js');
  }

  // workerを使わない
  return notUseWorker(val);
};

var useWorker = function(target, workerPath) {
  var worker = new Worker(workerPath);
  worker.postMessage(target);
  worker.onmessage = function (e) {
    addResult(e.data);
  };
};

var notUseWorker = function(target) {
  var ret = '';
  for (var i=2;i<=target; i++) {
    if (isPrime(i)) {
      ret += i + ' ';
    }
  }

  addResult(ret);
};

var addResult = function(val) {
  resultEle().innerHTML = val;
  loadingDisplay(false);
  resultAreaEleDisplay(true);
};

// 素数の計算
var isPrime = function(target) {
  var sqrt = Math.floor(Math.sqrt(target));
  for (var i = 2; i <= sqrt; i++) {
    if (target % i === 0) {
      return false;
    }
  }

  return true;
};