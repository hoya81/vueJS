import {mapMutations} from "vuex";

export default{
    data() {
        return {
            w:1920,
            h:1080,
            contentSize:{w:1920, h:1200},
            enterMotion: null,
            leaveMotion: null  
        };
    },
    methods: {
        ...mapMutations([
            'changePage',
            'isMovePage'
        ]),          
        beforeEnter(el){
            
        },
        enter (el, done) {
            TweenMax.set(el.querySelector('.bg'), {autoAlpha:0})
            TweenMax.set(el.querySelector('.content'), {autoAlpha:0})
            
            this.enterMotion = new TimelineLite({onComplete:done});
            this.enterMotion            
            .to(el.querySelector('.bg'), 1, {autoAlpha:1})
            .call(()=>{this.isMovePage(false);}, null, null)
            .to(el.querySelector('.content'), 1, {autoAlpha:1}, '-=0.3')
        },
        leave (el, done) {
            if(this.enterMotion)this.enterMotion.pause();
            this.leaveMotion = new TimelineLite({onComplete:done});
            this.leaveMotion
            .to(el.querySelector('.content'), 1, {autoAlpha:0})
            .to(el.querySelector('.bg'), 1, {autoAlpha:0}, '-=0.3')
        },
        resize(){
            this.w = document.documentElement.clientWidth;
            this.h = document.documentElement.clientHeight;
        }
    },
    mounted() {
        this.changePage(this.$options.name)
        this.isMovePage(true);
        window.addEventListener('resize', this.resize);
        this.resize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    }
    // beforeRouteEnter  (to, from, next) {
    //     next();
    // },
    // beforeRouteLeave (to, from, next) {
    //     next();
    // }
} 