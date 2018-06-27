require "jekyll-spark"

module Jekyll
  class MoreInfoTitleComponent < ComponentTag
    def template(context)
      # Declare props as variables
      # Not necessary, but highly recommended
      title = @props["title"]

      render = %Q[
        <div class="more-info-title">
          #{title}
        </div>
      ]
    end
  end
end

Liquid::Template.register_tag(
  "MoreInfoTitle",
  Jekyll::MoreInfoTitleComponent,
)