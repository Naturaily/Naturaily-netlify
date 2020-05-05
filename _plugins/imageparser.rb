class Image < Liquid::Tag

  def initialize(tagName, markup, tokens)
    super
    @image = markup.split(" ")[0]
    @alt = markup.split(" ")[1]
    @title = markup.split(" ")[2]
  end

  def render(context)
    "![#{@title}](/assets/images/loader.gif \"#{@alt}\"){:data-src=\"#{@image}\"}"
  end

  Liquid::Template.register_tag "image", self
end
