$(function() {
  var searched_user_list = $("#searched_user_list");
  var add_user_list = $("#add_user_list")
  user_ids = [$(".current_user_id").val().toString()];

  function appendList(user_name, user_id) {
    if ( user_ids.includes(user_id.toString()) );
    else {
      var searched_user = $('<div class="searched_user">').append(user_name);
      var user_id = $("<input>", {type: 'hidden', id: 'user_id', name: '', value: user_id })
      var add_button = $('<a href="javascript:void(0)" class="add_button add_remove_button" >').append("追加");
      var box = $('<li class="box">').append(searched_user, user_id, add_button);
      searched_user_list.append(box);
    }
  };

  function appendAddUserList(user_name, user_id) {
      var searched_user = $('<div class="searched_user">').append(user_name);
      var user_id = $("<input>", {type: 'hidden', id: 'user_id', name: 'group[user_ids][]', value: user_id })
      var remove_button = $('<a href="javascript:void(0)" class="remove_button add_remove_button" >').append("削除");
      var box = $('<li class="box">').append(searched_user, user_id, remove_button);
      add_user_list.append(box);
  };

  $('body').on('click', '.add_button', function() {
    add_user_list.append($(this).parent());
    $(this).prev().attr('name', 'group[user_ids][]');
    var remove_button = $('<a href="javascript:void(0)" class="remove_button add_remove_button" >').append("削除");
    $(this).parent().append(remove_button);
    $(this).remove();
  });

  $('body').on('click', '.remove_button', function() {
    searched_user_list.append($(this).parent());
    $(this).prev().attr('name', '')
    var add_button = $('<a href="javascript:void(0)" class="add_button add_remove_button" >').append("追加");
    $(this).parent().append(add_button);
    $(this).remove();
  });

  // 削除、追加のボタンクリックの度に#add_user_listの中の #user_idを監視。そこにあるvalueを配列で取ってくる
  $('body').on('click', '.add_remove_button', function() {
    user_ids = $("#add_user_list #user_id").map(
      function(){
        return $(this).val();
      }).get();
  });

  // インクリメンタルサーチ部分
  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var textField = $('#user-search-field');
    var input_text = textField.val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { text: input_text },
      dataType: 'json'
    })
    .done(function(users) {
      $("#searched_user_list .box").remove();
      $.each(users,
        function(index, user) {
          appendList(user.name, user.id);
        }
      )
      if (input_text.length === 0) {
        $("#searched_user_list .box").remove();
      };
    })
    .fail(function(users) {
    });
  });

  // ↓↓ group fix用のコード ↓↓

  var group_users = gon.users

  $.each(group_users, function(i, user) {
    if ( user_ids.includes(user.id.toString()) );
    else {
      user_ids.push(user.id.toString());
      appendAddUserList(user.name, user.id)
    }
  });
});
