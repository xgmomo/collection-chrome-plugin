<template>
  <Header />
  <InnerApi :data="dataJson.apis.innerApis" />
  <OuterApi :data="dataJson.apis.outerApis" />
  <Footer />
</template>

<script>
import Header from "./components/Header/index.vue";
import InnerApi from "./components/InnerApi/index.vue";
import OuterApi from "./components/OuterApi/index.vue";
import Footer from "./components/Footer/index.vue";

import jsonData from "./assets/data.json";
import { reactive } from "vue";

export default {
  name: "App",
  components: {
    Header,
    InnerApi,
    OuterApi,
    Footer,
  },
  setup() {
    const dataJson = reactive({
      apis: jsonData || {},
    });

    return {
      dataJson,
    };
  },
};
</script>
