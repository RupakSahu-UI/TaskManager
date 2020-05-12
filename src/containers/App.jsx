import React, { PropTypes } from 'react';

import lanesActions from '../actions/lanes';
import { connect } from 'react-redux';
import Lanes from '../components/Lanes.jsx';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import autoprefixer from 'autoprefixer';

class App extends React.Component {
  render() {
    return (
      <div className="react-kanban">
        <h1 className="app-title"></h1>  
        <Lanes
          lanes={this.props.lanes}
          onEditLane={this.props.onEditLane}
          onDeleteLane={this.props.onDeleteLane}
          /* Not required at this time. 
          onMoveLane={this.props.onMoveLane}
          */
        />
        <div className="lanes">
          <button className="add-lane" onClick={this.props.onCreateLane}>
            + Add a new list
          </button>
          <button className="reset-store" onClick={this.props.onReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  lanes: PropTypes.array.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,  
  //onMoveLane: PropTypes.func.isRequired,
  
};

const mapStateToProps = state => ({
  lanes: state.lanes,
});

const mapDispatchToProps = dispatch => ({
  onCreateLane() {
    dispatch(lanesActions.createLane('Active'));
  },

  onEditLane(laneId, name) {
    const updatedLane = {
      id: laneId,
    };

    if (name) {
      updatedLane.name = name;
      updatedLane.editing = false;
    } else {
      updatedLane.editing = true;
    }

    dispatch(lanesActions.updateLane(updatedLane));
  },

  onDeleteLane(laneId) {
    dispatch(lanesActions.deleteLane(laneId));
  },

  onMoveLane(sourceId, targetId) {
    dispatch(lanesActions.move('lane', sourceId, targetId));
  },
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App));
