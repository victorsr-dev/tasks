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
              <list-tasks :list-task="tasksTodo" nameList="TODO" @change="change"/>
            </article>
          </div>
          <!--Doing List -->
          <div class="column is-narrow">
            <article class="message is-info">
              <div class="message-header">
                <p>Doing</p>
              </div>
              <list-tasks :list-task="tasksDoing" nameList="DOING" @change="change"/>
            </article>
          </div>
          <!--Done List -->
          <div class="column is-narrow">
            <article class="message is-success">
              <div class="message-header">
                <p>Done</p>
              </div>
              <list-tasks :list-task="tasksDone" nameList="DONE" @change="change"/>
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
      doneList: [],
      doingList: []
    }
  },
  computed: {
    ...mapGetters(['tasksTodo', 'tasksDoing', 'tasksDone', 'projectsNumber', 'tasks']),
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
    change: function (nameList, event) {
      this.updateTaskAdded(nameList, event)
    },
    updateTaskAdded (nameList, event) {
      console.log(event)
      if (event.added) {
        let task = event.added.element
        task.status = nameList

        if (nameList === 'TODO') {
          console.log('Se agrego a TODO')
          console.log(this.tasksTodo[event.added.newIndex].title)
          task.sort = this.tasksTodo[event.added.newIndex].sort / 2
          this.$store.dispatch('updateTask', task)
        }
        if (nameList === 'DONE') console.log('Se agrego a DOING')
        if (nameList === 'DOING') console.log('Se agrego a DONE')
      }
    },
    showModal () {
      this.isModalActive = true
    },
    taskConfirm (task) {
      this.isModalActive = false
      this.$store.dispatch('createTask', task)
      // console.log(task)
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
