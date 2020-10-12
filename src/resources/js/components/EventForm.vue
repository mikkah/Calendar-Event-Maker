<template>
  <div>
    <div class="event-form">
      <div class="form-group">
        <label for="">Event</label>
        <input type="text" name="" v-model="eventForm.name" class="form-control">
      </div>

      <div class="form-group row">
        <div class="col">
          <label for="">From</label>
          <Datepicker v-model="eventForm.from"/>
        </div>
         <div class="col">
          <label for="">To</label>
          <Datepicker v-model="eventForm.to"/>
        </div>
      </div>
      
      <div class="d-flex ">
        <span class="days mr-3" v-for="(day, key) in days" :key="key">
          <input type="checkbox" :value="day" class="days-checkbox" name="" id="">
          {{ day }}
        </span>
      </div>
      
      <div class="form-group mt-2">
        <button class="btn btn-primary" type="button" @click="addEvent">Save</button>
      </div>
      

    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { format } from 'date-fns'
import { bus } from '../app';

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      eventForm: {
        name:'',
        from:'',
        to: '',
      },
      days: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ]
    }
  },
  created() {
  },
  methods: {
    addEvent() {
      const eventDates = this.setEventsDates();
      if(eventDates == 'InvalidEvent') {
        this.$toastr.warning('Invalid Event.');
        return;
      }

      if(eventDates == 'InvalidDates') {
        this.$toastr.warning('Invalid Date Range.');
        return;
      }

      this.$axios.post('/api/event', eventDates).then((resp) => {
        if(resp.status == 200) {
          bus.$emit('updateEventList')
          this.$toastr.success('Event successfully saved.');
        } else {
          this.$toastr.error('Something went wrong.');
        }
      }).catch((err) => {
        if(err) {
          this.$toastr.error('Server Error');
        }
      });
    },
    pickedDays(e, day) {
      const daysArr = [];
      const days = document.getElementsByClassName('days-checkbox')

      Object.keys(days).map(i => {
        if(days[i].checked) {
          daysArr.push(days[i].value)
        }
      })
      return daysArr;
    },
    setEventsDates() {
      const { from, to, name } = this.eventForm;
      const days = this.pickedDays();

      if(name.trim() == '' || from == '' || to == '' || days.length == 0) {
        return 'InvalidEvent';
      }

      if(new Date(from) > new Date(to) ) {
        return 'InvalidDates';
      }


      const start = new Date(from);
      const end = new Date(to);
      const eventHolder = []

      for (let index = start; index <= end; index.setDate(index.getDate() + 1)) {
        const day = format(new Date(index),'EEE')
        if(days.includes(day)) {
          eventHolder.push({ date: format(index, 'yyyy-MM-dd'), name: this.eventForm.name })
        }
      }
      return eventHolder
    }
  }
}
</script>
