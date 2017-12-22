var showcaseMarginTop = $('img.showcase').css('margin-top');

function updateTable(tbody, items) {
    if(items.length <= 0) {
        overwriteTable("<h3 class='table-override text-center'>No responses yet :( Be the first!</h3>")
        return;
    }
    showTable();
    tbody.empty();
    items.forEach(function(item) {
        tbody.append("<tr><td><i class='btn btn-default glyphicon glyphicon-heart clickable' onclick='sendNewSuggestionRequest(\"" + item.title + "\",\"" + item.artist + "\")'></i>&nbsp;" + item.title + "</td><td>" + item.artist + "</td><td>" + item.count + "</td></tr>");
    });
}

function overwriteTable(content) {
    $('#song-selection table').hide();
    $('#song-selection').append(content);
}

function showTable() {
    $('#song-selection .table-override').hide();
    $('#song-selection table').show();
}

function loadSongSelectionData() {
    $.ajax({
        method: "GET",
        url: '/songsuggestions',
        success: function (data, textStatus, jqXHR) {
            var tbody = $('#song-selection tbody');
            updateTable(tbody, data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            overwriteTable("<h5>Unable to load song suggestions</h5>");
        }
    });
    return false;
}

function addNewSuggestion() {
    var form = $('#song-selection form');
    var title = form.find('#song-title').val();
    var artist = form.find('#song-artist').val();
    sendNewSuggestionRequest(title, artist)
    return false;
}

function sendNewSuggestionRequest(title, artist) {
    $.ajax({
        method: "POST",
        url: "/songsuggestions",
        data: {
            title: title,
            artist: artist
        },
        success: function(data, textStatus) {
            loadSongSelectionData();
            $("#song-selection form").replaceWith("<h5 class='alert alert-success alert-dismissable' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Thanks for the suggestion!</h5>");

        },
        error: function(data, textStatus, errorThrown) {
            $("#song-selection table").before("<h5 class='alert alert-warning alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + data.responseJSON.reason + "</h5>");
        }
    });
}

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

$(window).on('load', function() {
    adjustContentsTop();
    $('.grid').masonry();
    $('#cover').hide();
    $('#taylor-quotes.carousel').height($('#taylor-quotes.carousel').find('div.carousel-inner').height() + 50 + "px");
    if (window.location.pathname.indexOf('weddinginfo') > -1) {
        loadSongSelectionData();
    }
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
});

function showHotelModal() {
    var modal = $('#displayModal');
    modal.find('h4.modal-title').text("Fairfield Inn & Suites Room Arrangement");
    modal.find('div.modal-body p').html("<ul><li>Call Fairfield at <a href='tel:252-333-1003'>252-333-1003</a></li><li>Ask for the Dozier/Poston Wedding block</li><li>Make sure you call before March 29th!</li></ul> If you take advantage of this, you'll get a 10% discount!");
    modal.modal();
}
