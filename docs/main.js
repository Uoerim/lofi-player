

var nback;
var nmusic;
var currentlyplaying = 1;
var currentwallpaper;

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        $('.support').css('transform', 'translateY(-100vh)');
    }
};

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "jfKfPfyJRdk",
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
    
}
function onPlayerReady(event) {
    player.addEventListener('onStateChange', function (e) {
        if (e.data == -1 || e.data == 3) {
            $('.loading').css('display', 'flex');
            $('.play-n-pause').css('display', 'none');

        } else if (e.data == 1) {
            $('.loading').css('display', 'none');
            $('.play-n-pause').css('display', 'flex');
            $('.play-n-pause > .pixel').addClass('playing');
        } else if (e.data == 2) {
            $('.play-n-pause > .pixel').removeClass('playing');
    }
});
}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("assets/data/music.json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
$(document).ready(function () {
    $.ajax({
        url: window.location.href + 'assets/gifs/',
        success: function (data) {
            var count = data.match(/back-/g);
            nback = count.length / 3;
            rback = Math.floor(Math.random() * nback) + 1;

            $('body').css('background-image', `url(../assets/gifs/back-${rback}.gif)`)
            currentwallpaper = rback

        }
    });
    $('.play-n-pause').on('click', function (e) {
        e.preventDefault();
        if ($('.play-n-pause  > .pixel').hasClass('playing')) {
            $('.play-n-pause > .pixel').removeClass('playing');
            player.pauseVideo()
        } else {
            $('.play-n-pause > .pixel').addClass('playing');
            player.playVideo()
        }
    });
    $('.previous').on('click', function (e) {
        e.preventDefault()
        readTextFile("assets/data/music.json", function (text) {
            var musicdata = JSON.parse(text)
            if (currentlyplaying == 1) {
                player.loadVideoById(musicdata[Object.keys(musicdata).length]['src']);
                $('.song-name-holder > div > span').html(musicdata[Object.keys(musicdata).length]['name'])
                $('.play-n-pause > .pixel').addClass('playing');
                currentlyplaying = Object.keys(musicdata).length
            } else {
                player.loadVideoById(musicdata[currentlyplaying - 1]['src']);
                $('.song-name-holder > div > span').html(musicdata[currentlyplaying - 1]['name'])
                $('.play-n-pause > .pixel').addClass('playing');
                currentlyplaying = currentlyplaying - 1
            }
        })
    })
    $('.next').on('click', function (e) {
        e.preventDefault()
        readTextFile("assets/data/music.json", function (text) {
            var musicdata = JSON.parse(text)
            if (currentlyplaying == Object.keys(musicdata).length) {
                player.loadVideoById(musicdata[1]['src']);
                $('.song-name-holder > div > span').html(musicdata[1]['name'])
                $('.play-n-pause > .pixel').addClass('playing');
                currentlyplaying = 1
            } else {
                player.loadVideoById(musicdata[currentlyplaying + 1]['src']);
                $('.song-name-holder > div > span').html(musicdata[currentlyplaying + 1]['name'])
                $('.play-n-pause > .pixel').addClass('playing');
                currentlyplaying = currentlyplaying + 1
            }
        })
    })
    $('.background-changer > img').on('click', function (e) {
        $.ajax({
            url: window.location.href +     'assets/gifs/',
            success: function (data) {
                var count = data.match(/back-/g);
                nback = count.length / 3;
                rback = Math.floor(Math.random() * nback) + 1;
                if (currentwallpaper == rback) {
                    if (currentwallpaper == nback) {
                        rback = rback - 1;
                    } else {
                        rback = rback + 1;
                    }
                }
                $('body').css('background-image', `url(../assets/gifs/back-${rback}.gif)`)
                currentwallpaper = rback
            }
        });
    })
    $('.github-btn>img').click(function (e) { 
        e.preventDefault();
        window.open('https://github.com/Uoerim')
    });
    $('.paypalme').click(function (e) { 
        e.preventDefault();
        window.open('https://paypal.me/YosifIbrahim')
    });
    $('.adslink').click(function (e) { 
        e.preventDefault();
        window.open('https://clk.asia/BdFc7a')
    });
    $('.nevermind').click(function (e) { 
        e.preventDefault();
        $('.support').css('transform', 'translateY(-100vh)');
    });
    $('.donate-btn').click(function (e) { 
        e.preventDefault();
        $('.support').css('transform', 'translateY(0)');
    });

});
$(window).on('load', function () {
    $('.loading-screen > h1:nth-child(1)').html('D')
    $('.loading-screen > h1:nth-child(2)').html('O')
    $('.loading-screen > h1:nth-child(3)').html('N')
    $('.loading-screen > h1:nth-child(4)').html('E')
    $('.loading-screen > h1:nth-child(5)').html('')
    $('.loading-screen > h1:nth-child(6)').html('')
    $('.loading-screen > h1:nth-child(7)').html('')


    $('.loading-screen').addClass('opacityloading');
    setTimeout(function () {
        $('.loading-screen').css('display', 'none');

    }, 2000);
});
