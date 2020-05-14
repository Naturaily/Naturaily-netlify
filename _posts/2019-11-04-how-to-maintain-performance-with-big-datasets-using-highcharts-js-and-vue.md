---
title: How to Maintain Performance with Big Datasets Using Highcharts.js and Vue
description: >-
  Highcharts is a powerful tool that allows you to plot massive series of data
  in a dynamic manner.
slug: big-datasets-highcharts-vue
layout: post
date: '2019-11-13 10:56:21 +0200'
category: JavaScript development
authors:
  avatar: /assets/images/andrzej_profile.png
  label: Andrzej Gatkowski
  value: author-29
image: >-
  /assets/images/posts/how-to-maintain-performance-with-big-datasets-using-highcharts.js-and-vue.jpg
text-preview: >-
  Sometimes you just need to show big datasets in your project. However, the
  library that you’ve used so far, as soon as you start to add data, becomes
  clunky and slow. You start to optimize your code, make cuts, or
  simplifications in datasets… In this article I’m going to show you that it
  does not have to be that way.
tags:
  - JavaScript
  - Vue
  - Highcharts.js
---
**Sometimes you just need to show big datasets in your project. However, the library that you’ve used so far, as soon as you start to add data, becomes clunky and slow. You start to optimize your code, make cuts, or simplifications in datasets… In this article I’m going to show you that it does not have to be that way.**

Used by “[80% of the largest companies in the world](https://www.highcharts.com/blog/products/highcharts/){:rel="nofollow"}{:target="_blank"}”, Highcharts is a powerful tool that allows you to plot massive series of data in a dynamic manner. As it’s free for non-commercial use, you can easily check for yourself if it’s going to suit your tastes. This project will also use highcharts-vue, which is a wrapper for Highcharts.

### Installation:

The tools that we are going to need for the job are:

* Highcharts
* Highcharts vue
* Axios

You can easily install them all at once using npm command:

```javascript
npm i highcharts highcharts-vue axios -S
```

Now that we have all the pieces, let's add them in the main.js file:

```javascript
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import boost from "highcharts/modules/boost";

Vue.use(HighchartsVue);
boost(Highcharts);
```

You may be wondering, what this boost module is. I think that, to best explain it, the official documentation can be cited:

> [Boost](https://www.highcharts.com/docs/advanced-chart-features/boost-module){:rel="nofollow"}{:target="_blank"} is a stripped-down renderer-in-a-module for Highcharts and Highstock. It bypasses some of the standard Highcharts features (such as animation), and focuses on pushing as many points as possible as quickly as possible.

So, to sum it up, this module will make our charts run faster, but at the cost of some minor drawbacks. For example, you won’t be able to use dotted lines for your series. But, don’t you worry,  the key parts are still fully functional.

Disclaimer: As the boost module is still in development, it can cause several bugs. For example, when using timestamps as x value, `boost.useGPUTranslations` will cause points to render in wrong places while zoomed, so you will need to do additional research, or just ask on the Highcharts forums.

### Mocking the data:

As we need to have some data to show, and you probably don’t have any endpoints hanging around, we will need to generate some dummy data. We will need to create an object that has two (or more) attributes filled with chart data (for the sake of showing performance - about 100k points each, but you can totally try with 200-300k, or more). Highcharts allows us to add such as series in two ways:

* array of {x,y} objects
* array of values (where you specify the start of each series, as well as intervals)

This article covers how to make use of the first way, but you can always read the official [Highcharts documentation](https://www.highcharts.com/docs/index){:rel="nofollow"}{:target="_blank"} to see other possibilities. To get the data, if you don’t want to generate it yourself, you can use my `test.json` (it’s in a [public folder](https://gitlab.naturaily.eu/andrzej.gatkowski/highcharts-demo/blob/master/public/test.json){:rel="nofollow"}{:target="_blank"} on the repo).

### Let’s make use of it:

Now that we have some data to show, we can filtrate it. Even though this is a simplified version of the real application, we can create our architecture in a way that somewhat reflects the real case. Therefore, we can create 3 files:

* ChartFiltration.vue
* Chart.vue
* store.js

`ChartFiltration.vue` will be, a parent of a Chart component. Its job will be issuing fetches and to know when the data is ready. `Chart.vue` will simply be used to show the series that are being passed by props. All logic related to processing the chart data will be stored in a store module.

**First App.vue**

```vue
<template>
  <div id="app">
    <ChartFiltration />
  </div>
</template>

<script>
import ChartFiltration from "./components/ChartFiltration";

export default {
  components: { ChartFiltration }
};
</script>
```

Nothing too fancy here, just some imports.

**ChartFiltration.vue**

```vue
<template>
  <div v-if="series">
    <Chart :series="series" />
  </div>
  <div v-else>
    Data is loading
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "./Chart";

export default {
  name: "ChartFiltration",
  components: { Chart },
  mounted() {
    this.$store.dispatch("fetchData");
  },
  computed: mapState({
    series: state => state.data
  })
};
</script>
```

As you can see, when the component is being mounted, the fetch in the store will be dispatched. The data will be mapped to a computed series. As I use conditional rendering, `Chart.vue` component will be rendered only when a series will have its length (because they will be returned as an array).

**store.js**

```javascript
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const RESET_ERROR = null;
const generateSeries = data => {
  return Object.keys(data).map(attribute => {
    return {
      type: "line",
      boostThreshold: 1,
      turboThreshold: 0,
      animation: false,
      name: attribute,
      data: data[attribute],
      marker: { enabled: true, radius: 3 },
      states: { hover: { lineWidthPlus: 0 } }
    };
  });
};
export default new Vuex.Store({
  state: {
    data: null,
    error: null
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = generateSeries(data);
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchData({ commit }) {
      commit("SET_ERROR", RESET_ERROR);

      axios
        .get("/test.json")
        .then(res => {
          commit("SET_DATA", res.data);
        })
        .catch(err => {
          commit("SET_ERROR", err);
        });
    }
  }
});
```

In this article I simply want to show how to work with data in Highcharts. There is no need to use modules for the store, like we would in a real application and, therefore, this is why I will use a single store file. Let’s focus on `fetchData` action. I simulate the http call with axios. After the data has been “fetched”, we will commit the `SET_DATA` mutation. Highcharts has its specific way of building chart objects. Because there can’t be too much logic in mutations, we add an additional helper function to process our response properly.

```javascript
const generateSeries = data => {
  return Object.keys(data).map(attribute => {
    return {
      type: "line",
      boostThreshold: 1,
      turboThreshold: 0,
      animation: false,
      name: attribute,
      data: data[attribute],
      marker: { enabled: true, radius: 3 },
      states: { hover: { lineWidthPlus: 0 } }
    };
  });
};
```

The helper function simply iterates on object to get its attributes. After each iteration, we return the Highcharts series object, and this is what we will focus on:

* type: here you can specify a type of series
* boostThreshold: point threshold for when a series should enter boost mode. 1 means that we always want to use boost, 0 means never
* turboThreshold: for a bigger {x,y} series, it’s better to disable it (by setting 0) as it will not render. If the set threshold is passed, only one dimensional arrays of numbers, or two dimensional arrays with x and y values, are allowed
* animation: as animations slow down our chart, we don’t want them
* name: name of the series shown in the legend
* data: here, we need to assign our array of datapoints
* marker: size of the markers on the chart
* states: here, we will disable the line thickening on hover, as it will add lag for big datasets

What can we set additionally ?

* color: remember that, when using the boost module, you can only use simple colors (rgb/hex). You can also set them with css, but it’s trickier.
* Honestly, whatever you want, as this is a simple object that you will have access to by using this keyword in the chart object (for example, in the tooltip formatter). You can add units for series, or another type of name to show, but remember that you will need to handle logic for those by yourself.

[Here](https://api.highcharts.com/highcharts/plotOptions.series){:rel="nofollow"}{:target="_blank"} is a list of attributes that you can officially assign for a series.

Now that we have our data processed, we can focus on showing it.

**Chart.vue**

```vue
<template>
  <highcharts :options="chartOptions" />
</template>
<script>
export default {
  name: "Chart",
  props: {
    series: { type: Array, required: true }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "line",
          height: "700px",
          redraw: true,
          animation: false,
          zoomType: "xy",
          panning: true,
          panKey: "shift"
        },
        boost: { enabled: true },
        tooltip: {
          formatter() {
            const time = new Date(this.x).toJSON();
            const name = this.series.name;
            return `<b>${name}</b><br />
              value: ${this.y} <br />
              time: ${time}`;
          }
        },
        series: this.series,
        xAxis: {
          type: "datetime"
        }
      };
    }
  }
};
</script>
```

This components sole function is to create a **chartOptions** object that is passed to the highcharts-vue wrapper. We pass the series as props. On each change, a new **chartOptions** object will be computed and will force the whole component to rerender. Let’s look at the function that creates it:

```javascript
chartOptions() {
      return {
        chart: {
          type: "line",
          height: "700px",
          animation: false,
          zoomType: "xy",
          panning: true,
          panKey: "shift"
        },
        boost: { enabled: true },
        tooltip: {
          formatter() {
            const time = new Date(this.x).toJSON();
            const name = this.series.name;
            return `<b>${name}</b><br />
              value: ${this.y} <br />
              time: ${time}`;
          }
        },
        series: this.series,
        xAxis: {
          type: "datetime"
        }
      };
    }
```

* chart: has basic information about chart.
  * type: specifies which type of chart we are going to show
  * height: we can simply specify how much height in px this chart is going to have
  * animation: disables all animations which may slow down the chart
  * zoomType: specifies what type of zoom we can use. ‘xy’ means that we can zoom in both directions
  * panning: true allows us to pan the chart after zooming
  * panKey: specifies which key is used for panning
* boost: {enabled: true} : this is used to tell the chart to use the boost module
* tooltip: the tooltip is generated by default, but by using formatter(), we can specify exactly how it will look. Here, we have access (by this keyword) for each series attribute.
* series: this is where we put the processed array of highcharts objects
* xAxis: it’s used for informing chart, what is the type of series, specifying title, label format, and lots of other things.

The list of values that can be set for any of those attributes can be found [here](https://api.highcharts.com/highcharts/){:rel="nofollow"}{:target="_blank"}.  

And, honestly, this is all. **By moving processing logic to the store, we won’t cause any unnecessary computations inside of the component, which will improve speed immensely.** In `ChartFiltrations.vue`, we can add some buttons to add additional filtrations to the chart. For example, we can add buttons to specify if we want to see only one type of attribute (remember that we need to still do the filtrations inside the store). Additionally, as in this example, we have both current and voltage. As you should know, they have different units, so to make our chart more lucid, we can use multiple y axises. It can be done simply by adding a **yAxis** object:

```javascript
  yAxis: [
    {
      title: { text: 'Current [A]' },
      gridLineWidth: 0.5,
      showEmpty: false
    },
    {
      title: { text: 'Voltage [V]' },
      gridLineWidth: 0.5,
      showEmpty: false
    }
  ]
```

to the **chartOptions** object, specifying to which y axis the dataset belongs while creating highcharts series objects:

```javascript
const generateSeries = data => {
  return Object.keys(data).map(attribute => {
    return {
      type: "line",
      yAxis: attribute === "current" ? 0 : 1
    };
  });
};
```

Let’s see how it looks in action:

{% image /assets/images/highcharts.gif Highcharts Highcharts %}

As you can see, we had two series of 100k points, and they are working smoothly. In our project, sometimes we have 1 mln points to show at once, and performance is still superb. So, we can say with certainty that Highcharts fulfills its role, for sure.

In this article, I have hopefully shown you that lots of data does not come with a need to make performance cuts. This implementation is only one of numerous approaches to this particular topic. If you have any comments or questions, I will be happy to answer them through the comments.  

You can find a working example [here](https://gitlab.naturaily.eu/andrzej.gatkowski/highcharts-demo/tree/master){:rel="nofollow"}{:target="_blank"}.

<br>

[{% image /assets/images/job-offers_naturaily.png join join %}](https://naturaily.com/careers){:target="_blank"}
