module.exports = function (grunt) {
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 9000,
					keepalive: true,
					host: 'localhost',
					open: true,
					base: "."
				}
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					// target.css file: source.less file
					"stylesheets/stylesheet.css": [
						"src/less/stylesheet.less"
					]
				}
			}
		},
		jade: {
			compile: {
				files: {
					"index.html" : "src/jade/index.jade"
				}
			}
		},
		uglify: {
			minify: {
				files: {
					"javascripts/script.js": [
						"node_modules/jquery/dist/jquery.js",
						"node_modules/bootstrap/dist/js/bootstrap.js",
						"src/js/home.js"
					]
				}
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/dist/fonts/',
						src: ['./*'],
						dest: 'fonts/'
					},
					{
						expand: true,
						cwd: 'node_modules/font-awesome/fonts/',
						src: ['./*'],
						dest: 'fonts/'
					}
				]
			}
		},
		watch: {
			styles: {
				files: ['src/less/*.less'],
				tasks: ['less']
			},
			scripts: {
				files: ["src/js/*.js"],
				tasks: ["uglify"]
			},
			views: {
				files: ["src/jade/*.jade"],
				tasks: ["jade"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['connect']);
	grunt.registerTask('dist', ['less','uglify','jade']);
}