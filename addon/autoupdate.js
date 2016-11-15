/*
** Auto-update emote data - /u/HeyItsShuga
*/

// It's a mess, I know.

//note: this file runs after addon loads on browser start.

/// See if it has been a week since the last update. NOTE: Can't be run from options.html
var oldUpdate = localStorage.update
var newUpdate = Date.now()
console.log("[BPM] Current Time: " + newUpdate)
console.log("[BPM] Last Update: " + oldUpdate)
var updateElapsed = newUpdate - oldUpdate
if (updateElapsed >= 604800000) {
  bpmUpdate()
  console.log('[BPM] Updating...')
} else if (typeof oldUpdate === "undefined") {
  console.log('[BPM] First run detected. If this is not true, something is broken.')
  bpmUpdate()
}

// Run when update occurs
function bpmUpdate() {
  /// bpm-resources.js - update
  var client1 = new XMLHttpRequest();
  client1.open('GET', 'https://www.ponymotes.net/bpm/bpm-resources.js');
  client1.onreadystatechange = function() {
    localStorage.setItem("bpmResources", client1.responseText);
  }
  client1.send();
  /// emote-classes.css - update
  var client2 = new XMLHttpRequest();
  client2.open('GET', 'https://www.ponymotes.net/bpm/emote-classes.css');
  client2.onreadystatechange = function() {
    localStorage.setItem("emoteClasses", client2.responseText);
  }
  client2.send();
  /// gif-animotes.js - update
  var client3 = new XMLHttpRequest();
  client3.open('GET', 'https://www.ponymotes.net/bpm/gif-animotes.css');
  client3.onreadystatechange = function() {
    localStorage.setItem("gifAnimotes", client3.responseText);
  }
  client3.send();
  /// Record update time
  localStorage.setItem("update", newUpdate);
}

// function bpmInject() {
// bpm-resources.js - injection
window.URL = window.URL || window.webkitURL;
var blob = new Blob([localStorage.bpmResources], {type: 'text/javascript'});
var script = document.createElement('script');
script.rel = 'js';
script.src = window.URL.createObjectURL(blob);
document.head.appendChild(script);

// emote-classes.css - inject
////// same as emoteClasses. fix that first though. /////

// gif-animotes.js - inject
////// same as emoteClasses. fix that first though. /////
// }
//
// bpmInject()

// Communication with Reddit DOM

// *dust*
