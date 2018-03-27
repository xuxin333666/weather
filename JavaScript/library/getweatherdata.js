define(['jquery'],function(){
    var weatherData = (function(){
        var $ct = $('.content');
        var $weatherDay =  $('.weatherDay');
        var $weatherDayli = $('.weatherDay>li.weather');
        var $locationIcon = $('.icon-064dangqianweizhi');
        var cityIP = 'https://weixin.jirengu.com/weather/ip';
        var cityIdUrl = 'https://weixin.jirengu.com/weather/cityid';
        var cityweatherurl = 'https://weixin.jirengu.com/weather/now';
        var cityId = '';
        var datedict = {
            周日: 'Sun',
            周一: 'Mon',
            周二: 'Tue',
            周三: 'Wed',
            周四: 'Thu',
            周五: 'Fri ',
            周六: 'Sat',
            今日周日: 'Sunday',
            今日周一: 'Monday',
            今日周二: 'Tuesday',
            今日周三: 'Wednesday',
            今日周四: 'Thursday',
            今日周五: 'Friday',
            今日周六: 'Saturday'
        }
        var getweatherLock = false;
        function getWeatherByIP(){
            if(getweatherLock){
                return
            }
            getweatherLock = true;
            $.get(cityIP).done(function(e){
                if(e.status === 'ok'){
                    getcityid(e.data);
                }else{
                    alert('系统错误,获取IP失败');
                    getweatherLock = false;
                }
            }).fail(function(){
                alert('网络出错了')
                getweatherLock = false;
            })
        };
        function getcityid(a){
            $.get(cityIdUrl,{location:a}).done(function(a){
                if(a.status ==='error'){
                    alert('系统错误，获取城市ID失败');
                    getweatherLock = false;
                    return;
                }
                $('.countries').html(a.results[0].path.split(',').slice(1,4).join(' '));
                var cityId = a.results[0].id;
                gettodayweather(cityId);
            }).fail(function(){
                alert('网络出错了')
                getweatherLock = false;
            })
        }
        function gettodayweather(cityId){
            $.get(cityweatherurl,{cityid:cityId}).done(function(e){
                if(e.status === 'OK'){
                    pushhtml(e.weather[0]);
                    console.log(e.weather[0])
                }else{
                    alert('系统错误，获取天气数据失败');
                    getweatherLock = false;
                }
            }).fail(function(){
                alert('网络出错了');
                getweatherLock = false;
            })
        }
        function  pushhtml(obj){
            var now = obj.now
            var other = obj.future;
            $('.city').html(obj.city_name + `|<span class="tips">${other[0].date}</span>`);
            $('.temperature').html(now.temperature +'<sup>&#176;</sup>');
            $('.today img').attr('src',`//weixin.jirengu.com/images/weather/code/${now.code}.png`);
            $('.windspeed').html(now.wind_speed + 'mph / ' + other[0].high + '<sup>&#176;</sup>');
            $('.describe>.date').html(datedict['今日'+other[0].day]+ ' ' + other[0].day);
            $('.weatherDay>.ohterday').each(function(index,value){
                var $this =$(this);
                $this.find('.date').html(datedict[other[index+1].day]);
                $this.find('img').attr('src',`//weixin.jirengu.com/images/weather/code/${other[index+1].code1}.png`);
                $this.find('.futuretemperature').html(other[index+1].low + '<sup>&#176;</sup> ~ ' + other[index+1].high +'<sup>&#176;</sup>' );
            })
            $('.detailedWeather').remove();
            for (let i = 0; i < 7;i++) {
                if(i === 0){
                    $ct.append($(`<div class="detailedWeather clearfix">
                    <div class="key">最高气温:<br>最低气温:<br>气候:<br>风力:<br>日出:<br>日落:<br>穿着建议:<br>当前风向:<br>体感温度:</div>
                    <div class="value">${other[i].high}度<br>${other[i].low}度<br>${other[i].text}<br>${other[i].wind}<br>
                    ${obj.today.sunrise}<br>${obj.today.sunset}<br>${obj.today.suggestion.dressing.brief}<br>${now.wind_direction}<br>${now.feels_like}度
                    </div></div>`))
                }else{
                    $ct.append($(`<div class="detailedWeather clearfix">
                    <div class="key">日期:<br>星期:<br>最高气温:<br>最低气温:<br>气候:<br>风力:</div>
                    <div class="value">${other[i].date}<br>${other[i].day}<br>
                    ${other[i].high}度<br>${other[i].low}度<br>${other[i].text}<br>${other[i].wind}<br>
                    </div></div>`))
                };             
            }
            getweatherLock = false;
        }
        function action(e){
            e.addClass('action').siblings().removeClass('action');
        }
        function getData(){
            getWeatherByIP()
            $locationIcon.on('click',function(){
                getWeatherByIP()
            })
            var timeid2 = setInterval(function(){
                getWeatherByIP()
            },1800000);
        }
        function getWeatherByName(name,callback){
            if(getweatherLock){
                return
            }
            getweatherLock = true;
            if(typeof(name) ==='number'){
                $('.countries').html(citylist[name].path.split(',').slice(1,4).join(' '));
                var cityId = citylist[name].id;
                gettodayweather(cityId);
            }else{
                $.get(cityIdUrl,{location:name}).done(function(a){
                    if(a.status ==='error'){
                        alert('系统错误，获取城市ID失败.请确认输入内容是否符合要求');
                        getweatherLock = false;
                        return;
                    }
                    citylist = a.results
                    callback(citylist);
                    getweatherLock = false;
                }).fail(function(){
                    alert('网络出错了')
                    getweatherLock = false;
                }) 
            }     
        }
        return {
            getData: getData,
            getWeatherByName: getWeatherByName
        }
    })();
    return  weatherData;
})
