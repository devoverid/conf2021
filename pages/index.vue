<template>
  <div class="screen">
    <div class="header">
      <img class="logo" src="images/Devover Conf 2021 Logo.png" alt="Logo" />
      <div class="tagline">
        Wujudkan Pemuda Generasi Z yang bersatu di bidang teknologi skala
        global.
      </div>
    </div>
    <div class="content">
      <div class="title">Get your ticket!</div>
      <div class="ticket-container">
        <div id="ticket" class="ticket" :class="`${ticketStyle}`">
          <div class="ticket-content">
            <div class="ticket-profile">
              <img
                class="avatar"
                src="https://github.com/viandwi24.png"
                alt="Avatar"
              />
              <div class="profile-detail">
                <div class="name">Alfian Dwi Nugraha</div>
                <div class="username">
                  <span>viandwi24</span>
                </div>
              </div>
            </div>
            <div class="ticket-footer">
              <img src="images/Ticket Footer.png" />
            </div>
          </div>
          <div class="ticket-number">
            <div class="number"># 00001111XX</div>
          </div>
          <div class="ticket-hover">
            <div>
              <button
                class="
                  bg-blue-500
                  hover:bg-blue-700
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded
                "
              >
                Save to computer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="select-style">
        <div class="mb-2 text-gray-100 font-semibold">Style :</div>
        <label class="style style-default" title="Default">
          <input
            v-model="ticketStyle"
            type="radio"
            name="style"
            value="default"
          />
          <div></div>
        </label>
        <label class="style style-colorfull" title="Colorfull">
          <input
            v-model="ticketStyle"
            type="radio"
            name="style"
            value="colorfull"
          />
          <div></div>
        </label>
        <label class="style style-colorfull-black" title="Colorfull Black">
          <input
            v-model="ticketStyle"
            type="radio"
            name="style"
            value="colorfull-black"
          />
          <div></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // vars
    const ticketStyle = ref('default')

    // lifecyle
    onMounted(() => {
      const ticketElm = document.getElementById('ticket')
      if (ticketElm) {
        const { x, y, width, height } = ticketElm.getBoundingClientRect()
        const centerPoint = { x: x + width / 2, y: y + height / 2 }
        window.addEventListener('mousemove', (e) => {
          const degreeX = (e.clientY - centerPoint.y) * 0.008
          const degreeY = (e.clientX - centerPoint.x) * -0.008
          ticketElm.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`
        })
      }
    })

    return {
      ticketStyle,
    }
  },
})
</script>
