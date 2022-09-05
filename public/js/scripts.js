window.addEventListener("load", function () {
  /*  Animations initialization */
  new WOW().init();

  /* Toastr Initialization */
  toastr.options = {
    positionClass: "toast-bottom-right",
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
  };
});
