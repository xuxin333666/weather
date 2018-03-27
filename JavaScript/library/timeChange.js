define(['jquery'],function(){
    function ShowTime(obj){
        this.dict = ['00','01','02','03', '04','05','06','07','08','09'];
        this.$tfhourCt = obj.$tfhourCt ||$('.tfhourct');
        this.$tfhourChange = obj.$tfhourChange || $('.tfhourChange');
        this.$time = obj.$time || $('.time');
        this.timeid1 = null;
        this.hourStyle = 24;
        this.hourChange(12);
        this. hourStyleSelect();
    }
    ShowTime.prototype = {
        hourStyleSelect: function(){
            var self = this;
            self.$tfhourCt.on('mouseenter',function(){
                self.checkMove();
            })
            self.$tfhourCt.on('mouseleave',function(){
                self.checkMoveOver();
            })
            self.$tfhourChange.on('click',function(){
                if(self.hourStyle===12){
                    self.hourStyle = 24;
                    self.$tfhourChange.removeClass('icon-huadonganniuyes').addClass('icon-huadonganniux');
                    self.hourChange(12);
                }else{
                    self.hourStyle = 12;
                    self.$tfhourChange.removeClass('icon-huadonganniux').addClass('icon-huadonganniuyes');
                    self.hourChange(24);
                } 
            })
        },
        checkMove: function(){
            this.$tfhourCt.animate({
                'right': '0'
            });
        },
        checkMoveOver: function(){
            this.$tfhourCt.animate({
                'right': '-165px'
            });
        },
        hourChange: function(h){
            var self = this;
            window.clearTimeout(self.timeid1);
            self.timeid1 = setInterval(function(){
                var totalseconds = (Date.parse(new Date())%86400000)/1000;
                var seconds = totalseconds%60;
                var totalminutes = Math.floor(totalseconds/60);
                var minutes = totalminutes%60;
                var hours = Math.floor(totalminutes/60)+8;
                if(minutes<10){ minutes = self.dict[minutes]}
                if(hours<10){ hours = self.dict[hours]}
                if(h===12){
                    if(hours > 12 && hours<24){
                        hours -= 12;
                        if(hours<10){ hours = self.dict[hours]}
                        self.$time.html(hours+':'+minutes+' pm');
                        }else if(hours <= 12){
                            self.$time.html(hours+':'+minutes+' am');
                        }else{
                            hours -= 24;
                            if(hours<10){ hours = self.dict[hours]}
                            self.$time.html(hours+':'+minutes+' am');
                    }
                }else {
                    if(hours<24){
                        self.$time.html('北京时间 '+hours+':'+minutes);
                    }else{
                        hours -= 24;
                        if(hours<10){ hours = self.dict[hours]}
                        self.$time.html('北京时间 '+hours+':'+minutes);
                    }
                }
            },1000)
        }
    }
    /*
    new ShowTime({
        $tfhourCt: $('.tfhourct'),
        $tfhourChange: $('.tfhourChange'),
        $tim: $('.time')
    })
    */
   return ShowTime;
})
