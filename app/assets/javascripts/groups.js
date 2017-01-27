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
    .done(function(data) {
      // function(data)の引数に、コントローラーから値が返ってくる
      console.log('いいゾーーーー！！');
      console.log(data);
    })
    .fail(function(data) {
      console.log('惜しい！！！');
    });
  });
});
