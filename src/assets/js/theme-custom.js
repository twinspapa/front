// form 전송
class SubmitForm {
  'use strict'

  constructor(formId) {
    this.el = $(formId);
  }

  validChk(){
    let chkEl = this.el.valid('success');

    if (chkEl === false) {
      this.el.valid();
    }

    return chkEl;
  }

  send(type, url, dataType, async, sendData){
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: type,
        url: url,
        dataType: dataType,
        async: async,
        data: sendData,
        success: resolve,
        error: reject
      });
    });
  }
}
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
