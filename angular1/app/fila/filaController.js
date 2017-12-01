angular.module('primeiraApp').controller('FilaCtrl', [
    '$scope',
    '$http',
    '$location',
    'msgs',
    'tabs',
    'consts',
    'auth',
    'filtro',
    FilaController
  ])
  
  function FilaController($scope, $http, $location, msgs, tabs, consts, auth, filtro) {
    const vm = this
    vm.getUser = () => auth.getUser()
    const usr = auth.getUser()._id
    const url = `${consts.apiUrl}/fila/?id=${usr}`
    $scope.getFila = function () {
        console.log('entrouFila')
      $http.get(url).then(function (resp) {
        $scope.fila = {}
        $scope.filas = resp.data
        console.log($scope.filas)
        tabs.show($scope, { tabList: true })
      })
    }
  
    
    
    $scope.editFila = function () {
        // $scope.updateMeuPerfil()
        const url = `${consts.apiUrl}/users/${$scope.meuPerfil._id}`
        $http.put(url, $scope.meuPerfil).then(function (response) {
          $scope.meuPerfil = {}
          $scope.getMeuPerfils()
          tabs.show($scope, { tabList: true })
          msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function (resp) {
          msgs.addError(resp.data.errors)
        })
    }
  
    // $scope.showTabUpdate = function (meuPerfil) {
    //   $scope.meuPerfil = meuPerfil
    //   tabs.show($scope, { tabUpdate: true })
    // }
  
    // $scope.cancel = function () {
    //   tabs.show($scope, { tabList: true })
    //   $scope.meuPerfil = {}
    // }
  
    $scope.getFila()
  }