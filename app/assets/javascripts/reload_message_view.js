$(function() {
  function build_message(last_message) {
    $(
      '<li style="list-style:none;" >' +
        '<h5 class="post_name"></h5>' +
        '<p class="timestamp"></p>' +
        '<p class="post"></p>' +
        '<img src="" class="image">' +
      '</li>'
    )
    .find('.post_name').text(last_message.name).end()
    .find('.timestamp').text(last_message.created_at).end()
    .find('.post').text(last_message.body).end()
    .find('.image').attr('src', last_message.image.url).end()
    .appendTo($('div.right__content'))
  };

  var group_id = gon.group_id
  // 
  // if (!(group_id.isEmpty)) {
  //   setInterval(function() {
  //     $.ajax({
  //       type: 'GET',
  //       url: '/groups/' + group_id + '/messages.json',
  //       data: {}
  //     })
  //     .done(function(last_message) {
  //       if (last_message.length && last_message.created_at !== $('.right__content .timestamp').last().text()) {
  //         last_message.name = gon.last_message_name
  //         build_message(last_message)
  //       }
  //     })
  //     .fail(function(users) {
  //       console.log('最終メッセージの解析に失敗');
  //     });
  //   },1000);
  // }

});
