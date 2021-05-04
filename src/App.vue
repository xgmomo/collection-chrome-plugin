<template>
  <Header />
  <div class="marginBottom">
    <InnerApi :data="website.inner" />
    <OuterApi :data="website.outer" />
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header/index.vue";
import InnerApi from "./components/InnerApi/index.vue";
import OuterApi from "./components/OuterApi/index.vue";
import Footer from "./components/Footer/index.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    InnerApi,
    OuterApi,
    Footer,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.commit("userModule/setUserInfo", localStorage.userName);
      if (localStorage.userName) {
        store.dispatch("websiteModule/getWebsiteList");
      }
    });

    const website = computed(() => {
      return store.getters["websiteModule/filterList"];
    });

    return {
      website,
    };
  },
};
</script>
