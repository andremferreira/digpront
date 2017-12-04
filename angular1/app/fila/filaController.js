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
    const usr = auth.getUser().medicoId
    const dia = $location.search().dia || undefined
    const url = `${consts.apiUrl}/filaDia/${usr}/${dia}`
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
  
    $scope.getFila()
  }