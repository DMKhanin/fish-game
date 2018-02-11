
function collision(enemy_position_x, enemy_position_y, enemy_width, enemy_height) {
	var result = 0;
	if (player.pos_x + player.width >= enemy_position_x){
		result++;
	}
	if (player.pos_x <= enemy_position_x + enemy_width){
		result++;
	}
	if (player.pos_y + player.height >= enemy_position_y){
		result++;
	}
	if (player.pos_y <= enemy_position_y + enemy_height){
		result++;
	}
	if (result==4){
		return true;
	}
	return false;

}//end function

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function addEnemy(){
	if (enemycount < 5){
		var id = getRandomInt(0,4);
		$(".game").append('<div class="enemy' + id + ' enemy move" value="enemy' + id + '"></div>');
	}
	gamespeed++;
	speedEnemy = 6 + gamespeed;
	speedEnemy = 6 + gamespeed;
}

var speedEnemy = 10;
var angle = 0;
var speedPlayer = 10;


function deviation() {
    angle += 10;
    return Math.round(5 * Math.sin(angle * Math.PI / 180));
}


//object player
var player = {
    width: 128,
    height: 76,
    pos_x: 250,
    pos_y: 250,
    hp: 100,
    score: 0,
    dead: false
}

var enemycount = 0;
var gamespeed = 4;

$(document).ready(function () {

    $(".player").css({
        'left': player.pos_x,
        'top': player.pos_y
    }) // end select

    function go() {
        if (player.dead == false) {
			$(".vodorosli").each(function(){
				$(this).css({
					"left": parseInt($(this).css('left'))-(gamespeed-2),
					"top": "700px"
				});
				if (parseInt($(this).css('left'))<-1600){
					$(this).css({
						"left":"1600px",
						"top": "700px"
					});
				}
			});
            $('.move').each(function () {
                var enemy_left = parseInt($(this).css('left')) - speedEnemy;
                var enemy_top = parseInt($(this).css('top')) + deviation();
                if (enemy_left + parseInt($(this).css('width')) < 0) {
                    enemy_left = 1600;
                    enemy_top = getRandomInt(0,900-128);
                    angle = 0;
					}
                $(this).css({'left': enemy_left, 'top': enemy_top});
                console.log("y -> " + player.pos_y + " x -> " + player.pos_x);
                console.log("y -> " + enemy_top + " x-> " + enemy_left);
                var type = $(this).attr("value");
                switch (type) {
                    case "enemy1":
                        if (collision(enemy_left, enemy_top, 128, 128) == true) {
                            player.dead = true;
                        }
                        break;
					case "enemy2":
						if (collision(enemy_left, enemy_top, 128, 90) == true) {
                            player.dead = true;
                        }
						break;
					case "enemy3": 
						if (collision(enemy_left, enemy_top, 128, 95) == true) {
                            player.dead = true;
                        }
						break;
                    case "food":
                        if (collision(enemy_left, enemy_top, 68, 68) == true) {
                            player.score++;
                            $(this).css({
                                "left" : 1600,
								"top" : getRandomInt(0,900-128)
                            })
                            console.log(player.score);
                        }
                        break;
                    default:
                        break;
                }

            }); //end each
        }
    }

    setInterval(go, 100);
	setInterval(addEnemy, 10000);
});	//end ready
$(document).keydown(function (key) {
    if (player.dead == false) {
        //select action
        switch (key.which) {
            case 37: //left
                player.pos_x -= speedPlayer;
                break;
            case 38: //top
                player.pos_y -= speedPlayer;
                break;
            case 39: //rigth
                player.pos_x += speedPlayer;
                break;
            case 40: //botom
                player.pos_y += speedPlayer;
                break;
        }//end select action

        $(".player").css({
            'left': player.pos_x,
            'top': player.pos_y
        }) // end select
    }
}); // end keydown