<template>
<transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false" appear>
  <section class="about">
    <div class="bg"></div>
    <div class="content">
      <span>test</span>
    </div>
  </section>
</transition>
</template>

<script>
import BasePage from './mixins/basePage.js';
import bg from '../assets/img/bg_2.jpg';
import bgVedio from '../assets/img/bg_2.mp4';
import obj_1 from '../assets/img/obj_2.png';

export default {
  name: 'about',
  mixins:[BasePage],
  data() {
        return {
            canvas: null,
            cvObj: {},
            cvFilters:{}
        };
    },
  methods: {    
    canvasSet(){
      console.log(this.canvas);
      this.canvas = new PIXI.Application(this.w, this.h, {transparent:true, autoStart:false});
      this.$el.querySelector('.bg').appendChild(this.canvas.view);   
       
      let vedioTexture = PIXI.Texture.fromVideo(bgVedio);
      
      vedioTexture.scaleMode = 2;
      let video = vedioTexture.baseTexture.source;
      video.pause();
      video.setAttribute('loop', true);      
      this.cvObj.bg = new PIXI.Sprite(vedioTexture);
      this.cvObj.bg.width = this.w;
      this.cvObj.bg.height = this.h;
      this.cvFilters.zoomBlurFilter =  new PIXI.filters.ZoomBlurFilter();
      this.cvFilters.zoomBlurFilter.strength = 0.3;
      this.cvFilters.zoomBlurFilter.center = [this.w/2, this.h/2];
      this.cvFilters.zoomBlurFilter.innerRadius = 0;
      this.canvas.stage.filters = [this.cvFilters.zoomBlurFilter];
      
      this.canvas.stage.addChild(this.cvObj.bg);    

      this.cvObj.con = new PIXI.Container();
      this.cvObj.con.x = this.w/2 - this.contentSize.w/2;
      this.cvObj.con.y = 0;
      this.canvas.stage.addChild(this.cvObj.con);
      let conArea = new PIXI.Graphics(this.w/2 - this.contentSize.w/2, 0);
      conArea.alpha = 0;
      conArea.drawRect(0, 0, this.contentSize.w, this.contentSize.h);
      this.cvObj.con.addChild(conArea);

      this.cvObj.charactorCon = new PIXI.Container();
      this.cvObj.con.addChild(this.cvObj.charactorCon);
      
      this.cvObj.charactor = new PIXI.Sprite.fromImage(obj_1);
      this.cvObj.charactor.x = 850;
      this.cvObj.charactor.y = 300;
      this.cvObj.charactorCon.addChild(this.cvObj.charactor);

      this.canvas.ticker.add(()=> {
        //console.log(1)
      });

    },
    resize(){
      this.w = document.documentElement.clientWidth;
      this.h = document.documentElement.clientHeight;
      console.log(this.w, this.h)
    },
    enter (el, done) {      
      this.resize();
      this.canvasSet();
      this.canvas.start();
      TweenMax.set(this.cvObj.bg, {pixi: { alpha: 0} })
      TweenMax.set(this.cvObj.charactorCon, {pixi: {blurY: 30} })
      TweenMax.set(this.cvObj.charactor, {y:500, pixi: { alpha: 0 , brightness: 5} })

      this.enterMotion = new TimelineLite({onComplete:done});
      this.enterMotion
        .to(this.cvFilters.zoomBlurFilter, 2, {strength:0, ease: Cubic.easeOut})
        .to(this.cvObj.bg, 2, {pixi: { alpha: 1}, ease: Quart.easeOut},'-=2')
        .to(this.cvObj.charactor, 2, {y:300, pixi: { alpha: 1, brightness: 1}, ease: Quart.easeOut}, '-=1')
        .to(this.cvObj.charactorCon, 2, {pixi: {blurY:0}, ease: Quart.easeOut}, '-=2')
        .call(()=>{this.isMovePage(false);}, null, null)
    },
    leave (el, done) {
        if(this.enterMotion)this.enterMotion.pause();
        this.leaveMotion = new TimelineLite({onComplete:()=>{done(); this.canvas.stop();}});
        this.leaveMotion
        .to(this.cvFilters.zoomBlurFilter, 1, {strength:0.3, ease: Cubic.easeOut})
        .to(el.querySelector('.bg'), 1, {autoAlpha:0}, '-=1')
        
    }
  },
  mounted() {
   
  },
  
} 
</script>

<style lang="scss">
  .about{
    position:absolute;
    width:100%;
    height:100%;
    .bg{
       position:absolute;
      width:100%;
      height:100%;
      //background: url('../assets/img/bg_2.jpg')
    }
    .content{
      position:relative;
      // .obj-1{
      //   position:absolute;
      //   width:833px;
      //   height:1099px;
      //   background: url('../assets/img/obj_2.png')
      // }
    }
  }
</style>




