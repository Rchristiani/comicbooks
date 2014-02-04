angular.module('Comics',['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('index', {
			url: '',
			controler: 'MainCtrl',
			templateUrl: 'templates/character.html'
		})
		.state('index.single', {
			url: '/:id',
			templateUrl: 'templates/characterPopUp.html',
			controller: 'SingleCharacter'
		});
	})
	.controller('MainCtrl',function($scope, ComicBooks) {
		ComicBooks.find().then(function(result) {
			$scope.characters = result.data.results;
		});

	})
	.controller('SingleCharacter', function($scope, $rootScope, $stateParams, ComicBooks, $window) {
		var id = $stateParams.id;
		ComicBooks.findOne(id).then(function(result) {
			var data = result.data.results[0];
			$scope.characterName = data.name;
			$scope.characterUrl = data.urls[0].url;
			var desc = data.description;
			if(desc.length <= 0){
				desc = "No description provided";
			}
			$scope.description = desc;
		});
		$scope.$on('$viewContentLoaded',function(event) {
			console.log('loaded');
		});
	})
	//Works to prevent scrolling window
	.value('$anchorScroll', angular.noop)
	.directive('popup',function() {
		var linker = function(scope) {
			console.log(scope);
		}
		return {
			link: linker,
			restrict: 'A'
		};
	})
	.factory('ComicBooks',function($http,$q) {
		//For Client Side
		//Where apikey is public key
		//http://gateway.marvel.com/v1/comics/?ts=1&apikey=1234
		var publicKey = 'f1da2ae2dc487b462dc04513dea9eac1';
		var baseUrl = 'http://gateway.marvel.com/v1/';
		var find = function() {
			var def = $q.defer();
			var url = baseUrl + 'public/characters?limit=50&apikey=' + publicKey;
			$http.get(url).success(def.resolve).error(def.reject);

			return def.promise;
		};
		var findOne = function(id) {
			var def = $q.defer();
			var url = baseUrl + 'public/characters/' + id +'?apikey=' + publicKey;
			$http.get(url).success(def.resolve).error(def.reject);

			return def.promise;
		};

		return {
			find: find,
			findOne: findOne
		};
	});