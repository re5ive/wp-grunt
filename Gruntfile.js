module.exports = function( grunt ) {

	'use strict';

	// Project configuration
	grunt.initConfig( {

		pkg : grunt.file.readJSON( 'package.json' ),

		public : 'assets/public/',

		// sass compile
		
		compass : {
			compilesass : {
				options : {
					config : 'config.rb',
					environment : 'development',
					force : grunt.option('force') || false,
					outputStyle : 'expanded'
				}
			}
		},
		
		
		notify: {
			watch: {
	      		options: {
	        		title: 'Task Complete',  // optional 
	        		message: 'SASS Compiled CSS Triggered...' //required 
	      		}
	    	},

	    	css: {
	    		options: {
	        		title: 'CSS Reloaded',  // optional 
	        		message: 'Websocket pushing...' //required 
	      		}
	    	}
		},
		
		// css comb
		csscomb : {
			distribute : {
				files: {
                	'assets/public/css/app.css': ['src/css/main.css']
            	}
			}
		},


		// copy font awesom
		
		copy : {
			fonts : {
				expand : true,
				cwd : '',
				src: 'src/vendor/font-awesome/fonts/*',
				dest: 'assets/public/fonts/',
				flatten: true,
				filter: 'isFile'
			}
		},
		

		//css minification
		cssmin : {
			distribute : {
				files : {
					'assets/public/css/app.min.css' : ['assets/public/css/app.css']
				}
			},
			//create wordpress style.css
			wordpressStyle : {
				options : {
					banner : '/*\n'+
							 ' * ﷽ \n' +
							 ' *\n'+
							 ' * Time: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
							 ' * Theme Name: <%= pkg.title %>\n' +
							 ' * Theme URI: http://paristokyo.ae\n' +
							 ' * Author: <%= pkg.author.name %>\n' +
							 ' * Author URI: <%= pkg.author.url %> \n' +
							 ' * Description: <%= pkg.title %> The best WordPress theme ever made! \n' +
							 ' * Version: <%= pkg.version %> \n' +
							 ' * Copyright: <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <kamaal@kamaal.me> Licensed: Licensed under the MIT License \n' +
							 ' * Tags: <%= pkg.keywords %> \n' +
							 ' * http://www.apache.org/licenses/LICENSE-2.0 \n' +
							 ' */ \n'
				},
	        	files : {
	        		// just one line css to cheat ignorance of cssmin
	          		'style.css': ['src/css/empty.css']
	        	}
			} 
		},

		//js hint
		jshint : {
			client : {
	        	options : {
	          		unused : false,
	          		reporter : require('jshint-stylish')
	        	},
        		directives : {
	          		browser : true,
	          		sloppy : true,
	          		predef : [
		            	'Modernizr',
		            	'console'
	          		],
          			nomen : false
        		},
				all : [
					'assets/public/js/app.js'
				],
			},
			grunt : {
				all : [
					'Gruntfile.js'
				],
				options : {
					jshintrc : '.gruntjshintrc'
				}
			}

		},


		concat: {
		    options: {
		      	separator: ';',
		    },

		    con: {
		      	src : [
					'src/js/plugins.js',
					//'src/vendor/fastclick/lib/fastclick.js',
					//'src/js/smartrezise.js',
					//'src/vendor/bootstrap-select/dist/js/bootstrap-select.js',
					//'src/vendor/bootstrap-select/js/bootstrap-select.js',
					//'src/vendor/velocity/velocity.js',
					//'src/vendor/slick.js/slick/slick.js',
					'src/js/app.js'
				],
		      	dest: 'assets/public/js/app.js'
		    },
		},

		//js test 
		
		uglify : {
			options : {
				banner : '/*! ﷽ \n' +
						 ' * Author: Kamaal Aboothalib\n' +
						 ' * Author URI: http://kamaal.me\n' +
						 ' * <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %> */\n',
				compress : {
					drop_console : true
				}
			},

			build : {
				src : [
					'assets/public/js/app.js'
				],
				dest: 'assets/public/js/app.min.js'
			}
		},

		watch : {
			// sass
			
			sass : {
				files : [
					'src/sass/*.scss',
					'src/sass/base/*.scss',
					'src/sass/layouts/*.scss',
					'src/sass/modules/*.scss',
					'src/sass/states/*.scss',
					'src/js/*.js'
				],
				tasks : [ 'compass', 'csscomb', 'copy', 'cssmin','concat' , 'uglify', 'notify' ],
				options: {
					debounceDelay: 0,
					nospawn: true,
					livereload: false
				}
			}

    	}

	} );

	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default', ['compass', 'csscomb',  'copy', 'cssmin', 'concat']);
  	grunt.registerTask('test', 'jshint');
  	

};