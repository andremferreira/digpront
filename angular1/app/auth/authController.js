(function () {

    angular.module('primeiraApp').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController( $location, msgs, auth) {
        const vm = this

        vm.loginMode = true

        vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.signup = () => {
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }

   
    auth.changeMinfy = function(){
        console.log('chamou')
        $scope.show = a
            if ($scope.show){
                $scope.show = false
                console.log('false', $scope.show)
                
            }else{
                $scope.show = true
                console.log('true', $scope.show)
            }
        return $scope.show
        } 
    }
})()