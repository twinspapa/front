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

// all page document ready script
$(document).ready(function() {
  urlCompareAddClass($('.navbar-vertical-content .nav-item a'), 'active');
  commonVendorInit();
});


// 파라미터 값 가져오기
function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


// 파라미터 객체 형식으로 가져오기
function get_query(){
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}
