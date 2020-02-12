var results = document.getElementById('results');
var avg_ping = document.getElementById('avg-ping');
var avg_down = document.getElementById('avg-down');
var avg_up = document.getElementById('avg-up');

var registry_xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//registry_xhttp.withCredentials = true;
registry_xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log("test");
  } else if (this.readyState == 4) {
    console.log(this);
    results.innerText = "ERROR";
    avg_ping.innerText = "ERROR";
    avg_down.innerText = "ERROR";
    avg_up.innerText = "ERROR";
  }
};
registry_xhttp.open("get", "speedtest-registry", true);
registry_xhttp.send();
