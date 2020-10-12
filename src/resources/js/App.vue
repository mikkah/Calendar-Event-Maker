<template>
  <div class="container">
    <div class="row header border-bottom">
      <h2>Calendar</h2>
    </div>

    <div class="row">
      <div class="col-md-4">
        <EventsForm />
      </div>
      <div class="col-md-8">
        <Events />
      </div>
    </div>
  </div>
</template>


<script>
import EventsForm from './components/EventForm'
import Events from './components/Events'
export default {
  components: {
    EventsForm,
    Events
  },
}
</script>
