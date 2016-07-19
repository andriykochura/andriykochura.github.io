define([
  'jquery',
  'underscore',
  'modules/particles'
], function($, _, myParticles){

  var initialize = function(){
    $('.pagenav')
      .animate ({ 
        height: '60px',
        top: '0px'
      }, 500, 
      function () {
        $('.ani').animate({ opacity: 1}, 2500);
        $('.hello').animate({ opacity: 1}, 1000);
        $('h2').animate({ opacity: 1}, 500);                
      });

    $('.hello')
      .on('mouseenter', function() { myParticles.hiding(true); })
      .on('mouseleave', function() { myParticles.hiding(false); });

    myParticles
      .animate();
  }

  return {
    initialize: initialize
  };
});