varsy=true;
isPunching = true;

function varify(){
	if(varsy){
		varsy = false;
		setTimeout(function(){
			varsy = true;
		},620);
	}else {
		return false;
	}
	return true;
}

function createCookie(name, value) {
	value = JSON.stringify(value);
	var expires;
	var date = new Date();
	date.setTime(date.getTime() + (1000 * 24 * 60 * 60 * 1000));
	expires = "; expires=" + date.toGMTString();
	document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = escape(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return JSON.parse(unescape(c.substring(nameEQ.length, c.length)));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "");
}

function initLevels() {
	try{
		if(readCookie('dif') !== null && readCookie('dif') !== ""){
			dif = readCookie('dif');
		}else{
			dif = 700;
		}
	}catch(x){
		dif = 700;
	}

	switch(dif){
		case 675:level = 2;break;
		case 650:level = 3;break;
		case 625:level = 4;break;
		case 600:level = 5;break;
		case 575:level = 6;break;
		case 550:level = 7;break;
		case 525:level = 8;break;
		case 500:level = 9;break;
		case 475:level = 10;break;
		case 450:level = 11;break;
		case 425:level = 12;break;
		case 400:level = 13;break;
		case 375:level = 14;break;
		case 350:level = 15;break;
		case 325:level = 16;break;
		case 300:level = 17;break;
		case 275:level = 18;break;
		case 250:level = 19;break;
		case 225:level = 20;break;
		case 200:level = 21;break;
		case 175:level = 22;break;
		case 150:level = 23;break;
		case 125:level = 24;break;
		case 100:level = 25;break;
		default:level=1;break;
	}
	$('#hh3').html('Level '+level);
}

function initBirds() {

	var $bird1 = $('#bird');
	var $bird2 = $('#bird2');
	var $bird3 = $('#bird3');

	$bird2.animate({'left': '960'}, 8000);
	$bird2.css('left','-50');
	setTimeout(function(){
		$bird3.animate({'right': '960'}, 8000);
		$bird3.css('right', '-50');
	},1000);
	stopBird = setInterval(function(){
		$bird1.animate({'right': '960'}, 8000);
		setTimeout(function(){
			$bird1.css('right', '-50');
		},8100);
	},8200);
	stopBird3 = setInterval(function(){
		$bird3.animate({'right': '960'}, 8000);
		setTimeout(function(){
			$bird3.css('right', '-50');
		},8100);
	},1600);
	setInterval(function(){
		$bird2.animate({'left':'960'}, 8000);
		setTimeout(function(){
			$bird2.css('left', '-50');
		},8100);
	},8700);
}

function finishGame() {
	$('#black h1').html('You Lose!!!<br/><span>Press any key to try again</span>');
	$('#black').show();
	$(document).unbind('keydown');
	$(document).keydown(function(event){
		window.location.reload();
	});
	$('#black').click(function(event){
		event.preventDefault();
		window.location.reload();
	});
	clearInterval(stopPlayer2);
}

function initGame() {
	initLevels();
	initBirds();
	stopWin = true;
	Mleft = 0;
	Mleft2 = 0;
	var left = true;
	var left2 = false;
	var $fighter1 = $('#fighter1');
	var $fighter2 = $('#fighter2');
	var $black = $('#black');
	var $blackH1 = $('#black h1');

	function initPlayer() {
		function playerJump() {
			if(varify()){
				setTimeout(function(){
					$fighter1.css('background-position', "-485px -284px").css('height', '58px').animate({'margin-bottom':'25px'},80);
					setTimeout(function(){
						$fighter1.animate({'margin-bottom':'50px'},80);
						setTimeout(function(){
							$fighter1.animate({'margin-bottom':'75px'},80);
							setTimeout(function(){
								$fighter1.animate({'margin-bottom':'50px'},70);
								setTimeout(function(){
									$fighter1.animate({'margin-bottom':'25px'},70);
									setTimeout(function(){
										$fighter1.animate({'margin-bottom':'0px'},80).css('background-position', "-39px -4px").css('height', '47px');
									},60);
								},60);
							},70);
						},80);
					},80);
				},80);
			}
		}
		$(document).keydown(function(event){
			if (parseInt($('#pp2').css('width')) <= 4) {
				if (dif < 51) {
					$blackH1.html('You Won the game congrats!!!<br/><span>Click here to play again</span>');
				} else {
					$blackH1.html('You Win!!!<br/><span>Press any key to play the next level</span>');
				}
				$black.show();
				stopWin = false;
				$(document).unbind('keydown');
				if (dif >= 50) {
					dif -= 25;
				}
				eraseCookie('dif');
				createCookie('dif',dif);
				$(document).keydown(function(event){
					window.location.reload();
				});
				$black.click(function(){
					window.location.reload();
				});
				clearInterval(stopPlayer2);
			}

			var x = event.which;
			switch(x + '') {
				case '87': // player jump "W"
				playerJump()
				break;
				case '68': // player move right "D"
				Mleft = Mleft+20;
				$fighter1.css('margin-left',Mleft);
				if(!left){
					left = true;
					$fighter1.css({
						'-webkit-transform': 'rotateY(0deg)',
						'-moz-transform': 'rotateY(0deg)',
						'-ms-transform': 'rotateY(0deg)',
						'-o-transform': 'rotateY(0deg)'
					})};
					break;
					case '65': // player move left "A"
					Mleft = Mleft-20;
					$fighter1.css('margin-left', Mleft);
					if(left){
						left = false;
						$fighter1.css({
							'-webkit-transform': 'rotateY(180deg)',
							'-moz-transform': 'rotateY(180deg)',
							'-ms-transform': 'rotateY(180deg)',
							'-o-transform': 'rotateY(180deg)'
						});
					}
					break;
					case '80': // player punch "P"
					if (isPunching) {
						isPunching = false;
						setTimeout(function(){
							isPunching = true;
						}, 200);
						setTimeout(function(){
							$fighter1.css('background-position',"-128px 171px");
							setTimeout(function(){
								$fighter1.css('background-position',"-167px 171px")
								.css('z-index', 6)
								.css('width',"62px");
								if(!left){
									$fighter1.css('margin-left', Mleft-30);
								}
								setTimeout(function(){
									$fighter1.css('background-position',"-128px 171px")
									.css('z-index', 4)
									.css('width',"33px");
									if(!left){
										$fighter1.css('margin-left',Mleft);
									}
									setTimeout(function(){
										$fighter1.css('background-position',"-39px -4px")
										if(document.querySelector('#fighter1').offsetLeft >= document.querySelector('#fighter2').offsetLeft){
											equal = document.querySelector('#fighter1').offsetLeft - document.querySelector('#fighter2').offsetLeft;
										}else{
											equal = document.querySelector('#fighter2').offsetLeft - document.querySelector('#fighter1').offsetLeft;
										}
										if (equal < 60 ) {
											$('#pp2').css('width',parseInt($('#pp2').css('width')) - 10 + 'px');
											$fighter2.html('<img src="styles/images/blood.png" class="blood"/>');
											setTimeout(function(){
												$('#fighter1 .blood').css('margin','15px 25px');
											},100);
											setTimeout(function(){
												$fighter2.html(" ");
											},200);
											if ($fighter1.css('margin-left') <= $fighter2.css('margin-left')) {
												$fighter2.animate({'margin-left': parseInt($fighter2.css('margin-left')) + 15}, 40);
											} else {
												$fighter2.animate({'margin-left': parseInt($fighter2.css('margin-left')) - 15}, 40);
											}
										}
									},60);
								},60);
							},60);
						},60);
					}
					break;
				}
			});

		}
		$blackH1.html('<p>Instructions: Press "A" to move left, "D" to move right, "W" to jump and "P" to hit the Monster.<br/> Press any key to start</p>');
		$black.show();

		$(document).keydown(function(){

			$(document).unbind();
			$black.hide();
			initPlayer()
			var stopPlayer2 = setInterval(function(){
				var timePlayer, equal;
				if (parseInt(dif/7) < 60) {
					timePlayer = 60;
				} else {
					timePlayer = parseInt(dif/7);
				}
				var fighter1offsetLeft = document.querySelector('#fighter1').offsetLeft;
				var fighter2offsetLeft = document.querySelector('#fighter2').offsetLeft;

				if (fighter1offsetLeft >= fighter2offsetLeft) {
					equal = fighter1offsetLeft - fighter2offsetLeft;
					x = 2;
				}else{
					equal =  fighter2offsetLeft - fighter1offsetLeft;
					x = -2;
				}
				if (parseInt(equal) > 50) {
					var player2timout = parseInt(timePlayer/2)
					function fighter2FixMerginLeft(cb) {
						$fighter2.css('margin-left', parseInt($fighter2.css('margin-left')) + x + 'px');
						if (typeof cb === 'function') {
							cb();
						}
					}

					for(var i=0; i < 4; i++){
						fighter2FixMerginLeft();
						setTimeout(fighter2FixMerginLeft.bind(null, function(){
							setTimeout(fighter2FixMerginLeft.bind(null, function(){
								setTimeout(fighter2FixMerginLeft.bind(null, function(){
									setTimeout(fighter2FixMerginLeft, player2timout)
								}), player2timout);
							}), player2timout);
						}), player2timout);
					}

					if (x < 0) {
						if (left2) {
							left2 = false;
							$fighter2.css({
								'-webkit-transform': 'rotateY(0deg)',
								'-moz-transform': 'rotateY(0deg)',
								'-ms-transform': 'rotateY(0deg)',
								'-o-transform': 'rotateY(0deg)'
							})
						}
					} else {
						if (!left2) {
							left2 = true;
							$fighter2.css({
								'-webkit-transform': 'rotateY(180deg)',
								'-moz-transform': 'rotateY(180deg)',
								'-ms-transform': 'rotateY(180deg)',
								'-o-transform': 'rotateY(180deg)'
							})
						}
					}
				} else {
					setTimeout(function(){
						$fighter2.css('background-position', "-112px -185px")
						.css('z-index', 6);
						setTimeout(function(){
							$fighter2.css('background-position', "-231px -271px").css('width',"70px");
							setTimeout(function(){
								$fighter2.css('background-position', "-120px -271px")
								.css('width',"88px").css('margin-left',parseInt($fighter2.css('margin-left')) -15);
								setTimeout(function(){
									$fighter2.css('background-position', "-231px -271px").css('width',"70px")
									.css('margin-left', parseInt($fighter2.css('margin-left')) +15);
									setTimeout(function(){
										$fighter2.css('background-position', "-112px -185px")
										.css('width', "88px")
										.css('z-index', 4);

										setTimeout(function(){
											$fighter2.css('background-position', "-112px -13px");

											$('#pp1').css('width',parseInt($('#pp1').css('width')) -25 + 'px');
											$fighter1.html('<img src="styles/images/blood.png" style="margin:-19 -5; width:45px" class="blood"/>');
											setTimeout(function(){
												$('#fighter1 .blood').css('margin','-22 -15');
											},100);
											setTimeout(function(){
												$fighter1.html(" ");
											},200);

											if (document.querySelector('#fighter1').offsetLeft >= document.querySelector('#fighter2').offsetLeft) {
												equal = document.querySelector('#fighter1').offsetLeft - document.querySelector('#fighter2').offsetLeft;
												x = 15;
											} else {
												equal =  document.querySelector('#fighter2').offsetLeft - document.querySelector('#fighter1').offsetLeft;
												x = -15;
											}

											$fighter1.css('margin-left',parseInt($fighter1.css('margin-left')) + x);
											if(parseInt($('#pp1').css('width')) <= 4 && stopWin == true) {
												finishGame()
											}
										},timePlayer);
									},timePlayer);
								},timePlayer);
							},timePlayer);
						},timePlayer);
					},timePlayer);

				}

			},dif);


			$('#cont').focus();
		});

	}

	$(initGame);
