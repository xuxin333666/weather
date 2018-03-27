define(['jquery'],function($){
    function Waterfall(obj){
        this.number = obj.number || 5;
        this.page = 1;
        this.strCt = obj.strCt || '.ct';
        this.$ct = $(this.strCt);
        this.margin = obj.margin || 20;
        this.lazyLoadLock = false;
        this.isLoadOver;
        this.column = Math.floor($(this.strCt).width()/$('.standardWidth').outerWidth());
        this.arr = [];
        for(var i=0;i<this.column;i++){
            this.arr[i] = 0;
        };
    }
    Waterfall.prototype = {
        start: function(callback){
            var self = this;
            self.getData(function(data){
                $(data).each(function(index,news){
                    var $node = self.getNode(news);
                    $node.find('img').on('load',function(){
                        self.$ct.append($node);
                        self.waterfall($node,callback);
                    })
                })
            });
            $(window).on('resize',function(){
                self.waterfallAuto()
            });
        },
        getData: function(callback){
            var self = this;
            if(self.lazyLoadLock){
                return;
            }
            self.lazyLoadLock = true;
            $.ajax({
                url: 'https://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',   
                jsonp:"jsoncallback",
                data: {
                    app_key: '1271687855',
                    num: self.number,
                    page: self.page
                }
            }).done(function(ret){
                if(ret && ret.status && ret.status.code === "0"){
                    callback(ret.data);
                    self.page++;
                }else{
                    console.log('get error data');
                }
            }).fail(function(){
                alert('网络错误');
            });
        },
        getNode: function(news){
            var nodeStr = '';
            nodeStr += `<a href="${news.url}" class="items" target="_blank" title="${news.short_intro}">`;
            nodeStr += `<img src="${news.img_url}" alt="">`;
            nodeStr += `<h3 class="title">${news.name}</h3>`;
            nodeStr += `<p class="intro">${news.short_intro}</p></a>`; 
            return $(nodeStr) ; 
        },
        waterfall: function($node,fn){
            var self = this;
            var min = Math.min.apply(null,self.arr);
            var index = self.arr.indexOf(min);
            $node.css({
                top: min + self.margin,
                left: index*($node.outerWidth()+self.margin)+self.margin
            })
            self.arr[index] += $node.outerHeight() + self.margin;
            self.$ct.height( Math.max.apply(null,self.arr));
            if(self.isLoadOver){
                window.clearTimeout(self.isLoadOver);
            }
            self.isLoadOver = window.setTimeout(function(){
                self.lazyLoadLock = false;
                if(fn){
                    fn()
                }
            },1000)
        },
        waterfallAuto: function(){
            var self = this;
            self.column = Math.floor($(self.strCt).width()/$('.standardWidth').outerWidth());
            self.arr = [];
            for(var i=0;i<self.column;i++){
                self.arr[i] = 0;
            }
            $('.items').each(function(){
                self.waterfall($(this));
            })
        },
        showNumber: function(){
            return this.number;   
        },
        setNumber: function(n){
            this.number = n;
        },
        setMargin: function(n){
            this.margin = n;
            this.waterfallAuto();
        },
        isLoadOverlock: function(){
            return this.lazyLoadLock;
        }
    }
    return Waterfall;

/*
Waterfall({
    number: 5,
    strCt: '.wrapper',
    margin: 20
})
必须在容器内设置一个隐藏的div.standardWidth,
其宽度决定了新闻的宽度；
*/
})