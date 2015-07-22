function initHeadroom() {
    var headroom = new Headroom(document.querySelector(".navbar"), {
        "offset": 205,
        "tolerance": 5,
        "classes": {
            "initial": "animated",
            "pinned": "flipInX",
            "unpinned": "flipOutX"
        },
        "classes": {
            "initial": "animated",
            "pinned": "flipInX",
            "unpinned": "flipOutX"
        }
    });
    headroom.init();
}

initHeadroom();

$('.song-list-item').click(function (event) {
    event.preventDefault();
    video = $(event.currentTarget).find('.song-list-video');
    video.toggleClass("hidden");
    $(event.currentTarget).find('span').toggleClass('glyphicon-chevron-down');
    $(event.currentTarget).find('.song-list-video-placeholder').replaceWith('<iframe width="420" height="315" src="' + video.data('src') + '" frameborder="0" allowfullscreen></iframe>')
});

function adjustContentsTop()
{
    var showcaseHeight = $('img.showcase').outerHeight();
    var windowHeight = $(window).height();
    var heightDifference = showcaseHeight - windowHeight;
    if (heightDifference >= 0) { // If showcase is taller than the window
        $('#contents > .container').css({top: windowHeight * .9 + "px"});
    } else {
        $('#contents > .container').css({top: showcaseHeight + "px"});
    }
    $('body').scrollTop(0);
}

$(window).load(adjustContentsTop);
$(window).resize(adjustContentsTop);
