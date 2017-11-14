angular.module('primeiraApp').controller('PacienteCtrl', [
    '$scope',
    '$http',
    '$location',
    'msgs',
    'tabs',
    'consts',
    'auth',
    PacienteController
  ])
  
  function PacienteController($scope, $http, $location, msgs, tabs, consts, auth) {
    const vm = this
    vm.getUser = () => auth.getUser()
    const usr = auth.getUser().medicoid
    const url = `${consts.apiUrl}/pacientes/${usr}`
    $scope.getPacientes = function () {
      $http.get(url).then(function (resp) {
        $scope.paciente = {}
        $scope.pacientes = resp.data
        tabs.show($scope, { tabList: true , tabCreate: true })
      })
    }
  
    $scope.validar = function () {
      const emailRegex = /\S+@\S+\.\S+/
      if ($scope.paciente) {
        // Validação do e-mail
        if ($scope.paciente.email) {
          if (!$scope.paciente.email.match(emailRegex)) {
            msgs.addError('O e-mail informado está inválido')
            return false
          } else {
            return true
          }
        }
      }
    }
  
    $scope.createPaciente = function() {
      const url = `${consts.apiUrl}/paciente`;
      console.log(auth.getUser().medicoId)
      $scope.paciente.medicoId = auth.getUser().medicoId
      $http.post(url, $scope.paciente).then(function(response) {
        $scope.paciente = {}
        $scope.getPacientes()
        msgs.addSuccess('Operação realizada com sucesso!!')
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    $scope.updatePaciente = function () {
      // $scope.updateMeuPerfil()
      if ($scope.validar()) {
        // $scope.updateMeuPerfil()
        const url = `${consts.apiUrl}/users/${$scope.paciente._id}`
        $http.put(url, $scope.paciente).then(function (response) {
          $scope.paciente = {}
          $scope.getPacientes()
          tabs.show($scope, { tabList: true })
          msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function (resp) {
          msgs.addError(resp.data.errors)
        })
      }
    }
  
    $scope.showTabUpdate = function (paciente) {
      $scope.paciente = paciente
      tabs.show($scope, { tabUpdate: true })
    }
  
    $scope.showTabCreate = function (paciente) {
      $scope.paciente = paciente
      tabs.show($scope, { tabUpdate: true , tabList: true})
    }

    $scope.cancel = function () {
      tabs.show($scope, { tabList: true })
      $scope.paciente = {}
    }
  
    $scope.getPacientes()
  }