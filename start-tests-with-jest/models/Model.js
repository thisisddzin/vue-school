export default class Model {
  constructor({ primaryKey = 'id', data = [] }){
    this.$options = {}
    this.$options.primaryKey = primaryKey
    this.$collection = []
    if(data.length) this.record(data)
  }

  record (data){
    const mappedData = data.map(entry => {
      if (!entry[this.$options.primaryKey]) 
        entry[this.$options.primaryKey] = new Date() 
      return entry
    })

    this.$collection.push(...mappedData)
  }

  find (id){
    const findResult = this.$collection.find(coll => coll[this.$options.primaryKey] === id)
    return findResult ? Object.assign({}, findResult) : null 
  }

  all (){
    return this.$collection.map(entry => Object.assign({}, entry))
  }

  update (id, params){
    const index = this.$collection.findIndex(coll => coll[this.$options.primaryKey] === id)
    if (index < 0) return false
    this.$collection.splice(index, 1, Object.assign(this.$collection[index], params))
    return this.$collection[index]
  }
}