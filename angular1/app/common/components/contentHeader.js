angular.module('primeiraApp').component('contentHeader', {
   bindings: {
      name: '@',
      small: '@',
      imagem: '@',
      icoimgsP: '@',
      txtPosIco: '@',
      icoimgs: '@',
      preInf: '@',
      posInf: '@',
      tabTitle:'@',
   },controller: [
    'pMaiuscula',
    function(pMaiuscula) {
      this.$onInit = () => this.pMaiusculaClasses = pMaiuscula.pUpper(this.small)
    }
  ],
   template: `
      <section class="content-header">
        <div>
        <img src="{{ $ctrl.imagem }}"><h1><i class="{{ $ctrl.icoimgsP }}"></i>{{ $ctrl.txtPosIco }}{{ $ctrl.name }}
          <small><i class="{{ $ctrl.icoimgs}}"></i>{{ $ctrl.preInf }}{{ $ctrl.pMaiusculaClasses }}{{ $ctrl.posInf }}</small></h1>
        </div>
      </section>
   `
});
