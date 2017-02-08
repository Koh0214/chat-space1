$(function() {
  user_ids = [Number(gon.current_user_id)];
  var searched_user_list = $("#searched_user_list");
  var group_user_list = $("#group_user_list")

  // group edit の実装
  var group_users = gon.users
  showGroupUserList(group_users)

  function removeIdFromUserIds(id) {
    user_ids = user_ids.filter(function(v) { return v != id; });
  }

  function listFormat(name, id) {
    var htmls = $(
      '<li class="box">' +
        '<div class="searched_user"></div>' +
        '<input type="hidden" class="user_id" name="" value="">' +
        '<a href="javascript:void(0)" class="add_remove_button"></a>' +
      '</li>'
    )
    .find('.searched_user').text(name).end()
    .find('.user_id').val(id).end()
    return htmls
  };

  function showSearchedUserList(users) {
    $.each(users,
      function (index, user) {
        if ( !( user_ids.includes(user.id) ) ) {
          appendSeacrhList(user.name, user.id)
        };
      }
    );
  };

  function showGroupUserList(users) {
    $.each(users,
      function (index, user) {
        if ( !( user_ids.includes(user.id) ) ) {
          appendGroupUserList(user.name, user.id)
        };
      }
    );
  };

  function appendSeacrhList(name, id){
    listFormat(name, id)
    .find('.add_remove_button').text('追加').attr('class', 'add_remove_button add_button').end()
    .appendTo(searched_user_list)
  };

  function appendGroupUserList(name, id){
    user_ids.push(id)
    listFormat(name, id)
    .find('.user_id').attr('name', 'group[user_ids][]').end()
    .find('.add_remove_button').text('削除').attr('class', 'add_remove_button remove_button').end()
    .appendTo(group_user_list)
  };

  $('body').on('click', '.add_button' , function() {
    var name = $(this).siblings('.searched_user').text()
    var id = Number($(this).siblings('.user_id').val())
    appendGroupUserList(name, id)
    $(this).parent().remove()
  });

  $('body').on('click', '.remove_button' , function() {
    var id = Number($(this).siblings('.user_id').val())
    removeIdFromUserIds(id);
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
        showSearchedUserList(users);
      };
    })
    .fail(function(users) {
      alert('検索が失敗しました。画面をリロードしてやり直してください。')
    });
  });

});
