# CellSelectionHandle Class Documentation

## Introduction
The `CellSelectionHandle` class provides functionality for selecting table cells within a web page using keyboard and mouse interactions. It supports toggling the selection state of cells and handles complex selection patterns, such as selecting multiple cells while holding the Control (Ctrl) or Meta key.

## Configuration
To instantiate a `CellSelectionHandle` object, a configuration object must be passed with the following properties:

- **elementSelector**: CSS selector for the table cell elements (required).
- **className**: The class name to be toggled on selected cells. Defaults to 'selected' if not provided.

## Methods
### constructor(config)
Initializes the `CellSelectionHandle` with the specified configuration. Sets up event listeners for keyboard and mouse interactions to manage cell selections based on the user input.

### handleEventsListeners()
Sets up the necessary event listeners.

### onKeydown()
Listener for key down events to enable selection mode.

### onKeyup()
Listener for key up events to disable selection mode.

### onClick()
Handles click events for selecting or deselecting cells.

### selectionchange()
Manages changes in selection within the document.

### getArrayOfSelectedCells(baseNode, extentNode)
Calculates and returns an array of cell identifiers that fall within the range defined by `baseNode` and `extentNode`. Handles both row and column spanning to ensure all relevant cells are included in the selection.

### removeSelectedFromElements()
Removes the selection class from all elements that are currently marked as selected. This method is typically called to clear selections when the Control or Meta key is released.

## Event Handling
Event listeners are set up to handle various user actions:
- **keydown and keyup**: Detect when the Control or Meta key is pressed or released to enable or disable multi-selection mode.
- **click**: Manages the addition or removal of the selection class on cell elements when clicked, depending on whether the Control or Meta key is pressed.
- **selectionchange**: Monitors changes in text selection within the table and adjusts cell selections accordingly.

## Example Usage

```javascript
const cellSelectionConfig = {
    elementSelector: '.myTable td',
    className: 'selected'
};

const myCellSelection = new CellSelectionHandle(cellSelectionConfig);

// Now, cells can be selected by clicking while holding the Control or Meta key.
// Selected cells will have the 'selected' class toggled.
```

This documentation and configuration setup allows developers to easily integrate and use the `CellSelectionHandle` class in projects that require interactive table cell selection.