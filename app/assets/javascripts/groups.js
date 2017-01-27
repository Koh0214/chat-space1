$(function() {
  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var textField = $('#user-search-field');
    var input_text = textField.val();
    $.ajax({
      type: 'POST',
      url: '/get_word',
      data: { text: input_text },
      dataType: 'json'
    })
    .done(function(users) {
      // function(data)の引数に、コントローラーから値が返ってくる
      console.log('いいゾーーーー！！');
      console.log(users);
      $.each(users,
        function(index, user) {
          console.log(user.name);
        }
      )
    })
    .fail(function(users) {
      console.log('惜しい！！！');
    });
  });
});
