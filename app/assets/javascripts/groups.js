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
      debugger;
      console.log('いいゾーーーー！！');
    })
    .fail(function(data) {
      debugger;
      console.log('惜しい！！！');
    });
  });
});
