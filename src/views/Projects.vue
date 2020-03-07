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
                  <b-input v-model="Project.name" placeholder="Name" name="name" required />
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
                <b-button native-type="submit" type="is-primary">Create</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="reset">Clear</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
      <card-component title="Projects" class="has-table has-mobile-sort-spaced" >
        <projects-table :checkable="true" @selected-object="editProject" />
      </card-component>

    </section>
  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar'
import CardComponent from '@/components/CardComponent'
import ProjectsTable from '@/components/ProjectsTable'

import mapValues from 'lodash/mapValues'

export default {
  name: 'Projects',
  components: {
    HeaderBar,
    CardComponent,
    ProjectsTable
  },
  data () {
    return {
      isLoading: false,
      Project: {
        name: null
      },
      customElementsForm: {
        switch: true
      },
      isEdit: false
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
      if (this.isEdit) {
        this.$store.dispatch('updateProject', this.Project)
      } else {
        this.$store.dispatch('createProject', this.Project)
      }
      this.isEdit = false
      this.reset()
    },
    reset () {
      this.Project = mapValues(this.Project, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    },
    editProject (e) {
      this.isEdit = true
      Object.assign(this.Project, e)
    }
  }
}
</script>
