export default function({ store, redirect }) {
  console.log(
    'Access from middleware ' + store.state.demo.authorized.toString()
  )
  if (!store.state.demo.authorized) {
    return redirect('/blackboard/login')
  }
}
