define([
  'd3',
  'module'
], function(d3, module){

  var width  = module.config().dimentions.width,
      height = module.config().dimentions.height,
      angle  = 2 * Math.PI;

  var radius = 1.5,
      growth = 0;

  var almostRandColor = function() {
    var values = '0123456789ABCDEF'.split('');
    var color = '#00';
    for (var i = 4; i--; ) 
      color += values[Math.floor(Math.random() * 16)];
    return color;
  }  

  var data = d3.range(900).map(function() {
    return {xloc: 0, yloc: 0, xvel: 0, yvel: 0, bg: almostRandColor()};
  });

  var x = d3.scale.linear().domain([-5, 5]).range([0, width]);
  var y = d3.scale.linear().domain([-5, 5]).range([0, height]);
  var canvas = d3.select(module.config().htmlEl).append('canvas').attr('width', width).attr('height', height);
  var context = canvas.node().getContext('2d');

  var updated = function (radius, growth) {
    if (growth)
      return (radius < 9) ? radius+0.001 : 9;
    else
      return (radius > 1.5) ? radius-0.001 : 1.5;
  }

  var rePaint = function() {
    context.clearRect(0, 0, width, height);
    data.forEach(function(d) {
      d.yloc += d.yvel;
      d.xloc += d.xvel;
      d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.xloc;
      d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
      radius = updated(radius, growth);
      context.beginPath();
      context.arc(x(d.xloc), y(d.yloc), radius, 0, angle);
      context.fill();
      context.closePath();
      context.fillStyle = d.bg;
    });
  };

  // public

  var repaintHandler,
      hideHandler,
      running = false;

  return {
    running: function() {
      return running;
    },
    animate: function() {
      repaintHandler = setInterval(rePaint, 50);
      running = true;
    },
    stop: function() {
      clearInterval(repaintHandler);
      running = false;
    },
    hiding: function(reasoned) {
      if (reasoned)
        hideHandler = setInterval(function() {
          data.forEach(function(d) { 
            d.yvel *= 0.9; 
            d.xvel *= 0.9;
            growth = true;
          });
        }, 50);
      else {
        clearInterval(hideHandler);
        growth = false;
      }
    }
  }
});