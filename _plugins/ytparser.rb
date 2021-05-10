class YouTube < Liquid::Tag
  Syntax = /^\s*([^\s]+)(?:\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

      if $2.nil? then
          @width = "100%"
          @height = "500"
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No YouTube ID provided in the \"youtube\" tag"
    end
  end

  def render(context)
    "<iframe
      width=\"#{@width}\"
      height=\"#{@height}\"
      src=\"https://www.youtube.com/embed/#{@id}\"
      srcdoc=\"<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/#{@id}?autoplay=1><img src=https://img.youtube.com/vi/#{@id}/hqdefault.jpg alt=''><span>▶</span></a>\"
      frameborder=\"0\"
      allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"
      allowfullscreen
    ></iframe>"
  end

  Liquid::Template.register_tag "youtube", self
end
