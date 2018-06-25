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
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_includes`
    - Where some common / reusable html elements are kept (referenced and compiled with Jekyll)
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_js`
    - Where unconcatoncated and unminified javascript is kept
- ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) `_layouts`
    - Where the templates for the different pages used by jekyll are kept ( Jekyll uses the Liquid templating engine created by Shopify)
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `_site`
    - where the final / compiled site is found
- ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `css`
    - where the compiled, concatoned and minified css is put by gulp before being copied to _site/css by jekyll
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


## 🖥 Building

I have included my gulpfile.js so you should be able to navigate to the root directory, install the required packages and simply run:

```
$ gulp
```

## ⤴️ Deployment

Jekyll builds into a flat file website (found in _sites).  SImple build and deply onto any web server

## 📚 Built With

* [Jekyll](https://jekyllrb.com/) - The web framework used
* [Swiper](http://idangero.us/swiper/) - JS carousell library
* [Jquery](https://jquery.com/) - A godsend
* [Skeleton](http://getskeleton.com/) - CSS Framework
* [Barba](http://barbajs.org/) - JS Framework that handles AJAX Page loading

## Authors

* **Josh Stuible** - *Main Developer* - [Visit website](https://stuible.com)

