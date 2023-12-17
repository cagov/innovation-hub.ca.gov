const cagovBuildSystem = require('@cagov/11ty-build-system');
const markdown = require('./docs/src/11ty/markdown.js');
const htmlTransform = require('./docs/src/11ty/html-transform.js');
const forUnsetComponents = require('./docs/src/11ty/for-unset-components.js');
const fs = require('fs');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdown);

  eleventyConfig.addPlugin(cagovBuildSystem, {
    processors: {
      sass: {
        watch: ['docs/src/css/**/*'],
        output: '_site_dist/index.css',
        minify: true,
        options: {
          file: 'docs/src/css/sass/index.scss',
          includePaths: ['./src/css/sass'],
        },
      },
      esbuild: [
        {
          watch: ['docs/src/js/**/*'],
          options: {
            entryPoints: ['docs/src/js/index.js'],
            bundle: true,
            minify: true,
            outfile: '_site_dist/built.js',
          },
        },
      ],
    },
  });

  forUnsetComponents((folder) => eleventyConfig.ignores.add(folder));

  eleventyConfig.addFilter('calculateReadabilityGrade', (value) => {
    // This readability score grading scale was created with these thresholds intentionally by the ODI content team. These score display values represent the desired values corresponding to the ARI analysis. Using these round numbers is preferable to an equation that returns any integer because it matches hemingwayapp's scoring where grade levels are only returned as whole numbers.
    let readabilityScore = 100;
    if(value >= 16) { readabilityScore = 0; }
    if(value < 16) { readabilityScore = 10; }
    if(value < 15) { readabilityScore = 20; }
    if(value < 14) { readabilityScore = 30; }
    if(value < 13) { readabilityScore = 40; }
    if(value < 12) { readabilityScore = 50; }
    // there is no slot for a score of 60
    if(value < 11) { readabilityScore = 70; }
    if(value < 10) { readabilityScore = 80; }
    if(value < 9) { readabilityScore = 90; }
    if(value < 8) { readabilityScore = 95; }
    if(value < 7) { readabilityScore = 100; }
    return readabilityScore;
  })

  eleventyConfig.addFilter('getScoreColor', (value) => {
    if(parseInt(value) > 89) {
      return 'speedlify-score-good';
    }
    if(value > 49) {
      return 'speedlify-score-ok';
    }
    return 'speedlify-score-bad'
  })

  eleventyConfig.addTransform('htmlTransform', htmlTransform);

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy({
    'docs/src/assets/illustrations': 'illustrations',
  });
  eleventyConfig.addPassthroughCopy({ 'docs/src/assets/img': 'img' });
  eleventyConfig.addPassthroughCopy({
    'docs/src/assets/article-content': 'content/img',
  });
  eleventyConfig.addPassthroughCopy({ 'docs/src/css/fonts': 'fonts' });
  // eleventyConfig.addPassthroughCopy({
  //   'components/base-css/dist/themes': 'css',
  // });
  // eleventyConfig.addPassthroughCopy({
  //   'components/accordion/template.html': 'css/accordion.html',
  // });
  // eleventyConfig.addPassthroughCopy({
  //   'components/link-grid/template.html': 'css/link-grid.html',
  // });
  // eleventyConfig.addPassthroughCopy({
  //   'components/step-list/template.html': 'css/step-list.html',
  // });
  eleventyConfig.addPassthroughCopy({ '_site_dist/*': '/' });
  eleventyConfig.addPassthroughCopy({ '_build_dist/*': 'builds' });
  // eleventyConfig.addPassthroughCopy({
  //   'components/icons/dist/svg': 'cagov-icons-svg',
  // });
  // eleventyConfig.addPassthroughCopy({ 'components/icons/src/fonts': 'fonts' });

  // generate allfiles?
  var fileList = [];
  // for all the .md files in ./docs (recursively)
  // add the url to the list

  
  eleventyConfig.addCollection('scorepages', function (collection) {
    // console.log("--> collection.stuff");
    // console.trace();
    var fileList = [];
    let output = [];
    collection.getAll().forEach((item) => {
      var url = item.url;
      // console.log("considering "+url);
      if (url.match(/^\/((content-design|human-centered-design|product-management)\/)?[\w-]+\/$/)) {
        var outputPath = url;
        var inputPath = './docs/pages'+url;
        // replace trailing / with ".md" on inputPath
        if (url.match(/\/$/)) {
          // remove last character of inputPath
          inputPath = inputPath.slice(0, -1);
          inputPath = inputPath + '.md';
        }
        // if inputPath doesn't exist, log it
        if (fs.existsSync(inputPath)) {
          console.log("  will score -> "+inputPath);
          fileList.push({outputPath:outputPath, inputPath:inputPath});
          // item.inputPath = inputPath;
          // item.outputPath = outputPath;
          // output.push(item);
        }
      } else if (url.match(/^\/$/)) {
        // console.log("  will score -> "+inputPath);
        fileList.push({outputPath:url, inputPath:'./docs/site/homepage.njk'});
      }
    });
    let abbrevFileList = fileList.filter(item => { return item.outputPath != "_site/blog/index.html";})
    fs.writeFileSync('./_site_dist/allFiles.json',JSON.stringify(abbrevFileList),'utf8');
    return output;
  });


  return {
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['html', 'njk', '11ty.js', 'md'],
    dir: {
      input: '.',
      output: '_site',
      includes: 'docs/site/_includes',
      layouts: 'docs/site/_includes/layouts',
      data: 'docs/site/_data',
    },
  };
};
