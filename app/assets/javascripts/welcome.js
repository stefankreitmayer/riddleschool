function loadWorld(){
  if (!SVG.supported) {
    alert('Your browser does not seem to support SVG. Please see the instructions.');
    return;
  }
  world = SVG('world');
  $.get('welcome.svg', '', dissectWorld);
}

function extractSvg(xml, id){
  var element = xml.getElementById(id);
  var txt = new XMLSerializer().serializeToString(element);
  world.svg(txt);
  return SVG.get(id);
}

function dissectWorld(xmlData, textStatus, jqXHR){
  bg = extractSvg(xmlData, 'bg');
  flower = extractSvg(xmlData, 'flower');
  tree = extractSvg(xmlData, 'tree');
  play = extractSvg(xmlData, 'playtext');
  teach = extractSvg(xmlData, 'teachtext');
  tree.animate().move(0,-10);
}

$(document).ready(loadWorld);
