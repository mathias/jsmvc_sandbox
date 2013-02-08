require.config({
  baseUrl: "./js/",
  paths: {
    jquery: 'lib/jquery-1.9.1',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    'backbone.localStorage': 'lib/backbone.localStorage'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    }
  }
});

require([
    'jquery',
    'backbone',
    'models/Todo',
    'views/MasterView'
  ], function($, Backbone, Todo, MasterView ) {

  var Router = Backbone.Router.extend({
    routes: {
      "": "main"
    },

    main: function(){
      var tasks = new Todo.Collection();
      var view = new MasterView({collection: tasks});
      tasks.fetch({
        success: function(tasks){
          $("#container").html(view.render().el).show();
        },
        error: function(model, error) {
          // TODO: handle errors nicer
          alert(error);
        }
      });
    }
  });

  // Preload CSS Sprite
  $('<img/>').attr('src', "./css/glyphicons.png");

  var router = new Router();
  Backbone.history.start();

});
