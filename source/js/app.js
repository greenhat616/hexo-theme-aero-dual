// Write Hitokoto
function write(text) {
    if (text.length < 40) {
        $('#hitokoto').text(text);
    } else {
        gethitokoto();
    }
};


// Auto Request Hitokoto
(function gethitokoto() {
    $.ajax({
        url: "https://api.a632079.me/?encode=json",
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        jsonpCallback: "moecat",
        success: function (result) {
            write(result.hitokoto);
        },
        error: function () {
            write("读取一言数据失败了的说……_(:з」∠)_");
        }
    });
})();

// Async Load Header Banner
(function asyncLoadBanner() {
    if (typeof BannerURL == 'undefined') {
        // Something wrong
        console.log('[Banner] 未发现 Banner ， 加载默认图片...');
        var ts = Date.now(); // Get TS

        // Async Image
        var BannerIMG = new Image();
        BannerIMG.src = 'https://piccdn.freejishu.com/images/2017/08/22/qerIg.png!/format/jpg';
        BannerIMG.onload = function () {
            // Image Load Done
            document.getElementsByClassName('header-background')[0].style.backgroundImage = ('url(' + BannerIMG.src + ')');
            console.log('[Banner] 图片加载完成， 耗时： %s ms', (Date.now() - ts));
        }

    } else {
        console.log('[Banner] 发现 Banner ， 加载图片...')
        var ts = Date.now(); // Get TS

        // Async Image
        var BannerIMG = new Image();
        BannerIMG.src = BannerURL;
        BannerIMG.onload = function () {
            // Image Load Done
            document.getElementsByClassName('header-background')[0].style.backgroundImage = ('url(' + BannerURL + ')');
            console.log('[Banner] 图片加载完成， 耗时： %s ms', (Date.now() - ts));
        }

    }
})();

