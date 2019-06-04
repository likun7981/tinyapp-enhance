import createEvent from "./createEvent";
export default function(options) {
  return {
    ...options,
    globalEvent: createEvent()
  };
}
