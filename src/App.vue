<template>
  <div id="app">
    <!--div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/-->
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
                      v-model="user.name"
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('get_user', this.user)
    }
  }
}
</script>
<style lang="scss">
@import "./scss/main.scss";
</style>
