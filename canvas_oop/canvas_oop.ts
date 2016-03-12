/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    font = "20px Arial";
    color = '#000000';
    filltext = 'HelloWorld';

    render(context: CanvasRenderingContext2D) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.filltext, 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 355;
rect.height = 362;
rect.color = '#F0F0F0'

var rect2 = new Rect();
rect2.width = 60;
rect2.height = 27;
rect2.x = 86;
rect2.y = 324;
rect2.color = '#0000FF'

var rect3 = new Rect();
rect3.width = 60;
rect3.height = 27;
rect3.x = 205;
rect3.y = 324;
rect3.color = '#0000FF'

var text = new TextField();
text.x = 110;
text.y = 327;
text.font = "20px Arial";
text.color = '#FFFFFF';
text.filltext = '0';

var text2 = new TextField();
text2.x = 224;
text2.y = 327;
text2.font = "20px Arial";
text2.color = '#FFFFFF';
text2.filltext = '10';


var bitmap = new Bitmap();
bitmap.source = 'fangge.jpg';
bitmap.x=45;
bitmap.y=48;

var bitmap2 = new Bitmap();
bitmap2.source = 'icon1.jpg';
bitmap2.x=33;
bitmap2.y=317;

var bitmap3 = new Bitmap();
bitmap3.source = 'icon2.jpg';
bitmap3.x=282;
bitmap3.y=317;

//渲染队列
var renderQueue = [rect, rect2,rect3, text,text2,bitmap,bitmap2,bitmap3];
//资源加载列表
var imageList = ['fangge.jpg','icon1.jpg','icon2.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


