<template>

  <div class="input-border">
    <phone v-if="isCode === 0" @seng="this.$emit('seng',$event)" />
    <verification v-else-if="isCode === 1" @verification="this.$emit('verification',$event)" @seng="this.$emit('seng',$event)" :phone="value.phone" />
    <name v-if="isCode === 2" :account="{phone:value.phone,password:value.password,captcha:value.verification}" />
  </div>

</template>

<script>
import verification from "./register-file/verification.vue";
import phone from "./register-file/phone.vue";
import name from "./register-file/name.vue";
import { ref } from 'vue'
export default {
  name: 'singIn',
  components: {
    phone,
    verification,
    name
  },
  setup() {
    const phone = ref(null)
    const password = ref(null)
    const captcha = ref(null)
    return { phone,password,captcha }
  },
  props: {
    isCode: Number,
    value: Object
  }
}
</script>

<style>
.input-border {
  padding: 0 15px;
}
</style>
