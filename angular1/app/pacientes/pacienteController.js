angular.module('primeiraApp').controller('PacienteCtrl', [
    '$scope',
    '$http',
    '$filter',
    '$location',
    'msgs',
    'tabs',
    'consts',
    'auth',
    PacienteController
  ])
  
  function PacienteController($scope, $http, $filter,$location, msgs, tabs, consts, auth) {
    const vm = this
    vm.getUser = () => auth.getUser()
    const usr = auth.getUser().medicoId
    // const url = `${consts.apiUrl}/pacientes?:medicoId${usr}`
    const url = `${consts.apiUrl}/cadastroPacientes/${usr}`

    // console.log(url)
    $scope.getPacientes = function () {
      console.log($scope.paciente)
      $http.get(`${url}`).then(function (resp) {
        $scope.paciente = {}
        $scope.pacientes = resp.data
        tabs.show($scope, { tabList: true, tabCreate: true })
      })
    }

    $scope.filtrarPacientes = function() {
      console.log(`${url}/${$scope.paciente.nome}/${$scope.paciente.sobrenome}`)
      $http.get(`${url}/${$scope.paciente.nome}/${$scope.paciente.sobrenome}`).then(function (resp) {
        $scope.paciente = {}
        $scope.pacientes = {}
        $scope.pacientes = resp.data
        // $scope.pacientes.push(resp.data)
        // console.log($scope.pacientes)
        tabs.show($scope, { tabList: true, tabCreate: true })
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
      const url = `${consts.apiUrl}/cadastroPaciente`
      $scope.paciente.medicoId = auth.getUser().medicoId
      $http.post(url, $scope.paciente).then(function(response) {
        $scope.paciente = {}
        $scope.getPacientes()
        msgs.addSuccess('Operação realizada com sucesso!!')
        tabs.show($scope, { tabList: true })
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    $scope.updatePaciente = function () {
      if ($scope.validar()) {
        const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
        $scope.paciente.dt_nascimento = new Date($scope.paciente.dt_nascimento.replace(pattern, '$3-$2-$1'))
        const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
        $http.put(url, $scope.paciente).then(function (response) {
          $scope.paciente = {}
          $scope.getPacientes()
          tabs.show($scope, { tabList: true, tabCreate: true })
          msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function (resp) {
          msgs.addError(resp.data.errors)
        })
      }
    }
  
    $scope.showTabUpdate = function (paciente) {
      $scope.paciente = paciente
      $scope.paciente.dt_nascimento = $filter('date')(paciente.dt_nascimento, 'dd/MM/yyyy')
      tabs.show($scope, { tabUpdate: true })
    }
  
    $scope.showTabConsulta = function (paciente) {
      $scope.paciente = paciente
      // $scope.paciente.dt_nascimento = dt_nasc.substring(0, 10) 
      tabs.show($scope, { tabConsulta: true })
    }

    $scope.showTabCreate = function (paciente) {
      $scope.paciente = paciente
      tabs.show($scope, { tabUpdate: true , tabList: true})
    }

    $scope.cancel = function () {
      $scope.paciente = {}
      tabs.show($scope, { tabList: true , tabCreate: true })
    }
  
    $scope.getPacientes()
  }