bird = {}
bird.view = {bodyColor: '#33d'}
bird.view.eyeSettings = {xoffset: 14.5, yoffset: 44, radius: 15}
bird.view.createEyeComponents = function(radius, fillColor){
  set = this.paper.set();
  for(i=0; i<2; i++){
    xpos = 50+(i*2-1)*this.eyeSettings.xoffset;
    circle = this.paper.circle(xpos, this.eyeSettings.yoffset, radius)
      .attr({'fill': fillColor});
    set.push(circle);
  }
  return set;
}
bird.view.createLegs = function(){
  this.legs = this.paper.set();
  for(i=0; i<2; i++){
    xtop = 50+6*(i*2-1);
    xbottom = 50+9*(i*2-1);
    ytop = 80;
    ybottom = 90;
    leg = this.paper.path('M '+xtop+' '+ytop+' L '+xbottom+' '+ybottom);
    foot = this.paper.path('M '+(xbottom-3)+' '+ybottom+' L '+(xbottom)+' '+(ybottom-2)+' L '+(xbottom+3)+' '+ybottom);
    this.legs.push(leg);
    this.legs.push(foot);
  }
}
bird.view.createWings = function(){
  this.wings = this.paper.set();
  this.wingPathsUp = [];
  this.wingPathsDown = [];
  for(i=0; i<2; i++){
    xtop = 50+25*(i*2-1);
    xtip = 50+38*(i*2-1);
    xbottom = 50+20*(i*2-1);
    ytop = 48;
    ybottom = 66;
    this.wingPathsUp[i] = 'M '+xtop+' '+ytop+' L '+xtip+' '+ytop+' L '+xbottom+' '+ybottom;
    this.wingPathsDown[i] = 'M '+xtop+' '+ytop+' L '+xtip+' '+ybottom+' L '+xbottom+' '+ybottom;
    wing = this.paper.path(this.wingPathsDown[i])
      .attr({'fill': this.bodyColor});
    this.wings.push(wing);
  }
}
bird.view.createBody = function(){
  this.body = this.paper.set();
  p.circle(50, 50, 30)
    .attr({'fill': this.bodyColor});
  p.path('M 32 45 L 68 45 L 50 75 z')
    .attr({'fill': 'orange'});
  this.body.push();
}
bird.view.create = function(){
  this.paper = Raphael('mascot', 100, 100);
  p = this.paper;
  this.createWings();
  this.createBody();
  this.eyeBalls = this.createEyeComponents(this.eyeSettings.radius, 'white');
  this.eyePupils = this.createEyeComponents(2, 'black');
  this.createLegs();
}

moveBird = function(destination, millis){
  $('#mascot').animate({
    left: destination.left,
    top: destination.top
  }, millis);
}

topCenterOfDiv = function(id){
b = $(id);
  return {left: b.position().left + b.width()/2,
    top: b.position().top + b.height()*0};
}

$(document).ready(function(){
  $('#menu-toggle-button').on('click', toggleSiteMenu);
  $('#play-button').on('click', playButtonPressed);
  moveBird(topCenterOfDiv('#play-button'), 0);
  bird.view.create();
});

toggleSiteMenu = function(){
  $('.site-menu').slideToggle();
}

playButtonPressed = function(){
  $('#play-button').fadeOut();
  $('#student-login-section').fadeIn();
  $('#student-login-section :input').focus();
  moveBird(topCenterOfDiv('#student-login-section'), 2000);
}
