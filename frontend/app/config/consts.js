angular.module('digPront').constant('consts', {
    appName: 'Excelência em gestão de pacientes.',
    version: '1.0',
    owner: 'Digital Prontuário',
    year: '2017',
    site: 'http://digitalprontuario.com.br',
    apiUrl: 'http://localhost:3003/api',
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])