angular.module('primeiraApp').constant('consts', {
  appName: 'Excelência em Gestão de Pacientes.',
  version: '1.0',
  owner: 'Digital Prontuário',
  year: '2017',
  site: 'http://digitalprontuario.com.br',
  apiUrl: 'http://localhost:3003/api',
  oapiUrl: 'http://localhost:3003/oapi',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
  $rootScope.consts = consts
}])
