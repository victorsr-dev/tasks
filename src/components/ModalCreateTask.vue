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
          <b-input v-model="task.description" placeholder="Title" required />
        </b-field>
        <b-field label="Description">
          <b-input maxlength="200" type="textarea"></b-input>
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
      this.$emit('confirm', this.task)
    }
  },
  computed: {
    ...mapGetters(['projects'])
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
