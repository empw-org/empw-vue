<template>
  <div class="gradient-container">
    <div class="donation-container">
      <div class="donation-text">
        <img
          src="https://lifefromwater.org/wp-content/uploads/2011/07/8.png"
          alt=""
        />
        <p>
          Help us to deliver water for all those people and see their smile. 😃
        </p>
      </div>

      <div class="donation-iframe">
        <iframe
          allowpaymentrequest=""
          frameborder="0"
          height="900px"
          name="donorbox"
          scrolling="no"
          seamless="seamless"
          src="https://donorbox.org/embed/water-donation-1"
          style="
            max-width: 500px;
            min-width: 250px;
            max-height: none !important;
          "
          width="100%"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.donation-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5rem;
  width: 100%;
  align-items: center;
  padding-left: 35px;

  .donation-text {
    background-color: white;
    border-radius: 0.5rem;
    padding-bottom: 30px;
    width: 30rem;
    text-align: center;
    justify-self: end;

    img {
      border-style: none;
      width: 100%;
      margin-bottom: 30px;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }

    p {
      padding: 0 15px;
      text-align: center;
      font-size: 15pt;
    }
  }
  .donation-iframe {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
