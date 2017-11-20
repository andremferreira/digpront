angular.module('primeiraApp').factory('tabs', [ function() {

   function show(owner, {
      tabList = false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false,
      tabConsulta = false,
      tabFormConsulta = false,
   }) {
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      owner.tabConsulta = tabConsulta
      owner.tabFormConsulta = tabFormConsulta
   }

   return { show }
}])
