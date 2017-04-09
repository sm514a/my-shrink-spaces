'use babel';

import {
  CompositeDisposable
} from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'shrink-spaces:shrink': () => this.shrink()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.shrinkSpacesView.destroy();
  },

  // serialize() {
  //   return {
  //     shrinkSpacesViewState: this.shrinkSpacesView.serialize()
  //   };
  // },

  shrink() {
    console.log('ShrinkSpaces was executed!');
    let editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      let pCurrent = editor.getCursorBufferPosition();

      let lastCursor = editor.getLastCursor();

      lastCursor.moveToPreviousWordBoundary()
      let pStart = editor.getCursorBufferPosition();

      lastCursor.setBufferPosition(pCurrent);  //return to cusror;
      lastCursor.moveToNextWordBoundary() 
      let pEnd = editor.getCursorBufferPosition();

      let string = editor.getTextInBufferRange([pStart,pEnd]);
      console.dir(pCurrent);
      console.dir(pStart);
      console.dir(pEnd); 
      console.dir("'" + string + "'");
      if (/^\s+$/.test(string)) {
        console.dir("deleted!"); 
        editor.getBuffer().setTextInRange([pStart,pEnd], " ") 
      } else {   
        lastCursor.setBufferPosition(pCurrent);
        console.dir("nothing happened!");
      }
    }
  }
};