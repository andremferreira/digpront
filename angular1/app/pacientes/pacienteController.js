angular.module('primeiraApp').controller('PacienteCtrl', [
  '$scope',
  '$http',
  '$filter',
  '$location',
  '$window',
  'msgs',
  'tabs',
  'consts',
  'auth',
  PacienteController
])

function PacienteController($scope, $http, $filter, $location, $window, msgs, tabs, consts, auth) {
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

  $scope.filtrarPacientes = function () {
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

  $scope.validarConsultaAdd = function () {
    let consulta = new Object()
      consulta.queixa = $scope.consulta.queixa
      consulta.alergia = $scope.consulta.alergia
      consulta.anamnese = $scope.consulta.anamnese
      consulta.antecedente = $scope.consulta.antecedente 
      consulta.conduta = $scope.consulta.conduta 
      consulta.exameCompl = $scope.consulta.exameCompl 
      consulta.historicoFamiliar = $scope.consulta.historicoFamiliar 
      consulta.receitaMedica = $scope.consulta.receitaMedica  
    
    if ($scope.consulta) {
      if (!$scope.consulta.queixa || !$scope.consulta.queixa.length) {
        msgs.addError('O atributo "Queixa" é obrigatório. ')
        return false
      } else if (!$scope.consulta.anamnese || !$scope.consulta.anamnese.length) {
        msgs.addError('O atributo "Anamnese" é obrigatório. ')
        return false
      } else {
        $scope.paciente.consultas.push(consulta)
        return true
      }
    }
  }

  $scope.createPaciente = function () {
    const url = `${consts.apiUrl}/cadastroPaciente`
    $scope.paciente.medicoId = auth.getUser().medicoId
    $http.post(url, $scope.paciente).then(function (response) {
      $scope.paciente = {}
      $scope.getPacientes()
      msgs.addSuccess('Operação realizada com sucesso!!')
      tabs.show($scope, { tabList: true, tabCreate: true })
    }).catch(function (resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.updatePaciente = function () {
    if ($scope.validar()) {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
      var strToUpper = new String
      strToUpper = $scope.paciente.nome.toUpperCase()
      $scope.paciente.nome = strToUpper
      strToUpper = $scope.paciente.sobrenome.toUpperCase()
      $scope.paciente.sobrenome = strToUpper
      $scope.paciente.dt_nascimento = new Date($scope.paciente.dt_nascimento.replace(pattern, '$3-$2-$1'))

      console.log($scope.paciente.dt_nascimento)
      const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
      $http.put(url, $scope.paciente).then(function (response) {
        $scope.paciente = {}
        $scope.getPacientes()
        tabs.show($scope, { tabList: true, tabCreate: true })
        msgs.addSuccess('Operação realizada com sucesso!')
        // $window.location.reload($location)
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    }
  }

  $scope.addFormConsulta = function () {
    if ($scope.validarConsulta()) {
      const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
      // $scope.paciente.consultas.push({})
      console.log($scope.paciente)
      $http.put(url, $scope.paciente).then(function (response) {
        $scope.showTabConsulta()
        msgs.addSuccess('Operação realizada com sucesso!')
        // $window.location.reload($location)
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
    tabs.show($scope, { tabConsulta: true })
  }

  $scope.showTabCreate = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabUpdate: true, tabList: true })
  }

  $scope.cancel = function () {
    $scope.paciente = {}
    tabs.show($scope, { tabCreate: true, tabList: true })
  }

  $scope.cancelConsulta = function (paciente) {
    $scope.paciente = paciente
    $scope.delConsulta()
    tabs.show($scope, { tabConsulta: true })
  }
  $scope.addConsultaBtn = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabFormConsulta: true })
  }

  $scope.delConsulta = function (index) {
    $scope.paciente.consultas.splice(index, 1)
  }

   $scope.addConsulta = function (index, object) {
     $scope.paciente.consultas.splice(index + 1, 0, {
  //     // queixa: null,
  //     // anamnese: null,
  //     // antecedente: null,
  //     // medicacao: null,
  //     // alergia: null,
  //     // historicoFamiliar: null,
  //     // exameFisico: null,
  //     // exameCompl: null,
  //     // conduta: null,
  //     // receitaMedica: null
     })
   }

  $scope.showTabConsultaForm = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabFormConsulta: true })
  }

  $scope.getPacientes()
}