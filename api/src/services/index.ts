import models from '../models'
import User from './user'

interface propAny {
    [key: string]: any
  }

  
const servicesMap: propAny = {
  User: User,
}

const services: propAny = {}

Object.keys(servicesMap).forEach((name: string) => {
  services[name] = new servicesMap[name](models)
})

export default services
