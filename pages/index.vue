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
      <div class="description">
        Generate a unique ticket with your GitHub profile.
      </div>
      <div class="ticket-wrapper">
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
      <div class="actions grid grid-cols-3 gap-3 text-center mt-4">
        <my-button text="Download" :icon="[ 'fas', 'download' ]" @click.native="saveTicket" />
        <my-button text="Share on FB" :icon="[ 'fab', 'facebook' ]" @click.native="onDev" />
        <my-button text="Tweet it!" :icon="[ 'fab', 'twitter' ]" @click.native="onDev" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from '@nuxtjs/composition-api'
import { toJpeg } from 'html-to-image';
import myButton from '@/components/Button.vue'

export default defineComponent({
  components: {
    myButton
  },
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

    // methods
    const onDev = () => {
      alert('Not available in development version.')
    }

    // setup
    return {
      ticketStyle,
      onDev,
      saveTicket,
    }
  },
})

function useTicket() {
  // vars
  let ticketElm: HTMLElement | null
  let ticketWrapperElm: HTMLElement | null | undefined
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
    ticketWrapperElm = ticketElm?.parentElement?.parentElement
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
    if (ticketElm && ticketElm.parentElement) {
      ticketElm.parentElement.style.transform = `perspective(${property.perspective}px) rotateX(${property.rotateX}deg) rotateY(${property.rotateY}deg) `
      // if (ticketElm.parentElement) {
      //   ticketElm.parentElement.style.transform = `scale(${property.scale})`
      // }
    }
  }

  // funcs
  const saveTicket = () => {
    if (ticketWrapperElm && ticketElm && ticketElm.parentElement) {
      ticketElm.parentElement.style.transform = 'none'
      ticketWrapperElm.classList.add('saved')
      destroy()
      toJpeg(ticketWrapperElm).then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'DevoverID-Conf2021-ticket.jpeg';
        link.href = dataUrl;
        link.click();
        if (ticketWrapperElm) {
          ticketWrapperElm.classList.remove('saved')
          init()
        }
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
