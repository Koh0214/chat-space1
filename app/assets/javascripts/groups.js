$(function() {
  var searched_user_list = $("#searched_user_list");
  var add_user_list = $("#add_user_list")
  user_ids = [];

  function appendSearchLoop(users) {
    $.each(users,
      function (index, user) {
        if ( !( user_ids.includes(user.id.toString()) ) ) {
          appendSeacrhList(user.name, user.id)
        };
      }
    );
  };

  function appendAddLoop(users) {
    $.each(users,
      function (index, user) {
        if ( !( user_ids.includes(user.id.toString()) ) ) {
          appendAddList(user.name, user.id)
        };
      }
    );
  };

  function appendSeacrhList(name, id){
    var user_data = $(
      '<li class="box">' +
        '<div class="searched_user">' + name + '</div>' +
        '<input type="hidden" id="user_id" name="" value="' + id + '">' +
        '<a href="javascript:void(0)" class="add_button add_remove_button">追加</a>' +
      '</li>' );
    searched_user_list.append(user_data);
  };

  function appendAddList(name, id){
    var user_data = $(
      '<li class="box">' +
        '<div class="searched_user">' + name + '</div>' +
        '<input type="hidden" id="user_id" name="group[user_ids][]" value="' + id + '">' +
        '<a href="javascript:void(0)" class="remove_button add_remove_button">追加</a>' +
      '</li>' );
    add_user_list.append(user_data);
  };

  $('body').on('click', '.add_remove_button' , function() {
    user_name = $(this).siblings('.searched_user').text()
    user_id = $(this).siblings('#user_id').val()
    if ( $(this).hasClass('add_button')) {
      appendAddList(user_name, user_id)
    }else {
      appendSeacrhList(user_name, user_id)
    }
    $(this).parent().remove()
  });

  // 削除、追加のボタンクリックの度に#add_user_listの中の #user_idを監視。そこにあるvalueを配列で取ってくる
  $('body').on('click', '.add_remove_button', function() {
    user_ids = $("#add_user_list #user_id").map(
      function(){ return $(this).val(); }).get();
  });

  // インクリメンタルサーチ部分
  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var input_text = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { text: input_text },
      dataType: 'json'
    })
    .done(function(users) {
      $("#searched_user_list .box").remove();
      if ( input_text.length !== 0 ) {
        appendSearchLoop(users);
      };
    })
    .fail(function(users) {
      alert('検索が失敗しました。画面をリロードしてやり直してください。')
    });
  });

  // group edit の実装
  var group_users = gon.users
  appendAddLoop(group_users)

});
