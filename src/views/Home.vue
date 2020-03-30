<template>
  <div>
    <div class="landing-page-header">
      <div class="title-and-brief-intro">
        <img id="logo-text" src="@/assets/logo/empw-letters.png" alt="Logo" />
        <h1>Enhanced Management of Pure Water</h1>
        <p>Get any amount of water as fast, as pure as you need.</p>
        <div class="donate-request-buttons">
          <button class="donate-button">Donate Water</button>
          <button class="request-button">Request Water</button>
        </div>
      </div>

      <div class="wave"></div>
    </div>
    <main>
      <section class="about-section">
        <div class="about-title">
          <h1>About</h1>
        </div>
        <div class="image-and-article-section">
          <img src="@/assets/images/family-drinking.jpg" alt="" />
          <article>
            <h1>Enhanced Management of Pure Water</h1>

            <p>
              Egypt faces a serious problem in many cities and areas because of
              water shortage. Lately, the problem of Nahda Dam appears on the
              surface that will lower the amount of Nile water. Our government
              aims at solving the problem of water shortage by distilling water
              of Red Sea and Mediterranean Sea and make use of groundwater so
              that people can drink it and solve water problem. Also, There is a
              problem in connecting between water companies and consumers. In
              addition, Consumers have a problem in rationing water consumption.
              These are the problems we solve.
            </p>
          </article>
        </div>

        <div class="wave"></div>
      </section>

      <section class="our-services-section">
        <div class="our-services-title">
          <h1 class="section-header">Our Services</h1>
        </div>
        <div class="our-services-description">
          <div class="our-service-card">
            <img src="@/assets/icons/pickup-truck.svg" alt="Deliver" />
            <h1>Delivering</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste,
              sunt sequi quae in enim dicta exercitationem nisi officiis porro
              eaque ullam dolorum error doloribus pariatur blanditiis delectus
              sint repellendus accusamus.
            </p>
          </div>

          <div class="our-service-card">
            <img src="@/assets/icons/water.svg" alt="Pure Water" />
            <h1>Pure Water</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
              pariatur aperiam alias! Eligendi doloribus expedita amet dolore!
              Iste id fugit, aspernatur, quo sit nisi, sunt ut explicabo odit
              hic eos.
            </p>
          </div>

          <div class="our-service-card">
            <img src="@/assets/icons/pay.svg" alt="" />
            <h1>Cheap Service</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              quibusdam optio alias ipsum dolor iure quidem culpa nesciunt
              placeat et aliquam sapiente natus nam eum velit ut, eveniet, autem
              hic!
            </p>
          </div>

          <div class="our-service-card">
            <img src="@/assets/icons/rationalize.svg" alt="" />
            <h1>Help Save Water</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              quibusdam optio alias ipsum dolor iure quidem culpa nesciunt
              placeat et aliquam sapiente natus nam eum velit ut, eveniet, autem
              hic!
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
            <form id="contact-us-form">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                placeholder="Message..."
                rows="10"
                required
              ></textarea>
              <button id="submit" type="submit">
                <span>Submit</span>
                <i class="fas fa-paper-plane"></i>
              </button>
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
                      style="font-weight:600; font-size: 18px;"
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
          <img src="@/assets/images/contact-us.png" />
        </div>
      </div>

      <div class="flex social-btns">
        <a class="app-btn blu flex vert" href="#">
          <i class="fab fa-apple"></i>
          <p>
            Available on the <br />
            <span class="big-txt">App Store</span>
          </p>
        </a>

        <a class="app-btn blu flex vert" href="#">
          <i class="fab fa-google-play"></i>
          <p>
            Get it on <br />
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

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style>
/*Header-Info*/
.landing-page-header {
  position: relative;
  width: 100%;
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
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
}

.about-section .wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url(../assets/wave-grad.png);
  background-size: 100% 100px;
}

.about-title {
  margin-bottom: 3em;
}

.about-title h1 {
  text-align: center;
  font-size: 40px;
  font-family: "Kurale";
}

.image-and-article-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  margin-bottom: 10em;
  grid-column-gap: 15px;
  padding: 10px;
}

.image-and-article-section img {
  border-radius: 10px;
  width: 100%;
  box-shadow: 2px 2px 10px 0px #6b6b6b;
}

.image-and-article-section article {
  font-size: 23px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: linear-gradient(to right, #02bbcc 20%, #0380d0);
  padding: 20px;
  color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 0px #6b6b6b;
}

.image-and-article-section article h1 {
  font-size: 30px;
  font-family: "Kurale";
}

.image-and-article-section article p {
  margin-bottom: 0.9em;
  margin-top: 0.9em;
}

.contact-us-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 15px;
  margin: 20px 0 30px 0;
}

.contact-us-image {
  width: 100%;
  height: 100%;
}

.contact-us-image img {
  width: 100%;
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

/*Form*/

.contact-us-form {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 15px;
}

.form-wrapper {
  width: 80%;
}

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
  color: #999ba7;
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
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
  border: 2px solid white;
  color: white;
  border-radius: 2em;
  padding: 15px;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s;
}

button#submit:hover {
  cursor: pointer;
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
}

.hr-line {
  height: 1px;
  width: 100%;
  background-color: #d6dadc;
}
.landing-page-footer {
  padding: 4% 10% 2% 10%;
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
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
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
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
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-us-buttons:hover {
  border: none;
}
.contact-us-buttons:hover .contact-us-overlay {
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
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
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
  overflow: hidden;
}

.our-services-title {
  color: white;
}

.our-services-description {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  grid-column-gap: 15px;
  padding: 15px;
  margin-bottom: 3em;
}

.our-service-card {
  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 0px #6b6b6b;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px;
}

.our-service-card img {
  width: 80px;
  height: 80px;
}

.our-service-card h1 {
  font-size: 25px;
  margin-bottom: 2px;
}

.section-header {
  text-align: center;
  font-size: 40px;
  font-family: "Kurale";
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
