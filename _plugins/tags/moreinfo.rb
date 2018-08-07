require "jekyll-spark"

module Jekyll
  class MoreInfoComponentComponent < ComponentTag
    def template(context)
      # Declare props as variables
      # Not necessary, but highly recommended
      type = @props["type"]
      size = @props["size"]
      text = @props["text"]
      baseurl = @props["baseurl"]

      output = ''

      if type == 'title'
        output = %Q[
          <div class="more-subtitle #{size}">
            #{text}
          </div>
        ]

      elsif type == 'title-2'
          output = %Q[
            <div class="more-subtitle #{size} margin top fifty">
              #{text}
            </div>
        ]

      elsif type == 'spacer-title'
          output = %Q[
            <div class="more-subtitle #{size}" style="visibility: hidden">
              #{text}
            </div>
        ]

      elsif type == 'text'
        output = %Q[
          <div class="more-text #{size}">
            #{text}
          </div>
        ]

      elsif type == 'text-2'
        output = %Q[
          <div class="more-text #{size}">
            #{text}
          </div>
        ]

      elsif type == 'circles'
        output = %Q[<div class="more-circles #{size}">]
        for element in text do
          element.each {|key, value| 
          output << %Q[
            <div class="more-circle-container">
              <img class="more-circle" src="#{baseurl}/image/#{value}">
                <div class="more-circle-text">
                #{key}
              </div>
            </div>
          ]
        }
        end
        output << %Q[</div>]

      elsif type == 'quiz-multiple-select'
        output = %Q[<div class="quiz #{size}">]
        for element in text do
          element.each {|key, value| 
            if key == 'question'
              output << %Q[
                  <div class="quiz question">#{value}</div>
                  <div class="quiz answers">
            ]
            elsif key == false || key == true
                output << %Q[
                  <div class="quiz answer">
                    <input type="checkbox" name="multiple-select-quiz" data-correct="#{key}" value="#{value.delete(" \t\r\n")}">
                    <label for="#{value.delete(" \t\r\n")}">#{value}</label>
                  </div>
              ]
            else
              output << %Q[
                  Wrong Prefix: #{value}
              ]
            end
          }
        end
        output << %Q[<div class="quiz feedback">
          <div class="response-title">Title</div>
          <div class="response-description">Feedback</div>
        </div>]
        output << %Q[</div>]
        output << %Q[
          <div class="quiz button-container">
            <a class="quiz button submit" data-type="multiple-select-quiz">Submit</a>
          </div>
        ]
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

      elsif type == 'youtube'
        output = %Q[
          <div class="more-video">
            <iframe width="100%" 
            height="300" 
            src="#{text}" 
            frameborder="0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen></iframe>
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