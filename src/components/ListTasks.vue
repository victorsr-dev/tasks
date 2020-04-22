<template>
  <div class="message-body">
    <draggable
      class="list-group"
      :list="listTask"
      group="tasks"
      :data-id="nameList"
      @change=log>
      <div
        class="board-item"
        v-for="(element, index) in listTask"
        :key="index">
        <div class="board-item-content">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{element.title}}
              </p>
            </header>
            <div class="card-content">
              <p class="subtitle">{{element.project.name}}</p>
              <div class="content">
                {{element.description}}
              </div>
              <div class="buttons">
                <b-button type="is-danger" icon-right="delete" @click="eraser(element)"></b-button>
                <b-button type="is-info" icon-right="pencil" @click="edit(element)"></b-button>
              </div>
              <div class="tags has-addons">
                <span class="tag is-small is-success"><strong>Priority</strong></span>
                <span class="tag is-small" :class="[element.priority < 3 ? 'is-danger': 'is-info' ]">{{element.priority}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'ListTasks',
  components: {
    draggable
  },
  props: {
    listTask: Array,
    nameList: String
  },
  methods: {
    log: function (evt) {
      this.$emit('change', this.nameList, this.listTask)
    },
    edit: function (element) {
      this.$emit('editTask', element)
    },
    eraser (element) {
      this.$emit('deleteTask', element)
    }
  }
}
</script>
<style scoped>
.subtitle{
  font-size: 0.7rem;
  font-weight: bold;
}

.card-header-title{
  cursor: pointer;
  padding: 0.3rem;
}

.card-content {
  padding: 0.5rem;
}

.cards-container {
  max-width: 95%;
}

.board-item {
  margin: 5px 0;
  will-change: transform;
}

.board-item-content {
  word-break: break-word;
  position: relative;
  padding: 0px;
  background: #fff;
  border-radius: 4px;
  font-size: 17px;
  -webkit-box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
  box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
  margin: 5px;
}

.delete {
  pointer-events: auto;
}

footer {
  margin-top: 2rem;
}
</style>
