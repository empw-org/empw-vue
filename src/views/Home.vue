<template>
  <div>
    <header class="landing-page-header">
      <div class="title-and-brief-intro">
        <img id="logo-text" src="@/assets/logo/empw-letters.png" alt="Logo" />
        <h1>Enhanced Management of Pure Water</h1>
        <p>Get any amount of water as fast, as pure as you need.</p>
        <div class="donate-request-buttons">
          <router-link :to="{ name: 'donation' }">
            <button class="donate-button">Donate Water</button>
          </router-link>

          <router-link :to="{ name: 'user-signin' }">
            <button class="request-button">Order Water</button>
          </router-link>
        </div>
      </div>

      <div class="wave"></div>
    </header>

    <main>
      <section class="about-section">
        <div class="about-section-container">
          <div class="about-image">
            <img src="@/assets/images/about-image.jpg" />
          </div>

          <div class="about-text">
            <h1>About EMPW</h1>
            <p>
              EMPW's primary purpose is to facilitate communication between
              people and water companies. Some areas in Egypt don't have proper
              infrastructure for delivering water. People in these areas usually
              buy mineral water. It can be cumbersome to frequently go purchase
              water from a supermarket or a supplier.
            </p>
            <p>
              EMPW to the rescue! <br />
              Through EMPW you get to order water and have your order delivered
              to your location by our transporters. Not only water ordering and
              delivering but we help you save water. You can buy a water sensor
              to track your consumption and that will enable you to rationalize
              water consumption.
            </p>
          </div>
        </div>

        <div class="wave"></div>
      </section>

      <section class="our-services-section">
        <div class="our-services-title">
          <h1 class="section-header">Our Services</h1>
        </div>

        <div class="our-services-description">
          <div class="our-service-card">
            <img src="@/assets/images/ordering.svg" alt="mobile order water" />
            <h1>Online Ordering</h1>
            <p>
              Getting any amount of water is at the tip of your fingers. Now you
              can easily order water using our easy-to-use mobile app.
            </p>
            <p>
              Also ordering water is as simple as a couple of clicks on our
              website.
            </p>
          </div>

          <div class="our-service-card">
            <img
              src="@/assets/images/company.svg"
              alt="company preparing water"
            />
            <h1>Pure Water</h1>
            <p>
              You can rest assured that your water order will be prepared by one
              of our reputed companies.
            </p>
            <p>
              In most cases, your order is prepared by the nearest company to
              your location.
            </p>
          </div>

          <div class="our-service-card">
            <img
              src="@/assets/images/delivering.svg"
              alt="cars delivering water"
            />
            <h1>Delivering</h1>
            <p>
              Our transporters fetch your water order from the company to your
              location as soon as the order is prepared by the company and ready
              for shipping.
            </p>
          </div>

          <div class="our-service-card">
            <img src="@/assets/images/water_sensor.svg" alt="water sensor" />
            <h1>Help Save Water</h1>
            <p>
              Sensors are here to help you rationalize your water consumption.
              You will receive consumption reports, analytics, and statistics.
            </p>
            <p>
              You also have the option to let the sensor order water for you
              once the water level goes below a predetermined value.
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="landing-page-footer">
      <h1 class="section-header">Contact Us</h1>
      <div class="contact-us-section">
        <div class="contact-us-form">
          <div class="form-wrapper">
            <form id="contact-us-form" @submit.prevent="onSubmit">
              <input
                type="text"
                id="name"
                name="name"
                v-model="name"
                placeholder="Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                v-model="email"
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                v-model="message"
                placeholder="Message..."
                rows="10"
                required
              ></textarea>
              <GradientButton id="submit" type="submit" :isLoading="isLoading">
                <span>Submit</span>
                <i class="fas fa-paper-plane"></i>
              </GradientButton>
            </form>
            <div class="or-separator">
              <div class="hr-line"></div>
              <span>Or</span>
              <div class="hr-line"></div>
            </div>
            <div class="contact-us">
              <div class="contact-us-buttons">
                <div class="contact-us-text">Contact Us</div>
                <div class="contact-us-overlay"></div>
                <div class="contact-us-links">
                  <a href="#" class="contact-us-link">
                    <i class="fab fa-facebook-f"></i>
                  </a>

                  <a href="#" class="contact-us-link">
                    <i class="fab fa-twitter"></i>
                  </a>

                  <a href="#" class="contact-us-link">
                    <i
                      class="fab fa-whatsapp"
                      style="font-weight: 600; font-size: 18px;"
                    ></i>
                  </a>

                  <a href="#" class="contact-us-link">
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-us-image">
          <img src="@/assets/images/contact-us.svg" />
        </div>
      </div>

      <div class="flex social-btns">
        <a class="app-btn blu flex vert" href="#">
          <i class="fab fa-apple"></i>
          <p>
            Available on the
            <br />
            <span class="big-txt">App Store</span>
          </p>
        </a>

        <a class="app-btn blu flex vert" href="#">
          <i class="fab fa-google-play"></i>
          <p>
            Get it on
            <br />
            <span class="big-txt">Google Play</span>
          </p>
        </a>
      </div>

      <section class="rights">
        <p>&copy; {{ currentYear }} All rights reserved EMPW Org.</p>
      </section>
    </footer>
  </div>
</template>

<script lang="ts">
import api from "@/services/api";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import GradientButton from "../components/GradientButton.vue";

@Component({
  components: { GradientButton },
  computed: mapState(["isLoading"]),
})
export default class Home extends Vue {
  email = "";
  name = "";
  message = "";

  onSubmit(): void {
    const { email, name, message } = this;
    api
      .contactUs({ email, name, message, from: "WEB" })
      .then(() => {
        (this as any).$swal("Thank You!", "We got your message", "success");
      })
      .catch(() => {
        (this as any).$swal(
          "Error!",
          "Something went wrong. We couldn't send your message",
          "error"
        );
      });
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/variables";

.landing-page-header {
  position: relative;
  width: 100%;
  .gradient();
  overflow: hidden;
}

.landing-page-header .wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("../assets/wave.png");
  background-size: 100% 100px;
}

.title-and-brief-intro {
  margin-top: 20px;
  color: white;
  margin-bottom: 10em;
  text-align: center;
}

#logo-text {
  width: 50%;
  min-width: 350px;
}

.title-and-brief-intro h1 {
  font-size: 40px;
  line-height: 1.2em;
  margin-bottom: 5px;
  font-family: "Kurale";
}

.title-and-brief-intro p {
  font-size: 22px;
  margin-top: 1em;
}

.donate-request-buttons {
  margin-top: 3em;
}

.donate-request-buttons button,
.video-and-article-section button {
  background: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 2em;
  padding: 15px;
  margin-right: 15px;
  font-weight: 600;
  font-size: 20px;
}

.donate-request-buttons button:hover,
.video-and-article-section button:hover {
  color: rgb(2, 187, 204);
  background: white;
  cursor: pointer;
}

.about-section {
  position: relative;
  width: 100%;
  overflow: hidden;

  .about-section-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 3rem;
    padding-bottom: 10rem;

    .about-image {
      padding: 3rem;

      img {
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid @gray-border-color;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }

    .about-text {
      padding: 3rem;

      h1 {
        color: darken(@light-blue, 10%);
        margin: 2rem 0;
        font-size: 30pt;
        font-family: "Kurale";
      }

      p {
        color: @dark-gray;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        text-align: justify;
      }
    }
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: url(../assets/wave-grad.png);
    background-size: 100% 100px;
  }
}

/* Our Services section */

.our-services-section {
  .our-services-title h1 {
    color: white;
    margin: 2rem 0;
  }

  .our-services-description {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    grid-column-gap: 15px;
    padding: 15px;
    margin-bottom: 3em;

    .our-service-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 2rem;

      img {
        width: 130px;
        height: 130px;
      }

      h1 {
        font-size: 20pt;
        margin-bottom: 2px;
        color: darken(@light-blue, 10%);
        margin: 1rem;
      }

      p {
        color: @dark-gray;
        text-align: justify;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
/* Contact us section */
.contact-us-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 15px;
  margin: 20px 0 30px 0;

  .contact-us-form {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 15px;

    .form-wrapper {
      width: 80%;
    }
  }

  .contact-us-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 70%;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      padding: 0 3rem;
    }
  }
}

/*Form*/

.contact-us-form input,
.contact-us-form textarea {
  display: block;
  width: 100%;
  border: none;
  border-radius: 30px;
  background-color: #ebeff2;
  padding: 15px 15px 15px 50px;
  margin-top: 10px;
}

.contact-us-form input:focus,
.contact-us-form textarea:focus {
  outline: none;
}

.contact-us-form input::placeholder,
.contact-us-form textarea::placeholder {
  color: darken(@light-blue, 10%);
}

.contact-us-form textarea {
  resize: none;
  border-radius: 15px;
  padding: 20px;
}

input#name {
  background-image: url("../assets/icons/user.svg");
  background-repeat: no-repeat;
  background-position: 15px;
  background-size: 20px 20px;
}

input#email {
  background-image: url("../assets/icons/mail.svg");
  background-repeat: no-repeat;
  background-position: 15px;
  background-size: 15px 15px;
}

button#submit {
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

  &:focus {
    outline: none;
  }
}

button#submit:hover,
button#contact-us:hover {
  cursor: pointer;
  .gradient-reverse();
}

button#submit i {
  display: none;
  font-size: 17px;
}

button#submit:hover i {
  display: inline;
}

button#submit:hover span {
  display: none;
}

/*====*/

.or-separator {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  justify-items: center;
  align-items: center;
  color: #999ba7;
  margin: 15px 0;

  .hr-line {
    height: 1px;
    width: 100%;
    background-color: #d6dadc;
  }
}

.landing-page-footer {
  padding: 4% 10% 2% 10%;
  .gradient();
  color: white;
}

.rights {
  text-align: center;
  margin-top: 1em;
}

.contact-us {
  display: flex;
  justify-content: center;
}

.contact-us-buttons {
  position: relative;
  width: 176px;
  height: 50px;
  padding: 0 10px;
  border-radius: 25px;
  overflow: hidden;
  .gradient();
}

.contact-us-text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Josefin sans", sans-serif;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.contact-us-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.3s;
}

.contact-us-links {
  position: relative;
  display: flex;
  justify-content: space-around;
}

.contact-us-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  transform: translateY(calc(100% * 2));
  margin: 10px 5px;
  transition: all 0.3s;
  text-decoration: none;
}

.contact-us-link i {
  .gradient();
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-us-buttons:hover {
  border: none;
}
.contact-us-buttons:hover .contact-us-overlay {
  .gradient();
}

.contact-us-buttons:hover .contact-us-link {
  transform: translateY(0);
}

.contact-us-link:nth-child(2) {
  transition-delay: 0.05s;
}

.contact-us-link:nth-child(3) {
  transition-delay: 0.1s;
}

.contact-us-link:nth-child(4) {
  transition-delay: 0.15s;
}
/*Social Buttons*/

.flex {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}

.app-btn {
  width: 45%;
  max-width: 160px;
  color: #fff;
  margin: 20px 10px;
  text-align: left;
  border-radius: 5px;
  text-decoration: none;
  font-size: 10px;
  text-transform: uppercase;
  padding: 10px;
}
.app-btn.blu {
  background-color: #101010;
  -webkit-transition: background-color 0.25s linear;
  transition: background-color 0.25s linear;
}
.app-btn.blu:hover {
  background-color: #454545;
}
.app-btn i {
  width: 20%;
  text-align: center;
  font-size: 28px;
  margin-right: 7px;
}
.app-btn .big-txt {
  font-size: 17px;
  text-transform: capitalize;
}
.our-services-section {
  position: relative;
  width: 100%;
  .gradient();
  overflow: hidden;
}

.section-header {
  text-align: center;
  font-size: 40px;
  font-family: "Kurale";
  margin: 2rem 0;
}

@media only screen and (max-width: 600px) {
  /*About*/
  .image-and-article-section {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }

  /*Our service*/
  .our-services-description {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 10px;
  }

  /*Contact us*/
  .contact-us-image {
    display: none;
  }
  .contact-us-section {
    grid-template-columns: 1fr;
  }
}
</style>
