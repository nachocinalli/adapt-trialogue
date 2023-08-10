import ItemsComponentModel from 'core/js/models/itemsComponentModel';
import ItemModel from 'core/js/models/itemModel';
export default class TrialogueModel extends ItemsComponentModel {
  restoreUserAnswers() {
    const booleanArray = this.get('_userAnswer');
    if (!booleanArray) return;
    this.getChildren().forEach((child, index) => child.set('_isVisited', booleanArray[index]));
  }

  storeUserAnswer() {
    const booleanArray = this.getChildren().map((child) => child.get('_isVisited'));
    this.set('_userAnswer', booleanArray);
  }

  setUpItems() {
    const items = this.get('_items') || [];
    items.forEach((item, index) => {
      item._index = index;
      item._options.forEach((option, index) => {
        option._index = index;
        option._itemIndex = item._index;

        option._isSelected = false;
      });
    });
    this.setChildren(new Backbone.Collection(items, { model: ItemModel }));
  }
}
