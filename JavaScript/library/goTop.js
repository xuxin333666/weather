define(['jquery'],function($){
    function GoTop($ctNode,Class){
        this.body = $ctNode ||$('body');
        this.Class = Class || '.goTop';
        this.createNode()
    }
    GoTop.prototype = {
        createNode: function(){
            this.$goTop = $(`<span class="${this.Class}" title="回到顶部"></span>`);
            this.body.append(this.$goTop);
            this.eventClick();
        },
        eventClick: function(){
            this.$goTop.on('click',function(){
                $(window).scrollTop(0);
            })
        }
    }
    // var p1 = new GoTop($('.wrapper'),'gotop iconfont icon-ziyuan')
    return GoTop;
})


requestAnimationFrame