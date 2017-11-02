angular.module('digPront').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bemVindo', {
            url: "/bemVindo",
            templateUrl: "bemVindo/bemVindo.html"
        }).state('pacientes', {
            url: "/pacientes?page",
            templateUrl: "pacientes/tabs.html"
        })

        $urlRouterProvider.otherwise('/bemVindo')
    }])