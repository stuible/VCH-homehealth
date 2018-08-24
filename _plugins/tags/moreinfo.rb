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
        feedback = '';
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
            elsif key == 'feedback'
              feedback = value
            else
              output << %Q[
                  Wrong Prefix: #{value}
              ]
            end
          }
        end
        output << %Q[<div class="quiz feedback" data-feedback='#{feedback.to_json}'>
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

      elsif type == 'quiz-matching'
        categories = []
        images = []
        output << %Q[
          <div class="quiz matching">
            <div class="eight columns">
        ]
        for element in text do
          element.each {|key, value| 
            if key == 'category'
              categories.push(value[0])
              images.push(value[1])
              #output << %Q[#{key} : #{value}]
            elsif categories.include? key
              output << %Q[
                <div class="six columns matching-option" data-category="#{key}">
                  <div class="drop circle">
                    <div class="four columns">
                      <div class="matching-circle target"></div>
                    </div>
                    <div class="eight columns">
                      <div class="matching-text">#{value}</div>
                    </div>
                  </div>
                </div>
              ]
            else 
              output << %Q[<br/> #{key} is not found in your list of categories]
            end
          }
        end
        output << %Q[</div>]

        output << %Q[<div class="four columns">]
        categories.each_with_index do |category, index|
          output << %Q[
            <div class="row matching-answer" data-category="#{category}" data-background="#{baseurl}/image/#{images[index]}">
              <div class="five columns">
                <div style="background-image: url('#{baseurl}/image/#{images[index]}')" class="matching-circle answer"></div>
                </div>
                <div class="seven columns">
                  <div class="matching-text">#{category}</div>
              </div>
            </div>
          ]
        end
        output << %Q[</div>]

        output << %Q[
          </div>
        ]

      elsif type == 'quiz-matching-equal'
        categories = []
        images = []
        output << %Q[
          <div class="quiz matching">
            <div class="six columns">
        ]
        for element in text do
          element.each {|key, value| 
            if key == 'category'
              categories.push(value[0])
              images.push(value[1])
              #output << %Q[#{key} : #{value}]
            elsif categories.include? key
              output << %Q[
                <div class="row matching-option" data-category="#{key}">
                  <div class="drop circle">
                    <div class="four columns">
                      <div class="matching-circle target"></div>
                    </div>
                    <div class="eight columns">
                      <div class="matching-text">#{value}</div>
                    </div>
                  </div>
                </div>
              ]
            else 
              output << %Q[<br/> #{key} is not found in your list of categories]
            end
          }
        end
        output << %Q[</div>]

        output << %Q[<div class="six columns">]
        categories.each_with_index do |category, index|
          output << %Q[
            <div class="row matching-answer" data-category="#{category}" data-background="#{baseurl}/image/#{images[index]}">
              <div class="five columns">
                <div style="background-image: url('#{baseurl}/image/#{images[index]}')" class="matching-circle answer"></div>
                </div>
                <div class="seven columns">
                  <div class="matching-text">#{category}</div>
              </div>
            </div>
          ]
        end
        output << %Q[</div>]

        output << %Q[
          </div>
        ]

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

      elsif type == 'html'
        output = %Q[
          #{text}
        ]

      elsif type == 'bullets'
        output = %Q[<ul class="more-bullets #{size}">]
        for bullet in text do
          output << %Q[
            <li class="more-bullet">
            #{bullet}
            </li>
          ]
        end
        output << %Q[</ul>]

      elsif type == 'posters-three'
        output = %Q[<div class="more-posters #{size}">]
        output << %Q[<div class="row">]
        index = 1;
        for item in text do
          item.each {|key, value| 
          output << %Q[
            <div class="four columns">
              <div class="more-poster-text">
                0#{index}: #{key}
              </div>
            </div>
          ]
        }
        index += 1
        end
        output << %Q[</div>]

        output << %Q[<div class="row">]
        for item in text do
          item.each {|key, value| 
          output << %Q[
            <div class="four columns">
              <img class="more-poster" src="#{baseurl}/image/#{value}">
            </div>
          ]
        }
        end
        output << %Q[</div>]

        output << %Q[</div>]

      elsif type == 'gallery'
        output = %Q[<div class="more-gallery #{size}">]
        index = 1
        rowCounter = 1
        for item in text do
          if rowCounter == 1
            output << %Q[<div class="row">]
          end
          item.each {|key, value| 
          output << %Q[
            <div class="four columns">
                <img src="#{baseurl}/image/#{value}">

            </div>
          ]
          }
          if rowCounter == 3
            output << %Q[</div>]
            rowCounter = 1
          else
            rowCounter += 1
          end
          index += 1
          
        end
        output << %Q[</div>]

      elsif type == 'youtube' || type == 'youtube-2'
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