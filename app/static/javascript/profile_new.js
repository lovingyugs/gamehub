var profile_post_cnt=0;
var username = localStorage.getItem('username');
var profile_res;
var grid;
function profile(count){
	var d;	
	var loop;
	var dContent;
	if(count>5)
	{
		//profile_post_cnt=count;
		loop=6;
		profile_res.post_count-=6;

	}
	else{
		//profile_post_cnt=count;
		loop=count;
		profile_res.post_count=0;
	}
	for (var i = 0; i <loop ; i++) {	
				d=document.createElement('div');
				//.html("new one"+(feed_no+1));
				//.appendTo($("#feed"));
				//feed_no++;
				var hRand = Math.random();
				var heightClass = hRand > 0.65 ? 'grid-item--height2' : hRand > 0.25 ? 'grid-item--height3' : '';
				$(d).addClass("grid-item-profile"+' '+heightClass);
				dContent=document.createElement('div');
				$(dContent).addClass('grid-item-content-profile')
				var feed_id="profile-feed"+(profile_post_cnt);
				$(dContent).attr('id',feed_id);
				
				var self_header=document.createElement('div');
				$(self_header).addClass("self-header");
				$(self_header).appendTo(dContent);
					var self_type=document.createElement('div');
					$(self_type).addClass('self-type');
					$(self_type).appendTo(self_header);
					var self_date=document.createElement('div');
					$(self_date).addClass('self-date');
					$(self_date).appendTo(self_header);
				
				var self_body=document.createElement('div');
				$(self_body).addClass("self-body")
				.html('<h3>new one</h3><p> new one</p>');
				$(self_body).appendTo(dContent);
			
				var answers=document.createElement("div");
				$(answers).addClass("profile-feed-answers");
				$(answers).attr('id','profile-feed-answers'+profile_post_cnt);
				$(answers).html('<h4>Answers:</h4><div id="after-div" class="after-div"><textarea id="t1" class="t1" title="Write your text here..."data-action="fit"></textarea><button id="comment-answer"class="btn btn-info">Post</button></div>');
				$(answers).appendTo(dContent);
				
				var self_footer=document.createElement('div');
				$(self_footer).addClass("self-footer");
				$(self_footer).attr('id',"self-footer"+profile_post_cnt)
				.html('<span style="" id="answer"><i class="fa fa-comments">4</i></span><span  id="like"><i class="fa fa-heart">10</i></span><div id="expand" class="expand_class"><i class="fa fa-expand"></i>expand</div><div id="compress" class="expand_class"><i class="fa fa-compress"></i>compress</div>');
				$(self_footer).appendTo(dContent);
				
				//$("#"+feed_id).html("kjdsfnkja");
				$(dContent).appendTo(d);
				
				profile_post_cnt++;
				$('#profile').append(d).masonry( 'appended',d );
				$("#profile #compress").hide();
	}
	
}

$(window).load(function(){
	//profile();
	$.ajax({
		method: "POST",
		url: "/profile" + username,
		// data: data,
		success: function(res) {
			console.log(res);
			profile_res=res;
			profile(res.post_count);
			console.log("count-pro"+profile_post_cnt);
			$("#description").html(res.user_desp_dict.descp);
			$("#name").html(res.user_desp_dict.fname+" "+res.user_desp_dict.lname);
			$("#profile-username").html(res.username);
			$(".followers div").html(res.fer_count);
			$(".following div").html(res.fing_count);
			if(profile_post_cnt>=0)
			{
				for(var i=0;i<profile_post_cnt;i++)
				{
					var type="AR";
					if(res.post_type[i]=="AR")
					{
						type="Article"
					}
					else{type="Question"}
					$("#profile-feed"+i+" .self-type").html(type);
					$("#profile-feed"+i+" .self-date").html(res.post_date[i]);
					$("#profile-feed"+i+" .self-body h3").text(res.post[i].title);
					$("#profile-feed"+i+" .self-body p").text(res.post[i].content);
					$("#profile-feed"+i+" .fa-heart").text(res.post[i].likes);
					if(profile_res.like[i]==1)
					{
						$("#profile-feed"+i+" .fa-heart").addClass('red');	
					}
			
				}
			}
			//username = res.username;
			//$("#user-name").html(username);
		//	$.cookie("user", res);
		   //$grid.masonry();
		
		},
		error: function(err) {
			//$(document).ajaxStop(function() { location.reload(true); });
			//alert("alerted");
			console.log("modal");
		}
	});
	$("#profile #compress").hide();
	
});



$(document).ready(function(){
	
	var $grid = $('.grid-profile').masonry({
    itemSelector: '.grid-item-profile',
	columnWidth:10,
	stamp : ".stamp-profile",
	gutter:20,
	percentPosition:true,
	isFitWidth: true,
	transitionDuration: '0.8s',	
	animationOptions: {
    duration: 1000
	}
  });

 $grid.on( 'click', '.grid-item-content-profile #expand,.grid-item-content-profile #compress', function() {
    	
	var v=$(this).parent('div').attr('id');
	v=$("#"+v).parent('div').attr('id');
	v="#"+v;
	console.log("in Expand"+v);
	$( v ).parent('.grid-item-profile').toggleClass('is-expanded');
	$grid.masonry('layout');
	
  });
  
  var max_profile=30;
   $(window).scroll(function(){
	if($(window).scrollTop()==$(document).height()-$(window).height())
	{
		var temp=profile_res.post_count;
		if(temp>0)
		{
			flag=profile_post_cnt;
			profile(profile_res.post_count);
			
			for(var i=flag-1;i<profile_post_cnt;i++)
			{
				var type;
				if(res.post_type[i]=="AR")
				{
					type="Article"
				}
				else{type="Question"}
				$("#profile-feed"+i+" .self-type").html(type);
				$("#profile-feed"+i+" .self-date").html(res.post_date[i]);
				$("#profile-feed"+i+" .self-body h3").text(res.post[i].title);
				$("#profile-feed"+i+" .self-body p").text(res.post[i].content);
				$("#profile-feed"+i+" .fa-comments").text(res.post[i].likes);
					
			}
		}
		else{
			console.log("No more post to Load")
		}
		$(grid).masonry();
	}
	//$('#feed').append(d).masonry( 'appended',d );
    
  });
  $("#profile").on('click','#expand', function(){
		//alert("clicked");
		var id=$(this).parent("div").attr('id');
		id="#"+id;
		console.log("in"+id);
		id=$(id).parent('div').attr('id');
		id="#"+id;
		
		
		//alert(id);
		
		console.log("in"+id);
		$(id+" #expand").hide();
		$(id+" #compress").show();
		ans_count=3;
		var type=$(id+" .self-type").text();
		if(type=="Question")
		{
			type="QS";
		}
		else{type="AR"}
		var title=$(id+" .self-body h3").text();
		console.log("dat-"+type+" "+title);
		var data={
			type:type,
			title:title
		};
			// var loop=5;
						
			// 		for(var i=0;i<loop;i++)
			// 		{
			// 					$(id+" .profile-feed-answers #after-div").after('<div class="post-user-answer" id="post-user-answer"><a href="#"><i class="fa fa-at"></i></a><p>jasdnlasndlksdlkasmdlkmasldkm<i id="cancel-answer" class="fa fa-close (alias)"></i></p></div>');
						
			// 		}	
						
				
		$.ajax({
			method: "POST",
			url: "/expand",
			data: data,
			success: function(res) {
				console.log(res);
				ans_count=res.count;
				
				var loop=ans_count;
				var profile_post_answer_cnt=0;
				for(var i=0;i<loop;i++)
					{
						$(id+" .profile-feed-answers #after-div").after('<div class="post-user-answer" id="post-user-answer'+(profile_post_answer_cnt)+'"><a href="#"><i class="fa fa-at"></i>'+(res.users[i])+'</a>'+' '+(res.display[i].date)+'<p>'+(res.display[i].content)+'<i id="cancel-answer" class="fa fa-close (alias)"></i></p></div>');
						profile_post_answer_cnt++;
						ans_count--;
					}	
			},
			error: function(err) {
				console.log(err);
			}
  		});
		
				// if(ans_count>4){
				// 	for(var i=0;i<5;i++)
				// 	{
				// 		$(id+" .feed-user-answers .t1").after('<div class="post-user-answer" id="post-user-answer"><a href="#"><i class="fa fa-at"></i>bittu</a><p>NEW ONE'+(i)+'adskjndkjasd k </p></div>');
				// 		ans_count--;
				// 	}	
				// 	$(id+" .feed-user-answers div:last-child").after('<a href="#" id="more-answers" style="">View more>>></a>');
				// }	
				// else{
				// 	var loop=ans_count;
				// 	for(var i=0;i<loop;i++)
				// 	{
				// 		$(id+" .feed-user-answers .t1").after('<div class="post-user-answer" id="post-user-answer"><a href="#"><i class="fa fa-at"></i>bittu</a><p>NEW ONE'+(i)+'adskjndkjasd k </p></div>');
				// 		ans_count--;
				// 	}			
				// }
		
		//id=id+" #feed-answers h4"
		//$("#feed-answers h4").after('<div class="post-user-answer" id="post-user-answer"><a href="#" style=""><i class="fa fa-at"></i>bittu</a><p  style="">NEW ONEadskjndkjasd k </p></div>');
		
			//$(id).remove();
	});
	
	
	
	$("#profile").on('click','#compress', function(){
		var id=$(this).parent("div").attr('id');
		id="#"+id;
		id=$(id).parent('div').attr('id');
		id="#"+id;
		
		$(id+' div.post-user-answer').remove();
		$(id+" #compress").hide();
		$(id+" #expand").show();
	});


	$("#profile").on('click','#like i',function(){
		//$(this).removeClass('blue');
		//$(this).closest('div').remove();
		//var p_id=$(this).closest('div').attr('id');
		var flag;
		if($(this).hasClass("red"))
		{
			 flag=1;
			$(this).removeClass('red');
		}
		else{
			flag=0;
			$(this).addClass('red');
		}
		var p_id=$(this).closest('div').attr('id');
		console.log("text "+p_id);
		var id=$("#"+p_id).parent('div').attr('id');
		p_id="#"+p_id;
		
		id="#"+id;
		console.log(" "+id);
		// var answered_username=$("#feed "+id+" "+p_id+" a").text();
		// var p=$("#feed "+id+" "+p_id+" p").text()
		
		var type=$("#profile "+id+" .self-type").html();
		if(type=="Question")
		{
			type="QS";
		}
		else{type="AR"}

		var title=$("#profile "+id+" .self-body h3").text();
		//var post_username=$("#feed "+main_id+" .feed-upper-div .feed-username").html();
		console.log("username "+ type+" "+title+" "+flag);
		// event.preventDefault();
		$.ajax({
			method:"POST",
			url:"/like"+username,
			data:{
				check:flag,
				title:title,
				type:type
			},
			success: function(res) {
				console.log(res);
				//$(this).html(res.likes);
				$("#profile "+id+" #like i").html(res.likes);
			},
			error: function(err) {
				console.log(err);
			}
  		});
		console.log(flag);

	});

  $("#qs").click(function(){
	  console.log("came in qs");
	  profile_post_cnt=0;
	  $("#profile .grid-item-profile").remove();
	  $.ajax({
			method: "POST",
			url: "/users_questions"+username,
			//data: data,
			success: function(res) {
				console.log(res);
				//ans_count=res.count;
				//	$.cookie("user", res);
				var loop=ans_count;
			},
			error: function(err) {
				console.log(err);
			}
  		});
	  
  });
  $("#ar").click(function(){
	  console.log("came in ar");
	  profile_post_cnt=0;
	  $("#profile .grid-item-profile").remove();
	   $.ajax({
			method: "POST",
			url: "/users_articles"+username,
			//data: data,
			success: function(res) {
				console.log(res);
				//ans_count=res.count;
				//	$.cookie("user", res);
				var loop=ans_count;
			},
			error: function(err) {
				console.log(err);
			}
  		});
  });
	  $('#e1').click(function(){
				$('#change_name').addClass('show');
		});
		$('#e2').click(function(){
				$('#change_password').addClass('show');
		});
		$('#e3').click(function(){
				$('#change_age').addClass('show');
		});
		$('#e4').click(function(){
				$('#change_username').addClass('show');
		});
		$('#e5').click(function(){
				$('#change_gender').addClass('show');
		});
		
		$('#chng1').click(function(){
			$('#change_name').removeClass('show');
		});
		$('#chng2').click(function(){
			$('#change_password').removeClass('show');
		});
		$('#chng3').click(function(){
			$('#change_age').removeClass('show');
		});
		$('#chng4').click(function(){
			$('#change_username').removeClass('show');
		});
		$('#chng5').click(function(){
			$('#change_gender').removeClass('show');
		});
		
		$('#submit1').on('click', function(event) {
			event.preventDefault();
			var name = $('#name-changed').val();
			console.log("sex-"+name);
			//backhand request();
			//window.location.reload(true);
			//$('#editModal').modal('show');
			window.location = 'profile_new.html';
			$('#editModal').modal('show');	
			
		});
		$('#submit2').on('click', function(event) {
			event.preventDefault();
			
			var pwd = $('#pwd').val();
			var npwd=$('#npwd').val();
			console.log("sex-"+npwd);
		});
		$('#submit3').on('click', function(event) {
			event.preventDefault();
			//console.log("sex-"+sex);
			var age = $('#age').val();
			console.log("sex-"+age);
		});
		$('#submit4').on('click', function(event) {
			event.preventDefault();
			
			var useraname = $('#username').val();
			console.log("sex-"+username);
		
		});
		$('#submit5').on('click', function(event) {
			event.preventDefault();
			console.log('Submitted');
			sex = $('.opt-gender:checked').attr('id');
			console.log("sex-"+sex);
			if(sex=="male")
				sex="M";
			else
				sex="F";
			
			});
		$('#submit6').on('click', function(event) {
			event.preventDefault();
			console.log('Submitted');
			
		});
		
});


$(function () {
	var $fit = $('<div>')
		.css({
			boxSizing: 'border-box',
			position: 'absolute',
			top: '-10000px',
			left: '-10000px',
			whiteSpace: 'pre-wrap',
			wordWrap: 'break-word'
		})
		.appendTo($(document.body)),
		template = $([
			'paddingRight',
			'paddingLeft',
			'lineHeight',
			'fontSize',
			'fontFamily',
			'fontWeight',
			'fontStyle',
			'fontVariant',
			'fontStretch',
			'fontSizeAdjust',
			'textTransform',
			'textDecoration',
			'textIndext',
			'wordSpacing',
			'letterSpacing'
		]);

	$('[data-action="fit"]').each(function () {
		var $textarea = $(this),
			cs = getComputedStyle(this, null),
			styles = {},
			temp = {},
			paddings = parseInt(cs.paddingTop) + parseInt(cs.paddingBottom);

		template.each(function (index, property) {
			if (cs[property] !== undefined) {
				styles[property] = cs[property];
			}
		});

		$textarea
		.data('styles', styles)
		.css({
			overflow: 'hidden'
		})
		.on('mousedown', function (e) {
			var $item = $(this);

			temp.width = $item.get(0).clientWidth;
			temp.height = $item.get(0).clientHeight;
		})
		.on('mouseup', function (e) {
			var $item = $(this);

			if (temp.width != $item.get(0).clientWidth || temp.height != $item.get(0).clientHeight) {
				$item.trigger('fit.count');
			}
		})
		.on('input fit.count', function (e) {
			var $item = $(this);

			$item.data('styles').width = $item.get(0).clientWidth + 'px';
			$fit.css($item.data('styles')).html($item.val().replace(/[\r\n]/g, '<br>') || '*');
			$item.css({
				height: $fit.get(0).clientHeight + 'px'
			});

			if ($item.get(0).scrollHeight - paddings > $item.get(0).clientHeight) {
				$item.css({
					height: $item.get(0).scrollHeight - paddings + 'px'
				});
			}
		})
		.trigger('fit.count');
	});
});
