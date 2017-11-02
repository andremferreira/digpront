angular.module('digitalProntuario').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('welcome', {
        url: "/welcome",
        templateUrl: "welcome/welcome.html"
      }).state('consultas', {
        url: "/consultas?page",
        templateUrl: "consulta/tabs.html"
      }).state('pacientes', {
        url: "/pacientes",
        templateUrl: "pacientes/tabs.html"
      }).state('agenda', {
        url: "/agenda",
        templateUrl: "agenda/agendas.html"
      }).state('contato', {
        url: "/contato",
        templateUrl: "contato/contato.html"
      }).state('meuPerfil', {
        url: "/meuperfil",
        templateUrl: "meuperfil/meuPerfil.html"
      })
  
      $urlRouterProvider.otherwise('/welcome')
  }])
  