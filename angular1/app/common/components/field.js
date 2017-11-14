angular.module('primeiraApp').component('field', {
  bindings: {
    id: '@',
    label: '@',
    type: '@',
    grid: '@',
    model: '=',
    placeholder: '@',
    readonly: '<',
    valor: '@',
    tabindex: '@',
    onclick: '@',
    onfocus: '@',
    onblur: '@',
    style: '@',
    labelStyle: '@',
    class: '@'
  },
  controller: [
    'gridSystem',
    function(gridSystem) {
      this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
    }
  ],
  template: `
   <div class="{{ $ctrl.gridClasses }}">
     <div class="form-group">
       <label style="{{ $ctrl.labelStyle }}">{{ $ctrl.label }}</label>
       <input ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control {{ $ctrl.class }}" tabindex="{{ $ctrl.tabindex }}"
          onclick="$ctrl.onclick" onfocus="$ctrl.onfocus" onblur="$ctrl.onclur"
          style="{{ $ctrl.style }}"
          type="{{ $ctrl.type }}" placeholder="{{ $ctrl.placeholder }}" value="{{ $ctrl.valor }}"
          ng-readonly="$ctrl.readonly" />
     </div>
   </div>
  `
});
