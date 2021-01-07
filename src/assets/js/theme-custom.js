// // // // // // // // // // // // // // // // // // // // //
// class Ajax {
//   'use strict';
//
//   constructor(name){
//     this.name = name;
//   }
//
//   send(type, url, dataType, sendData, successMsg){
//     $.ajax({
//       type: type,
//       url: url,
//       dataType: dataType,
//       async: false,
//       data: sendData,
//       success: function(data) {
//         console.log('success');
//
//         return data;
//       },
//       error: function(request, status, error) {
//         alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
//         console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
//       }
//     });
//   }
// }


// form 전송
class SubmitForm{
  'use strict';

  constructor(formId) {
    this.el = $(formId);
  }

  validChk(){
    const chkEl = this.el.valid('success');

    if (chkEl === false) {
      this.el.valid();
    }

    return chkEl;
  }

  signIn(){
    this.validChk();

    if (validChk() === true) {
      $.ajax({
        type: this.el.attr('method'),
        url: this.el.attr('action'),
        dataType: 'json',
        async: false,
        data: this.el.serialize(),
        success: function(data) {
          if (data['result'] == 'fail') {
            $('#errMsg').removeClass('hide').text(data['errMsg']);
          } else if (data['result'] == 'sucess'){
            location.href = 'index.html';
          }
        },
        error: function(xhr, status, error) {
          let error_confirm = confirm('데이터 전송 오류 입니다. 확인을 누르시면 페이지가 새로고침 됩니다.');
          if (error_confirm == true) {
            location.href = 'index.html';
          }
        }
      });
      return false;
    }
  }
}
// // // // // // // // // // // // // // // // // // // // //


// // // // // // // // // // // // // // // // // // // // //
// 그래프
// class Graph {
//   constructor(element) {
//     this.el = element;
//   }
//
//   // 그래프 데이터 업데이트
//   dataUpdate(...args) {
//     let res = [];
//
//     for (let i = 0; i < args.length; i++) {
//         const obj = {data : args[i]};
//         res.push(obj);
//     }
//
//     console.log(res);
//
//     $.HSCore.components.HSChartJS.init($(this.el), {
//       data: {
//         datasets: res
//       }
//     });
//   }
// }
// // // // // // // // // // // // // // // // // // // // //
// 페이지 이동
class Go {
  constructor(element) {
    this.el = element;
  }

  link(...args) {
    $(this.el).on('click', function() {
      let $this = $(this),
          pageUrl = $this.attr(args[0]),
          parameter = [];

      if(args.length < 2) {
        location.href = pageUrl;
      } else {
        for (let i = 1; i < args.length; i++) {
            const key = args[i],
                  value = $this.attr(args[i]);

            parameter.push("&" + key + "=" + value);
        }
        location.href =  pageUrl + "?" + parameter;
      }
    });
  }
}

// // // // // // // // // // // // // // // // // // // // //
// class Insert {
//   constructor(name) {
//     this.name = name;
//   }
//
//   value(el, data){
//     $(el).val(data);
//   }
//
//   text(el, data){
//     $(el).text(dataWithComma(data));
//   }
//
//   attr(el, data){
//     $(el).attr()
//   }
// }
// // // // // // // // // // // // // // // // // // // // //


function dataWithComma(data) {
  if(isNaN(data) === false){
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return data;
  }
}


// list filter : PGID_C1
function filterList(inputEl,el) {
  // Declare variables
  $('#'+inputEl).on('keyup',function() {
    let input = document.getElementById(inputEl),
        filter = input.value.toUpperCase(),
        ul = document.getElementById(el),
        li = ul.getElementsByTagName('li'),
        i,
        txtValue;

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      filterTxt = li[i].getElementsByClassName('filterTxt')[0];
      txtValue = filterTxt.textContent || filterTxt.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  });
}

// file name extarction
function fileNameExtraction(url) {
  const URL_SPLIT = url.split('/'),
        URL_LENGTH = URL_SPLIT.length,
        URL_FILE_NAME = URL_SPLIT[URL_LENGTH-1].split(".")[0]

  return URL_FILE_NAME;
}

// Add class after comparing url and filename
function urlCompareAddClass(element, className) {
  const URL = location.href,
        URL_FILE_NAME = fileNameExtraction(URL),
        $EL = $(element);

  for (let i = 0; i < $EL.length; i++) {
    const FILE_NAME = fileNameExtraction($EL.eq(i).attr('href'));

    if (URL_FILE_NAME == FILE_NAME) {
      $EL.eq(i).addClass(className);
    }
  }
}

function commonVendorInit() {
  $('.js-navbar-vertical-aside-toggle-invoker').click(function () {
    $('.js-navbar-vertical-aside-toggle-invoker i').tooltip('hide');
  });

  // initialization of navbar vertical navigation
  let sidebar = $('.js-navbar-vertical-aside').hsSideNav();

  // initialization of tooltip in navbar vertical menu
  $('.js-nav-tooltip-link').tooltip({ boundary: 'window' })

  $(".js-nav-tooltip-link").on("show.bs.tooltip", function(e) {
    if (!$("body").hasClass("navbar-vertical-aside-mini-mode")) {
      return false;
    }
  });

  // initialization of unfold
  $('.js-hs-unfold-invoker').each(function () {
    let unfold = new HSUnfold($(this)).init();
  });

  // initialization of select2
  $('.js-select2-custom').each(function () {
    let select2 = $.HSCore.components.HSSelect2.init($(this));
  });
}

// 파라미터 값 가져오기
function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


// 파라미터 객체 형식으로 가져오기
function get_query(){
    let url = document.location.href;
    let qs = url.substring(url.indexOf('?') + 1).split('&');
    for(let i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

// all page document ready script
$(document).ready(function() {
  urlCompareAddClass($('.navbar-vertical-content .nav-item a'), 'active');
  commonVendorInit();
});


function downloadTable() {
  $('#export-copy').click(function() {
    datatable.button('.buttons-copy').trigger()
  });

  $('#export-excel').click(function() {
    datatable.button('.buttons-excel').trigger()
  });

  $('#export-csv').click(function() {
    datatable.button('.buttons-csv').trigger()
  });

  $('#export-pdf').click(function() {
    datatable.button('.buttons-pdf').trigger()
  });

  $('#export-print').click(function() {
    datatable.button('.buttons-print').trigger()
  });
}
