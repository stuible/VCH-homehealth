require "jekyll-spark"

module Jekyll
  class MoreInfoComponentComponent < ComponentTag
    def template(context)
      # Declare props as variables
      # Not necessary, but highly recommended
      type = @props["type"]
      side = @props["side"]
      text = @props["text"]

      output = ''

      if type == 'title'
        output = %Q[
          <div class="more-#{side}-title">
            #{text}
          </div>
        ]
      elsif type == 'text'
        output = %Q[
          <div class="more-#{side}-text">
            #{text}
          </div>
        ]
      elsif type == 'circles'
        output = %Q[<div class="more-small-circles">]
        for element in text do
          output << %Q[
            <div class="more-small-circle-container">
              <div class="more-small-circle"></div>
                <div class="more-small-circle-text">
                #{element}
              </div>
            </div>
          ]
        end
        output << %Q[</div>]
      elsif type == 'questions'
        output = %Q[<div class="more-questions">]
        for element in text do
          output << %Q[
            <div class="more-question">
              #{element}
            </div>
          ]
        end
        output << %Q[</div>]
      elsif type == 'video'
        output = %Q[
          <div class="more-video">
            <video controls>
              <source src="/video/more-on-topic/#{text}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        ]
      end

      render = output
        
    end
  end
end

Liquid::Template.register_tag(
  "MoreInfoComponent",
  Jekyll::MoreInfoComponentComponent,
)