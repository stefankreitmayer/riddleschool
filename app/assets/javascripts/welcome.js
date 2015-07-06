bird = {}
bird.view = {bodyColor: '#33d', flying: false, flapDuration: 300, wingsUp: false}
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
bird.takeOff = function(){
  this.view.flying = true;
  this.view.flapWhileFlying();
  this.view.legsUp();
}
bird.land = function(){
  bird.view.flying = false;
  bird.view.legsDown();
}
bird.view.flapWhileFlying = function(){
  bird.view.wingsUp = false;
  if(bird.view.flying){
    bird.view.flap();
    setTimeout(bird.view.flap, bird.view.flapDuration/2);
    setTimeout(bird.view.flapWhileFlying, bird.view.flapDuration);
  }
}
bird.view.flap = function(){
  bird.view.wingsUp = !bird.view.wingsUp;
  wingPaths = bird.view.wingsUp ? bird.view.wingPathsUp : bird.view.wingPathsDown;
  i = 0;
  bird.view.wings.forEach(function(wing){
    wing.animate({
      path: wingPaths[i]
    }, bird.view.flapDuration);
    i++;
  });
}
bird.view.legsUp = function(){
  this.legs.animate({
    transform: 'T0,-6px'
  }, 200);
}
bird.view.legsDown = function(){
  bird.view.legs.animate({
    transform: 'T0,0px'
  }, 200);
}
bird.view.lookAround = function(){
  distance = (Math.random()*.6+.2) * bird.view.eyeSettings.radius;
  angle = Math.random()*6.28;
  x = distance * Math.cos(angle);
  y = distance * Math.sin(angle);
  dur = Math.random()*400+20;
  bird.view.eyePupils.forEach(function(pupil){
    pupil.animate({
      transform: 'T'+x+','+y
    }, dur);
  });
  setTimeout(bird.view.lookAround, Math.random()*1500+1200);
}

moveBird = function(destination, millis){
  mascot = $('#mascot');
  mascot.animate({
    left: destination.left,
    top: destination.top
  }, millis);
  bird.takeOff();
  setTimeout(bird.land, millis);
}

topCenterOfDiv = function(id){
  b = $(id);
  return {left: b.position().left + b.width()/2,
    top: b.position().top + b.height()*0};
}

$(document).ready(function(){
  $('#menu-toggle-button').on('click', toggleSiteMenu);
  $('#play-button').on('click', playButtonPressed);
  bird.view.create();
  moveBird(topCenterOfDiv('#play-button'), 0);
  bird.view.lookAround();
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
