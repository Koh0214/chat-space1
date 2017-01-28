$(function() {
  var searched_user_list = $("#searched_user_list");
  var add_user_list = $("#add_user_list")

  function appendList(user, id) {
    var user_id = $("<input>", {type: 'hidden', id: 'user_id', value: id })
    var searched_user = $('<div class="searched_user">').append(user);
    var add_button = $('<a href="javascript:void(0)" class="add_button" >').append("追加");
    var box = $('<li class="box">').append(user_id, searched_user, add_button);
    searched_user_list.append(box);
  };

  $('body').on('click', '#searched_user_list .add_button', function() {
    add_user_list.append($(this).parent());
    var remove_button = $('<a href="javascript:void(0)" class="remove_button" >').append("削除");
    $(this).parent().append(remove_button);
    $(this).remove();
  });

  $('body').on('click', '#add_user_list .remove_button', function() {
    searched_user_list.append($(this).parent());
    var add_button = $('<a href="javascript:void(0)" class="add_button" >').append("追加");
    $(this).parent().append(add_button);
    $(this).remove();
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
      $(".box").remove();
      var user_ids = [];
      $.each(users,
        function(index, user) {
          appendList(user.name, user.id);
          console.log(user.id);
          user_ids.push(user.id)
        }
      )
    })
    .fail(function(users) {
      console.log('惜しい！！！');
    });
  });
});
