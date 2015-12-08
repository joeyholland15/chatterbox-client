// YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: '<>&&',
  roomname: 'Dima and Joey'
};

var app = {}; 

var messages = 0;

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
  console.log("helllooo");
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
    console.log(data);
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
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      var last = $('span').last().text();
      var chatRooms = {}; 
      var arrayOfMessageObjects = data.results;
      console.log(last);
      // _.each(arrayOfMessageObjects, function(messageObject){
      //   messageObject['text'] = app.escapeHTML(messageObject['text']); 
      //   if(chatRooms[messageObject['roomname']] === undefined){
      //     chatRooms[messageObject['roomname']] = [];
      //     chatRooms[messageObject['roomname']].push(messageObject);
      //   } else {
      //     chatRooms[messageObject['roomname']].push(messageObject);
      //   }

      // });

      // $.each(arrayOfMessageObjects, function(index, val) {
      //   val['text'] = app.escapeHTML(val['text']); 
      //   var $chats = $('#chats');
        
      //   $('<div class=chat></div>').appendTo($chats);
      //   var $chat = $('#chats:last-child');
      //   console.log($chat);
      //   $('<ul class=list></ul>').appendTo($chat);
      //   $('<li>'+val.username+'</li>').appendTo('.list:last-child'); 
      //   $('<li>'+val.text+'</li>').appendTo('.list:last-child'); 
      //   $('<li>'+val.createdAt+'</li>').appendTo('.list:last-child'); 
        $.each(arrayOfMessageObjects, function(index, val) {
        val['text'] = app.escapeHTML(val['text']); 
        var $chats = $('#chats');
        
        $('<ul class=chat></ul>').prependTo($chats);
        var message = $('ul').first();
        $('<li>'+val.username+'</li>').appendTo(message); 
        $('<li>'+val.text+'</li>').appendTo(message); 
        $('<li>'+val.createdAt+'</li>').appendTo(message); 
      }); 
      // console.log(arrayOfMessageObjects); 
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

}; 

//app.clearMessages = function() {};
app.addMessage = function() {
  $('#messageForm').submit(function() {
      // get all the inputs into an array.
      var $inputs = $('#messageForm :input');

      // not sure if you wanted this, but I thought I'd add it.
      // get an associative array of just the values.
      var values = {};
      $inputs.each(function() {
          values[this.name] = $(this).val();
      });

      console.log(values);

  });
};

app.addMessage();
app.addRoom = function() {}; 

//<------------------------------------------------------------------------------------------->
app.clearMessages = function(){
  $('#chats').empty();
  // app.fetch();

}


app.init();
app.send("helloooo");
app.fetch = app.fetch.bind(app);
// setInterval(app.fetch, 10000);



 // $('ul').append("<li class = 'chat'>"+val.text+ " </li>").append('<span class=time>'+val.updatedAt+'</span>')