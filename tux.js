const COLOR_RED = 'rgba(255, 26, 104, 1)';
const COLOR_BLUE = 'rgba(54, 162, 235, 1)';
const COLOR_YELLOW = 'rgba(255, 206, 86, 1)';
const COLOR_GREEN = 'rgba(75, 192, 192, 1)';
const COLOR_PURPLE = 'rgba(153, 102, 255, 1)';
const COLOR_GREY = 'rgba(215, 215, 215, 1)';
const COLOR_BLACK = 'rgba(0, 0, 0, 1)';
const COLOR_WHITE = 'rgba(255, 255, 255, 1)';
const COLOR_DARK_BLUE = 'rgba(15, 10, 222, 1)';
const COLOR_AQUA = 'rgba(54, 224, 235, 1)'; // for axis drawing

const COLOR_FOOT = 'rgba(205, 168, 9, 1)';
const COLOR_JUMPER = 'rgba(99, 99, 99, 1)';
const COLOR_BELLY = 'rgba(242, 242, 242, 1)';

const COLOR_ORANGE_WIN = 'rgba(248, 104, 44, 1)';
const COLOR_GREEN_WIN = 'rgba(145, 195, 0, 1)';
const COLOR_BLUE_WIN = 'rgba(0, 180, 241, 1)';
const COLOR_YELLOW_WIN = 'rgba(255, 195, 0, 1)';

const TEXT_FONT_DEFAULT = "20px Arial";

/* PENGUIN VARIABLES */
var main_body_oval_X = 0; // starting x position of the tux
var main_body_oval_Y = 0; // starting y position
var s = 0.0; // size of the Tux
var debug_flag = false;
var paint_flag = false;

var right_temple_X_offset = 200;
var left_hip_start_X = 0;
var left_hip_start_Y = 0;
var right_hip_start_X = 0;
var right_hip_start_Y = 0;
var arm_offset_X = 110;
var arm_offset_Y = 135;

var left_foot_X = 0;
var left_foot_Y = 0;
var right_foot_X = 0;
var right_foot_Y = 0;

var left_eye_X = 0;
var left_eye_Y = 0;
var right_eye_X = 0;
var right_eye_Y = 0;

var beak_eye_X = 0;
var beak_eye_Y = 0;

//var foot_width = 165*s;
//var foot_height = 50*s;


/* GREATER THAN SIGN VARIABLES */
var gr_sign_X = 0;
var gr_sign_Y = 0;
var gs = 0.0; // size of the greater than sign


/* WINDOWS LOGO VARIALBES */
var win_logo_X = 0;
var win_logo_Y = 0;
var ws = 0.0; // size of the windows logo


// 'size' variable is the number from 0.1 to 1 where 1 means the original
// and most huge size while 0.1 means the most small size of tux
function draw_tux(ctx, coord_x, coord_y, size, d_flag, p_flag)
{
	main_body_oval_X = coord_x;
	main_body_oval_Y = coord_y;
	s = size;
	debug_flag = d_flag;
	paint_flag = p_flag;

	draw_body(ctx);
	draw_body(ctx);
	draw_left_arm(ctx);
	draw_right_arm(ctx);

	// drawing the white belly
	draw_belly(ctx);

	// drawing left foot
	left_foot_X = left_hip_start_X - 30*s;
	left_foot_Y = left_hip_start_Y + 250*s + 100*s;
	draw_foot(ctx, left_foot_X, left_foot_Y);

	// drawing right foot
	right_foot_X = right_hip_start_X - 165*s + 30*s;
	right_foot_Y = right_hip_start_Y + 250*s + 100*s;
	draw_foot(ctx, right_foot_X, right_foot_Y);

	draw_feet_jumper(ctx);
	
	draw_left_eye(ctx);
	draw_left_pupil(ctx);

	draw_right_eye(ctx);
	draw_right_pupil(ctx);

	draw_beak(ctx);
}

function draw_greater_than_sign(ctx, coord_x, coord_y, size, d_flag, p_flag)
{
	gr_sign_X = coord_x;
	gr_sign_Y = coord_y;
	gs = size;
	debug_flag = d_flag;
	paint_flag = p_flag;

	var p1_x = gr_sign_X + 220*gs;
	var p1_y = gr_sign_Y + 90*gs;
	draw_point_if_debug(ctx, p1_x, p1_y, COLOR_RED);

	ctx.beginPath();
		ctx.moveTo(gr_sign_X, gr_sign_Y);
		ctx.lineTo(p1_x, p1_y);
		ctx.bezierCurveTo(p1_x, p1_y,
						  p1_x + 30*gs, // p2_x
						  p1_y + 30*gs - 20*gs, // p2_y - 20
						  p1_x + 30*gs,
						  p1_y + 30*gs);

		var p2_x = p1_x + 30*gs;
		var p2_y = p1_y + 30*gs;
		draw_point_if_debug(ctx, p2_x, p2_y, COLOR_RED);
		
		ctx.lineTo(p2_x, p2_y + 25*gs);
		ctx.bezierCurveTo(p2_x,
						  p2_y + 25*gs + 20*gs,
						  p1_x, // p3_x
						  p2_y + 25*gs + 30*gs, // p3_y
						  p1_x,
						  p2_y + 25*gs + 30*gs);

		var p3_x = p1_x;
		var p3_y = p2_y + 25*gs + 30*gs;
		draw_point_if_debug(ctx, p3_x, p3_y, COLOR_RED);
		
		ctx.lineTo(gr_sign_X, // p4_x
				   p1_y + 90*gs + 30*gs + 25*gs + 30*gs); // p4_y

		var p4_x = gr_sign_X;
		var p4_y = p1_y + 90*gs + 30*gs + 25*gs + 30*gs;

		draw_point_if_debug(ctx, p4_x, p4_y, COLOR_RED);

		ctx.bezierCurveTo(p4_x - 20*gs, p4_y,
						  p4_x - 30*gs, p4_y - (30/2)*gs, // p5_x
						  p4_x - 30*gs, p4_y - (30/2)*gs); // p5_y
		
		var p5_x = p4_x - 30*gs;
		var p5_y = p4_y - (30/2)*gs;	
		draw_point_if_debug(ctx, p5_x, p5_y, COLOR_RED);
		
		ctx.lineTo(p5_x - 6*gs, // p6_x
				   p5_y - 14*gs); // p6_y
		
		var p6_x = p5_x - 6*gs;
		var p6_y = p5_y - 14*gs;
		draw_point_if_debug(ctx, p6_x, p6_y, COLOR_RED);
		
		ctx.bezierCurveTo(p6_x, p6_y - 20*gs,
						  p6_x + 12*gs, p6_y - 30*gs, // p7_x
						  p6_x + 12*gs, p6_y - 30*gs); // p7_y	
		
		var p7_x = p6_x + 12*gs;
		var p7_y = p6_y - 30*gs;
		draw_point_if_debug(ctx, p7_x, p7_y, COLOR_RED);

		ctx.lineTo(p7_x + 180*gs, gr_sign_Y + (p4_y - gr_sign_Y)/2);
		
		var p8_x = p7_x + 180*gs;
		var p8_y = gr_sign_Y + (p4_y - gr_sign_Y)/2;
		draw_point_if_debug(ctx, p8_x, p8_y, COLOR_RED);

		ctx.lineTo(p7_x, gr_sign_Y + (p4_y - p7_y));
		
		var p9_x = p7_x;
		var p9_y = gr_sign_Y + (p4_y - p7_y);
		draw_point_if_debug(ctx, p9_x, p9_y, COLOR_RED);

		ctx.bezierCurveTo(p9_x, p9_y,
						  p9_x - (30/2)*gs, p9_y - 30*gs + 20*gs, // p10_x
						  p9_x - (30/2)*gs, p9_y - 30*gs); // p10_y

		var p10_x = p9_x - (30/2)*gs;
		var p10_y = p9_y - 30*gs;
		draw_point_if_debug(ctx, p10_x, p10_y, COLOR_RED);

		ctx.lineTo(p10_x + 6*gs, p10_y - 14*gs);

		var p11_x = p10_x + 6*gs;
		var p11_y = p10_y - 14*gs;	
		draw_point_if_debug(ctx, p11_x, p11_y, COLOR_RED);
		
		ctx.bezierCurveTo(p11_x, p11_y,
						  gr_sign_X - 20*gs, gr_sign_Y,
						  gr_sign_X, gr_sign_Y);
						  
		ctx.strokeStyle = COLOR_BLACK;
		ctx.stroke();
		fill_if_paint_flag(ctx, COLOR_BLACK);
	ctx.closePath();
}

function draw_windows_logo(ctx, coord_x, coord_y, size, d_flag, p_flag)
{
	win_logo_X = coord_x;
	win_logo_Y = coord_y;
	ws = size;
	debug_flag = d_flag;
	paint_flag = p_flag;
	
	// drawing top-left part
	ctx.beginPath();
		var tl_p1_x = win_logo_X;	
		var tl_p1_y = win_logo_Y;
		draw_point_if_debug(ctx, tl_p1_x, tl_p1_y, COLOR_RED);
		
		var tl_p2_x = tl_p1_x + 240*ws;
		var tl_p2_y = tl_p1_y + 10*ws;
		draw_point_if_debug(ctx, tl_p2_x, tl_p2_y, COLOR_RED);

		var tl_c1_x1 = tl_p1_x + 160*ws; // x1 coordinate of the first curve
		var tl_c1_y1 = tl_p1_y - 75*ws;
		var tl_c1_x2 = tl_p2_x;
		var tl_c1_y2 = tl_p2_y; // y1 coordinate of the second curve

		if (debug_flag)
		{
			ctx.fillStyle = COLOR_PURPLE;
			ctx.fillRect(tl_c1_x1, tl_c1_y1, 3*ws, 3*ws);
			ctx.fillRect(tl_c1_x2, tl_c1_y2, 3*ws, 3*ws);
		}

		ctx.moveTo(tl_p1_x, tl_p1_y);
		ctx.bezierCurveTo(tl_c1_x1, tl_c1_y1,
						  tl_c1_x2, tl_c1_y2,
						  tl_p1_x + 240*ws,
						  tl_p1_y + 10*ws);

		var tl_p3_x = tl_p2_x - 50*ws;
		var tl_p3_y = tl_p2_y + 190*ws;

		ctx.lineTo(tl_p3_x, tl_p3_y);
		draw_point_if_debug(ctx, tl_p3_x, tl_p3_y, COLOR_RED);

		var tl_p4_x = tl_p3_x - 240*ws;
		var tl_p4_y = tl_p3_y - 10*ws;
		draw_point_if_debug(ctx, tl_p4_x, tl_p4_y, COLOR_RED);
		
		var tl_c2_x1 = tl_p3_x;
		var tl_c2_y1 = tl_p3_y;
		var tl_c2_x2 = tl_p4_x + 160*ws;
		var tl_c2_y2 = tl_p4_y - 75*ws;

		ctx.bezierCurveTo(tl_c2_x1, tl_c2_y1,
						  tl_c2_x2, tl_c2_y2,
						  tl_p4_x, tl_p4_y);
		ctx.lineTo(tl_p1_x, tl_p1_y);
		fill_and_stroke_if_paint_flag(ctx, COLOR_ORANGE_WIN);
	ctx.closePath();

	// drawing top-right part
	ctx.beginPath();	
		// KEY MOMENT!!!
		var tr_p1_x = tl_p2_x + 32*ws; // top-right first point x1
		var tr_p1_y = tl_p2_y + 22*ws;
		// KEY MOMENT!!!
		draw_point_if_debug(ctx, tr_p1_x, tr_p1_y, COLOR_RED);	

		var tr_p2_x = tr_p1_x + 240*ws;
		var tr_p2_y = tr_p1_y + 10*ws;
		draw_point_if_debug(ctx, tr_p2_x, tr_p2_y, COLOR_RED);

		var tr_c1_x1 = tr_p1_x + 100*ws;
		var tr_c1_y1 = tr_p1_y + 75*ws; // top-right first curve y1
		var tr_c1_x2 = tr_p2_x;
		var tr_c1_y2 = tr_p2_y;

		if (debug_flag)
		{
			ctx.fillStyle = COLOR_PURPLE;
			ctx.fillRect(tr_c1_x1, tr_c1_y1, 3*ws, 3*ws);
			ctx.fillRect(tr_c1_x2, tr_c1_y2, 3*ws, 3*ws);
		}

		ctx.moveTo(tr_p1_x, tr_p1_y);

		ctx.bezierCurveTo(tr_c1_x1, tr_c1_y1,
						  tr_c1_x2, tr_c1_y2,
						  tr_p2_x, tr_p2_y);

		var tr_p3_x = tr_p2_x - 50*ws;
		var tr_p3_y = tr_p2_y + 190*ws;

		ctx.lineTo(tr_p3_x, tr_p3_y);
		draw_point_if_debug(ctx, tr_p3_x, tr_p3_y, COLOR_RED);
		
		var tr_p4_x = tr_p3_x - 240*ws;
		var tr_p4_y = tr_p3_y - 10*ws;
		draw_point_if_debug(ctx, tr_p4_x, tr_p4_y, COLOR_RED);
	
		var tr_c2_x1 = tr_p3_x;
		var tr_c2_y1 = tr_p3_y;
		var tr_c2_x2 = tr_p4_x + 100*ws;
		var tr_c2_y2 = tr_p4_y + 75*ws;

		ctx.bezierCurveTo(tr_c2_x1, tr_c2_y1,
						  tr_c2_x2, tr_c2_y2,
						  tr_p4_x, tr_p4_y);
		ctx.lineTo(tr_p1_x, tr_p1_y);
		fill_and_stroke_if_paint_flag(ctx, COLOR_GREEN_WIN);
	ctx.closePath();

	// drawing bottom-left part
	ctx.beginPath();	
		// KEY MOMENT!!!
		var bl_p1_x = tl_p4_x - 10*ws;
		var bl_p1_y = tl_p4_y + 39*ws;
		draw_point_if_debug(ctx, bl_p1_x, bl_p1_y, COLOR_RED);
		// KEY MOMENT!!!
		
		var bl_p2_x = bl_p1_x + 240*ws;
		var bl_p2_y = bl_p1_y + 10*ws;
		draw_point_if_debug(ctx, bl_p2_x, bl_p2_y, COLOR_RED);

		var bl_c1_x1 = bl_p1_x + 160*ws; // x1 coordinate of the first curve
		var bl_c1_y1 = bl_p1_y - 75*ws;
		var bl_c1_x2 = bl_p2_x;
		var bl_c1_y2 = bl_p2_y; // y1 coordinate of the second curve

		if (debug_flag)
		{
			ctx.fillStyle = COLOR_PURPLE;
			ctx.fillRect(bl_c1_x1, bl_c1_y1, 3*ws, 3*ws);
			ctx.fillRect(bl_c1_x2, bl_c1_y2, 3*ws, 3*ws);
		}

		ctx.moveTo(bl_p1_x, bl_p1_y);
		ctx.bezierCurveTo(bl_c1_x1, bl_c1_y1,
						  bl_c1_x2, bl_c1_y2,
						  bl_p1_x + 240*ws,
						  bl_p1_y + 10*ws);

		var bl_p3_x = bl_p2_x - 50*ws;
		var bl_p3_y = bl_p2_y + 190*ws;

		ctx.lineTo(bl_p3_x, bl_p3_y);
		draw_point_if_debug(ctx, bl_p3_x, bl_p3_y, COLOR_RED);

		var bl_p4_x = bl_p3_x - 240*ws;
		var bl_p4_y = bl_p3_y - 10*ws;
		draw_point_if_debug(ctx, bl_p4_x, bl_p4_y, COLOR_RED);
		
		var bl_c2_x1 = bl_p3_x;
		var bl_c2_y1 = bl_p3_y;
		var bl_c2_x2 = bl_p4_x + 160*ws;
		var bl_c2_y2 = bl_p4_y - 75*ws;

		ctx.bezierCurveTo(bl_c2_x1, bl_c2_y1,
						  bl_c2_x2, bl_c2_y2,
						  bl_p4_x, bl_p4_y);
		ctx.lineTo(bl_p1_x, bl_p1_y);
		fill_and_stroke_if_paint_flag(ctx, COLOR_BLUE_WIN);
	ctx.closePath();

	// drawing bottom-right part
	ctx.beginPath();	
		// KEY MOMENT!!!
		var br_p1_x = bl_p2_x + 32*ws; // top-right first point x1
		var br_p1_y = bl_p2_y + 22*ws;
		// KEY MOMENT!!!

		draw_point_if_debug(ctx, br_p1_x, br_p1_y, COLOR_RED);
		

		var br_p2_x = br_p1_x + 240*ws;
		var br_p2_y = br_p1_y + 10*ws;
		draw_point_if_debug(ctx, br_p2_x, br_p2_y, COLOR_RED);

		var br_c1_x1 = br_p1_x + 100*ws;
		var br_c1_y1 = br_p1_y + 75*ws; // top-right first curve y1
		var br_c1_x2 = br_p2_x;
		var br_c1_y2 = br_p2_y;

		if (debug_flag)
		{
			ctx.fillStyle = COLOR_PURPLE;
			ctx.fillRect(br_c1_x1, br_c1_y1, 3*ws, 3*ws);
			ctx.fillRect(br_c1_x2, br_c1_y2, 3*ws, 3*ws);
		}

		ctx.moveTo(br_p1_x, br_p1_y);
		ctx.bezierCurveTo(br_c1_x1, br_c1_y1,
						  br_c1_x2, br_c1_y2,
						  br_p2_x, br_p2_y);

		var br_p3_x = br_p2_x - 50*ws;
		var br_p3_y = br_p2_y + 190*ws;

		ctx.lineTo(br_p3_x, br_p3_y);
		draw_point_if_debug(ctx, br_p3_x, br_p3_y, COLOR_RED);
	
		var br_p4_x = br_p3_x - 240*ws;
		var br_p4_y = br_p3_y - 10*ws;
		draw_point_if_debug(ctx, br_p4_x, br_p4_y, COLOR_RED);
	
		var br_c2_x1 = br_p3_x;
		var br_c2_y1 = br_p3_y;
		var br_c2_x2 = br_p4_x + 100*ws;
		var br_c2_y2 = br_p4_y + 75*ws;

		ctx.bezierCurveTo(br_c2_x1, br_c2_y1,
						  br_c2_x2, br_c2_y2,
						  br_p4_x, br_p4_y);
		ctx.lineTo(br_p1_x, br_p1_y);
		fill_and_stroke_if_paint_flag(ctx, COLOR_YELLOW_WIN);
	ctx.closePath();
}

function draw_body(ctx)
{
	if (debug_flag)
	{
		draw_dividing_line(ctx);
		draw_axis(ctx);
	}
	draw_top(ctx);
	draw_left_temple_side(ctx);
	draw_right_temple_side(ctx);
	draw_left_hip(ctx);
	draw_right_hip(ctx);
	draw_left_hip_cont(ctx);
	draw_right_hip_cont(ctx);
	draw_torso(ctx);
	if (paint_flag)
		paint_body(ctx);
}

function draw_left_arm(ctx)
{
	var larm_cur1_x1 = left_hip_start_X - s*5;
	var larm_cur1_y1 = left_hip_start_Y + s*50;
	var larm_cur1_x2 = left_hip_start_X - s*120;
	var larm_cur1_y2 = left_hip_start_Y + s*90;

	var larm_cur2_x1 = left_hip_start_X - s*96;
	var larm_cur2_y1 = left_hip_start_Y + s*157;
	var larm_cur2_x2 = left_hip_start_X + s*5;
	var larm_cur2_y2 = left_hip_start_Y + s*60;
				
	ctx.beginPath();
		ctx.fillStyle = COLOR_BLACK;
		ctx.lineStyle = COLOR_BLACK;
		// drawing the first curve
		ctx.moveTo(left_hip_start_X, left_hip_start_Y - s*16);
		ctx.bezierCurveTo(larm_cur1_x1, larm_cur1_y1,
						  larm_cur1_x2, larm_cur1_y2,
						  left_hip_start_X - s*arm_offset_X,
						  left_hip_start_Y + s*arm_offset_Y);
		// drawing the second curve
		ctx.bezierCurveTo(larm_cur2_x1, larm_cur2_y1,
						  larm_cur2_x2, larm_cur2_y2,
						  left_hip_start_X - s*15, left_hip_start_Y + s*110);
		// drawing the additional line that will close the contour of the figure
		// to make it convenient to paint the figure bounded by our curves
		ctx.lineTo(main_body_oval_X + s*(right_temple_X_offset/2), left_hip_start_Y);
		ctx.lineTo(left_hip_start_X, left_hip_start_Y - s*16);
		// painting the area bounded by the curves
		ctx.stroke();
		if (paint_flag)
			ctx.fill();
	ctx.closePath();
}
			
function draw_right_arm(ctx)
{
	var rarm_cur1_x1 = right_hip_start_X + s*5;
	var rarm_cur1_y1 = right_hip_start_Y + s*50;
	var rarm_cur1_x2 = right_hip_start_X + s*120;
	var rarm_cur1_y2 = right_hip_start_Y + s*90;

	var rarm_cur2_x1 = right_hip_start_X + s*96;
	var rarm_cur2_y1 = right_hip_start_Y + s*157;
	var rarm_cur2_x2 = right_hip_start_X - s*5;
	var rarm_cur2_y2 = right_hip_start_Y + s*60;

	ctx.beginPath();
		ctx.fillStyle = COLOR_BLACK;
		ctx.lineStyle = COLOR_BLACK;
		// drawing the first curve
		ctx.moveTo(right_hip_start_X, right_hip_start_Y - s*16);
		ctx.bezierCurveTo(rarm_cur1_x1, rarm_cur1_y1,
						  rarm_cur1_x2, rarm_cur1_y2,
						  right_hip_start_X + s*arm_offset_X,
						  right_hip_start_Y + s*arm_offset_Y);
		// drawing the second curve
		ctx.bezierCurveTo(rarm_cur2_x1, rarm_cur2_y1,
						  rarm_cur2_x2, rarm_cur2_y2,
						  right_hip_start_X + s*15, right_hip_start_Y + s*110);
		// drawing the additional line
		ctx.lineTo(main_body_oval_X + s*(right_temple_X_offset/2), left_hip_start_Y);
		ctx.lineTo(right_hip_start_X, right_hip_start_Y - s*16);
		// painting the area bounded by the curves
		ctx.stroke();
		if (paint_flag)
			ctx.fill();
	ctx.closePath();
}

function draw_foot(ctx, foot_X, foot_Y)
{
	var foot_width = 165*s;
	var foot_height = 50*s;	

	var lc_x1 = foot_X - 25*s; // left curve x1
	var lc_y1 = foot_Y - 12*s;
	var lc_x2 = foot_X;
	var lc_y2 = foot_Y - foot_height;

	var rc_x1 = foot_X + foot_width; // right curve x1
	var rc_y1 = foot_Y - foot_height;
	var rc_x2 = foot_X + foot_width + 25*s;
	var rc_y2 = foot_Y - 12*s;

	var top_line_X1 = foot_X + 25*s;
	var top_line_Y1 = foot_Y - foot_height - 40*s;
	var top_line_X2 = foot_X + foot_width - 25*s;
	var top_line_Y2 = foot_Y - foot_height - 40*s;

	if (debug_flag)
	{
		ctx.fillStyle = COLOR_RED;
		ctx.fillRect(foot_X, foot_Y, 5*s, 5*s);
		ctx.fillStyle = COLOR_DARK_BLUE;
		ctx.fillRect(lc_x1, lc_y1, 5*s, 5*s);
		ctx.fillRect(lc_x2, lc_y2, 5*s, 5*s);
		ctx.fillRect(top_line_X1, top_line_Y1, 5*s, 5*s);
		ctx.fillRect(top_line_X2, top_line_Y2, 5*s, 5*s);
		ctx.fillStyle = COLOR_BLACK;
	}

	ctx.beginPath();
		ctx.moveTo(foot_X, foot_Y);
		ctx.lineTo(foot_X + foot_width, foot_Y);
		ctx.moveTo(foot_X, foot_Y);
		ctx.bezierCurveTo(lc_x1, lc_y1, lc_x2, lc_y2, foot_X, foot_Y - foot_height);
		ctx.bezierCurveTo(top_line_X1, top_line_Y1,
						  top_line_X2, top_line_Y2,
						  foot_X + foot_width, foot_Y - foot_height);
		ctx.bezierCurveTo(rc_x1, rc_y1, rc_x2, rc_y2, foot_X + foot_width, foot_Y);

		fill_and_stroke_if_paint_flag(ctx, COLOR_FOOT);	
	ctx.closePath();
}

function draw_feet_jumper(ctx)
{
	// the top-left point
	var left_foot_x1 = left_foot_X + 165*s - 22*s;
	var left_foot_y1 = left_foot_Y - 60*s - 8*s;

	// the bottom-left point
	var left_foot_x2 = left_foot_X + 165*s + 5*s;
	var left_foot_y2 = left_foot_Y - 3*s;

	// the top-right point
	var right_foot_x1 = right_foot_X + 39*s;
	var right_foot_y1 = right_foot_Y - 60*s - 14*s;

	// the bottom-right point
	var right_foot_x2 = right_foot_X - 5*s;
	var right_foot_y2 = right_foot_Y - 3*s;

	var x1 = right_foot_x1 - 55*s;
	var y1 = right_foot_y1 + 13*s;
	var x2 = right_foot_x2 - 12*s;
	var y2 = right_foot_y2 - 8*s;

	var X1 = left_foot_x2 + 23*s;
	var Y1 = left_foot_y2 - 25*s;
	var X2 = left_foot_x1 + 7*s;
	var Y2 = left_foot_y1 - 3*s;

	var top_x1 = left_foot_x1 + 5*s;
	var top_y1 = left_foot_y1 - 8*s;
	var top_x2 = main_body_oval_X +
				 s*(right_temple_X_offset/2);
	var top_y2 = right_foot_y1 + 30*s + 6*s;

	var top2_x1 = main_body_oval_X +
				  s*(right_temple_X_offset/2);
	var top2_y1 = right_foot_y1 + 30*s + 6*s;
	var top2_x2 = right_foot_x1 - 12*s;
	var top2_y2 = right_foot_y1 - 8*s;

	var bottom_x1 = right_foot_x2;
	var bottom_y1 = right_foot_y2 - 4*s;
	var bottom_x2 = left_foot_x2;
	var bottom_y2 = left_foot_y2 - 4*s;

	if (debug_flag)
	{
		//ctx.fillStyle = COLOR_GREEN;
		//ctx.fillRect(left_foot_x1, left_foot_y1, 5*s, 5*s);
		//ctx.fillRect(left_foot_x2, left_foot_y2, 5*s, 5*s);
		//ctx.fillRect(right_foot_x1, right_foot_y1, 5*s, 5*s);
		//ctx.fillRect(right_foot_x2, right_foot_y2, 5*s, 5*s);
		ctx.fillStyle = COLOR_PURPLE;
		//ctx.fillRect(x1, y1, 3*s, 3*s);
		//ctx.fillRect(x2, y2, 3*s, 3*s);
		//ctx.fillRect(X1, Y1, 3*s, 3*s);
		//ctx.fillRect(X2, Y2, 3*s, 3*s);
		//ctx.fillRect(top_x1, top_y1, 3*s, 3*s);
		//ctx.fillRect(top_x2, top_y2, 3*s, 3*s);
		//ctx.fillRect(top2_x1, top2_y1, 3*s, 3*s);
		//ctx.fillRect(top2_x2, top2_y2, 3*s, 3*s);
		ctx.fillRect(bottom_x1, bottom_y1, 3*s, 3*s);
		ctx.fillRect(bottom_x2, bottom_y2, 3*s, 3*s);
	}

	ctx.beginPath();
		// top-left
		ctx.moveTo(left_foot_x1, left_foot_y1);

		// half way to the top-right point
		ctx.bezierCurveTo(top_x1, top_y1,
						  top_x2, top_y2,
						  main_body_oval_X + s*(right_temple_X_offset/2),
						  right_foot_y1 + 30*s);
		// top-right
		ctx.bezierCurveTo(top2_x1, top2_y1,
						  top2_x2, top2_y2,
						  right_foot_x1, right_foot_y1);
		// bottom-right
		ctx.bezierCurveTo(x1, y1, x2, y2,
						  right_foot_x2, right_foot_y2);
		// bottom-left
		ctx.bezierCurveTo(bottom_x1, bottom_y1,
						  bottom_x2, bottom_y2,
						  left_foot_x2, left_foot_y2);

		// top-left
		ctx.bezierCurveTo(X1, Y1, X2, Y2,
						  left_foot_x1, left_foot_y1);

		fill_and_stroke_if_paint_flag(ctx, COLOR_JUMPER);	
	ctx.closePath();
}

function draw_left_eye(ctx)
{
	left_eye_X = main_body_oval_X + 48*s;
	left_eye_Y = main_body_oval_Y + 110*s;
	ctx.beginPath();
		ctx.ellipse(left_eye_X, left_eye_Y,
					50*s, // x-radius
					62*s, // y-radius
					0, // rotation
					0, // start_angle
					2 * Math.PI); // direction
		ctx.lineWidth = 4;
		ctx.strokeStyle = COLOR_JUMPER;
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.strokeStyle = COLOR_BLACK;
		if (paint_flag)
		{
			ctx.fillStyle = COLOR_WHITE;
			ctx.fill();
			ctx.fillStyle = COLOR_BLACK;
		}
	ctx.closePath();
}

function draw_left_pupil(ctx)
{
	ctx.beginPath();
		ctx.ellipse(left_eye_X + 35*s, left_eye_Y + 3*s,
					15*s, // x-radius
					24*s, // y-radius
					0, // rotation
					0, // start_angle
					2 * Math.PI); // direction
		ctx.stroke();
		if (paint_flag)
		{
			ctx.fillStyle = COLOR_BLACK;
			ctx.fill();
		}	
	ctx.closePath();
}

function draw_right_eye(ctx)
{
	right_eye_X = main_body_oval_X + 153*s;
	right_eye_Y = main_body_oval_Y + 110*s;
	ctx.beginPath();
		ctx.ellipse(right_eye_X, right_eye_Y,
					52*s, // x-radius
					42*s, // y-radius
					-Math.PI / 22, // rotation
					0, // start_angle
					2 * Math.PI); // direction
		ctx.lineWidth = 4;
		ctx.strokeStyle = COLOR_JUMPER;
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.strokeStyle = COLOR_BLACK;
		if (paint_flag)
		{
			ctx.fillStyle = COLOR_WHITE;
			ctx.fill();
			ctx.fillStyle = COLOR_BLACK;
		}
	ctx.closePath();
}

function draw_right_pupil(ctx)
{
	ctx.beginPath();
		ctx.ellipse(right_eye_X - 39*s, right_eye_Y + 3*s,
					12*s, // x-radius
					21*s, // y-radius
					0, // rotation
					0, // start_angle
					2 * Math.PI); // direction
		ctx.stroke();
		if (paint_flag)
		{
			ctx.fillStyle = COLOR_BLACK;
			ctx.fill();
		}
	ctx.closePath();
}

function draw_beak(ctx)
{
	beak_X = main_body_oval_X + 56*s;
	beak_Y = main_body_oval_Y + 155*s;
	
	ctx.beginPath();
		ctx.moveTo(beak_X, beak_Y);
		ctx.bezierCurveTo(beak_X + 25*s, beak_Y - 15*s,
						  beak_X + 43*s, beak_Y - 15*s,
						  beak_X + 43*s, beak_Y - 15*s);
		ctx.bezierCurveTo(beak_X + 43*s, beak_Y - 15*s,
						  beak_X + 87*s - 25*s, beak_Y - 15*s,
						  beak_X + 87*s, beak_Y);

		ctx.strokeStyle = COLOR_BLACK;
		ctx.quadraticCurveTo(beak_X + 87*s + 3*s, beak_Y + 4*s,
							 beak_X + 87*s, beak_Y + 10*s); 
		ctx.lineTo(beak_X + 50*s, beak_Y + 50*s);
		ctx.quadraticCurveTo(beak_X + 50*s - 7*s, beak_Y + 50*s + 5*s,
							 beak_X + 37*s, beak_Y + 50*s);
		ctx.lineTo(beak_X, beak_Y + 10*s);
		ctx.quadraticCurveTo(beak_X - 3*s, beak_Y + 10*s - 4*s,
							 beak_X, beak_Y);							 
		
		/*var beak_grad = ctx.createLinearGradient(beak_X, beak_Y,
												 beak_X + 87, beak_Y);
		beak_grad.addColorStop(0, 'rgba(255, 211, 252)');
		beak_grad.addColorStop(1, 'rgba(255, 62, 181)');*/
			
		if (paint_flag)
		{
			ctx.strokeStyle = COLOR_FOOT;
			ctx.fillStyle = COLOR_FOOT;
			ctx.fill();
			ctx.fillStyle = COLOR_BLACK;
		}
		else
			ctx.strokeStyle = COLOR_BLACK;
		ctx.stroke();
		ctx.strokeStyle = COLOR_BLACK;
	ctx.closePath();
}

function draw_belly(ctx)
{
	var l_x1 = left_hip_start_X - s*30 + 45*s;
	var l_y1 = left_hip_start_Y + s*250 - 50*s;
	var l_x2 = main_body_oval_X + s*(right_temple_X_offset/2) - 160*s;
	var l_y2 = main_body_oval_Y + 220*s;

	var r_x1 = main_body_oval_X + s*(right_temple_X_offset/2) + 160*s;
	var r_y1 = main_body_oval_Y + 220*s;
	var r_x2 = right_hip_start_X + s*30 - 45*s;
	var r_y2 = right_hip_start_Y + s*250 - 50*s;

	if (debug_flag)
	{
		ctx.fillStyle = COLOR_PURPLE;
		ctx.fillRect(l_x1, l_y1, 3*s, 3*s);
		ctx.fillRect(l_x2, l_y2, 3*s, 3*s);
		ctx.fillRect(r_x1, r_y1, 3*s, 3*s);
		ctx.fillRect(r_x2, r_y2, 3*s, 3*s);
	}
	
	ctx.beginPath();
/*4*/	ctx.moveTo(left_hip_start_X - 30*s,
				   left_hip_start_Y + 250*s);
		// drawing left curve
		ctx.bezierCurveTo(l_x1, l_y1, l_x2, l_y2,
						  main_body_oval_X + (right_temple_X_offset/2)*s,
						  main_body_oval_Y + 220*s);
		// drawing right curve
/*5*/	ctx.bezierCurveTo(r_x1, r_y1, r_x2, r_y2,
						  right_hip_start_X + 30*s,
						  right_hip_start_Y + 250*s);
		ctx.bezierCurveTo(right_hip_start_X + 30*s - 40*s,
						  right_hip_start_Y + 250*s + 119*s,
						  left_hip_start_X - 30*s + 40*s,
						  left_hip_start_Y + 250*s + 119*s,
						  left_hip_start_X - 30*s,
						  left_hip_start_Y + 250*s);
		ctx.lineWidth = 4;
		ctx.strokeStyle = COLOR_JUMPER;
		if (paint_flag)
		{
			ctx.fillStyle = COLOR_WHITE;
			ctx.fill();
			ctx.fillStyle = COLOR_BLACK;
		}
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.strokeStyle = COLOR_BLACK;
	ctx.closePath();
}

function fill_if_paint_flag(ctx, color)
{
	if (paint_flag)
	{
		ctx.fillStyle = color;
		ctx.fill();
		ctx.fillStyle = COLOR_BLACK;
	}
}

/* If paint_flag is set, the function fills the figure
 * associated with the context with color and adds a stroke
 * of the same color. If paint_flag is not set, the function
 * does not fill the figure but still adds a stroke in black */
function fill_and_stroke_if_paint_flag(ctx, color)
{
	if (paint_flag)
	{
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.fill();
		ctx.fillStyle = COLOR_BLACK;
	}
	else
		ctx.strokeStyle = COLOR_BLACK;
	ctx.stroke();
	ctx.strokeStyle = COLOR_BLACK;
}

/* DEBUGGING FUNCTIONS SECTION BEGINS */

function draw_dividing_line(ctx)
{
	// drawing center dividing line
	ctx.beginPath();
		ctx.strokeStyle = COLOR_BLUE;
		ctx.moveTo(main_body_oval_X + s*(right_temple_X_offset/2), 0);
		ctx.lineTo(main_body_oval_X + s*(right_temple_X_offset/2),
				   main_body_oval_Y+(canv_height - main_body_oval_Y));
		ctx.stroke();
		ctx.strokeStyle = COLOR_BLACK;
	ctx.closePath();
}

function draw_axis(ctx)
{
	ctx.beginPath();
		// drawing x-axis
		ctx.moveTo(main_body_oval_X, 0);
		ctx.lineTo(main_body_oval_X, canv_height);
		ctx.strokeStyle = COLOR_AQUA;
		ctx.stroke();
		// drawing y-axis
		ctx.moveTo(0, main_body_oval_Y);
		ctx.lineTo(canv_width, main_body_oval_Y);
		ctx.strokeStyle = COLOR_AQUA;
		ctx.stroke();	
		ctx.strokeStyle = COLOR_BLACK;
	ctx.closePath();
}

function draw_point_if_debug(ctx, x, y, color)
{
	if (debug_flag)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x, y, s*5, s*5);
		ctx.fillStyle = COLOR_BLACK;
	}
}

/* DEBUGGING FUNCTIONS SECTION ENDS */

function draw_top(ctx)
{
	// top
	ctx.beginPath();
		ctx.moveTo(main_body_oval_X, main_body_oval_Y);
		ctx.quadraticCurveTo(main_body_oval_X + s*100, main_body_oval_Y - s*80,
							 main_body_oval_X + s*right_temple_X_offset, main_body_oval_Y);
		ctx.stroke();
					
		fill_if_paint_flag(ctx);
	ctx.closePath();
}

function draw_left_temple_side(ctx)
{
	// left temple side
	ctx.beginPath();
		if (debug_flag)
		{
			ctx.fillStyle = COLOR_RED;
			// the numbers from 1 to 9 represent the anchor points of our penguin's body
			// in the debug mode, these points are marked in red and are numbered counterclockwise
			// the first point is located at the left temple of the tux
	/*1*/	ctx.fillRect(main_body_oval_X, main_body_oval_Y, s*5, s*5);
			ctx.font = TEXT_FONT_DEFAULT;
			ctx.fillText("1", main_body_oval_X-10*s, main_body_oval_Y-10*s);
			ctx.fillStyle = COLOR_BLACK;
		}

		ctx.moveTo(main_body_oval_X, main_body_oval_Y);
		ctx.quadraticCurveTo(main_body_oval_X - s*90, main_body_oval_Y + s*100,
							 main_body_oval_X - s*45, main_body_oval_Y + s*250);
		ctx.stroke();
					
		fill_if_paint_flag(ctx, COLOR_BLACK);
	ctx.closePath();
}

function draw_right_temple_side(ctx)
{
	// right temple side			
	ctx.beginPath();
		if (debug_flag)
		{
			ctx.fillStyle = COLOR_RED;
	/*9*/	ctx.fillRect(main_body_oval_X + s*right_temple_X_offset, main_body_oval_Y, s*5, s*5);
			ctx.font = TEXT_FONT_DEFAULT;
			ctx.fillText("9", (main_body_oval_X + s*right_temple_X_offset) +10*s, (main_body_oval_Y) - 10*s);
			ctx.fillStyle = COLOR_BLACK;
		}

		ctx.moveTo(main_body_oval_X + s*right_temple_X_offset, main_body_oval_Y);
		ctx.quadraticCurveTo(main_body_oval_X + s*(right_temple_X_offset+90),
							 main_body_oval_Y + s*100,
							 main_body_oval_X + s*(right_temple_X_offset+45),
							 main_body_oval_Y + s*250);
		ctx.stroke();

		fill_if_paint_flag(ctx, COLOR_BLACK);
	ctx.closePath();
}

function draw_left_hip(ctx)
{
	// left hip
	ctx.beginPath();
		if (debug_flag)
		{
			ctx.fillStyle = COLOR_RED;
	/*2*/	ctx.fillRect(main_body_oval_X - s*60, main_body_oval_Y + s*180, s*5, s*5);
			ctx.font = TEXT_FONT_DEFAULT;
			ctx.fillText("2", (main_body_oval_X - s*60) - 20*s, (main_body_oval_Y  + s*180) - 10*s);
			ctx.fillStyle = COLOR_BLACK;
		}

		left_hip_start_X = main_body_oval_X - s*60;
		left_hip_start_Y = main_body_oval_Y + s*180;

		ctx.moveTo(left_hip_start_X, left_hip_start_Y);
		ctx.quadraticCurveTo(left_hip_start_X + s*5, left_hip_start_Y + s*55,
							 left_hip_start_X - s*15, left_hip_start_Y + s*110);
		ctx.stroke();
	ctx.closePath();	
}

function draw_right_hip(ctx)
{
	// right hip
	ctx.beginPath();
		if (debug_flag)
		{
			ctx.fillStyle = COLOR_RED;
	/*8*/	ctx.fillRect(right_hip_start_X, right_hip_start_Y, s*5, s*5);
			ctx.fillStyle = COLOR_BLACK;
		}

		right_hip_start_X = main_body_oval_X + s*(right_temple_X_offset+60);
		right_hip_start_Y = main_body_oval_Y + s*180;

		ctx.moveTo(right_hip_start_X, right_hip_start_Y);
		ctx.quadraticCurveTo(right_hip_start_X - s*5, right_hip_start_Y + s*55,
							 right_hip_start_X + s*15, right_hip_start_Y + s*110);
		ctx.stroke();
	ctx.closePath();
	}

// the second curve of the left hip
function draw_left_hip_cont(ctx)
{
	// let's continue drawing the left hip
	ctx.beginPath();
		if (debug_flag)
		{
			ctx.fillStyle = COLOR_RED;
	/*3*/	ctx.fillRect(left_hip_start_X - s*15, left_hip_start_Y + s*110, s*5, s*5);
	/*4*/	ctx.fillRect(left_hip_start_X - s*30, left_hip_start_Y + s*250, s*5, s*5);
			ctx.fillStyle = COLOR_BLACK;
		}

		ctx.moveTo(left_hip_start_X - s*15, left_hip_start_Y + s*110);
		ctx.quadraticCurveTo(left_hip_start_X - s*45, left_hip_start_Y + s*180,
							 left_hip_start_X - s*30, left_hip_start_Y + s*250);
		ctx.stroke();
					
		fill_if_paint_flag(ctx, COLOR_BLACK);
	ctx.closePath();
}

// the second curve of the right hip
function draw_right_hip_cont(ctx)
{
	// let's continue drawing the right hip
	ctx.beginPath();
		if (debug_flag)
		{
			ctx.fillStyle = COLOR_RED;
	/*7*/	ctx.fillRect(right_hip_start_X + s*15, right_hip_start_Y + s*110, s*5, s*5);
	/*6*/	ctx.fillRect(right_hip_start_X + s*30, right_hip_start_Y + s*250, s*5, s*5);
			ctx.fillStyle = COLOR_BLACK;
		}

		ctx.moveTo(right_hip_start_X + s*15, right_hip_start_Y + s*110);
		ctx.quadraticCurveTo(right_hip_start_X + s*45, right_hip_start_Y + s*180,
							 right_hip_start_X + s*30, right_hip_start_Y + s*250);
		ctx.stroke();

		fill_if_paint_flag(ctx, COLOR_BLACK);
	ctx.closePath();
}

function draw_torso(ctx)
{
	// let's draw left part of the lower torso
	ctx.beginPath();
		ctx.moveTo(left_hip_start_X - s*30, left_hip_start_Y + s*250);
		ctx.bezierCurveTo(left_hip_start_X + s*15, left_hip_start_Y + s*370,
						  right_hip_start_X - s*15, right_hip_start_Y + s*370,
						  right_hip_start_X + s*30, right_hip_start_Y + s*250);
		ctx.stroke();

		fill_if_paint_flag(ctx, COLOR_BLACK);
	ctx.closePath();
}

// let's paint over the inside part of our penguin's body
function paint_body(ctx)
{
	ctx.fillStyle = COLOR_BLACK;
	ctx.lineStyle = COLOR_BLACK;

	ctx.beginPath();
		ctx.moveTo(main_body_oval_X, main_body_oval_Y); // 1
		ctx.lineTo(main_body_oval_X - s*60, main_body_oval_Y + s*180); // 2
		ctx.lineTo(main_body_oval_X + s*right_temple_X_offset + s*60, main_body_oval_Y + s*180); // 8
		ctx.lineTo(main_body_oval_X + s*right_temple_X_offset, main_body_oval_Y, s*5, s*5); // 9
		ctx.stroke();
		ctx.fill();
	ctx.closePath();
				
	ctx.beginPath();
		ctx.lineTo(left_hip_start_X - s*15, left_hip_start_Y + s*110); // 3
		ctx.lineTo(left_hip_start_X - s*30, left_hip_start_Y + s*250); // 4
		ctx.lineTo(right_hip_start_X + s*30, right_hip_start_Y + s*250);// 6
		ctx.lineTo(right_hip_start_X + s*15, right_hip_start_Y + s*110);// 7
		ctx.stroke();
		ctx.fill();
	ctx.closePath();

	ctx.beginPath();
		ctx.moveTo(left_hip_start_X - s*15, left_hip_start_Y + s*110); // 3
		ctx.lineTo(right_hip_start_X + s*15, right_hip_start_Y + s*110); // 7
		ctx.lineTo(main_body_oval_X + s*(right_temple_X_offset/2), left_hip_start_Y);
		ctx.stroke();
		ctx.fill();
	ctx.closePath();
}
