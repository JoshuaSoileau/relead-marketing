var pageContent = 	document.getElementById('page-content'),
	winHeight 	= 	window.innerHeight,
	blur		=	document.getElementById('blur-container'),
	blurWrap 	=	document.getElementById('blur-content'),
	translationStyle; 


// Controls blurred elements in header
// if not on mobile
if(typeof window.orientation == 'undefined'){
	// copy & paste content into blurred element
	blurWrap.innerHTML = pageContent.outerHTML;
	// manually set the hieght of the new content
	blur.style.height = winHeight + 'px';

	window.addEventListener('scroll', function() {
		// get new scroll Y position
		var scrollTop = (document.all) ? document.body.scrollTop : window.pageYOffset;
		// inline style attribute for translation of blurred content
		translationStyle = 'translate3d(0,' + (-scrollTop + 'px') + ',0)';
		blurWrap.style.cssText = '-webkit-transform:' + translationStyle
								+ ';-moz-transform:' + translationStyle
								+ ';transform:' + translationStyle
								+ ';height:' + winHeight + 'px';
	});
}