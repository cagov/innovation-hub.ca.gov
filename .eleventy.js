const cagovBuildSystem = require('@cagov/11ty-build-system');
const markdown = require('./docs/src/11ty/markdown.js');
const htmlTransform = require('./docs/src/11ty/html-transform.js');
const forUnsetComponents = require('./docs/src/11ty/for-unset-components.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdown);

  eleventyConfig.addPlugin(cagovBuildSystem, {
    processors: {
      sass: {
        watch: ['docs/src/css/**/*', 'components/**/*.scss'],
        output: '_site_dist/index.css',
        minify: true,
        options: {
          file: 'docs/src/css/sass/index.scss',
          includePaths: ['./src/css/sass'],
        },
      },
      esbuild: [
        {
          watch: ['docs/src/js/**/*', 'components/**/*.!(md)'],
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
  eleventyConfig.addPassthroughCopy({
    'components/base-css/dist/themes': 'css',
  });
  eleventyConfig.addPassthroughCopy({
    'components/accordion/template.html': 'css/accordion.html',
  });
  eleventyConfig.addPassthroughCopy({
    'components/link-grid/template.html': 'css/link-grid.html',
  });
  eleventyConfig.addPassthroughCopy({
    'components/step-list/template.html': 'css/step-list.html',
  });
  eleventyConfig.addPassthroughCopy({ '_site_dist/*': '/' });
  eleventyConfig.addPassthroughCopy({ '_build_dist/*': 'builds' });
  eleventyConfig.addPassthroughCopy({
    'components/icons/dist/svg': 'cagov-icons-svg',
  });
  eleventyConfig.addPassthroughCopy({ 'components/icons/src/fonts': 'fonts' });

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
