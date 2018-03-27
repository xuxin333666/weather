define(['jquery'],function($){
    function Nav(obj){
        this.$spaceToShowli = obj.$spaceToShowli ||  $('.weatherDay>li');
        this.$navli = obj.$navli || $('.nav>li');
        this.liAction = obj.liAction || function(){};
        this.loadLock = obj.loadLock || function(){};
        var self = this;
        this.$navli.on('click',function(){
            if(self.$navli.hasClass('action')||self.loadLock()){
                return;
            }
            self.navAction();
        })
    }
    Nav.prototype = {
        navAction: function(){
            this.$spaceToShowli.parent().height('100%')
            $('.items').remove();
            $(window).off('resize').off('scroll');
            this.action(this.$navli);
            this.$spaceToShowli.css('display','none');
            this.liAction();
        },
        action: function(e){
            e.addClass('action').siblings().removeClass('action');
        }
    }
    /*
    new Nav({
        $spaceToShowli: $('.weatherDay>li'),
        $navli: $('.nav>li.weathers'),
        loadLock: waterfall.isLoadOver.bind(waterfall.w1),
        liAction: function(){
            var self = this;
            $('.weatherDay>li.weather').css('display','block');
        }
    })
    */
   return Nav;
})
