$(function() {
  var searched_user_list = $("#searched_user_list");
  var add_user_list = $("#add_user_list")
  user_ids = [$(".current_user_id").val().toString()];
  add_button = '<a href="javascript:void(0)" class="add_button add_remove_button" >追加</a>'
  remove_button = '<a href="javascript:void(0)" class="remove_button add_remove_button" >削除</a>'

  function appendSearchedUserList(users) {
    $.each(users,
      function(index, user) {
        if ( !(user_ids.includes( user.id.toString() )) ) {
        var user_data = $(
          '<li class="box">' +
            '<div class="searched_user">' + user.name + '</div>' +
            '<input type="hidden" id="user_id" name="" value="' + user.id + '">' +
            '<a href="javascript:void(0)" class="add_button add_remove_button">追加</a>' +
          '</li>' );
        searched_user_list.append(user_data);
        };
      }
    );
  };

  function appendAddUserList(user_name, user_id) {
    var searched_user = '<div class="searched_user">' + user_name + '</div>'
    var user_id = '<input type="hidden" id="user_id" name="group[user_ids][]" value="' + user_id + '">'
    add_user_list.append( $('<li class="box">').append(searched_user, user_id, remove_button) )
  };

  $('body').on('click', '.add_remove_button' , function() {
    if ( $(this).hasClass('add_button')) {
      add_user_list.append($(this).parent());
      $(this).prev().attr('name', 'group[user_ids][]');
      $(this).parent().append(remove_button);
    }else {
      searched_user_list.append($(this).parent());
      $(this).prev().attr('name', '')
      $(this).parent().append(add_button);
    }
    $(this).remove();
  });

  // 削除、追加のボタンクリックの度に#add_user_listの中の #user_idを監視。そこにあるvalueを配列で取ってくる
  $('body').on('click', '.add_remove_button', function() {
    user_ids = $("#add_user_list #user_id").map(
      function(){ return $(this).val(); }).get();
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
      appendSearchedUserList(users);
      if (input_text.length === 0) {
        $("#searched_user_list .box").remove();
      };
    })
    .fail(function(users) {
      alert('検索が失敗しました。画面をリロードしてやり直してください。')
    });
  });

  // ↓↓ group edit用のコード ↓↓

  var group_users = gon.users

  $.each(group_users, function(i, user) {
    if ( !( user_ids.includes( user.id.toString() )) ) {
      user_ids.push(user.id.toString());
      appendAddUserList(user.name, user.id)
    };
  });
});
