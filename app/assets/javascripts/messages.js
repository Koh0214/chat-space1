$(function() {

  function build_message(data) {
    var htmls = $(
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

  function appendAddList(name, id){
    $(
      '<li class="box">' +
        '<div class="searched_user"></div>' +
        '<input type="hidden" class="user_id" name="group[user_ids][]" value="">' +
        '<a href="javascript:void(0)" class="remove_button">削除</a>' +
      '</li>' )
    .find('.searched_user').text(name).end()
    .find('.user_id').val(id).end()
    .appendTo(add_user_list)
    user_ids.push(id)
  };

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var group_id = $('.group_id').val();

    var fd = new FormData($('form').get(0))
    $.ajax({
      type: 'POST',
      url: '/groups/' + group_id + '/messages',
      data: fd,
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
});
