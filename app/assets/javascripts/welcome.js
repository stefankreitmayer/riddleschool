$(document).ready(function(){
  $('#menu-toggle-button').on('click', toggleSiteMenu);
  $('#play-button').on('click', playButtonPressed);
});

toggleSiteMenu = function(){
  $('.site-menu').slideToggle();
}

playButtonPressed = function(){
  $('#play-button').fadeOut();
  $('#student-login-section').fadeIn();
  $('#student-login-section :input').focus();
}
