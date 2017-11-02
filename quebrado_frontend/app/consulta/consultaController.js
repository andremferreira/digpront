angular.module('digitalProntuario').controller('ConsultaCtrl', [
    '$scope',
    '$http',
    '$location',
    'msgs',
    'tabs',
    'consts',
    ConsultaController
])

function ConsultaController($scope, $http, $location, msgs, tabs, consts) {

    $scope.getConsulta = function () {
        const page = parseInt($location.search().page) || 1
        const url = `${consts.apiUrl}/consultas?skip=${(page - 1) * 10}&limit=10`
        $http.get(url).then(function (resp) {
            $scope.consultas = resp.data
            $scope.consulta = {}
            initConsulta()
            $http.get(`${consts.apiUrl}/consultas/count`).then(function (resp) {
                $scope.pages = Math.ceil(resp.data.value / 10)
                tabs.show($scope, { tabList: true, tabCreate: true })
            })
        })
    }

    $scope.createConsulta = function () {
        const url = `${consts.apiUrl}/consultas`;
        $http.post(url, $scope.consulta).then(function (response) {
            $scope.consulta = {}
            initConsulta()
            $scope.getconsultas()
            msgs.addSuccess('Operação realizada com sucesso!!')
        }).catch(function (resp) {
            msgs.addError(resp.data.errors)
        })
    }

    $scope.showTabUpdate = function (consulta) {
        $scope.consulta = consulta
        initConsulta()
        tabs.show($scope, { tabUpdate: true })
    }

    $scope.updateConsulta = function () {
        const url = `${consts.apiUrl}/consultas/${$scope.consulta._id}`
        $http.put(url, $scope.consulta).then(function (response) {
            $scope.consulta = {}
            initConsulta()
            $scope.getConsultas()
            tabs.show($scope, { tabList: true, tabCreate: true })
            msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function (resp) {
            msgs.addError(resp.data.errors)
        })
    }

    $scope.showTabDelete = function (consulta) {
        $scope.consulta = consulta
        initConsulta()
        tabs.show($scope, { tabDelete: true })
    }

    $scope.deleteBillingCycle = function () {
        const url = `${consts.apiUrl}/consultas/${$scope.consultas._id}`
        $http.delete(url, $scope.consulta).then(function (response) {
            $scope.consulta = {}
            initConsulta()
            $scope.consultas()
            tabs.show($scope, { tabList: true, tabCreate: true })
            msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function (resp) {
            msgs.addError(resp.data)
        })
    }

    $scope.addConsulta = function (index) {
        $scope.consulta.splice(index + 1, 0, { name: null, value: null })
    }

    $scope.deleteConsulta = function (index) {
        $scope.consulta.splice(index, 1)
        initConsulta()
    }

    $scope.cancel = function () {
        tabs.show($scope, { tabList: true, tabCreate: true })
        $scope.consulta = {}
        initCreditsAndDebts()
    }

}