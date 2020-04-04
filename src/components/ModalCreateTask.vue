<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create a new task</p>
      </header>
      <section class="modal-card-body">
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
        <b-field label="Title" horizontal>
          <b-input v-model="task.title" placeholder="Title" required />
        </b-field>
        <b-field label="Priority" horizontal>
          <b-select placeholder="Select a priority" v-model="task.priority" required>
            <option v-for="(value, index) in [1,2,3,4,5]" :key="index" :value="value">
              {{ value }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Description">
          <b-input maxlength="200" type="textarea" v-model="task.description"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-success" @click="confirm">Guardar</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ModalCreateTask',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isModalActive: false,
      task: {
        title: '',
        description: '',
        priority: Number
      },
      projectSelected: Object
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      const newTask = {
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        user: this.user._id,
        project: this.projectSelected._id
      }
      this.$emit('confirm', newTask)
    }
  },
  computed: {
    ...mapGetters(['projects', 'user'])
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
