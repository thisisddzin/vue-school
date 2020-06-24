import Model from '../models/Model'

function createModel(data = [], options = {}) {
  return new Model({ primaryKey: options.primaryKey, data })
}

describe('Model', ()=> {

  test('instance class work', () => {
    expect(createModel()).toBeInstanceOf(Model)
  })

  test('model structure', () => {
    expect(createModel()).toEqual(expect.objectContaining({
      $collection: expect.any(Array),
      $options: expect.objectContaining({
        primaryKey: expect.any(String)
      }),
      all: expect.any(Function),
      find: expect.any(Function),
      update: expect.any(Function),
      record: expect.any(Function),
    }))
  })

  describe('record method', () => {
    const heroes = [{ id: 1, name: 'Homem Aranha', world: 'Marvel' }, { name: 'Batman', world: 'DC' }]
    
    test('can add data to the collection', () => {
      const model = createModel()
      model.record(heroes)

      expect(model.$collection).toEqual([
        { id: 1, name: 'Homem Aranha', world: 'Marvel' },
        {
          id: expect.any(Date),
          name: expect.any(String),
          world: expect.any(String)
        }
      ])
    })

    test('gets called when data is passed to model', () => {
      const spyModelRecord = jest.spyOn(Model.prototype, 'record') 
      const model = createModel(heroes)

      expect(spyModelRecord).toHaveBeenCalled()
      expect(model.$collection).toEqual(heroes)
      spyModelRecord.mockRestore()
    })
  })

  describe('all method', () => {
    test('returns empty model' , () => {
      const model = createModel()
      expect(model.all()).toEqual([])
    })

    test('returns model data', () => {
      const model = createModel([ { name: 'Batman' }, { name: 'Joker' } ])
      expect(model.all()).toHaveLength(2)
    })

    test('original data stays intact', () => {
      const model = createModel([ { name: 'Arlequina' }, { name: 'Joker' } ])
      const data = model.all()
      data[0].name = 'Batman'

      expect(model.$collection[0].name).toBe('Arlequina')
    })

    test('find by name', () => {
      const model = createModel([ { name: 'Batman' }, { name: 'Joker' } ], { primaryKey: 'name' })
      expect(model.find('Joker')).toEqual(model.$collection[1])
    })
  })

  describe('find method', () => {
    const model = createModel([{ id: 1, name: 'Batman' }, { id: 2, name: 'Black Panther' }])

    test('return null if not matching', () => {
      expect(model.find(3)).toBeNull()
    })

    test('find return a matching entry', () => {
      expect(model.find(1).name).toBe('Batman')
    })
  })

  describe('update method', () => {
    const heroes = [ { id: 1, name: 'Batman' } ]
    let model 
    
    beforeEach(() => {
      const heroesClone = JSON.parse(JSON.stringify(heroes)) 
      model = createModel(heroesClone)
    })
    
    test('an entry by id', () => {
      model.update(1, { name: 'Joker' })
      expect(model.find(1).name).toBe('Joker')
    })

    test('extend an entry by id', () => {
      model.update(1, { cape: true })
      expect(model.find(1)).toEqual(expect.objectContaining({
        name: 'Batman',
        cape: true
      }))
    })

    test('return false if no entry matches', () => {
      expect(model.update(2, {})).toBeFalsy()
    })
  })

})