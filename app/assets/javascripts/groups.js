$(function() {
  var list = $("#list");

  function appendList(user) {
    var searched_user = $('<div class="searched_user">').append(user);
    var add_button = $('<a href="javascript:void(0)" class="add_button" >').append("追加");
    var box = $('<li class="box">').append(searched_user, add_button);
    list.append(box);
  };

  $('body').on('click', '#list .add_button', function() {
    console.log("uhyaaaaaa");
  });

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
      // function(users)の引数に、コントローラーから値が返ってくる
      console.log('いいゾーーーー！！');
      $.each(users,
        function(index, user) {
          console.log(user.name);
        }
      )
      $(".box").remove();
      $.each(users,
        function(index, user) {
          appendList(user.name);
        }
      )
    })
    .fail(function(users) {
      console.log('惜しい！！！');
    });
  });
});
