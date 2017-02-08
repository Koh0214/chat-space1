$(function() {
  function build_message(data) {
    $(
      '<li style="list-style:none;" >' +
        '<h5 class="post_name"></h5>' +
        '<p class="timestamp"></p>' +
        '<p class="post"></p>' +
        '<img src="" class="image">' +
      '</li>'
    )
    .find('.post_name').text(data.name).end()
    .find('.timestamp').text(data.created_at).end()
    .find('.post').text(data.body).end()
    .find('.image').attr('src', data.image.url).end()
    .appendTo($('div.right__content'))
  };

  var group_id = $('.group_id').val();

  if (!(group_id.isEmpty)) {
    setInterval(function() {
      $.ajax({
        type: 'GET',
        url: '/groups/' + group_id + '/messages',
        data: {},
        dataType: 'json'
      })
      .done(function(last_message) {
        last_message.name = gon.last_message_name
        if (last_message.created_at !== $('.right__content .timestamp').last().text()) {
          build_message(last_message)
        }
      })
      .fail(function(users) {
        alert('メッセージの送信に失敗してますよ')
      });
    },1000);
  }

});
