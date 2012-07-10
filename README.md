jquery-srcset-retina-polyfill
=============================

jQuery plugin to provide support for srcset attribute of the img tag to enable alternate images on retina displays.



## Usage
It's easy

in the html:
```html
<img src="http://example.com/image.png" srcset="http://example.com/image@2x.png 2x, http://example.com/image@1.5x.png 1.5x" />
```

```javascript
$(document).ready(function() {
	$('img').srcset();
});
```

or if dynamically adding images:

```javascript
$(<img />).attr('src','http://example.com/image.png').attr('srcset','http://example.com/image@2x.png 2x').srcset().appendTo('body');
```

## Design Goals

There are many other ways to load retina images, but many of the techniques end up downloading the image twice and do unnecessary web requests.  This is designed to load the correct image, and only the correct image.  The srcset attribute is verbose compared to other techniques, but is a draft W3G standard, and is likely to be supported by future browsers.  This plugin is a no-op for browsers that natively support `srcset`.

The current W3C specification allows for specifying the the sizes of the alternate images like `/image.png 100w` or `image.png 100h`, but I do not intend to support `w` and `h` because there is no reliable way to determine the width or height of the original image without downloading.  

