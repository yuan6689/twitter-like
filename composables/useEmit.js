import mitt from "mitt"

const emitter = mitt();

export default () => {
  return {
    $on: emitter.on,
    $emit: emitter.emit
  }
}