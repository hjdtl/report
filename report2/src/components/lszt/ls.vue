<template>
  <div class="ls">
    <h1>{{ msg }}</h1>
    <h1>{{ $route.params.id }}</h1>
    <span>数据：</span>
    <p>{{datas}}</p>
    <div class="htmlHere"></div>
  </div>
</template>

<script>

  export default {
    name: 'ls',
    data () {
      return {
        msg: 'ls',
        datas:''
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods:{
      fetchData(){
        $.get('/static/ls.html',{},re=>{
          $('.htmlHere').append(re)
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-weight: normal;
  }
  .ls{
      width: 100%;
    height: auto;
  }
</style>
