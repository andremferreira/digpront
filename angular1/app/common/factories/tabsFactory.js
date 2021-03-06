angular.module('digPront').factory('tabs', [ function() {

   function show(owner, {
      tabList = false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false,
      tabConsulta = false,
      tabFormConsulta = false,
      tabFormConsultaAlterar = false,
      tabFormConsultaDpl = false,
      tabConsultaDetail = false,
      tabPacienteFila = false,
   }) {
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      owner.tabConsulta = tabConsulta
      owner.tabFormConsulta = tabFormConsulta
      owner.tabFormConsultaAlterar = tabFormConsultaAlterar
      owner.tabFormConsultaDpl = tabFormConsultaDpl
      owner.tabConsultaDetail = tabConsultaDetail
      owner.tabPacienteFila = tabPacienteFila
   }

   return { show }
}])
