/**
* Created by qqwan on 2019/01/30.
*/
<template>
  <div class="overflow-x lh24" :class="{'bg-first': !showForm}">
    <mu-appbar color="primary" class="" v-if="showForm">
      致亲爱的您：
      <mu-button icon slot="right" @click="backtoHome">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div v-if="!showForm">
      <div class="padding5-10">
        每一个您我，就像浩瀚大海里的一滴海水，渺小，无足轻重！正如我们短暂的一生，在无限时间长河里，短暂得可以忽略！世事无常，白驹过隙，您是否虚度了昨天，今天，此刻？如果用一个月代表一个格子，看看您逝去了多少，还剩多少？
        <span @click="editForm"><span class="ml5 color-primary">开始</span><mu-icon class="go-icon" value="arrow_forward" color="primary" size="24"></mu-icon></span>
      </div>
    </div>
    <div v-else>
      <div class="padding5-10">
        截止今日{{curDate}},距离您的出生日{{birthday}},您已经走过了<span class="color-primary fwb">{{passNum}}</span>{{type==='day'?'天':type==='month'?'个月':type==='week'?'周':'年'}}。距离您设定的{{targetAge}}岁，还有<span class="color-primary fwb">{{nextNum}}</span>{{type==='day'?'天':type==='month'?'个月':type==='week'?'周':'年'}}，且行且珍惜！
        <mu-icon value="border_color ml20" color="primary" size="16" @click="editForm"></mu-icon>
      </div>
      <div class="padding5-10">
        <div class="select-control-group flex">
          <mu-flex class="select-control-row flex25" :key="'typeoption ' + i" v-for="i in typeOptions">
            <mu-radio :value="i" v-model="type" :label="i" @change="showList"></mu-radio>
          </mu-flex>
        </div>
      </div>
      <div class="flex">
        <div class="item item-pass" :class="[type==='year'?'item-big':type==='week'||type==='day'?'item-small':'']" v-for="n in passNum" :key="'pass'+n" v-if="passNum>0"></div>
        <div class="item item-next" :class="[type==='year'?'item-big':type==='week'||type==='day'?'item-small':'']" v-for="n in nextNum" :key="n" v-if="nextNum>0"></div>
      </div>
      <div class="padding5-10">无敌是多么多么寂寞。。。</div>
    </div>
    <mu-dialog title="您的信息" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      <mu-container class="pr30">
        <mu-date-input v-model="birthday" label="请输入生日" error-text="" label-float icon="date_range" :full-width="fullWidth" no-display format="YYYY-MM-DD" value-format="YYYY-MM-DD"></mu-date-input><br>
        <mu-text-field type="number" v-model="targetAge" label="请输入目标年龄" label-float error-text="" icon="message" :full-width="fullWidth"></mu-text-field><br>
      </mu-container>
      <mu-button slot="actions" flat color="primary" @click="alertSubmit">确定</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        birthday: '',
        targetAge: '',
        type: 'month',
        typeOptions: ['year', 'month', 'week', 'day'],
        curDate: '',
        passNum: 3,
        nextNum: 6,
        showForm: false,
        fullWidth: true,
        openAlert: false
      }
    },
    methods: {
      getCurDate () {
        const cur = new Date()
        let m = cur.getMonth() + 1
        if (m < 10) {
          m = '0' + m
        }
        this.curDate = cur.getFullYear() + '-' + m + '-' + cur.getDate()
      },
      setDate (time) {
        if (time === '') {
          return new Date()
        }
        let cur = new Date()
        time.split('-').forEach((item, index) => {
          if (index === 0) {
            cur.setFullYear(item)
          } else if (index === 1) {
            cur.setMonth(parseInt(item) - 1)
          } else if (index === 2) {
            cur.setDate(item)
          }
        })
        return cur
      },
      getPassNum () {
        const birth = this.setDate(this.birthday)
        const birthYear = parseInt(this.birthday.substring(0, 4))
        this.targetAge = parseInt(this.targetAge)
        const targetYear = birthYear + this.targetAge
        const target = this.setDate(targetYear + this.birthday.substring(4, this.birthday.length))
        if (this.type === 'day') {
          this.passNum = parseInt((new Date().getTime() - birth.getTime()) / (1000 * 3600 * 24))
          this.nextNum = parseInt((target.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
        } else if (this.type === 'week') {
          this.passNum = parseInt((new Date().getTime() - birth.getTime()) / (1000 * 3600 * 24 * 7))
          this.nextNum = parseInt((target.getTime() - new Date().getTime()) / (1000 * 3600 * 24 * 7))
        } else if (this.type === 'month') {
          this.passNum = (new Date().getFullYear() - birth.getFullYear()) * 12
          if (new Date().getMonth() > birth.getMonth()) {
            this.passNum = this.passNum - (new Date().getMonth() - birth.getMonth())
          } else {
            this.passNum = this.passNum + 12 - (12 + new Date().getMonth() - birth.getMonth())
          }
          this.nextNum = this.targetAge * 12 - this.passNum
        } else if (this.type === 'year') {
          this.passNum = new Date().getFullYear() - birth.getFullYear()
          this.nextNum = this.targetAge - this.passNum
        }
      },
      submitForm () {
        if (this.birthday === '') {
          this.$toast.error({message: '请填写出生日期!', position: 'top'})
          return false
        }
        if (this.targetAge === '') {
          this.$toast.error({message: '请填目标年龄!', position: 'top'})
          return false
        }
        if (this.setDate(this.birthday).getTime() > new Date().getTime()) {
          this.$toast.error({message: '请正确填写出生日期!', position: 'top'})
          return false
        }
        if (parseInt(this.targetAge) <= 0) {
          this.$toast.error({message: '请正确填写目标年龄!', position: 'top'})
          return false
        } else {
          this.targetAge = parseInt(this.targetAge)
        }
        if (((parseInt(this.birthday.substring(0, 4)) + parseInt(this.targetAge))) < new Date().getFullYear()) {
          this.$toast.error({message: '请正确填写您的生日和目标年龄!', position: 'top'})
          return false
        }
        localStorage.setItem('birthday', this.birthday)
        localStorage.setItem('targetAge', this.targetAge)
        this.showList()
        return true
      },
      showList () {
        if (this.birthday !== '' && this.targetAge !== '') {
          this.getCurDate()
          this.getPassNum()
          this.showForm = true
        }
      },
      editForm () {
        this.openAlert = true
      },
      closeAlertDialog () {
        this.openAlert = false
      },
      alertSubmit () {
        let flag = this.submitForm()
        if (flag) {
          this.closeAlertDialog()
        }
      },
      backtoHome () {
        localStorage.removeItem('birthday')
        localStorage.removeItem('targetAge')
        this.birthday = ''
        this.targetAge = ''
        this.showForm = false
      }
    },
    mounted () {
      if (localStorage.getItem('birthday') !== null) {
        this.birthday = localStorage.getItem('birthday')
      }
      if (localStorage.getItem('targetAge') !== null) {
        this.targetAge = localStorage.getItem('targetAge')
      }
      this.showList()
    }
  }
</script>
<style scoped>
</style>
