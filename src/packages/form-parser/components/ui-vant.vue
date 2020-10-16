<template>
  <div class="ui-want">
    <van-form @submit="onSubmit">
      <van-field
        v-for="item of code"
        :key="item._id"
        v-model="item.fieldKey"
        :name="item.fieldKey"
        :label="item.label"
        :placeholder="item.placeholder"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "UiVant",
  props: {
    code: Array,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    // 表单提交
    onSubmit() {},
  },
};
</script>

<style lang="scss">
.ui-want {
}
</style>