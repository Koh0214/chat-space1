$(function() {
  user_ids = [Number($('.current_user_id').val())];
  var searched_user_list = $("#searched_user_list");
  var add_user_list = $("#add_user_list")

  // group edit の実装
  var group_users = gon.users
  appendAddLoop(group_users)

  function removeIdFromUserIds(id) {
    user_ids = user_ids.filter(function(v) { return v != id; });
  }

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
    $(
      '<li class="box">' +
        '<div class="searched_user"></div>' +
        '<input type="hidden" class="user_id" name="" value="">' +
        '<a href="javascript:void(0)" class="add_button">追加</a>' +
      '</li>'
    )
    .find('.searched_user').text(name).end()
    .find('.user_id').val(id).end()
    .appendTo(searched_user_list)
    removeIdFromUserIds(id);
  };

  function appendAddList(name, id){
    $(
      '<li class="box">' +
        '<div class="searched_user"></div>' +
        '<input type="hidden" class="user_id" name="group[user_ids][]" value="">' +
        '<a href="javascript:void(0)" class="remove_button">削除</a>' +
      '</li>' )
    .find('.searched_user').text(name).end()
    .find('.user_id').val(id).end()
    .appendTo(add_user_list)
    user_ids.push(id)
  };


  $('body').on('click', '.add_button' , function() {
    var name = $(this).siblings('.searched_user').text()
    var id = Number($(this).siblings('.user_id').val())
    appendAddList(name, id)
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
        appendSearchLoop(users);
      };
    })
    .fail(function(users) {
      alert('検索が失敗しました。画面をリロードしてやり直してください。')
    });
  });

});
