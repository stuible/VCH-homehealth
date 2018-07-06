# 🏥 VCH HOME HEALTH 🏥

Home Health is a Learning Technologies and VCH project created using Jekyll.

## 🏁 Getting Started

Home Health utilizes Jekyll and Gulp to compile markdown and sass into a flat file website.  The final output / compilation can be found in "_site".


## 🗄 File Structure

![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `Uncompiled / Editable` 
&nbsp;  &nbsp;
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `Compiled by Jekyll`
 &nbsp;&nbsp;
![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Compiled by Gulp`

- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_css`
    - Where the uncompiled Sass stylesheets can be found (only modify these styles)
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `_deploy`
    - where the final deployable site is compiled to
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_includes`
    - Where some common / reusable html elements are kept (referenced and compiled with Jekyll)
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_js`
    - Where unconcatoncated and unminified javascript is kept
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_layouts`
    - Where the templates for the different pages used by jekyll are kept ( Jekyll uses the Liquid templating engine created by Shopify)
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `_site`
    - where the debugging site is compiled to
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `css`
    - where the compiled, concatoned and minified css is put by gulp before being copied to _site/css by jekyll
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `fonts`
    - where web fonts are stored
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `image`
    - image assets used by the site
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `js`
    - where the compiled, concatoned and minified js is put by gulp before being copied to _site/js by jekyll
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `library`
    - where the various js & css libraries that Home Health needs are kept
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `modules`
    - where the mardown is kept for all the pages
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `video`
    - video assets used by the site


## 🖥 Building / Debugging

I have included my gulpfile.js so you should be able to navigate to the root directory, install the required packages and simply run:

```bash
$ gulp
```

This will build the debugging version of the site and launch browsersync which is a local web server used to see your changes in real time. do __not__ try to deploy this build as the links will most likely not work

## ⤴️ Deployment

When you are ready to deploy run the following command which uses a seperate deployemnt config file and build to _deploy

```bash
$ jekyll build --config deploy.config.yml --destination _deploy
```


## 🖋 Editting Content
Home Health's content can all be found in the 'modules' folder as seen in the file structure above.  In this section I will explain how each page type's markup (with a unique layout in the _layouts folder) is compiled into the final html.

<details><summary>
Casy Study (Click to expand)
</summary>
[ /_layouts/case-study.html ]

This layout is used for each Case Study found under each module.  This page has not been completed

```yaml
#not done
```
</details><br>

<details><summary>
Introduction (Click to expand)
</summary>
[ /_layouts/introduction.html ]
</details><br>

<details><summary>
Landing Page (Click to expand)
</summary>
[ /_layouts/landing.html ]
</details><br>

<details><summary>
Module (Click to expand)
</summary>
[ /_layouts/module.html ]
</details><br>

<details><summary>
Modules (Click to expand)
</summary>
[ /_layouts/modules.html ]
</details><br>

<details><summary>
More On This Topic (Click to expand)
</summary>
[ /_layouts/more.html ]

This page takes quite a bit of custom frontmatter to generate a pretty customizable page.  Inside a nested list named 'sections', you can create sub lists that will be rendered within the section as a 'part'.  Parts can be rendered on the left half, the right half, or fill the entire section 
    
```yaml
sections:
  #declare a section like this, you can have as many sections as you want
  - section:

    #Sections can have either just one full part, a left part and a right part, or all three parts.  
    - part: left | right | full #must be one of these 3 types

      #title of part
      title: A Great Title 

      #Text block that will appear in the part
      text: lots of great information

      # A block that takes in an array and displays mutiple small circles containing images
      circles: ['thing', 'thing', 'thing'] 

      # A block that takes in an array and displays mutiple questions
      questions: ['How did you feel?', 'What were the ramifications?'] 
 
```
</details><br>

<details><summary>
Branching Narrative (Click to expand)
</summary>
[ /_layouts/more.html ]
</details><br>

## 📚 Built With

* [Jekyll](https://jekyllrb.com/) - The web framework used
* [Swiper](http://idangero.us/swiper/) - JS carousell library
* [Jquery](https://jquery.com/) - A godsend
* [Skeleton](http://getskeleton.com/) - CSS Framework
* [Barba](http://barbajs.org/) - JS Framework that handles AJAX Page loading

## Authors

* **Josh Stuible** - *Main Developer* - [Visit website](https://stuible.com)

