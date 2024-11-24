import filters from './src/_config/filters.js';
import pluginIcons from 'eleventy-plugin-icons';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setDataDirectory("lore");
  eleventyConfig.setOutputDirectory("dist");

  eleventyConfig.addGlobalData("myName", "Laurel");

  // Emulate passthrough copy during `--serve`
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  
	// Copy `img/` to `_site/img`
	eleventyConfig.addPassthroughCopy("img");

	// Copy any .jpg file to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");

  // Layout aliasing
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  // Custom date parsing
  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  

  //---------------------- Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [{ name: 'lucide', path: 'node_modules/lucide-static/icons' }],
    icon: {
      shortcode: 'icon',
      delimiter: ':',
      transform: async (content) => content,
      class: (name, source) => `icon icon-${name}`,
      id: (name, source) => `icon-${name}`,
      attributes: {},
      attributesBySource: {},
      overwriteExistingAttributes: true,
      errorNotFound: true,
    },
  });
};

