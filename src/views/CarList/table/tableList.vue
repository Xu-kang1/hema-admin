<template>
  <div>
    <el-table
  :data='tableData'
  highlight-current-row
  @row-click='rowClick'
  @current-change='handleCurrentChange'
  border
  style='width: 100%'>
  <el-table-column
    type='index'
    label='序号'
    width='50'>
  </el-table-column>
  <el-table-column
    prop='brandName'
    label='品牌'>
  </el-table-column>
   <el-table-column
    prop='seriesName'
    label='车系'>
  </el-table-column>
  <el-table-column
    prop='modelName'
    label='车型'>
  </el-table-column>
  <el-table-column
    prop='color'
    label='颜色'>
  </el-table-column>
  <el-table-column
    prop='sellPrice'
    label='售价(万元)'>
  </el-table-column>
  <el-table-column
    prop='downPayment'
    label='首付(万元)'>
  </el-table-column>
   <el-table-column
    prop='mileage'
    label='行驶里程(万公里)'>
  </el-table-column>
  <el-table-column
    prop='licenseTime'
    label='上牌时间'>
  </el-table-column>
  <el-table-column
    prop='shopName'
    label='所属店铺'>
  </el-table-column>
  <el-table-column
    prop='city'
    label='所在地'>
  </el-table-column>
  <el-table-column
    prop='gmtCreat'
    label='发布时间'>
  </el-table-column>
  </el-table>
  <tab-detail :show.sync="show" :userInfo="userInfo"></tab-detail>
  </div>
</template>
<script>
import tabDetail from '../tabDetail/tabDetail'
export default {
  components: {
    tabDetail
  },
  props: {
    tableData: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      show: false,
      userInfo: null,
      currentRow: null
    }
  },
  methods: {
    rowClick (row, event, column) {
      this.show = true
      this.userInfo = row
      // console.log(this.userInfo)
    },
    handleCurrentChange (val, rowIndex) {
      this.currentRow = val
    }
  }
}
</script>
<style lang="less" scoped>
</style>
