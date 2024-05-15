(function() {
  'use strict';

  window.CellsPolymer.start({
    routes: {
      'home': '/',
      'detail': '/detail/:id',
      'evolutions': '/evolutions',
    }
  });
}());
