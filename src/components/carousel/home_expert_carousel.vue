<template>
    <div>
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
                <div class="swiper-slide">Slide 5</div>
                <div class="swiper-slide">Slide 6</div>
                <div class="swiper-slide">Slide 7</div>
                <div class="swiper-slide">Slide 8</div>
                <div class="swiper-slide">Slide 9</div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="autoplay-progress">
                <div class="progress-bar">
                    <div class="progress-line"></div>
                </div>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 

export default {
    name: 'HomeUserCarousel', 
    mounted() {
        const progressLine = document.querySelector(".progress-line");
        const progressContent = document.querySelector(".autoplay-progress span");
        
        const swiper = new Swiper(".mySwiper", {
            modules: [Navigation, Pagination, Autoplay],
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-scrollbar",
                hide: true,
            },
            on: {
                autoplayTimeLeft(s, time, progress) {
                    progressLine.style.width = `${(1 - progress) * 100}%`;
                    progressContent.textContent = `${Math.ceil(time / 1000)}s`;
                }
            }
        });
    }
}
</script>

<style scoped> 
.swiper {
    width: 100%;
    height: 400px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.autoplay-progress {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    z-index: 10;
    width: 150px; 
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    color: var(--swiper-theme-color);
}

.progress-bar {
    position: relative;
    width: 120px;
    height: 8px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.progress-line {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: var(--swiper-theme-color);
    border-radius: 4px;
    width: 0;
    transition: width 0.1s linear;
}

.autoplay-progress span {
    position: absolute;
    right: 0;
    min-width: 30px;
    text-align: right;
}
</style>