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
  
  function FilaController($scope, $http, $location,msgs, tabs, consts, auth, filtro) {
    const vm = this
    vm.getUser = () => auth.getUser()
    const usr = auth.getUser().medicoId
    const dia = undefined
    const url = `${consts.apiUrl}/filaDia/${usr}/${dia}/`
    $scope.getFila = function () {
      $http.get(url).then(function (resp) {
        $scope.fila = {}
        $scope.filas = resp.data
        $scope.fila.dataFila = new Date()
        tabs.show($scope, { tabList: true })
      })
    }

    $scope.aplFiltroFila = function () {

      if (!$scope.fila.dataFila){
        // console.log('1')
        let periodo = undefined
        let urlFiltro = `${consts.apiUrl}/filaDia/${usr}/${periodo}/`
        $http.get(urlFiltro).then(function (resp) {
          $scope.filas = resp.data
          tabs.show($scope, { tabList: true })

        })
      } else {
      //  console.log('2')
       let periodo2 = new Date($scope.fila.dataFila).toISOString('yyyy-MM-dd')
       let urlFiltro2 = `${consts.apiUrl}/filaDia/${usr}/${periodo2}/`
       $http.get(urlFiltro2).then(function (resp) {
        $scope.filas = resp.data
        tabs.show($scope, { tabList: true })
      })
      }
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