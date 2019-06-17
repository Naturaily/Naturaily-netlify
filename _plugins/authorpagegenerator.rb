module Jekyll

  class AuthorPage < Page
    def initialize(site, base, dir, author)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), site.config['blog']['authors']['layout'])
      self.data['author'] = author

      author_title_prefix = site.config['blog']['authors']['title_prefix'] || 'blog - author: '
      self.data['title'] = "#{author_title_prefix}#{author}"
      self.data['filter_author'] = "#{author}"
    end
  end

  class AuthorPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'author'
        dir = site.config['blog']['authors']['url'] || 'blog/authors/'
        site.data["authors"]["team"].each do |author|
          author_name = author["name"].gsub(/\s+/, '-')
          site.pages << AuthorPage.new(site, site.source, File.join(dir, author_name), author["name"])
        end
      end
    end
  end

end
