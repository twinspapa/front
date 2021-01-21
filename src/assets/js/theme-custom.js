// 데이터 처리
class Data {
  'use strict'

  // data 객체 담기
  constructor(obj) {
    this.obj = obj;
  }

  // data 삽입
  // data 객체 key값과 data가 삽입될 위치 아이디값 일치 시켜야 한다.
  insert() {
    const keyArray = Object.keys(this.obj);

    for (let i = 0; i < keyArray.length; i++) {
      let el = $('#'+keyArray[i]),
            value = this.obj[keyArray[i]],
            dataTag = el.attr('dataTag')

      if (dataTag == 'text') {
        el.text(value);
      }

      if (dataTag == 'number') {
        el.text(dataWithComma(value));
      }

      if (dataTag == 'select') {
        el.val(value).trigger('change');
      }

      if (dataTag == 'input') {
        el.val(value);
      }

      if (dataTag == 'img') {
        el.attr('src', value);
      }
    }
  }

  // 현재 입력된 값으로 data 객체 값 업데이트
  update(formId) {
    let queryString = $(formId).serializeArray();

    for (let i = 0; i < queryString.length; i++) {
      let temporaryObject = {},
          keyname = queryString[0].name,
          value = queryString[0].value;

      temporaryObject[keyname+''] = value;
      this.obj = Object.assign(this.obj, temporaryObject);
    }
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

// form data object 현재 입력 내용으로 업데이트
function formDataUpdate(formId, formDataObject) {
  let formQueryString = $(formId).serializeArray();

  for (let i = 0; i < formQueryString.length; i++) {
    let temporaryObject = {},
        keyname = formQueryString[0].name,
        value = formQueryString[0].value;

    temporaryObject[keyname+''] = value;
    formDataObject = Object.assign(formDataObject, temporaryObject);
  }
}

// form button set
// edit할 input 객체에 editInput class 추가
function formBtnClick(formId) {
  return new Promise(function(resolve) {
    $(`${formId} .btn-wrap .btn`).on('click', function() {
      $(`${formId} .btn-wrap .btn, ${formId} .editLabel`).toggleClass('d-none');

      if ($(this).hasClass('btnEdit') == true)
      {
        $('#userInfo .editInput').prop('disabled', false);
        resolve('edit');
      }
      else if ($(this).hasClass('btnCancel') == true)
      {
        $('#userInfo .editInput').prop('disabled', true);
        resolve('cancel');
      }
      else if ($(this).hasClass('btnSave') == true)
      {
        $('#userInfo .editInput').prop('disabled', true);
        resolve('save');
      }
    });
  });
}

// formBtnClik 호출
/*
(function retry() {
  formBtnClick('#userInfo')
  .then(function(result) {
    if (result == 'edit') {
      console.log('click edit');
      // insert code
    }
    if (result == 'cancel') {
      console.log('click cancel');
      // insert code
      $('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
    }
    if (result == 'save') {
      console.log('click save');
      // insert code
      if (userInfo.validChk() === false ) {
        console.log('성공');

        userInfo.send('post', '','json', false, orderInfo)
        .then(function(data){
          if (data['result'] == 'fail') {
            alert('수정 실패');
            userInfo.validChk();

          } else if (data['result'] == 'sucess'){
            userInfo.update('#userInfo');

            $('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
            alert('수정 성공.');
          }
        })
        .catch(function(error){
          let error_confirm = confirm('데이터 전송 오류 입니다. 확인을 누르시면 페이지가 새로고침 됩니다.');

          if (error_confirm == true) {
            console.log('확인');
            location.reload();
          } else {
            console.log('취소');
            userInfo.validChk();
          }
        });
      } else {
        console.log('실패');
        userInfo.validChk();
      }
    }

    return retry();
  });
})()
*/
