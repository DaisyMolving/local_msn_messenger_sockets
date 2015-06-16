$(document).ready(function(){

  function writeLine(name, line) {
    $('.chatlines').append('<li class="talk"><span class="nick">&lt;' + name + '&gt;</span> ' + line + '</li>');
  }

  $('form').on('submit', function(ev) {
    ev.preventDefault();
    var $name = $('#nick');
    var $line = $('#text');
    socket.emit('chat', {name: $name.val(), line: $line.val()});
    writeLine($name.val(), $line.val());
    $line.val("");

  });

  function writeAction(name, action) {
  var actionStrings = {'happy': ':)',
                       'sad': ':(',
                       'cheeky': ';P',
                       'lol': 'LAUGH OUT LOUD!'}
  $('.chatlines').append('<li class="action">' + name + ' ' + actionStrings[action] + '</li>');
}

  $('.actions button').on('click', function(ev) {
  var $name = $('#nick');
  var $button = $(ev.currentTarget);
  socket.emit('action', {name: $name.val(), action: $button.data('type')});
  writeAction($name.val(), $button.data('type'));
  });

});