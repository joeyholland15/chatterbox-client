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
    console.log('chatterbox: Message sent');
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

      $.each(arrayOfMessageObjects, function(index, val) {
        val['text'] = app.escapeHTML(val['text']); 
        $('ul').append('<span class=time>'+val.updatedAt+'</span>')
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
app.addMessage = function() {};
app.addRoom = function() {}; 

//<------------------------------------------------------------------------------------------->
app.clearMessages = function(){
  $('#chats').empty();
  // app.fetch();

}


app.init();
app.send(message);
app.fetch = app.fetch.bind(app);
setInterval(app.fetch, 2000);



 // $('ul').append("<li class = 'chat'>"+val.text+ " </li>").append('<span class=time>'+val.updatedAt+'</span>')