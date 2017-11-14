angular.module('primeiraApp').component('field', {
  bindings: {
    id: '@',
    label: '@',
    type: '@',
    grid: '@',
    model: '=',
    placeholder: '@',
    readonly: '<',
    valor: '@'
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
       <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
       <input ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control"
          type="{{ $ctrl.type }}" placeholder="{{ $ctrl.placeholder }}" value="{{ $ctrl.valor }}"
          ng-readonly="$ctrl.readonly" />
     </div>
   </div>
  `
});
