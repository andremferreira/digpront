angular.module('primeiraApp').component('myButton', {
  bindings: {
    id: '@',
    label: '@',
    imgIcon: '@',
    btnStyle: '@',
    click: '@',
    grid: '@',
    text: '@',
    readonly: '<'
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
       <div class="form-group">
          <button class="{{ $ctrl.btnStyle }}" ng-click="$ctrl.click" ng-readonly="$ctrl.readonly" > 
            <i class="{{ $ctrl.imgIcon }}"></i>{{ $ctrl.text }}
          </button>
       </div>
     </div>
   </div>
  `
});
