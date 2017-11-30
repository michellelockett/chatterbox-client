
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

let messages = [];
let rooms = {};
app.init = function() {
  //grab last 200 messages from server
  app.fetch();
  //get the room names
  for (var room in rooms) {
    console.log(room);
    $('#roomSelect').append('<option value="' + room + '">' + room + '</option>');
  }
  //append each individual unique room to the select form rooms
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

 // array.forEach(function(message) {
 //      app.renderMessage(message);
 //      console.log(message, message.roomname);
 //    });

app.fetch = function() {
  $.ajax({
  url: this.server,
  type: 'GET',
  contentType: 'json',
  data: {limit: 1000, skip: 500},
  success: function (data) {
    console.log(data.results.length);
    var array = data.results.slice(data.results.length - 200);
    for (var i = 0; i < array.length; i++) {
      let room = array[i].roomname;
      if (!rooms[room]) {
        rooms[room] = [array[i]];
      } else {
        if (!rooms[room].includes(array[i])) {
          rooms[room].push(array[i]);
       }
      }
    }
    for (var room in rooms) {
      console.log(room);
      $('#roomSelect').append('<option value="' + room + '">' + room + '</option>');
    }
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
  if (text && text.indexOf('<') !== -1) {
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

app.renderRoom = function() {
  //figure out how to show max 10 messages, make the oldest ones drop off

  //match the lobby name to the roomname messages
}

// app.handleUsernameClick = function() {
//   restore: function() {

//   }
// }

// app.handleSubmit = function() {
//   restore: function() {

//   }
//}

