function collision(enemy_position_x, enemy_position_y, enemy_width, enemy_height) {
    result = 0;
    if (player.pos_x + player.width >= enemy_position_x && player.pos_x <= enemy_position_x + enemy_width) {
        result++;
    }
    if (player.pos_y + player.height >= enemy_position_y && player.pos_y <= enemy_position_y + enemy_height) {
        result++;
    }
    if (result == 2) {
        return true;
    }
    return false;
}//end function

var speedEnemy = 10;
var angle = 0;
var speedPlayer = 10;


function deviation() {
    angle += 10;
    return Math.round(10 * Math.sin(angle * Math.PI / 180));
}

//object player
var player = {
    width: 128,
    height: 76,
    pos_x: 20,
    pos_y: 250,
    hp: 100,
    score: 0,
    dead: false
}


$(document).ready(function () {

    $(".player").css({
        'left': player.pos_x,
        'top': player.pos_y
    }) // end select

    function go() {
        if (player.dead == false) {
            $('.move').each(function () {
                var enemy_left = parseInt($(this).css('left')) - speedEnemy;
                var enemy_top = parseInt($(this).css('top')) + deviation();
                if (enemy_left + parseInt($(this).css('width')) < 0) {
                    enemy_left = 1600;
                    enemy_top = 10;
                    angle = 0;
                }
                $(this).css({'left': enemy_left, 'top': enemy_top});
                console.log("y -> " + player.pos_y + " x -> " + player.pos_x);
                console.log("y -> " + enemy_top + " x-> " + enemy_left);
                var type = $(this).attr("value");
                switch (type) {
                    case "enemy":
                        if (collision(enemy_left, enemy_top, 128, 128) == true) {
                            player.dead = true;
                        }
                        break;
                    case "food":
                        if (collision(enemy_left, enemy_top, 128, 128) == true) {
                            player.score++;
                            $(this).css({
                                "left": 1600
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