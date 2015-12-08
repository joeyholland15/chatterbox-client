// YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: 'TEEEXXTTT',
  roomname: '4chan'
};

var app = {}; 

var messages = 0;

app.escapeHTML = function (text) {
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
      console.log(message);
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
      var chatRooms = {}; 
      var arrayOfMessageObjects = data.results;
 
      _.each(arrayOfMessageObjects, function(messageObject){
        app.escapeHTML(messageObject['text']); 
        if(chatRooms[messageObject['roomname']] === undefined){
          chatRooms[messageObject['roomname']] = [];
          chatRooms[messageObject['roomname']].push(messageObject);
        } else {
          chatRooms[messageObject['roomname']].push(messageObject);
        }
      });
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

}; 

app.clearMessages = function() {};
app.addMessage = function() {};
app.addRoom = function() {}; 

//<------------------------------------------------------------------------------------------->

app.init();
app.fetch = app.fetch.bind(app);
setInterval(app.fetch, 2000);



