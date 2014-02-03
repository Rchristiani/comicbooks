angular.module('Comics',['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider.when('/', {
			controler: 'MainCtrl',
			templateUrl: 'templates/character.html'
		});
	})
	.controller('MainCtrl',function($scope, ComicBooks) {
		ComicBooks.find().then(function(result) {
			$scope.characters = result.data.results;
		});
	})
	.directive('comicbook',function() {
		var linker = function(scope, element, attrs) {

		};
		var controller = function($scope, ComicBooks) {
			$scope.getCharacterInfo = function(characterId) {
				ComicBooks.findOne(characterId).then(function(result) {
					console.log(result);
				});
				//On click get the character name so we can get the info from the server
			};
		};
		return {
			restrict: 'A',
			link: linker,
			controller: controller
		};
	})
	.factory('ComicBooks',function($http,$q) {
		//Key has to be md5(ts+privateKey+publicKey)
		//For server Side only
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
			var url = baseUrl + 'public/characters/' + id +'/stories?apikey=' + publicKey;
			$http.get(url).success(def.resolve).error(def.reject);

			return def.promise;
		};

		return {
			find: find,
			findOne: findOne
		};
	});