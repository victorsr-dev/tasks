<template>
  <div>
    <header-bar title="Tasks" :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Properties" icon="ballot">
        <form @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <b-field label="Project" horizontal>
                <b-select placeholder="Select a project" v-model="form.project" required>
                  <option v-for="(project, index) in projects" :key="index" :value="project">
                    {{ project.name }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Name" horizontal>
                <b-field>
                  <b-input v-model="form.name" placeholder="Name" name="name" required />
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Priority" horizontal>
                <b-select placeholder="Select a priority" v-model="form.priority" required>
                  <option v-for="(value, index) in [1,2,3,4,5]" :key="index" :value="value">
                    {{ value }}
                  </option>
                </b-select>
              </b-field>
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
      <card-component title="Tasks" class="has-table has-mobile-sort-spaced" >
        <tasks-table :checkable="true" @selected-object="editTask" />
      </card-component>

    </section>
  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar'
import CardComponent from '@/components/CardComponent'
import TasksTable from '@/components/TasksTable'

import mapValues from 'lodash/mapValues'

import { mapGetters } from 'vuex'

export default {
  name: 'Tasks',
  components: {
    HeaderBar,
    CardComponent,
    TasksTable
  },
  data () {
    return {
      form: {
        name: null,
        project: null,
        priority: null
      },
      customElementsForm: {
        switch: true
      }
    }
  },
  mounted () {
    this.$store.dispatch('getProjects')
  },
  computed: {
    ...mapGetters(['projects', 'tasks', 'user']),
    titleStack () {
      return [
        'Admin',
        'Tasks'
      ]
    }
  },
  methods: {
    submit () {
      const task = {
        description: this.form.name,
        priority: this.form.priority,
        user: this.user._id,
        project: this.form.project._id
      }
      this.$store.dispatch('createTask', task)
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
    },
    editTask (e) {
      console.log(e)
    }
  }
}
</script>
