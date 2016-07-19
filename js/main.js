require.config({
  paths: {
  	'jquery': 'libs/jquery-2.2.3.min',
    'underscore': 'libs/underscore',
    'd3': 'libs/d3.min'
  },
  config: {
  	'modules/particles': {
  		htmlEl: 'div.ani',
  		dimentions: {
  			width: 880, 
  			height: 260
  		}
  	}
  }
});

require([
  'app',
], function(App){
  App.initialize();
});