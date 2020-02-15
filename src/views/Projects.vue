<template>
  <div>
    <header-bar title="Projects" :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Properties" icon="ballot">
        <form @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <b-field label="Name" horizontal>
                <b-field>
                  <b-input v-model="form.name" placeholder="Name" name="name" required />
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="State" horizontal>
                <b-switch v-model="customElementsForm.switch">
                  Active
                </b-switch>
              </b-field>
            </div>
          </div>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Submit</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="reset">Reset</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
       <card-component class="has-table has-mobile-sort-spaced" title="Clients" icon="account-multiple">
      </card-component>

    </section>
  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar'
import CardComponent from '@/components/CardComponent'

import mapValues from 'lodash/mapValues'

export default {
  name: 'Projects',
  components: {
    HeaderBar,
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        switch: true
      }
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Projects'
      ]
    }
  },
  methods: {
    submit () {

    },
    reset () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    }
  }
}
</script>
