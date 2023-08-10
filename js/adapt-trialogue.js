import Adapt from 'core/js/adapt';
import TrialogueView from './TrialogueView';
import TrialogueModel from './TrialogueModel';

export default Adapt.register('trialogue', {
  model: TrialogueModel,
  view: TrialogueView
});
