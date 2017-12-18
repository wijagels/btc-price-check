const API = 'https://api.bitfinex.com/v1/pubticker/btcusd';
const STATS = ['last_price', 'bid', 'ask'];
let money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function showPrice_() {
  let json = JSON.parse(httpGet(API));
  console.log(json);

  STATS.forEach(function(stat) {
    document.getElementById(stat).innerHTML = money.format(
      parseFloat((json[stat]))
    );
  });
}

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getStuff() {
  var raw = httpGet('https://api.bitfinex.com/v1/pubticker/btcusd');
  var json = JSON.parse(raw);
  var res = json["last_price"];
  return res;
}

document.addEventListener('DOMContentLoaded', function () {
  showPrice_();
});

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#refresher').addEventListener('change', handleChange);
});

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

function handleChange() {
  var cb = document.querySelector('#refresher');
  if(cb.checked == true){
    timer = setInterval(function(){showPrice_();}, 2000);
  }
  else{
   clearInterval(timer);
  }
}
