define(['jquery'],function(){
    function Modal(obj){
        this.$clickCt = obj.$clickCt || $('.location>.city');
        this.$modal = obj.$modal || $('.content>.inputCity');
        this.$showElement = obj.$showElement || this.$modal;
        this.getDataFunction = obj.getDataFunction || function(){};
        this.submitLock = false;
        var self = this; 
        this.$clickCt.on('click',function(e){
            e.stopPropagation();
            self.show();
        })
    }
    Modal.prototype = {
        show: function(){
            var self = this;
            self.$modal.on('click',function(e){
                e.stopPropagation();
            })
            self.$showElement.fadeIn(function(e){
                self.close();
                self.getInput();
            });
        },
        close: function(){
            var self = this;
            $('body').on('click',function(){
                self.submitLock = false;
                self.$showElement.fadeOut();
                self.emptyRender();
            })
            self.$modal.find('.submit').on('click',function(){
                if(self.submitLock){
                    return
                }
                self.$showElement.fadeOut();
                self.emptyRender();
            })
        },
        getInput: function(n){
            var self = this;
            var inputValue;
            self.$modal.find('input').on('keyup',function(){
                self.emptyRender();
                self.submitLock = true;
            })
            if(self.submitLock){
                self.$modal.find('input').val(`${n.text()}`);
                self.submitLock = false;
                self.dataNumber = parseInt(n.index());
            }
            self.$modal.find('.submit').on('click',function(){
                if(!self.submitLock){
                    self.getData(self.dataNumber);
                }else{
                    inputValue = self.$modal.find('input').val();
                    self.getData(inputValue);                    
                }
                self.$modal.find('input').val(null);
            })
        },
        getData: function(n){
            var self = this;
            var reg = /^[a-zA-Z0-9]+$/g;
            if((reg.test(n)&&n)||n===0){
                self.getDataFunction(n,function(citydata){
                    self.renderData(citydata);
                });
            }else if(n){
                self.renderData([],1)
            }
        },
        renderData: function(arr,a){
            var self = this;
            if(arr.length){
                arr.forEach(function(value){
                    self.$modal.find('ul').append($(`<li class="select">${value.path}</li>`));
                    self.$modal.find('li').on('click',function(){
                        if(arr.length){
                            self.submitLock = true;
                            self.getInput($(this))
                        }
                    })
                })
            }else if(a&& self.$modal.find('ul').find('li').length ===0){
                self.$modal.find('ul').append($(`<li class="select">亲，城市名称有误哦~（不得含有非字母的任意字符)</li>`));
            }else if(!a&& self.$modal.find('ul').find('li').length ===0){
                self.$modal.find('ul').append($(`<li class="select">找不到该城市</li>`));
            }
        },
        emptyRender: function(){
            this.$modal.find('ul').empty();
        }
    }
    /*
    var m1 = new Modal({
        $clickCt: $('.location>.city'),
        $modal: $('.content>.inputCity'),
        $showElement: $('.bothAction'),
        getDataFunction: weatherData.getWeatherByName
    })
    适用于点击一个按钮，弹出一个模态框，获取数据。获得数据必须是一个数组。可以获得.path数据。
    */
   return Modal;
})
    