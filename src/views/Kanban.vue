<template>
  <div>
     <modal-create-task :taskUpdate="taskUpdate" :is-active="isModalActive" @confirm="taskConfirm"
               @cancel="taskCancel"/>
    <header-bar title="Kanban" :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="level-item">
        <div class="columns is-multiline is-centered cards-container" id="sectioncontainer">
          <div
            class="column is-narrow"
            v-for="column in tasks"
            :key="column.title">
            <article class="message">
              <div class="message-header">
                <p>{{column.title}}</p>
                <button v-if="column.title === 'TODO'" class="button is-rounded" @click="showModal">
                  <span class="icon is-small">
                    <font-awesome-icon icon="plus"/>
                  </span>
                </button>
              </div>
              <list-tasks
                :list-task="column.tasks"
                :nameList="column.title"
                @change="change"
                @editTask="editTask"/>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

import HeaderBar from '@/components/HeaderBar'
import ModalCreateTask from '@/components/ModalCreateTask'
import ListTasks from '@/components/ListTasks'

export default {
  name: 'Main',
  components: {
    HeaderBar,
    ModalCreateTask,
    ListTasks
  },
  data () {
    return {
      isModalActive: false,
      taskUpdate: {}
    }
  },
  computed: {
    ...mapGetters(['projectsNumber', 'tasks']),
    titleStack () {
      return [
        'Admin',
        'Kanban'
      ]
    }
  },
  mounted () {
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
    this.$store.dispatch('getTasks')
    this.$store.dispatch('getProjects')
  },
  methods: {
    change: function (nameList) {
      this.tasks.forEach(element => {
        let nameColumn = element.title
        element.tasks.forEach((t, i) => {
          t.status = nameColumn
          t.sort = i + 1
          this.$store.dispatch('updateTask', t)
        })
      })
    },
    editTask: function (element) {
      this.taskUpdate = element
      this.showModal()
    },
    showModal () {
      this.isModalActive = true
    },
    taskConfirm (task) {
      this.isModalActive = false
      this.$store.dispatch('createTask', task)
    },
    taskCancel () {
      this.isModalActive = false
      this.taskUpdate = {}
    }
  }
}
</script>
<style scoped>
#sectioncontainer {
  width: 100%;
}

div.column.is-narrow {
  width: 30%;
}

</style>
