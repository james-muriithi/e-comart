<template>
  <section class="banner-part">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div
            class="banner-content"
            :style="bannerStyle"
          >
            <h1>get your gadget items quickly.</h1>
            <p>
              We are always ready to deliver product to your doorstep every day
            </p>
            <form class="banner-form">
              <input type="text" placeholder="Search anything..." /><button
                type="submit"
              >
                <i class="icofont-ui-search"></i><span>search</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    computed:{
        bannerStyle(){
            return `background: url(${require('../../assets/images/banner.jpg')})
                no-repeat center;
              background-size: cover;`;
        }
    }    
}
</script>