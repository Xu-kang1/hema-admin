<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div v-for="list in lists" :key="list.id">222</div>
    <p>111</p>
  </div>
</template>

<script>
import axios from '../../config/http'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lists: ''
    }
  },
  mounted () {
    this.getLeader()
  },
  methods: {
    getLeader () {
      axios.post('/car/newCar'
      ).then(res => {
        this.lists = res.data.data
        console.log(res.data.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
