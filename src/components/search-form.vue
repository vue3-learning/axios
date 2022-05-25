<script>
import { downloadFile } from '../utils/download'

const splitByDot = function(value) {
  if (value) {
    return value.split('.')
  } else {
    return []
  }
}
const setValByKey = function(obj, keyString, val) {
  let current = obj
  const keyArray = splitByDot(keyString)
  const len = keyArray.length
  if (len > 0) {
    keyArray.forEach((key, index) => {
      if (len === 1) { // 如果为单层,则直接设置
        obj[key] = val
      } else { // 否则在最后一层设置值,以保持对象的引用
        if (index === len - 1) {
          current[key] = val
        }
        current = current[key]
      }
    })
  }
}

export default {
  name: 'search-form',

  props: {
    value: {
      //form表单
      type: Object,
      required: true,
    },
    formList: {
      type: Array,
      default: () => [],
    },
    slotButtonList: {
      type: Array,
      default: () => []
    },
    resetForm: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    form() {
      return this.value || {};
    },
  },

  data() {
    return {
      initForm: {}, // 存放重置表单数据
      col: 6, //每个表单项要占的多少栅格
      pickerOptions: {
        // 时间组件快捷选项
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      pickerOptionsRange: {
        // 时间范围组件快捷选项
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              start.setHours(0, 0, 0, 0);
              end.setHours(23, 59, 59, 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近七天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      pickerOptionsMonthRange: {
        //月份范围快捷选项
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            },
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },

  mounted() {
    // 保存表单初始状态到initForm,方便重置
    this.initForm = JSON.parse(JSON.stringify(this.resetForm ? this.resetForm : this.form))
  },

  methods: {
    search(e) {
      //搜索
      this.$emit("search", this.form);
    },
    reset() {
      //重置
      let keyArr = [];
      this.formList.map((item) => {
        item.model ? keyArr.push(item.model) : "";
        item.start ? keyArr.push(item.start) : "";
        item.end ? keyArr.push(item.end) : "";
      });
      if (typeof this.initForm !== "undefined" && this.resetForm) {
        // 如果有传递resetForm,则使用resetForm数据重置
        Object.keys(this.form).forEach((k) => {
          if (keyArr.includes(k)) {
            this.form[k] = JSON.parse(JSON.stringify(this.initForm[k] || ''));
          }
        });
      } else {
        // 否则全部置空
        Object.keys(this.form).forEach((k) => {
          this.form[k] = "";
        });
      }
      this.$emit("reset");
    },
    dateRangeChange(val = [], item) {
      setValByKey(this.form, item.start, val[0] || '');
      setValByKey(this.form, item.end, val[1] || '');
    },

    inputChange(val, item, key) {
      console.log(val, item, key)
      //input类型输入限制
      if (item.directive === "enterNumber") {
        //只能输入数字
        val = val.replace(/[^\d]/g, "");
        setValByKey(this.form, key || item.model, val);
      } else if (item.directive === "enterDecimal") {
        //只能输入数字或者2位小数
        val = val.match(/^\d*(\.?\d{0,2})/g)[0];
        setValByKey(this.form, key || item.model, val);
      }
    },

    exports(url, fileName) {
      downloadFile('/merchant/' + url, this.form, fileName)
    }
  },

  render(h) {
    const dom = null
    const map = {
      'input': item => (
        <el-input
          disabled={item.disabled}
          class="text"
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label || ''}`}
          v-model={this.form[item.model]}
          // onInput={val => this.form[item.model] = val}
          on-input={val => this.inputChange(val, item)}
          onKeyup={e => console.log(e)}
          maxlength={item.maxlength || ''}
        />
      ),
      'select': item => (
        <el-select
          class="full-width"
          v-model={this.form[item.model]}
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label || ''}`}
        >
          {item.options.map(ele => (
            <el-option
              label={ele.label}
              value={ele.value}
              key={ele.value}
            />
          ))}
        </el-select>
      ),
      'date': item => (
        <el-date-picker
          class="full-width"
          v-model={this.form[item.model]}
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder={item.placeholder ? item.placeholder : `请输入${item.label || ''}`}
        />
      ),
      'month': item => (
        <el-date-picker
          class="full-width"
          v-model={this.form[item.model]}
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label || ''}`}
        />
      ),
      'year': item => (
        <el-date-picker
          class="full-width"
          v-model={this.form[item.model]}
          type="year"
          format="yyyy"
          value-format="yyyy"
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label || ''}`}
        />
      ),
      'dateRange': item => (
        <el-date-picker
          v-model={this.form[item.model]}
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="full-width"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder={item.placeholder ? item.placeholder : `请选择${item.label || ''}`}
          onChange={val => this.dateRangeChange(val, item)}
        />
      )
    }
    const generateDom = ele => {
      return map[ele.type] && map[ele.type](ele)
    }

    const buttomThis = {
      router: this.$router,
      exports: this.exports,
    }

    return (
      <el-form
        class="searchFrom"
        label-width="120px"
        label-position="right"
        props={{model: this.form}}
        size="small"
        οnSubmit={() => {}}
        nativeOn-keyup={e => e.key === 'Enter' && this.search()}
      >
        {
          this.formList.map(ele => (
            <el-form-item class="item" label={ele.label}>
              {generateDom(ele)}
            </el-form-item>
          ))
        }

        <div class="search-btns">
          <el-button type="primary" onClick={() => this.search()}>查询</el-button>
          <el-button onClick={() => this.reset()}>重置</el-button>
          {this.slotButtonList.map(ele => (
            <el-button type={ele.type} onClick={(e) => eval(ele.onClick)(buttomThis)}>{ele.name}</el-button>
          ))}
        </div>
      </el-form>
    )
  }
}
</script>

<style>
.item {
  margin-right: 10px;
  width: 354px;
  display: inline-block;
}
.search-btns .el-button {
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
  text-align: center;
  min-width: 70px;
  margin: 0 10px 10px 0;
}
.full-width {
  width: 100%!important;
}
</style>
