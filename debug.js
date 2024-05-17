const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

var inc_size = 0.1;

var canv_width = canvas.width;
var canv_height = canvas.height;

// adding coordinates of mouse position
var coords = document.getElementById('mouse-coords');
function tellPos(p)
{
	coords.innerHTML = 'X: ' + p.pageX + '<br/>Y:' + p.pageY;
}
addEventListener('mousemove', tellPos, false);


function main()
{
	draw_tux(ctx,
		coord_x=250,
		coord_y=200,
		size=1.0,
		debug_flag=false,
		paint_flag=true);
}

function animate()
{
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame ||
			   window.webkitRequestAnimationFrame ||
			   window.mozRequestAnimationFrame ||
			   window.oRequestAnimationFrame ||
			   window.msRequestAnimationFrame ||
			   function(callback) {
			       window.setTimeout(callback, 1000);
			   };
	})();

	function drawShapes(ctx)
	{
		draw_tux(ctx,
		coord_x=250,
		coord_y=200,
		inc_size,
		debug_flag=false,
		paint_flag=true);
	}

	function animation(canvas, ctx, startTime)
	{
		if (inc_size < 1.0)
			inc_size = inc_size + 0.005;
		//alert(inc_size);

		// clearing the Canvas element space
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawShapes(ctx);
		// requesting new frame for animation
		requestAnimFrame(function() {
			animation(canvas, ctx, startTime);
		});
	}

	drawShapes(ctx);

	// buffer time before starting animation
	setTimeout(function() {
		var startTime = (new Date()).getTime();
		animation(canvas, ctx, startTime);
	}, 1000);

} // end of animate function

//main();
