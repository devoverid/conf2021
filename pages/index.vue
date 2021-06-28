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
                <div class="name">YOUR NAME HERE</div>
                <div class="username">
                  <span>GITHUB_USERNAME</span>
                </div>
              </div>
            </div>
            <div class="ticket-footer">
              <img src="images/Ticket Footer.png" />
            </div>
          </div>
          <div class="ticket-number">
            <div class="number"># 0XXXXX1</div>
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
      <div class="actions text-center mt-4">
        <button
          class="bg-gray-800 hover:bg-gray-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded"
          @click="saveTicket"
        >
          Save to computer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from '@nuxtjs/composition-api'
import { toJpeg } from 'html-to-image';

export default defineComponent({
  setup() {
    // vars
    const ticketStyle = ref('default')
    const { initTicket, destroyTicket, saveTicket } = useTicket()

    // lifecyle
    onMounted(() => {
      initTicket()
    })
    onBeforeUnmount(() => {
      destroyTicket()
    })

    // setup
    return {
      ticketStyle,
      saveTicket,
    }
  },
})

function useTicket() {
  // vars
  let ticketElm: HTMLElement | null
  const property = reactive({
    perspective: 1000,
    rotateX: 0,
    rotateY: 0,
    scaleX: 1,
    scaleY: 1,
  })

  // lifecylce
  const init = () => {
    ticketElm = document.getElementById('ticket')
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onWindowResize)
  }
  const destroy = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onWindowResize)
  }

  // on listen
  const onMouseMove = function (e: { clientY: number; clientX: number }) {
    if (ticketElm) {
      const { x, y, width, height } = ticketElm.getBoundingClientRect()
      const centerPoint = { x: x + width / 2, y: y + height / 2 }
      property.rotateX = (e.clientY - centerPoint.y) * 0.008
      property.rotateY = (e.clientX - centerPoint.x) * -0.008
      changeStyle()
    }
  }
  const onWindowResize = () => {
    const ticketElm = document.getElementById('ticket')
    if (ticketElm) {
      const clientH = (window.innerHeight * 1) / 934
      const clientW = (window.innerHeight * 1) / 934
      // property.scaleX = clientW
      // property.scaleY = clientH
      changeStyle()
    }
  }

  // listen
  const changeStyle = () => {
    if (ticketElm) {
      ticketElm.style.transform = `perspective(${property.perspective}px) rotateX(${property.rotateX}deg) rotateY(${property.rotateY}deg) `
      // if (ticketElm.parentElement) {
      //   ticketElm.parentElement.style.transform = `scale(${property.scale})`
      // }
    }
  }

  // funcs
  const saveTicket = () => {
    if (ticketElm) {
      toJpeg(ticketElm).then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'ticket.jpeg';
        link.href = dataUrl;
        link.click();
      });
    }
  }

  return {
    initTicket: init,
    destroyTicket: destroy,
    saveTicket,
  }
}
</script>
