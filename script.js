//доступ к оверлею

var over = document.querySelector(".overlay");
over.style.display = "block";

 $(window).on('load', function () {
    var preloader = $('.overlay');
    preloader.delay(1000).fadeOut('slow');

     $(".slogan").delay(1000).fadeTo( 500, 1 ); //появление букв
     $(".about").delay(1500).fadeTo( 500, 1 );
     $(".zakaz").delay(2000).fadeTo( 500, 1 );



     var vol = document.querySelector(".aud"); // кнопка для аудио
 			var audio = document.querySelectorAll("audio");

 			vol.onclick =  function(){
 					for (var i=0; i<audio.length; i++)
 					{
 						if (audio[i].paused)
 						{
 							audio[i].play();
 							this.innerHTML = "выключить звук";
 						}
 						else
 						{
 							audio[i].pause();
 							this.innerHTML = "включить звук";
 						}
 					}
 			}


 });

 //параллакс
 var $leftSecond, $leftFirst, $leftThird;

 $leftFirst = parseFloat((getComputedStyle(document.getElementById('first'))).left);
 $leftSecond = parseFloat((getComputedStyle(document.getElementById('second'))).left);
 $leftThird = parseFloat((getComputedStyle(document.getElementById('third'))).left);

 //по движению мыши слегка изменяем положение картинок

 function cursorXY(e) {
     document.getElementById('first').style.left = $leftFirst + e.pageX/50 + 'px';
     document.getElementById('second').style.left = $leftSecond - e.pageX/30 + 'px';
     document.getElementById('third').style.left = $leftThird - e.pageX/20 + 'px';
  }


//канвас: доступ + контекст
var canv = document.querySelector("canvas");
var ctx = canv.getContext("2d");

var video = document.querySelector("video");

//пытаемся запустить видео, как только это будет возможным, таймер jumpTimer будет отключен
start = 0;
var jumpTimer = setInterval( function(){
    try{
        video.currentTime = start;
        clearInterval(jumpTimer);
        video.play();
    }
    catch(e){}
},100)

// зацикливание видео на 18 секунде
video.addEventListener('timeupdate',function(){
    if(this.currentTime > 18)
    {
        this.currentTime = start;
    }
},false)

//задаем размеры канвы по размеру окна - минус 10рх для того, чтобы не появлялись полосы прокрутки
canv.width = window.innerWidth-10;
client_w = document.body.clientWidth
canv.height = client_w/16*9



//слушатель события готовности видео к воспроизведению с переносом видео на канвас
video.addEventListener('canplay',function(){

    //перенос видео на канвас

    setInterval( function(){
            ctx.drawImage(
                video,
                0,
                0,
                1280,
                720,
                0,
                0,
                canv.width,
                canv.height
            )
    },67)
},false)
