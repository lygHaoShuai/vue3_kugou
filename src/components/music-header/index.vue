<template>
  <div class="header-outline">
    <img class="kugou-img" src="../../assets/kugou_white.png" />
    <el-icon size="12" color="#dddddd" />

    <div class="search">
      <el-input v-model="state" placeholder="刘鲠哄新歌"
                @focus="this.suggestShow = true"
                @blur="blurShow"
                @input="suggest" @keyup.enter.native="search" >
        <template #prefix>
          <el-icon :size="18" color='#ffffff'>
            <Search />
          </el-icon>
        </template>
      </el-input>
      <div v-if="suggestShow" class="suggest">
        <div class="search-border" v-if="state.length >= 1" v-for="(item,indexSearch) in suggestList"
             :key="indexSearch" @click="search(item.name)">{{ item.name }}</div>
        <div v-else >
          <div class="search-border" @click="search(item)"
               v-for="(item,index) in searchData" :key="index">{{ item }}</div>
          <div class="search-cut" v-if="searchData.length >= 1"
               @click="this.store.commit('search/insertDel')">清空所有历史</div>
        </div>

      </div>
    </div>
    <div class="option">
      <span>音乐人</span>
      <span>主播电台</span>
      <span>开放平台</span>
      <span>VIP会员</span>
      <span>|</span>
    </div>
    <el-row>
      <el-button @click="upDate" size="small" round>登录</el-button>
    </el-row>
</div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { searchSuggest } from '../../API/play'
import { Search } from '@element-plus/icons-vue'

export default {
  name: "music-header",
  setup() {
    const state = ref('')
    const suggestList = ref([])
    const suggestShow = ref(false)
    const searchData = ref([])

    const store = useStore()

    return { state,suggestList,suggestShow,searchData,store }
  },
  components: {
    Search
  },
  mounted() {
    const time = setTimeout(() => {
      if(this.$route.params.name) {
        this.state = this.$route.params.name
      }
    },200)
    this.searchData = this.store.getters['search/searchData']
  },
  methods: {
    upDate() {
      this.$router.push('/login')
    },
    blurShow() {
      let time = setTimeout(() => {
        this.suggestShow = false
      },500)
    },
    search(value) {

      if(this.$route.params.id) {
        window.localStorage.setItem('music-count','false')
      }
      if(value.length >= 1) {
        this.$router.push({path: `/search/${value}`})
        this.store.dispatch('search/insert',value)
      } else {

        this.$router.push({path: `/search/${this.state}`})
        this.store.dispatch('search/insert',JSON.stringify(this.state))
      }

    },
    suggest(e) {
      clearTimeout(this.time)
      this.time = setTimeout( () => {
        if(e.length >= 1) {
          searchSuggest('/search/suggest', {keywords: e}).then(data => {
            this.suggestList = data.result.songs
          })
        }
      },600)
    }
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>
