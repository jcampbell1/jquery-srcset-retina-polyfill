(function($,window) {
	var DEVICE_PIXEL_RATIO = window.devicePixelRatio;
	
	// returns an array of objects of the form {src: url, ratio: float }
	//   array is sorted in asending order by the pixel ratio
	$.parseSrcset = function(text) {
		var result = [];
		var text = $.trim(text);
		var items = text.split(',');
		for(var i = 0; i< items.length; i++) {
			var img = $.trim(items[i]).split(/\s+/);
			if (img.length < 2) 
				continue;
			var r = { url: img[0] };
			if(img[1].substr(-1,1) == 'x') {
				r.ratio = parseFloat( img[1].substr(0,img[1].length -1) );
			}
			r.ratio && result.push(r);
		}
		result.sort(function(a,b) {
			return a.ratio > b.ratio;
		});
		return result;
	};
	
	
	if(!DEVICE_PIXEL_RATIO || DEVICE_PIXEL_RATIO == 1 || 'srcset' in document.createElement('img')) {
		$.fn.srcset = function() { return this };
	} else {
		$.fn.srcset = function() {
			return this.each(function() {
				var images = $.parseSrcset($(this).attr('srcset'));
				var current_ratio = 1;
				var target_src;
				for(var i = 0; i< srcset.length;i++) {
					if(images[i].ratio > current_ratio) {
						target_src = images[i].src;
						current_ratio = images[i].ratio;
					}
					if(current_ratio >= DEVICE_PIXEL_RATIO)
						break;
				}
				if(target_src) {
					$(this).attr('src',target_src);
				}
			});
		};
	}
	
})(jQuery,window)