define(['jquery'],function($){
    var carousel = (function(){
        var $next = $('.next');
        var $pre = $('.pre');
        var btnstr = '';
        var carouselLock = false;
        function playnext(len){
            carouselLock = true;
            $bgimg.slice(1+page-len,page+1).fadeOut(500,function(){
                page--;
                carouselLock = false;
                if(page === -1){
                    page = number - 1;
                    $bgimg.css('display','block')
                }
            }); 
        }
        function playpre(len){
            carouselLock = true;
            $bgimgNew.slice(page+2,page+len+2).fadeIn(500,function(){
                page++;
                carouselLock = false;
                if(page === number){
                    page = 0;
                    $bgimgNew.slice(2,numberNew).css('display','none'); 
                }
            }); 
        }
        function btnChangeNext(){
            if(carouselLock){
                return;
            }
            if(page===0){
                action($btn.eq(0));
            }else{
                action($btn.eq(number-page));
            }
            playnext(1);    
        }
        function btnChangePre(){
            if(carouselLock){
                return;
            }
            if(page===number -1){
                action($btn.eq(number -1));
            }else{
                action($btn.eq(number-page-2));
            }
            playpre(1);  
        }
        function btnChange($this,$thisIndex){
            if(carouselLock){
                return;
            }
            action($this);
            if($thisIndex>(number-1-page)){
                playnext($thisIndex-number+1+page);
            }else if($thisIndex<(number-1-page)){
                playpre(number-1-page-$thisIndex);
            }
        }
        function action(e){
            e.addClass('action').siblings().removeClass('action');
        }    
        function start(obj){
            strIMG = obj.strIMG || '.content>.backgroundimg';
            $bgimg = $(strIMG)
            number = obj.number || $bgimg.length;
            strBtnCt = obj.strBtnCt ||'.btnct';
            $btnct = $(strBtnCt);
            strCt = obj.strCt || '.content';
            $ct = $(strCt);
            page = number - 1;
            (function createBtn(){
                for (let i = 0; i < number; i++) {
                    btnstr += '<li class="btn"></li>';  
                }
                $btnct.append(btnstr);
                $btn = $('.btn');
            })();
            (function cloneForeAndAft(){
                $ct.append($bgimg.first().clone());
                $ct.prepend($bgimg.last().clone());
                $bgimgNew = $(strIMG);
                numberNew = $bgimgNew.length;
            })();
            $bgimgNew.last().hide();
            $btn.first().addClass('action');
            $next.on('click',function(){
                btnChangeNext()
            })
            $pre.on('click',function(){
                btnChangePre()
            })
            var timeid = setInterval(function(){
                btnChangeNext()
            },5000)
            $btn.on('click',function(){
                var $this = $(this);
                var $thisIndex = $this.index();
                btnChange($this,$thisIndex);
            })
        }
        return {
            start: start
        }
    })();
    return carousel;
    /*
    carousel.start({
        strIMG: '.content>.backgroundimg',
        number: 4,
        strBtnCt: '.btnct',
        strCt: '.content'
    })
    
    前进后退的按钮类名必须为.next或.pre；
    有一个单独的点选的容器CT。
    */
})



