angular.module('digitalProntuario').controller('WelcomeCtrl', [
    '$http',
    'consts',
    WelcomeController
  ])

  function WelcomeController($http, consts) {
      const vm = this
      const url = `${consts.apiUrl}/welcome`;
      return next();
  }