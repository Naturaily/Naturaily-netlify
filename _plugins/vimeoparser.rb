class Vimeo < Liquid::Tag
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
      raise "No Vimeo ID provided in the \"vimeo\" tag"
    end
  end

  def render(context)
    "<div class='embed-container'><iframe
      data-vimeo
      class=\"lazyload\"
      width=\"#{@width}\"
      height=\"#{@height}\"
      data-src=\"https://player.vimeo.com/video/#{@id}\"
      frameborder=\"0\"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
    ></iframe></div>

    <script>
      const vimeo = $('[data-vimeo]');

      function handleLazyLoad() {
        const storeSRC = vimeo.dataset.src;

        vimeo.addEventListener('lazyloaded', () => {
          delete vimeo.dataset.src;
          vimeo.src = storeSRC;
          initPlayer();
        });
      }

      function initPlayer() {
        const player = new Vimeo.Player(vimeo);
      }

      handleLazyLoad();
    </script>
    "
  end

  Liquid::Template.register_tag "vimeo", self
end
