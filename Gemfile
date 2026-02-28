source "https://rubygems.org"

# Specify Jekyll version
#gem "jekyll", "~> 4.4.1"

# GitHub Pages gem
gem "github-pages", group: :jekyll_plugins

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-sitemap"
end

# Logger gem to prevent deprecation warning
gem "logger"
gem "faraday-retry"

# Windows and JRuby support
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:windows]

# Lock http_parser.rb for JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
