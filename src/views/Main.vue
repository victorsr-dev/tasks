<template>
  <div>
    <header-bar title="Dashboard" :title-stack="titleStack" />
    <section class="section is-main-section">
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="projector-screen" :number="projectsNumber" label="Projects"/>
        <card-widget class="tile is-child" type="is-info" icon="cart-outline" :number="tasksNumber" label="Tasks"/>
        <card-widget class="tile is-child" type="is-success" icon="chart-timeline-variant" :number="0" suffix="%" label="Performance"/>
      </tiles>

      <card-component title="Performance" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
        </div>
      </card-component>
    </section>
  </div>
</template>
<script>
import * as chartConfig from '@/components/Charts/chart.config'

import { mapGetters } from 'vuex'

import HeaderBar from '@/components/HeaderBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'

export default {
  name: 'Main',
  components: {
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeaderBar
  },
  data () {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      }
    }
  },
  computed: {
    ...mapGetters(['tasksNumber', 'projectsNumber']),
    titleStack () {
      return [
        'Admin',
        'Dashboard'
      ]
    }
  },
  mounted () {
    this.fillChartData()

    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })

    this.$store.dispatch('getTasks')
    this.$store.dispatch('getProjects')
  },
  methods: {
    randomChartData (n) {
      let data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillChartData () {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          }
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
      }
    }
  }
}
</script>
