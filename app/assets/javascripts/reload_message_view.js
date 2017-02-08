$(function() {

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
