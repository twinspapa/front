// groabal var
var userId;

// 컨텐츠 로드
function viewLoad(fileName) {
    var $view = $("#view");

    $view.load("view/"+ fileName,function() {
        // initialization of chartjs
        Chart.plugins.unregister(ChartDataLabels);

        // initialization of unfold
        $('.js-hs-unfold-invoker').each(function () {
          var unfold = new HSUnfold($(this)).init();
        });

        // initialization of form search
        $('.js-form-search').each(function () {
          new HSFormSearch($(this)).init();
        });

        // initialization of select2
        $('.js-select2-custom').each(function () {
          var select2 = $.HSCore.components.HSSelect2.init($(this));
        });

        // initialization of clipboard
        $('.js-clipboard').each(function() {
          var clipboard = $.HSCore.components.HSClipboard.init(this);
        });

        // initialization of daterangepicker : 기간 셀렉트
        $('.js-daterangepicker').daterangepicker();

        $('.js-daterangepicker-times').daterangepicker({
          timePicker: true,
          startDate: moment().startOf('hour'),
          endDate: moment().startOf('hour').add(32, 'hour'),
          locale: {
            format: 'M/DD hh:mm A'
          }
        });

        var start = moment();
        var end = moment();

        function cb(start, end) {
          $('#js-daterangepicker-predefined .js-daterangepicker-predefined-preview').html(start.format('MMM D') + ' - ' + end.format('MMM D, YYYY'));
        }

        $('#js-daterangepicker-predefined').daterangepicker({
          startDate: start,
          endDate: end,
          ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
        }, cb);

        cb(start, end);
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
