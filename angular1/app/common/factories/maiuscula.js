angular.module('primeiraApp').factory('maiuscula', [function () {
    function maiuscula(string) {
        return string.toUpperCase()
    }
    return { maiuscula };
}])