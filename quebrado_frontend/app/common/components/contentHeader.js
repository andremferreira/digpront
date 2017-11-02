angular.module('digitalProntuario').component('contentHeader', {
    bindings: {
        name: '@',
        small: '@',
        imagem: '@',
    },
    template: `
       <section class="content-header">
         <img src="{{ctrl.imagem}}">
         <h1>{{ $ctrl.name }} <small>{{ $ctrl.small }}</small></h1>
       </section>
    `
});