const pageLifetimeNames = ["onPageScroll", "onShow", "onHide", "onResize"];

const enhance = function({
  didMount,
  didUnmount,
  pageLifetimes,
  ...otherOptions
}) {
  const { globalEvent } = getApp();
  return {
    ...otherOptions,
    didMount() {
      const { $page: { $viewId } = {} } = this;
      this.unbind = [];
      if (pageLifetimes && $viewId && globalEvent) {
        Object.keys(pageLifetimes).forEach(name => {
          if (pageLifetimeNames.indexOf(name) > -1) {
            this.unbind.push(
              globalEvent.on(`$$${name}`, args => {
                const pages = getCurrentPages();
                const current = pages[pages.length - 1];
                if (current.$viewId === $viewId) {
                  pageLifetimes[name].call(this, ...args);
                }
              })
            );
          } else {
            console.log('not support', name)
          }
        });
      }
      if (typeof didMount === "function") {
        didMount.call(this);
      }
    },
    didUnmount() {
      if (this.unbind.length) {
        this.unbind.forEach(unbind => unbind());
      }
      if (typeof didUnmount === "function") {
        didUnmount.call(this);
      }
    }
  };
};

export default enhance;
