
import { gantt } from 'dhtmlx-gantt'

export default ({ app }, inject) => {
  inject('gantt', () => gantt)
}
