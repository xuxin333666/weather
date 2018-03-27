define(['jquery'],function($){
    var  WeatherdayData = (function(){
        function WeatherdayData(obj){
            this.$weather = obj.$weather || $('.weatherDay>.weather');
            this.strdetailweather = obj.strdetailweather || '.detailedWeather';
            this.EventListener();
        }
        WeatherdayData.prototype = {
            EventListener: function(){
                var self = this;
                self.$weather.on('mouseenter',function(){
                    var $this = $(this);
                    $this.addClass('action');
                    $(self.strdetailweather).eq($this.index()).css('display','block')
                });
                self.$weather.on('mouseleave',function(){
                    var $this = $(this);
                    $this.removeClass('action');
                    $(self.strdetailweather).eq($this.index()).css('display','none');
                })
            }
        }
        return {
            start: function(obj){
                new WeatherdayData(obj);
            }
        }
    })();
    /*
    WeatherdayData.start({
        $weather: $('.weatherDay>.weather'),
        strdetailweather: '.detailedWeather'
    });
    */
   return WeatherdayData;
})