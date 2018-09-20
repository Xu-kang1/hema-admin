<template>
  <div>
    <div style="margin-top: 15px;">
      <div class="topSearch">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option
            v-for="item in optionsSelect"
            :key="item.id"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-input>
        <el-button slot="append" type="primary" @click="search">搜索</el-button>
      </div>
      <div class="search">
        <div class="list">
          <span>所在城市：</span>
          <el-cascader
          :options="options_"
          clearable
          v-model="selectedOptions">
          </el-cascader>
          <span style="margin-left:10px;">售价：</span>
          <el-input class="styleA" v-model.lazy='minPrice'></el-input>万元 ~
          <el-input class="styleA" v-model.lazy='maxPrice'></el-input>万元
            <!-- <el-select v-model="value3" clearable placeholder="请选择" class="width">
              <el-option
                v-for="item in options01"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <span style="margin-left:10px;">&nbsp; 颜色：</span>
            <el-select v-model="value2" clearable placeholder="请选择" class="width">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-button type="primary"  @click="search">查询</el-button>
        </div>
        <div class="list">
          <span>行驶里程：</span>
          <el-input class="size"
            placeholder=""
            v-model.lazy="minMileage"
            clearable>
          </el-input>
          <span>~</span>
          <el-input class="size"
            placeholder=""
            v-model="maxMileage"
            clearable>
          </el-input>
          <span style="margin-right:20px;">万公里</span>
          <span class="demonstration">上牌时间：</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
            <el-button type="primary" @click="search">确定</el-button>
          </div>
      </div>
    </div>
    <TableList :tableData="tableData"></TableList>
    <div class="block" v-if="iCanSee">
      <el-pagination
        @current-change="changePage"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total= total>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import TableList from './table/tableList'
import axios from '../../../config/http'
// import Tab from './tab'
export default {
  components: {
    TableList
  },
  data () {
    return {
      currentTab: 'tab',
      input: '',
      select: '',
      value: [],
      value2: '',
      options: [{value: '白色', label: '白色'}, {value: '黑色', label: '黑色'}, {value: '银灰色', label: '银灰色'}, {value: '红色', label: '红色'}, {value: '蓝色', label: '蓝色'
      }, {value: '棕褐色', label: '棕褐色'}, {value: '金色', label: '金色'}, {value: '橙色', label: '橙色'}, {value: '黄色', label: '黄色'}, {value: '紫色', label: '紫色'}, {value: '绿色', label: '绿色'}, {value: '其它', label: '其它'}],
      cityCode: '',
      options_: [],
      total: null,
      currentPage: 1,
      iCanSee: false,
      optionsSelect: [{value: 0, label: '品牌'}, {value: 1, label: '车系'}, {value: 2, label: '店铺'}, {value: 3, label: '型号'}],
      selectedOptions: [],
      maxPrice: null,
      minPrice: null,
      minMileage: null,
      maxMileage: null,
      tableData: null
    }
  },
  mounted () {
    this.getAllCity()
    this.search()
  },
  methods: {
    dinog () {
      this.visible = true
    },
    search () {
      this.currentPage = 1
      this.getData(0, 10)
    },
    getData (start, size) {
      let token = sessionStorage.getItem('token')
      let uId = sessionStorage.getItem('id')
      axios.post('/car/admin/searchCar', {
        cityCode: this.selectedOptions[1],
        searchKey: this.input,
        keyType: Number(this.select),
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minMileage: this.minMileage,
        maxMileage: this.maxMileage,
        color: this.value2,
        licenseTimeStart: this.value[0],
        licenseTimeEnd: this.value[1],
        start: start,
        size: size
      }, {
        headers: {
          token: token,
          uId: uId
        }
      }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        console.log(this.total)
        if (this.tableData) {
          this.iCanSee = true
        }
      })
    },
    // 切换页数
    changePage (currentPage) {
      this.getData((currentPage - 1) * 10, 10)
    },
    // 获取省市区
    getAllCity () {
      let token = sessionStorage.getItem('token')
      this.$nextTick(function () {
        axios({
          method: 'POST',
          url: '/common/queryProvinceCity',
          headers: {
            'token': token
          }
        }).then(res => {
          let arr = []
          res.data.data.forEach((element, index) => {
            let arrB = []
            element.cityList.forEach((element, index_) => {
              arrB.push({value: element.cityCode, label: element.city})
            })
            arr.push({value: element.province, label: element.province, children: arrB})
          })
          this.options_ = arr
          // console.log(this.options_)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-select{
  min-width: 105px;
}
.input-with-select{
  width:750px;
}
.search{
  text-align: left;
}
.font{
  font-size:16px;
}
.size{
  width:80px;
}
.width{
  width:100px;
}
.styleA{
  width:70px;
}
.list{
  margin:10px 0;
}
.el-pagination{
  text-align: right;
}
.topSearch{
  min-width:800px;
  text-align: left;
}
</style>
