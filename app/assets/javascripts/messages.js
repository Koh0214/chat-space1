$(function() {
  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.form');
    var input_message = textField.val();
    var group_id = $('.group_id').val();
    $.ajax({
      type: 'POST',
      url: '/groups/' + group_id + '/messages.json',
      data: { message: { body: input_message } },
      dataType: 'json'
    })
    .done(function(data) {
      console.log('OK!')
      $('p.post').append(message.body);
    })
    .fail(function(data) {
      console.log('保存できとらんゾーーーーー');
    });
  });
});
