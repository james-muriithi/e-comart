import("izitoast/dist/css/iziToast.min.css");
import iziToast from "izitoast";
import { global } from "../config/index.js";

const GlobalMixins = {
  computed: {
    userImage() {
      return global.defaultUserImage;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    displayName() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user.displayName || "";
    },
    logo() {
      return global.logo;
    },
    shouldShowAlert() {
      return !!this.$store.getters["alert/message"];
    },
    loadingElements() {
      return new Array(5).fill(1);
    },
    alertDetails() {
      return {
        message: this.$store.getters["alert/message"],
        type: this.$store.getters["alert/type"]
      };
    }
  },
  methods: {
    formatPrice(price) {
      if ((!price || price == "") && price != 0) {
        return price;
      }
      return `Ksh ${this.numberWithCommas(price)}`;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showAlert() {
      const that = this;
      const { message, type } = this.alertDetails;
      if (!this.shouldShowAlert) {
        return;
      }
      if (type == "error") {
        iziToast.error({
          title: "Error",
          message,
          position: "topRight",
          onClosed: function() {
            that.$store.dispatch("alert/resetState");
          }
        });
      } else {
        iziToast.success({
          title: "Success",
          message,
          position: "topRight",
          onClosed: function() {
            that.$store.dispatch("alert/resetState");
          }
        });
      }
    }
  }
};

export default GlobalMixins;
