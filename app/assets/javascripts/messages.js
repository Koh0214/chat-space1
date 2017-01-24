$(function() {
  function build_message(data) {
    var htmls = []
    var name = $('<h5 class="post_name">').append(data.name);
    var timestamp = $('<p class="timestamp">').append(data.created_at);
    var body = $('<p class="post">').append(data.body);
    htmls.push(name, timestamp, body);
    return htmls;
  }

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
      data.name = $('.current_user_name').val();
      $('div.right__content').append(build_message(data));
      textField.val('');
    })
    .fail(function(data) {
      allert('送信に失敗しました。');
    });
  });
});
