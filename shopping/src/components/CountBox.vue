<template>
  <div class="all">
    <button class="left" @click="sub">-</button>
    <input type="number" @change="hande" :value="value" />
    <button class="right" @click="add">+</button>
  </div>
</template>
<script>
export default {
props:{
  value:{
    type:Number,
    default: 1
  }
},
methods:{
  add(){
    this.$emit('input',this.value + 1)
   
  },
   sub(){
     if(this.value>1){
       this.$emit('input',this.value - 1)
     }
  },
  hande(e){
    const num = +e.target.value
    if(num%1!==0){
      e.target.value =  Math.floor(num)
      this.$emit('input', +e.target.value)
    }
    return
  }
}
}
</script>

<style lang="less" scoped>
.all{
  display: flex;
  button{
    width: 40px;
    height: 30px;  
    background-color: #efefef;
    border: none;
    font-size: 24px;
  }
  input{
    width: 50px;
    height: 30px;
    border: none;
    background-color: #efefef;
    margin: 0 5px;
    text-align: center;
  }
}
</style>