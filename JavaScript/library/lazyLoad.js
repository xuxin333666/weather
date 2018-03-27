define(['jquery'],function($){
    function LazyLoad(obj){
        this.$LazyLoadCt = obj.$LazyLoadCt || $('.wrapper');
        this.getMethod = obj.getMethod || function(){};
        this.isLoadOver = obj.isLoadOver || function(){};
        this.scrollLock = null;
    }
    LazyLoad.prototype = {
        createNode: function(){
            if( !$('div.bottom').length){
                this.$LazyLoadCt.append($('<div class="bottom"></div>'));
                this.$bottom = $('div.bottom')
            }  
            this.getData();
        },
        isShow: function(){
            return this.$bottom.offset().top<=($(window).height()+$(window).scrollTop()+200)&& this.$bottom.offset().top>=$(window).scrollTop()
        },
        getData: function(){
            var self = this;
            self.time1 = setTimeout(function(){
                if(self.isShow()){
                    self.getMethod(function(){
                    });
                    self.getData()
                }
            },1000)
            $(window).on('scroll',function(){
                if(self.scrollLock){
                    window.clearTimeout(self.scrollLock);
                }
                self.scrollLock = window.setTimeout(function(){
                    if(self.isShow() && !self.isLoadOver()){
                        self.getMethod();
                    }
                },500)
            })
        } 
    }
    /*
    var lazy = new LazyLoad({
        $LazyLoadCt: $('.wrapper'),
        getMethod: newsShow.runShow,
        isLoadOver: newsShow.isLoadOver
    })
    */
   return  LazyLoad;
})
