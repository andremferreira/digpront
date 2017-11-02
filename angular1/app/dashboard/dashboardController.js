angular.module('primeiraApp').controller('DashboardCtrl', [
  '$http',
  '$scope', 
  '$location',
  'consts',
  'tabs',
  DashboardController
])

function DashboardController($http, $scope, $location, consts, tabs) {
  const vm = this
  vm.getSummary = function () {
    const url = `${consts.apiUrl}/billingSummary`;
    $http.get(url).then(function (response) {
      const { credit = 0, debt = 0 } = response.data
      vm.credit = credit
      vm.debt = debt
      vm.total = credit - debt
    })
  }

  function widgetsController($scope, $route) {
    $scope.$route = $route;
  }

  vm.getSummary()

}
