//fiture out how to get a username

$( document ).ready(function() {
  app.fetch();
$('button').on('click', function() {


  var message = {
    username: 'anonymous',
    text: $('#message').val(),
    roomname: 'lobby'
  };

  app.send(message);
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
