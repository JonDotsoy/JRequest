module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify:{
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) 2014 jonad.in. | <%= pkg.license %> */\n',
				compress: {
					drop_console: true
				},
				mangle: {
					except: ["jQuery","window"]
				}
			},
			dist: {
				files: {
					'dist/request.min.js': 'src/fronend/request.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
};