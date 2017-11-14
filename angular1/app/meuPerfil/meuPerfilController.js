angular.module('primeiraApp').controller('MeuPerfilCtrl', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  'auth',
  MeuPerfilController
])

function MeuPerfilController($scope, $http, $location, msgs, tabs, consts, auth) {
  const vm = this
  vm.getUser = () => auth.getUser()
  const usr = auth.getUser()._id
  const url = `${consts.apiUrl}/user/${usr}`
  $scope.getMeuPerfils = function () {
    $http.get(url).then(function (resp) {
      $scope.meuPerfil = {}
      $scope.meuPerfils = resp.data
      tabs.show($scope, { tabList: true })
    })
  }

  // vm.updateUserPass = () => {
  //   User.updateUserPass(() => $location.path('/'))
  // }

  $scope.validar = function () {
    const emailRegex = /\S+@\S+\.\S+/
    if ($scope.meuPerfil) {
      // Validação do e-mail
      if ($scope.meuPerfil.email) {
        if (!$scope.meuPerfil.email.match(emailRegex)) {
          msgs.addError('O e-mail informado está inválido')
          return false
        } else {
          return true
        }
      }
    }
  }


  $scope.updateMeuPerfil = function () {
    // $scope.updateMeuPerfil()
    if ($scope.validar()) {
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
  }

  $scope.showTabUpdate = function (meuPerfil) {
    console.log(meuPerfil)
    $scope.meuPerfil = meuPerfil
    tabs.show($scope, { tabUpdate: true })
  }

  $scope.cancel = function () {
    tabs.show($scope, { tabList: true })
    $scope.meuPerfil = {}
  }

  $scope.getMeuPerfils()
}