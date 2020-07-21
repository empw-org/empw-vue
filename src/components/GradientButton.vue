<template>
  <button><slot></slot></button>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.gradient {
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
}

button {
  .gradient();
  border: 2px solid white;
  color: white;
  border-radius: 2em;
  padding: 15px;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}
</style>
