<style>
#main {
  height: 100%;
  /* background: #007fd5; */
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-animation: sky_background 50s ease-out infinite;
  -moz-animation: sky_background 50s ease-out infinite;
  -o-animation: sky_background 50s ease-out infinite;
  animation: sky_background 50s ease-out infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.clouds_one {
  background: url("images/cloud_one.png");
  position: absolute;
  background-size:100% 100%;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_one 50s linear infinite;
  -moz-animation: cloud_one 50s linear infinite;
  -o-animation: cloud_one 50s linear infinite;
  animation: cloud_one 50s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.clouds_two {
  background: url("images/cloud_two.png");
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_two 75s linear infinite;
  -moz-animation: cloud_two 75s linear infinite;
  -o-animation: cloud_two 75s linear infinite;
  animation: cloud_two 75s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.clouds_three {
  background: url("images/cloud_three.png");
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_three 100s linear infinite;
  -moz-animation: cloud_three 100s linear infinite;
  -o-animation: cloud_three 100s linear infinite;
  animation: cloud_three 100s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}



@-webkit-keyframes cloud_one {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
@-moz-keyframes cloud_one {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
@keyframes cloud_one {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}

@-webkit-keyframes cloud_two {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
@-moz-keyframes cloud_two {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
@keyframes cloud_two {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}

@-webkit-keyframes cloud_three {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
@-moz-keyframes cloud_three {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
@keyframes cloud_three {
  0% {
	left: 0
  }
  100% {
	left: -200%
  }
}
</style>

<template>
    <div id="main" class="app-main">
        
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style>
html,
body {
  min-width: 1440px;
  height: 100%;
  background: #f0f0f0;
  overflow: auto;
}

.app-main {
  width: 100%;
  height: 100%;
}
</style>
