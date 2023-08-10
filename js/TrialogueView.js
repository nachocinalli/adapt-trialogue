import ComponentView from 'core/js/views/componentView';

class TrialogueView extends ComponentView {
  preRender() {
    this.onClick = this.onClick.bind(this);
  }

  postRender() {
    this.setReadyStatus();
    this.setupTrialogue();
  }

  setupTrialogue() {
    const items = this.model.getChildren();
    if (!items || !items.length) return;

    let activeItem = this.model.getActiveItem();
    if (!activeItem) {
      activeItem = this.model.getItem(0);
      activeItem.toggleActive(true);
    } else {
      items.trigger('change:_isActive', activeItem, true);
    }
  }

  onClick(item, option) {
    if (!item || !option) return;
    if (option.text === 'restart') {
      this.model.getChildren().forEach((item) => {
        item.set('_isVisited', false);
        item.toggleActive(false);
        item.get('_options').forEach((option) => {
          option._isSelected = false;
        });
      });
      this.model.set('_userAnswer', []);
      this.setupTrialogue();
      return;
    }
    const itemModel = this.model.getItem(item._index);
    itemModel.set('_isVisited', true);
    const optionModel = itemModel.get('_options').find((optionModel) => optionModel._index === option._index);
    optionModel._isSelected = true;
    const items = this.model.getChildren();

    const nextItem = items.find((item) => item.id === option.text);

    if (nextItem) {
      const isFeedback = nextItem.get('next') === 'feedback';
      if (isFeedback) {
        itemModel.toggleActive(false);
        nextItem.toggleActive(true);
        this.model.setCompletionStatus();
      } else {
        const hasSender = nextItem.get('sender');
        if (hasSender) {
          itemModel.toggleActive(false);
          nextItem.toggleActive(true);
        } else {
          itemModel.toggleActive(false);
          nextItem.toggleActive(true);
        }
      }
    } else {
      itemModel.toggleActive(false);
    }
  }
}

TrialogueView.template = 'trialogue.jsx';

export default TrialogueView;
