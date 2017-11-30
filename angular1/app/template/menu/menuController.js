angular.module('primeiraApp').controller('MenuCtrl', [
    '$location',
    'msgs',
    'auth',
    MenuController
  ])
  
  function MenuController($location, msgs, auth) {
    const vm = this
    vm.mini = true
    vm.menuMinify = () => vm.mini = !vm.mini

  }