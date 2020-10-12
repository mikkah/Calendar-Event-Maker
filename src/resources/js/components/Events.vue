<template>
  <div>
    <div class="month-name d-flex justify-content-between p-3">
      <button class="btn btn-sm btn-primary" @click="navigateMonth('prev')">Prev</button>
      <h2>{{ monthName() }}</h2>
      <button class="btn btn-sm btn-primary" @click="navigateMonth('next')">Next</button>

    </div>
    <div class="month-days">
      <p v-if="isLoading">Fetching events list</p>
      <table class="table striped">
        <tr v-for="(event, key) in events" :key="key" :class="event.name ? `withEvent` : ``  ">
          <td>{{ event.date }}  {{ event.day }}</td>
          <td>{{ event.name }} </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getDaysInMonth, format, addMonths, subMonths, setDate } from 'date-fns'
import { bus } from '../app';

export default {
  data() {
    return {
      month: "2020-10",
      events: [],
      isLoading: true,
    }
  },
  created() {
    this.getNoOfDays();
  },
  mounted() {
    bus.$on('updateEventList', () => this.getNoOfDays())
  },
  methods: {
    monthName() {
      return format(new Date(this.month), 'MMM yyyy')
    },
    navigateMonth(type) {
      if(type == 'next') {
        this.month = addMonths(new Date(this.month), 1)
        this.getNoOfDays();
      }
       if(type == 'prev') {
        this.month = subMonths(new Date(this.month), 1)
        this.getNoOfDays();
      }
      
    },
    async getEvents() {
      const resp = await this.$axios.get('/api/event')  
      return resp.data?.events;
    },
    async getNoOfDays() {
      const days = getDaysInMonth(new Date(this.month));
      const events = [];
      const data = await this.getEvents();
      for (let index = 1; index <= days; index++) {

        const completeDate = setDate(new Date(this.month), index);
        const eventName = data.filter((val) => { return val.date == format(completeDate,'yyyy-MM-dd')  })

        events.push({
          date: index,
          day: format(completeDate,'EEE'),
          name: eventName[0]?.name,
          completeDate
        })
      }
      this.isLoading = false;
      this.events = [...events]
    }
  }
}
</script>

<style>
  .month-days {
    height: 500px;
    overflow: auto;
  }
  .withEvent {
    background: #ccc
  }
</style>