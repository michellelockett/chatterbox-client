
// URL HTTP Verb Functionality (from parse website on REST api)
// /parse/classes/<className>  POST  Creating Objects
// /parse/classes/<className>/<objectId> GET Retrieving Objects
// /parse/classes/<className>/<objectId> PUT Updating Objects
// /parse/classes/<className>  GET Queries
// /parse/classes/<className>/<objectId> DELETE  Deleting Objects

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: http://parse.*rpt*.hackreactor.com/chatterbox/classes/messages,
//   type: 'POST',
//   data: JSON.stringify('Our first chat'),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

//http://parse.*rpt*.hackreactor.com/chatterbox/classes/messages

var app = {};

app.server = 'http:parse.rpt.hackreactor.com/chatterbox/classes/messages';

app.init = function() {

}

app.send = function(message) {
  $.ajax({
  url: this.server,
  type: 'POST',
  data: message,
  //contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
  });
}

var limit = encodeURI('limit=1000');
var skip = encodeURI('skip=600');

app.fetch = function() {
  $.ajax({
  url: this.server,
  type: 'GET',
  contentType: 'json',
  data: {limit, skip},
  success: function (data) {
    //console.log(data);
    var array = data.results.slice(data.results.length - 20);

    array.forEach(function(message) {
      app.renderMessage(message);
    });
    console.log('chatterbox: Messages fetched');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to fetch message', data);
  }
  });
}

app.clearMessages = function() {
  $('#chats').empty();
}

app.checkHack = function(text) {
  if (text.indexOf('<') !== -1) {
    return 'nice try hacker';
  }
  return text;
}

app.renderMessage = function(message) {
  var text = message.text;
  var username = message.username;
  text = app.checkHack(text);
  username = app.checkHack(username);
  var node = $('<p class= "temp">'+ username + ' : ' + text +'</p>');
  $('#chats').prepend(node);
}

// app.renderRoom = function() {

// }

// app.handleUsernameClick = function() {
//   restore: function() {

//   }
// }

// app.handleSubmit = function() {
//   restore: function() {

//   }
//}

