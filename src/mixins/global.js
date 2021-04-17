import("izitoast/dist/css/iziToast.min.css");
import iziToast from "izitoast";
import { global } from "../config/index.js";

const GlobalMixins = {
  computed: {
    logo() {
      return global.logo;
    },
    shouldShowAlert() {
      return !!this.$store.getters["alert/message"];
    },
    alertDetails() {
      return {
        message: this.$store.getters["alert/message"],
        type: this.$store.getters["alert/type"]
      };
    }
  },
  methods: {
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
