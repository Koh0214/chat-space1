$(function() {
  function build_post_name(name) {
    var html = $('<h5 class="post_name">').append(name);
    return html;
  }
  function build_timestamp(data) {
    var html = $('<p class="timestamp">').append(data.created_at);
    return html;
  }
  function build_post(data) {
    var html = $('<p class="post">').append(data.body);
    return html;
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.form');
    var input_message = textField.val();
    var group_id = $('.group_id').val();
    var name = $('.current_user_name').val();
    $.ajax({
      type: 'POST',
      url: '/groups/' + group_id + '/messages.json',
      data: { message: { body: input_message } },
      dataType: 'json'
    })
    .done(function(data) {
      console.log('OK!')
      var post_name = build_post_name(name);
      $('div.right__content').append(post_name);
      var timestamp = build_timestamp(data);
      $('div.right__content').append(timestamp);
      var post = build_post(data);
      $('div.right__content').append(post);
      textField.val('');
    })
    .fail(function(data) {
      console.log('保存できとらんゾーーーーー');
    });
  });
});
