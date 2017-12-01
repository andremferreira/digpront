angular.module('primeiraApp').factory('filtro', [function () {
    function filtrarBoolean(boolean) {
        if(boolean){
            return 'SIM'
        }else{
            return 'NÃO'
        }
    }
    return { filtrarBoolean };
}])