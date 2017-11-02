angular.module('digitalProntuario').controller('MeuPerfilCtrl', [
    '$http',
    'consts',
    MeuPerfilController
  ])

  function MeuPerfilController($http, consts) {
      const vm = this
      const url = `${consts.apiUrl}/meuPerfil`;
      return next();
  }