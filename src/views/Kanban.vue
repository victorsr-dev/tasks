<template>
  <div>
     <modal-create-task :is-active="isModalActive" @confirm="taskConfirm"
               @cancel="taskCancel"/>
    <header-bar title="Kanban" :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="level-item">
        <div class="columns is-multiline is-centered cards-container" id="sectioncontainer">
          <!--Todo List -->
          <div class="column is-narrow">
            <article class="message">
              <div class="message-header">
                <p>To do</p>
                <button class="button" @click.prevent="showModal()" > Add Task</button>
              </div>
              <list-tasks :list-task="todoList"/>
            </article>
          </div>
          <!--Doing List -->
          <div class="column is-narrow">
            <article class="message is-info">
              <div class="message-header">
                <p>Doing</p>
              </div>
              <list-tasks :list-task="doingList"/>
            </article>
          </div>
          <!--Done List -->
          <div class="column is-narrow">
            <article class="message is-success">
              <div class="message-header">
                <p>Done</p>
              </div>
              <list-tasks :list-task="doneList"/>
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
      todoList: [{
        title: `Tarea 01`,
        description: 'Description tarea 1',
        status: 'ToDo',
        priority: 1,
        id: 1
      }, {
        title: `Tarea 02`,
        description: 'Description tarea 2',
        status: 'ToDo',
        priority: 2,
        id: 2
      }],
      doingList: [],
      doneList: []
    }
  },
  computed: {
    ...mapGetters(['tasksNumber', 'projectsNumber']),
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
    log: function (evt) {
      console.log(evt)
    },
    showModal () {
      this.isModalActive = true
    },
    taskConfirm (task) {
      this.isModalActive = false
      console.log(task)
    },
    taskCancel () {
      this.isModalActive = false
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
