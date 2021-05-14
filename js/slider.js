document.addEventListener('DOMContentLoaded', domReady);

function domReady() {
	// I hope this over-commenting helps. Let's do this!
	// Let's use the 'active' variable to let us know when we're using it
	let active = false;
	// and define our dom elements to make it easier to read
	let scrollerMiddle = document.querySelector('.scroller-middle');
	let scrollerTop = document.querySelector('.scroller-top');


	// First we'll have to set up our event listeners
	// We want to watch for clicks on our scroller
	scrollerMiddle.addEventListener('mousedown',function(){
	  active = "middle";
	  // Add our scrolling class so the scroller has full opacity while active
	  scrollerMiddle.classList.add('scrolling');
	});
	// We also want to watch the body for changes to the state,
	// like moving around and releasing the click
	// so let's set up our event listeners
	document.body.addEventListener('mouseup',function(){
	  active = false;
	  scrollerMiddle.classList.remove('scrolling');
	});
	document.body.addEventListener('mouseleave',function(){
	  active = false;
	  scrollerMiddle.classList.remove('scrolling');
	});
	// We'll have to do the same for our top scroller
	scrollerTop.addEventListener('mousedown',function(){
		active = "top";
		scrollerTop.classList.add('scrolling');
	});
	document.body.addEventListener('mouseup',function(){
	  active = false;
	  scrollerTop.classList.remove('scrolling');
	});
	document.body.addEventListener('mouseleave',function(){
	  active = false;
	  scrollerTop.classList.remove('scrolling');
	});

	// Let's figure out where their mouse is at
	document.body.addEventListener('mousemove',function(e){
	  if (!active) return;
	  // Their mouse is here...
	  let x = e.pageX;
	  // but we want it relative to our wrapper
	  x -= document.querySelector('.wrapper').getBoundingClientRect().left;
	  // Okay let's change our state
	  scrollIt(x);
	});
	
	function scrollItPercentage(y){
		scrollIt(toPx(y, document.querySelector('.wrapper').offsetWidth));
	}
	
	// Let's use this function
	function scrollIt(x){
	  var wrapperWidth = document.querySelector('.wrapper').offsetWidth;
	  // Calculate our transform
	  let transform = toPercentage(x, wrapperWidth, false);
	  // we show all our bottom image but how much of our middle and top,
	  // that'll depend on what we're dragging
	  // if we're dragging the middle slider
	  if (active==="middle"){
		document.querySelector('.middle').style.width = transform+"%";
		scrollerMiddle.style.left = toPercentage(x-25, wrapperWidth)+"%";
		// if we're using scroller-middle, middle must always be to the right of top
		if (scrollerTop.getBoundingClientRect().left>scrollerMiddle.getBoundingClientRect().left-5){
		  document.querySelector('.top').style.width = toPercentage(x-5, wrapperWidth)+"%";
		  scrollerTop.style.left = toPercentage(x-30, wrapperWidth)+"%";
		}
	  }
	  // if we're dragging the top slider
	  if (active==="top"){
		document.querySelector('.top').style.width = transform+"%";
		scrollerTop.style.left = toPercentage(x-25, wrapperWidth)+"%";
		// if we're using scroller-top, top must always be to the left
		if (scrollerTop.getBoundingClientRect().left>scrollerMiddle.getBoundingClientRect().left-5){
			document.querySelector('.middle').style.width = toPercentage(x+5, wrapperWidth)+"%";
			scrollerMiddle.style.left = toPercentage(x-20, wrapperWidth)+"%";
		}
	  }
	}
	
	function toPercentage(x, max, useBorder = true){
		if(useBorder===true){
			x = Math.min(Math.max(x,-24),max-25);
		}else{
			x = Math.min(x,max);
		}
		return (x*100)/max;
	}
	
	function toPx(y, max){
		var x = (y*max)/100;
		x = Math.min(Math.max(x,-25),max-27);
		return x;
	}
	
	// Let's set our opening state based off the width, 
	// we want to show a bit of both images so the user can see what's going on
	var wrapperWidth = document.querySelector('.wrapper').offsetWidth;
	active = "middle";
	scrollIt(wrapperWidth - wrapperWidth / 3);
	active = "top";
	scrollIt(wrapperWidth / 3);
	active = false;


	// And finally let's repeat the process for touch events
	// first our middle scroller...
	scrollerMiddle.addEventListener('touchstart',function(){
		active = "middle";
		scrollerMiddle.classList.add('scrolling');
	});
	document.body.addEventListener('touchend',function(){
		active = false;
		scrollerMiddle.classList.remove('scrolling');
	});
	document.body.addEventListener('touchcancel',function(){
		active = false;
		scrollerMiddle.classList.remove('scrolling');
	});

	// then scroller top, our second scroller
	scrollerTop.addEventListener('touchstart',function(){
		active = "top";
		scrollerTop.classList.add('scrolling');
	});
	document.body.addEventListener('touchend',function(){
		active = false;
		scrollerTop.classList.remove('scrolling');
	});
	document.body.addEventListener('touchcancel',function(){
		active = false;
		scrollerTop.classList.remove('scrolling');
	});

	document.querySelector('.wrapper').addEventListener('touchmove',function(e){
		if (!active) return;
		e.preventDefault();
		let x = e.touches[0].pageX;
		x -= document.querySelector('.wrapper').getBoundingClientRect().left;
		scrollIt(x);
	});
	
	$(window).resize(function() { 
		active = "middle";
		var middleWidth = document.querySelector('.middle').style.width;
		scrollItPercentage((middleWidth.substring(0, middleWidth.length-1)));
		
		active = "top";
		var topWidth = document.querySelector('.top').style.width;
		scrollItPercentage((topWidth.substring(0, topWidth.length-1)));
		active = false;
	 });
}