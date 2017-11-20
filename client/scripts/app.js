
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
app.schema = encodeURI('http:parse.rpt.hackreactor.com/chatterbox/classes/messages') + "%5Bobject%20Object%5D";

app.init = function() {

}

app.getSchema = function() {
  $.ajax({
    url: decodeURI(this.schema),
    type: 'GET',
    contentType: 'json',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Messages fetched');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get schemas', data);
  }
  });
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

app.fetch = function() {
  $.ajax({
  url: this.server,
  type: 'GET',
  contentType: 'json',
  limit: '1000',
  success: function (data) {
    //console.log(data);
    var array = data.results;

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
  $('.temp').remove();
}

app.renderMessage = function(message) {
  var text = message.text;
  //console.log(text);
  var node = $('<p class= "temp">'+ text +'</p>');
  //console.log(node);
  $('#chats').append(node);
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

