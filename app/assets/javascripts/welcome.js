$(document).ready(function(){
  $('#menu-toggle-button').on('click', toggleSiteMenu);
  $('#play-button').on('click', playButtonPressed);
  createBird();
});

toggleSiteMenu = function(){
  $('.site-menu').slideToggle();
}

playButtonPressed = function(){
  $('#play-button').fadeOut();
  $('#student-login-section').fadeIn();
  $('#student-login-section :input').focus();
}

createBird = function(){
  p = Raphael(200, 200, 100, 100);
  p.circle(50, 50, 50);
}
