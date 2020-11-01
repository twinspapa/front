// groabal var
var userId;



// 컨텐츠 로드
function viewLoad(fileName) {
    var $view = $("#view");

    $view.load("view/"+ fileName,function() {
        // $('#dataTable').DataTable();
    });
}

var userControl = function(){
  // 회원상세 정보호출
  function getUserInfo(userId) {
    var userInfo;

    $.ajax({
      url: '', //id값 전송할 페이지 확인
      dataType: 'json',
      Type: 'post',
      async: false,
      data: {
        'userId':userId
      },
      success:function (data) {
        userInfo = data.dataList;
      },
      error: function (e) {
        userInfo = false;
      }
    });

    return userInfo;
  }

  //
  function go(e, pageCode) {
    userId = $(e).text();
    userInfo = getUserInfo(userId);

    if (userInfo == false) {
      alert("회원정보를 가져오지 못했습니다. 관리자에게 문의하세요.");

      viewLoad('code_' + pageCode);
    } else {
      viewLoad('code_' + pageCode);
    }
  }

  return {
    getUserInfo: getUserInfo,
    go: go,
    userId : userId
  };
}();
