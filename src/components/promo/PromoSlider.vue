<template>
  <section class="promo-part">
    <div class="container">
      <ul class="promo-slider slider-arrow" ref="promo_slider">
        <li v-for="slider in sliders" :key="slider.id">
          <a :href="slider.url"
            ><img :src="slider.image" :alt="slider.title"
          /></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      sliders: [
        {
          id: 1,
          url: "#",
          image: require("../../assets/images/offer1.jpg"),
          title: "promo",
        },
        {
          id: 2,
          url: "#",
          image: require("../../assets/images/offer2.jpg"),
          title: "promo",
        },
        {
          id: 3,
          url: "#",
          image: require("../../assets/images/offer3.jpg"),
          title: "promo",
        },
        {
          id: 4,
          url: "#",
          image: require("../../assets/images/offer4.jpg"),
          title: "promo",
        },
      ],
    };
  },
  mounted() {
    $(".promo-slider").slick({
      dots: !1,
      infinite: !0,
      autoplay: !0,
      arrows: !0,
      speed: 300,
      prevArrow: '<i class="icofont-arrow-right dandik"></i>',
      nextArrow: '<i class="icofont-arrow-left bamdik"></i>',
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    });
  },
};
</script>

<style>
/* Slider */
.slick-slider {
  position: relative;

  display: block;
  box-sizing: border-box;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

.slick-list {
  position: relative;

  display: block;
  overflow: hidden;

  margin: 0;
  padding: 0;
}
.slick-list:focus {
  outline: none;
}
.slick-list.dragging {
  cursor: pointer;
  cursor: hand;
}

.slick-slider .slick-track,
.slick-slider .slick-list {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slick-track {
  position: relative;
  top: 0;
  left: 0;

  display: block;
  margin-left: auto;
  margin-right: auto;
}
.slick-track:before,
.slick-track:after {
  display: table;

  content: "";
}
.slick-track:after {
  clear: both;
}
.slick-loading .slick-track {
  visibility: hidden;
}

.slick-slide {
  display: none;
  float: left;

  height: 100%;
  min-height: 1px;
}
[dir="rtl"] .slick-slide {
  float: right;
}
.slick-slide img {
  display: block;
}
.slick-slide.slick-loading img {
  display: none;
}
.slick-slide.dragging img {
  pointer-events: none;
}
.slick-initialized .slick-slide {
  display: block;
}
.slick-loading .slick-slide {
  visibility: hidden;
}
.slick-vertical .slick-slide {
  display: block;

  height: auto;

  border: 1px solid transparent;
}
.slick-arrow.slick-hidden {
  display: none;
}
</style>