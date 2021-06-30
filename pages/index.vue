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
                  :src="ticketData.avatar_url"
                  alt="Avatar"
                />
                <div class="profile-detail">
                  <div class="name">{{ ticketData.name.toUpperCase() }}</div>
                  <div class="username">
                    <font-awesome-icon :icon="['fab', 'github']" class="self-center text-sm" />
                    <span>{{ ticketData.username }}</span>
                  </div>
                </div>
              </div>
              <div class="ticket-footer">
                <img src="images/Ticket Footer.png" />
                <!-- <img class="qrcode" src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" /> -->
              </div>
            </div>
            <div class="ticket-number">
              <div class="number">#{{ ticketId }}</div>
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
      <div class="actions grid grid-cols-1 gap-3 mx-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:mx-0 text-center mt-4">
        <my-button text="Download" :icon="[ 'fas', 'download' ]" @click.native="saveTicket" />
        <my-button text="Share on FB" :icon="[ 'fab', 'facebook' ]" @click.native="onDev" />
        <my-button text="Tweet it!" :icon="[ 'fab', 'twitter' ]" @click.native="onDev" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref } from '@nuxtjs/composition-api'
import { toJpeg } from 'html-to-image';
import myButton from '@/components/Button.vue'

const githubUser = require('github-api-user');
const { initTicket, destroyTicket, saveTicket, ticketData, ticketId } = useTicket()

export default defineComponent({
  components: {
    myButton
  },
  async asyncData() {
    let username: string | null = null
    let user: { name: string, avatar_url: string }

    const askUsername = async () => {
      username = await prompt('Enter your GitHub username...', 'viandwi24')
      try {
        const result = await githubUser(username)
        user = result
        console.log(user)
        if (user && username) {
          ticketData.name = user.name
          ticketData.avatar_url = user.avatar_url
          ticketData.username = username
        }
      } catch (error) {
        console.log(error)
        alert('Username ga ada!')
        await askUsername()
      }
    }
    await askUsername()
  },
  setup() {
    // vars
    const ticketStyle = ref('default')

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
      onDev,
      ticketStyle,
      saveTicket,
      ticketData,
      ticketId,
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
  const ticketData = reactive({
    avatar_url: '',
    name: 'YOUR NAME HERE',
    username: 'viandwi24',
    id: 177013
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
      const tf = `perspective(${property.perspective}px) rotateX(${property.rotateX}deg) rotateY(${property.rotateY}deg) `
      ticketElm.parentElement.style.transform = tf
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
  const ticketId = computed(() => {
    const maxDigit = 7
    const id = (typeof ticketData.id == 'string') ? ticketData.id : `${ticketData.id}`.toString()
    let result = ''
    for (let i = 0; i < (maxDigit - id.length); i++) {
      result += '0'
    }
    result += id
    return result
  })

  return {
    initTicket: init,
    destroyTicket: destroy,
    saveTicket,
    ticketData,
    ticketId
  }
}
</script>
