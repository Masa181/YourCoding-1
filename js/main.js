$(function () {
  // ハンバーガーメニュー
  $(".burger-btn").on("click", function () {
    if ($(window).width() <= 768) {
      $(".bar").toggleClass("cross"); //ハンバーガーボタンのラインをクロスさせる
      $(".header__nav").toggleClass("open"); //ナビゲーションが開くCSSを当てたり外したりする
      $(".burger-musk").fadeToggle(300); //背景を暗くするマスクをフェードイン・フェードアウトさせる
      $("body").toggleClass("noscroll"); //ハンバーガーメニューを開いたときにスクロールしないようにする
    }
  });
  //ナビゲーションの項目
  $(".nav__item").on("click", function () {
    if ($(window).width() <= 768) {
      $(".bar").toggleClass("cross");
      $(".header__nav").toggleClass("open");
      $(".burger-musk").fadeToggle(300);
      $("body").toggleClass("noscroll");
    }
  });
  // }

  //FAQの処理
  $(".faq__item").click(function () {
    let $answer = $(this).find(".answer");
    if ($answer.hasClass("open")) {
      $answer.removeClass("open");
      $answer.slideUp();
    } else {
      $answer.addClass("open");
      $answer.slideDown();
    }
  });

  // 自動スライダー
  const swiper = new Swiper(".swiper-container", {
    // Optional parameters
    loop: true,
    slidesPerView: 1.5, // １度に表示するスライド数
    centeredSlides: true, //現在のスライドを中央に表示
    spaceBetween: 20, // スライド間の余白

    // 自動再生
    autoplay: {
      delay: 5000, // 次のスライドに切り替わる時間
      disableOnInteraction: false, //ユーザーがクリックしてもautoplayが稼働するようにする
    },

    breakpoints: {
      769: {
        slidesPerView: 3.75, // １度に表示するスライド数
        spaceBetween: 56, // スライド同士の余白
      },
    },
  });

  // お問い合わせフォームの送信後の挙動
  $("#form").submit(function (event) {
    const formData = $("#form").serialize();
    $.ajax({
      url:
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfLSVKfuNTEUxDxnmJ0pbMA_935zBN735JvQoKqkNMxVzJYTg/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".end-message").slideDown();
          $(".submit-btn").fadeOut();
        },
        200: function () {
          $(".error-message").slideDown();
        },
      },
    });
    event.preventDefault();
  });

  // 必須項目を入力していないと警告文を出す
  const $privacyCheck = $("#privacy-check");
  $privacyCheck.click(function () {
    if (
      $('#form input[type="text"]').val() === "" ||
      $('#form input[type="email"]').val() === "" ||
      $("#form #textarea").val() === ""
    ) {
      $(".false-message").show();
    } else {
      $(".false-message").hide();
    }
  });
  const $submitBtn = $("#js-submit");
  $("#form input,#form textarea").on("change", function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $("#form #textarea").val() !== "" &&
      $('#form input[type="checkbox"]').val() !== "" &&
      $("#form #privacyCheck").prop("checked") === true
    ) {
      $submitBtn.prop("disabled", false);
      $submitBtn.css("opacity", 1);
      $(".false-message").hide();
    } else {
      $submitBtn.prop("disabled", true);
      $submitBtn.css("opacity", 0.5);
    }
  });

  //Topに戻る処理
  $(".top-btn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  //Contactの位置へ移動する処理
  $(".position-btn").click(function () {
    const id = $(this).attr("href");
    const headerH = $(".header").height();
    const position = $(id).offset().top - headerH;
    $("html, body").animate({ scrollTop: position }, 1000);
  });
  AOS.init({
    offset: 150,
    anchorPlacement: "top-center",
    duration: 500,
    once: true,
  });
});
