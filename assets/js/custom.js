// groabal var
var userId;

function topLoad(fileName){
  var $top = $("#top");

  $top.load("view/"+ fileName,function() {
    $('.js-navbar-vertical-aside-toggle-invoker').click(function () {
      $('.js-navbar-vertical-aside-toggle-invoker i').tooltip('hide');
    });

    // initialization of navbar vertical navigation
    var sidebar = $('.js-navbar-vertical-aside').hsSideNav();
  });
}

// 컨텐츠 로드
function viewLoad(fileName) {
    var $view = $("#view");

    // top 영역 리로드
    topLoad('top');

    $view.load("view/"+ fileName,function() {
      // initialization of chartjs
      Chart.plugins.unregister(ChartDataLabels);

      $('.js-chart').each(function () {
        $.HSCore.components.HSChartJS.init($(this));
      });

      var updatingChart = $.HSCore.components.HSChartJS.init($('#updatingData'));

      // Call when tab is clicked
      $('[data-toggle="chart-bar"]').click(function(e) {
        var keyDataset = $(e.currentTarget).attr('data-datasets');

       if (keyDataset === 'lastWeek') {
         updatingChart.data.labels = ["Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30", "Apr 31"];
         updatingChart.data.datasets = [
           {
             "data": [120, 250, 300, 200, 300, 290, 350, 100, 125, 320],
             "backgroundColor": "#377dff",
             "hoverBackgroundColor": "#377dff",
             "borderColor": "#377dff"
           },
           {
             "data": [250, 130, 322, 144, 129, 300, 260, 120, 260, 245, 110],
             "backgroundColor": "#e7eaf3",
             "borderColor": "#e7eaf3"
           }
         ];
         updatingChart.update();
       } else {
         updatingChart.data.labels = ["May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7", "May 8", "May 9", "May 10"];
         updatingChart.data.datasets = [
           {
             "data": [200, 300, 290, 350, 150, 350, 300, 100, 125, 220],
             "backgroundColor": "#377dff",
             "hoverBackgroundColor": "#377dff",
             "borderColor": "#377dff"
           },
           {
             "data": [150, 230, 382, 204, 169, 290, 300, 100, 300, 225, 120],
             "backgroundColor": "#e7eaf3",
             "borderColor": "#e7eaf3"
           }
         ];
         updatingChart.update();
       }
     });

      // initialization of bubble chartjs with Datalabels plugin
      $('.js-chart-datalabels').each(function () {
        $.HSCore.components.HSChartJS.init($(this), {
          plugins: [ChartDataLabels],
          options: {
            plugins: {
              datalabels: {
                anchor: function(context) {
                  var value = context.dataset.data[context.dataIndex];
                  return value.r < 20 ? 'end' : 'center';
                },
                align: function(context) {
                  var value = context.dataset.data[context.dataIndex];
                  return value.r < 20 ? 'end' : 'center';
                },
                color: function(context) {
                  var value = context.dataset.data[context.dataIndex];
                  return value.r < 20 ? context.dataset.backgroundColor : context.dataset.color;
                },
                font: function(context) {
                  var value = context.dataset.data[context.dataIndex],
                    fontSize = 25;

                  if (value.r > 50) {
                    fontSize = 35;
                  }

                  if (value.r > 70) {
                    fontSize = 55;
                  }

                  return {
                    weight: 'lighter',
                    size: fontSize
                  };
                },
                offset: 2,
                padding: 0
              }
            }
          },
        });
      });

      // initialization of daterangepicker
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

      // initialization of datatables
      var datatable = $.HSCore.components.HSDatatables.init($('#datatable'), {
        select: {
          style: 'multi',
          selector: 'td:first-child input[type="checkbox"]',
          classMap: {
            checkAll: '#datatableCheckAll',
            counter: '#datatableCounter',
            counterInfo: '#datatableCounterInfo'
          }
        },
        language: {
          zeroRecords: '<div class="text-center p-4">' +
              '<img class="mb-3" src="./assets/svg/illustrations/sorry.svg" alt="Image Description" style="width: 7rem;">' +
              '<p class="mb-0">No data to show</p>' +
              '</div>'
        }
      });

      $('.js-datatable-filter').on('change', function() {
        var $this = $(this),
          elVal = $this.val(),
          targetColumnIndex = $this.data('target-column-index');

        datatable.column(targetColumnIndex).search(elVal).draw();
      });

      $('#datatableSearch').on('mouseup', function (e) {
        var $input = $(this),
          oldValue = $input.val();

        if (oldValue == "") return;

        setTimeout(function(){
          var newValue = $input.val();

          if (newValue == ""){
            // Gotcha
            datatable.search('').draw();
          }
        }, 1);
      });

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
