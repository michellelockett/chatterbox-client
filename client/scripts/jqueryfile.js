//fiture out how to get a username

$( document ).ready(function() {
  app.fetch();
  app.getSchema();
    $('#submit').on('click', function() {

      var message = {
        username: 'anonymous',
        text: $('#message').val(),
        roomname: 'lobby'
      };

      app.send(message);
      app.fetch();
    });

    $('#clear').on('click', function() {
      app.clearMessages();
    });

    $('#get').on('click', function() {
      app.fetch();
    });
});



  // var getTweet = function() {
  //   var user = $('#visitor-name').val();
  //   window.visitor = user;
  //   var input = $('#visitor-message').val();
  //   return input;
  // }


//   $( "#target" ).click(function() {
//   alert( "Handler for .click() called." );
// });


// $( "p" ).on( "click", function() {
//   alert( $( this ).text() );
// });
