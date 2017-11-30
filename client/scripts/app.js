
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

var messages = [];
app.rooms = {};
app.init = function() {
  console.log('called init');
  //grab last 200 messages from server
  this.fetch()

  for (var room in this.rooms) {
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
  async: false,
  success: function (data) {
    console.log(this.rooms, 'this');
    console.log(data.results.length);
    var array = data.results.slice(data.results.length - 200);
    for (var i = 0; i < array.length; i++) {
      var room = array[i].roomname;
      var id = array[i].objectId;
      var truthy = false;
      //check if room exists
      // if not then we update the value of that prop to equal message
      //
      if (!app.rooms[room]) {
        app.rooms[room] = [array[i]];
      } else {
        // check all the messages in rooms[room]
        // if the message isn't already there, push it
        // otherwise do nothing
       app.rooms[room].forEach(function(message) {
         if (message.objectId === id) {
           truthy = true;
         }
       });

       if (!truthy) {
          app.rooms[room].push(array[i]);
       }
     }
    }

    // for (var room in app.rooms) {
    //   $('#roomSelect').append('<option value="' + room + '">' + room + '</option>');
    // }
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

