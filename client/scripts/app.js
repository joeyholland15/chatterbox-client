// YOUR CODE HERE:
var chatRooms = {}; 
var app = {}; 

app.escapeHTML = function (text) {
  if (text === undefined){return};
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

app.init = function() {
  app.server = 'https://api.parse.com/1/classes/chatterbox';
  
  app.fetch();
}; 





app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: app.server,
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    app.fetch();
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
}; 

app.fetch = function() {
 
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      // $('ul').remove();
     
      chatRooms['all'] = data.results;
      

      $("#chats").empty();
      _.each(data.results, function(messageObject){
        messageObject['text'] = app.escapeHTML(messageObject['text']); 
        if(chatRooms[messageObject['roomname']] === undefined){
          chatRooms[messageObject['roomname']] = [];
          chatRooms[messageObject['roomname']].push(messageObject);
        } else {
          chatRooms[messageObject['roomname']].push(messageObject);
        }

      });

      var chatRoom = $("#chatRooms option:selected").text();
      $('#chatRooms').empty(); 

      for (var prop in chatRooms){
          if (prop === chatRoom){
            $('#chatRooms').append("<option value=" + prop + " selected >" + prop + "</option>")
          }
            $('#chatRooms').append("<option value=" + prop + ">" + prop + "</option>")
          }
       

        



        $.each(chatRooms[chatRoom], function(index, val) {
        val['text'] = app.escapeHTML(val['text']); 
        var $chats = $('#chats');
        $('<ul class=chat></ul>').appendTo($chats).last();
        var message = $('ul').last();
        $('<li>'+val.username+'</li>').appendTo(message); 
        $('<li>'+val.text+'</li>').appendTo(message); 
        $('<li>'+val.createdAt+'</li>').appendTo(message); 
      }); 
      console.log(chatRoom); 
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

}; 

//app.clearMessages = function() {};
// app.addMessage = function() {
//   $('#messageForm').submit(function() {
//       // get all the inputs into an array.
//       var $inputs = $('#messageForm :input');

//       // not sure if you wanted this, but I thought I'd add it.
//       // get an associative array of just the values.
//       var values = {};
//       $inputs.each(function() {
//           values[this.name] = $(this).val();
//       });

//       console.log(values);

//   });
// };


app.addRoom = function() {}; 

//<------------------------------------------------------------------------------------------->
app.clearMessages = function(){

};
// $( "#messageForm" ).submit(function( event ) {
//   outputTranslated();
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
// });

var textArea = $('#myUser').val();
$(document).ready(function() {

  $('#chatRooms').on('change', function() {
     app.fetch();
  })
});

$( document ).ready(function() {
  $("#messageForm").submit(function(e){

    var messageObject = {
      username: $('#myUser').val(),
      text: $('#myMessage').val(),
      roomname: 'Dima and Joey'
    }; 
     console.log(messageObject);
    app.send(messageObject);
    // app.fetch();
    return false;
 }) 
});
// function outputTranslated(){
//     var textArea = $('#myUser').val();
//     console.log(textArea);  
// }

app.init();
app.fetch = app.fetch.bind(app);
 
 // $( document ).ready(function() {
  console.log(chatRooms);
    
  // });
setInterval(app.fetch, 10000);



 // $('ul').append("<li class = 'chat'>"+val.text+ " </li>").append('<span class=time>'+val.updatedAt+'</span>')