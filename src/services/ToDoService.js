class ToDoService {

  constructor () {
    this.todos = [
      {
        name: "This is the first todo",
        details: "You shoudl create more todos, to track your work"
      }
    ]
  }

  findAll () {
    return this.todos
  }

  findByFilter (filter) {
    console.debug('findByFilter', filter)
    if (!filter) {
      return this.todos
    }
    filter = filter.toLowerCase()
    let result = this.todos.filter(t => {
      return t.name.toLowerCase().indexOf(filter) >= 0
    })
    return result
  }

  create (name, details) {
    this.todos.push({
      id: this.todos.length,
      name: name,
      details: details,
      isDone: false
    })
  }

  update (id, name, details) {
    let todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.name = name
      todo.details = details
    }
  }

  delete (id) {
    this.todos = this.todos.filter(t => t.id !== id)
  }

}
export default new ToDoService