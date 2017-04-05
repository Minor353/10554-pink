"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-css-mqpacker");
  grunt.loadNpmTasks("grunt-csso");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");    
   

  grunt.initConfig({
      clean: {
          build: ["build"]
      },
      copy: {
          build: {
              files: [{
                  expand: true,
                  src: [
                      "fonts/**/*.{woff,woff2}",
                      "img/**",
                      "js/**",
                      "*.html"
                  ],
                  dest: "build"
              }]
          },
          html: {
              files: [{
                  expand: true,
                  src: ["*.html"],
                  dest: "build"
              }]
          }
      },
      imagemin: {
          images: {
              options: {
                  optimizationLevel: 3,
                  progressive: true
              },
              files: [{
                  expand: true,
                  src: ["build/img/**/*.{png,jpg,gif}"]
              }]
          }
      },
      csso: {
          style: {
              report: "qzip"
          },
          files: {
              "build/css/style.min.css": ["build/css/style.css"]
          }
      },
    sass: {
      style: {
        files: {
          "build/css/style.css": "sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]}),
              require("css-mqpacker")({sort: true})
          ]
        },
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
        html:{ 
        files: ["*.html"],
        tasks: ["copy:html"] },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
    
  grunt.registerTask("build", [
      "clean",
      "copy",
      "sass",
      "postcss",
      "csso",
      "imagemin"
  ]);    
};
