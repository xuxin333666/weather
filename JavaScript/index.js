define(['jquery',
'lib/goTop',
'lib/carousel',
'lib/waterfall',
'lib/lazyLoad',
'lib/nav',
'lib/timeChange',
'lib/selectCity',
'lib/getweatherdata',
'lib/weatherdayData'],function($,gotop,carousel,waterfall,lazyload,Nav,showTime,Modal,weatherData,WeatherdayData){
    // 通用功能
    function action(e){
        e.addClass('action').siblings().removeClass('action');
    }
    // 轮播
    carousel.start({
        strIMG: '.content>.backgroundimg',
        strBtnCt: '.btnct',
        strCt: '.content'
    })
    // 瀑布流
    var waterfallobj = new waterfall({
        number: 8,
        strCt: '.weatherDay',
        margin: 10
    })
    // 懒加载
    var lazyloadobj = new lazyload({
        $LazyLoadCt: $('.wrapper'),
        getMethod: function(){
            waterfallobj.start()
        },
        isLoadOver: function(){
            return waterfallobj.isLoadOverlock()
        }
    })
    // 三个导航条功能切换
    new Nav({
        $spaceToShowli: $('.weatherDay>li'),
        $navli: $('.nav>li.news'),
        loadLock: function(){
            return waterfallobj.isLoadOverlock()
        },
        liAction: function(){
            waterfallobj = new waterfall({
                number: 8,
                strCt: '.weatherDay',
                margin: 10
            })
            waterfallobj.start();
            lazyloadobj.createNode();
        }
    })
    new Nav({
        $spaceToShowli: $('.weatherDay>li'),
        $navli: $('.nav>li.weathers'),
        loadLock: function(){
            return waterfallobj.isLoadOverlock()
        },
        liAction: function(){
            var self = this;
            $('.weatherDay>li.weather').css('display','block');
        }
    })
    new Nav({
        $spaceToShowli: $('.weatherDay>li'),
        $navli: $('.nav>li.music'),
        loadLock: function(){
            return waterfallobj.isLoadOverlock()
        },
        liAction: function(){
        }
    })
    // 置顶
    var gotop = new gotop($('.wrapper'),'gotop iconfont icon-shengdanjianhuahuidaodingbu')
    // 时间显示及24小时制转换
    var showTime1 = new showTime({
        $tfhourCt: $('.tfhourct'),
        $tfhourChange: $('.tfhourChange'),
        $tim: $('.time')
    })
    // 天气信息获取
    weatherData.getData();
    // 点击城市弹出城市名称输入框，加载新城市天气信息
    var m1 = new Modal({
        $clickCt: $('.location>.city'),
        $modal: $('.content>.inputCity'),
        $showElement: $('.bothAction'),
        getDataFunction: weatherData.getWeatherByName
    })
    // 显示详细天气
    WeatherdayData.start({
        $weather: $('.weatherDay>.weather'),
        strdetailweather: '.detailedWeather'
    });
})


