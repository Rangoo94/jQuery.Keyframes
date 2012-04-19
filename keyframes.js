var keyframesjs = {

    init: function () {
        $('head').append('<style id="keyframes-style" type="text/css"></style>');
    },

    frameCollection: [],

    browserDetect: function () {
        var ua = navigator.userAgent;
        if (ua.indexOf('Opera') != -1) {
            return '-o-';
        } else if (ua.indexOf('MSIE') != -1) {
            return '-ms-';
        } else if (ua.indexOf('WebKit') != -1) {
            return '-webkit-';
        } else if (navigator.product == 'Gecko') {
            return '-moz-';
        } else {
            return '';
        }
    },

    add: function (frameName, frameData) {
        this.frameCollection[frameName] = frameData;
        this.generate();
    },

    generate: function () {
        var browserType = this.browserDetect();

        for (var frameName in this.frameCollection) {
            var css = '@' + browserType + 'keyframes ' + frameName + '{';

            for (var frameData in this.frameCollection[frameName]) {

                css += frameData + '{';
                var fd = this.frameCollection[frameName];
                css += fd[frameData] + '}';
            }

            css += '}\n';

            $('#keyframes-style').append(css);
        }
    },

    play: function (elem, options, callback) {
        var duration = options.duration;
        var delay = options.delay;
        options.duration = options.duration + 'ms';
        options.delay = options.delay + 'ms';

        var animationcss = '';
        $.each(options, function (index, opt) {
            animationcss += opt + ' ';
        });
        animationcss = animationcss.trim();

        var animationkey = this.browserDetect() + 'animation';

        if (callback) {
            setTimeout(callback, duration + delay);
        }

        $(elem).css(animationkey, animationcss);
    }
}

window.load = keyframesjs.init();