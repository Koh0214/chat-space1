$(function() {
  var searched_user_list = $("#searched_user_list");
  var add_user_list = $("#add_user_list")
  user_ids = [Number($('.current_user_id').val())];

  function appendSearchLoop(users) {
    $.each(users,
      function (index, user) {
        if ( !( user_ids.includes(user.id) ) ) {
          appendSeacrhList(user.name, user.id)
        };
      }
    );
  };

  function appendAddLoop(users) {
    $.each(users,
      function (index, user) {
        if ( !( user_ids.includes(user.id) ) ) {
          appendAddList(user.name, user.id)
        };
      }
    );
  };

  function appendSeacrhList(name, id){
    var user_data = $(
      '<li class="box">' +
        '<div class="searched_user">' + name + '</div>' +
        '<input type="hidden" class="user_id" name="" value="' + id + '">' +
        '<a href="javascript:void(0)" class="add_button">追加</a>' +
      '</li>' );
    searched_user_list.append(user_data);
    // user_idsからidを削除
    user_ids = jQuery.grep(user_ids, function(user_id) { return user_id != id; });
  };

  function appendAddList(name, id){
    var user_data = $(
      '<li class="box">' +
        '<div class="searched_user">' + name + '</div>' +
        '<input type="hidden" class="user_id" name="group[user_ids][]" value="' + id + '">' +
        '<a href="javascript:void(0)" class="remove_button">削除</a>' +
      '</li>' );
    add_user_list.append(user_data);
    user_ids.push(id)
  };

  $('body').on('click', '.add_button' , function() {
    name = $(this).siblings('.searched_user').text()
    id = Number($(this).siblings('.user_id').val())
    appendAddList(name, id)
    $(this).parent().remove()
  });

  $('body').on('click', '.remove_button' , function() {
    id = Number($(this).siblings('.user_id').val())
    // user_idsからidを削除
    user_ids = jQuery.grep(user_ids, function(user_id) { return user_id != id; });
    $(this).parent().remove()
  });

  // インクリメンタルサーチ
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
