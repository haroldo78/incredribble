(function(document, window, $, undefined) {
    $(function() {

        var $spinner = $("#spinner");
        var page = 0;

        var load_and_show_dribble_shots = function() {

            page++;

            var loader = $.ajax({
                url: "http://api.dribbble.com/shots/popular?callback=?",
                dataType: "jsonp",
                data: {
                    page: page
                }
            });

            $(document).ajaxStart(function() {
                $spinner.show();
            });

            loader.done(function(data) {
                // inject shots into DOM
                var shots = data.shots || [];
                $.each(shots, function(index, shot) {
                    $shot_link = $("<a/>").attr("href", shot.url).attr("target", "_blank");
                    $shot_img = $("<img/>").attr("src", shot.image_teaser_url);
                    $shot = $('<div/>').addClass("shot");
                    $shot.append($shot_link.append($shot_img));
                    $("#shots").append($shot);
                });
            })
            .fail(function() {
                // API call failed
            })
            .always(function() {
                // Finished API call
                $spinner.hide();
            });
            return loader;
        };

        var shot_loader = load_and_show_dribble_shots();

        // infinite scroll

        $window = $(window);
        $document = $(document);

        $window.scroll(function() {
            var current_position = $window.scrollTop();
            if (($document.height() - $window.height()) == current_position) {
                load_and_show_dribble_shots();
            }
        });

    });
})(document, window, jQuery);