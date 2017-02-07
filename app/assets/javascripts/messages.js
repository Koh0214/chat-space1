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
    var group_id = $('.group_id').val();

    var formData = new FormData($('form').get(0))
    $.ajax({
      type: 'POST',
      url: '/groups/' + group_id + '/messages',
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data) {
      data.name = $('.current_user_name').val();
      build_message(data);
      $('#message_body').val('');
    })
    .fail(function(data) {
      alert('送信に失敗しました。');
    });
  });

  $(window).load(function(){
    var left_height = $('.left__content').height();
    $('.right__content').height(left_height);
  })

});
