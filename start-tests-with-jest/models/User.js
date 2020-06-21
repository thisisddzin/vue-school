export default class User {
  constructor(details){
    const { firstname, lastname } = details
    this.firstname = firstname
    this.lastname = lastname
    this.created_at = new Date()
  }

  get name (){
    return `${this.firstname} ${this.lastname}`
  }
}
