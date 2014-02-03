module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					sassDir: 'sass',
					cssDir: '.'
				}
			}
		},
		jshint: {
			src: 'js/comics.js'
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['compass']
			},
			js: {
				files: 'js/comics.js',
				tasks: ['jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default',['watch'])
};
