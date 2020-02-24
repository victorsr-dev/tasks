<template>
<section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action class="box" v-on:submit.prevent >
                <div class="field">
                  <label for="email" class="label">Email</label>
                  <div class="control has-icons-left">
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
                      required
                      v-model="user.email"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="envelope"/>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="password" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input
                      id="password"
                      type="password"
                      placeholder="*******"
                      class="input"
                      required
                      v-model="user.password"/>
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="lock"/>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success is-fullwidth" @click="login()">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
import LoginService from '@/services/login'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const res = await LoginService.getUser(this.user)
        if (res.data.success) {
          this.$store.dispatch('setUser', res.data.user)
          this.$router.push({ name: 'main' })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: `${res.data.error}`
          })
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: `User or password incorrect!`
        })
      }
    }
  }
}
</script>
