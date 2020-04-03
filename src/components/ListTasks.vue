<template>
  <div class="message-body">
    <draggable class="list-group" :list="listTask" group="people" @change="log">
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
    listTask: Array
  },
  methods: {
    log: function (evt) {
      console.log(evt)
    }
  }
}
</script>
<style scoped>
.cards-container {
  max-width: 95%;
}

.board-item {
  margin: 5px 0;
  will-change: transform;
}

.board-item-content {
  word-break: break-all;
  position: relative;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
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
