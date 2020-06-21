import User from '../models/User'

/* Some other tricks
  1. Can use test.only(...) to test just this test in this file when use 'yarn test'
  2. Can use test.skip(...) to test all test from this file except skiped test
  3. Can use 'yarn test --watchAll' to keep running the tests in background for when change the tests file
*/

describe('User.js', () => {
  let user;

  beforeEach(() => {
    user = new User({ firstname: 'Adenilson', lastname: 'Santos' })
  }) // Needed to use beforeEach cause before the snapshot test was added favoriteMovied and that differe of snapshot
  
  test('name method returns full name' , () => {
    expect(user.name).toBe('Adenilson Santos')
    expect(user.created_at).toEqual(expect.any(Date))
  })

  test('should match instance of Date class', () => {
    user.favoriteMovies = [
      {
        title: 'Harry Potter',
        rate: 10
      },
      {
        title: 'Resident Evil',
        rate: 9
      }
    ]
    expect(user.created_at).toBeInstanceOf(Date)
  })

  test('should match with snapshot', () => {
    delete user.created_at
    expect(user).toMatchSnapshot()
  })

})