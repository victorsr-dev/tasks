<template>
  <div>
    <header-bar title="Tasks" :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Properties" icon="ballot">
        <form @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <b-field label="Project" horizontal>
                <b-select
                  placeholder="Select a project"
                  v-model="projectSelected"
                  required>
                  <option
                    v-for="project in projects"
                    :key="project._id"
                    :value="project">
                    {{ project.name }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Descripcion" horizontal>
                <b-field>
                  <b-input v-model="task.description" placeholder="Description" name="description" required />
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Priority" horizontal>
                <b-select placeholder="Select a priority" v-model="task.priority" required>
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
      task: {
        description: '',
        priority: Number
      },
      projectSelected: Object,
      customElementsForm: {
        switch: true
      },
      isEdit: false
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
        description: this.task.description,
        priority: this.task.priority,
        user: this.user._id,
        project: this.projectSelected._id
      }
      if (this.isEdit) {
        task._id = this.task._id
        this.$store.dispatch('updateTask', task)
      } else {
        this.$store.dispatch('createTask', task)
      }
      this.isEdit = false
      this.reset()
    },
    reset () {
      this.task = mapValues(this.task, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.projectSelected = {}

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    },
    editTask (e) {
      this.isEdit = true
      Object.assign(this.task, e)
      this.projectSelected = this.projects.find(p => p._id === this.task.project._id)
    }
  }
}
</script>
