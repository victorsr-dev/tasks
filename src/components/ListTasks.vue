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
              <div class="content">
                {{element.description}}
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
    }
  }
}
</script>
<style scoped>
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
