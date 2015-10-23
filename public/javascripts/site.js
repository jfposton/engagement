var showcaseMarginTop = $('img.showcase').css('margin-top');

function initHeadroom() {
    var headroom = new Headroom(document.querySelector(".navbar"), {
        "offset": 50,
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
    var video = $(event.currentTarget).find('.song-list-video');
    video.toggleClass("hidden");
    $(event.currentTarget).find('span').toggleClass('glyphicon-chevron-down');
    var maxHeight = 315;
    var maxWidth = 420;
    var expectedRatio = maxWidth / height;
    var windowWidth = $(window).width();
    var width = maxWidth > windowWidth ? windowWidth - 100 : maxWidth;
    var height = width < maxWidth ? maxHeight / expectedRatio : maxHeight;
    $(event.currentTarget).find('.song-list-video-placeholder').replaceWith('<iframe width="' + width +'" height="' + height + '" src="' + video.data('src') + '" frameborder="0" allowfullscreen></iframe>')
});

function adjustContentsTop()
{
    var showcaseHeight = $('img.showcase').outerHeight();
    var windowHeight = $(window).height();
    var heightDifference = showcaseHeight - windowHeight;
    if (heightDifference >= -5) { // If showcase is taller than the window with -5 to allow some room for error
        $('#contents > .container').css({top: windowHeight * .975 + "px"});
        $('img.showcase').css('margin-top', '2.5em');
    } else {
        $('#contents > .container').css({top: showcaseHeight + "px"});
        $('img.showcase').css('margin-top', showcaseMarginTop);
    }
    $('body').scrollTop(0);
}

$(window).load(function() {
    adjustContentsTop();
    $('.grid').masonry();
    $('#cover').hide();
    $('#taylor-quotes.carousel').height($('#taylor-quotes.carousel').find('div.carousel-inner').height() + 50 + "px");
});
$(window).resize(adjustContentsTop);

$('#galleryModal').on('show.bs.modal', function (event) {
    var thumbnail = $(event.relatedTarget);
    var imageIndex = thumbnail.data('index');

    var modal = $(this);

    modal.find('.active').removeClass('.active');
    modal.find('ol.carousel-indicators > li')[imageIndex].click();
});

$('#taylor-quotes.carousel').on('slid.bs.carousel', function () {
    $(this).height($(this).find('div.carousel-inner').height() + 50 + "px");
})
