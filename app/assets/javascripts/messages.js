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

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var group_id = gon.group_id;
    var formData = new FormData($(this).get(0))
    $.ajax({
      type: 'POST',
      url: '/groups/' + group_id + '/messages.json',
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data) {
      data.name = gon.current_user_name;
      build_message(data);
      $('#message_body').val('');
    })
    .fail(function(data) {
      alert('送信に失敗しました。');
    });
  });

});
