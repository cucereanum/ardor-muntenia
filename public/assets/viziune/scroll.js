$(document).ready(function () {
  var delay = false;
  var currentPage = 1;
  var pageCount = $(".hero").length;
  var swipe = document.getElementsByTagName(".hero");

  $(document).on("mousewheel DOMMouseScroll", function (event) {
    if (delay) return;
    delay = true;
    setTimeout(function () {
      delay = false;
    }, 100);

    var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
    if (wd < 0) {
      if (currentPage < pageCount) {
        currentPage++;
      }
    } else {
      if (1 < currentPage) {
        currentPage--;
      }
    }

    $("html,body").animate(
      {
        scrollTop: $("#sec" + currentPage).offset().top,
      },
      700
    );

    $("#tag" + currentPage).addClass("active");
    for (var i = 1; i <= pageCount; i++) {
      if (i != currentPage) {
        $("#tag" + i).removeClass("active");
      }
    }
  });
});

$(".scroll_item").on("click", function () {
  var elem = $("#" + $(this).data("page")),
    scroll = elem.offset().top;

  $("body, html").animate({ scrollTop: scroll }, 1000);

  $(this).addClass("active").siblings(".active").removeClass("active");
});

$(window)
  .on("scroll", function (e) {
    var elems = $("#sec1, #sec2, #sec3"),
      scrolled = $(this).scrollTop();

    var dataPage = elems
      .filter(function () {
        return $(this).offset().top + $(this).height() / 2 >= scrolled;
      })
      .first();

    $('.scroll_item[data-page="' + dataPage.prop("id") + '"]')
      .addClass("active")
      .siblings(".active")
      .removeClass("active");
  })
  .trigger("scroll");
