# CellSelectionHandle

## Description
The `CellSelectionHandle` class enables managing the selection of cells in an HTML table, marking selected cells using a CSS class. It supports multiple selections with `Ctrl` or `Cmd` keys and tracks mouse events to enhance user interaction.

## Features
- Select cells in an HTML table.
- Use a CSS class to mark selected cells.
- Handle keyboard inputs for multiple selections with `Ctrl` or `Cmd`.
- Track mouse position to enable or disable selection dynamically.

## Configuration
The class requires a configuration object with the following properties:
- `tableSelector`: CSS selector to identify the table cells.
- `className`: Optional. Name of the CSS class to apply to selected cells (default: 'selected').

## Usage
To use this class, instantiate it by passing an appropriate configuration object. Here’s a basic example:

```javascript
const selectionConfig = {
    tableSelector: '#myTable', // Ensure this ID matches your table in the HTML
    className: 'myCustomClass' // Optional. CSS class for selected cells
};
const cellSelector = new CellSelectionHandle(selectionConfig);
```

## Methods
- `handleEventsListeners()`: Sets up the required event listeners.
- `getSelectedCells()`: Returns an array of currently selected cells.
- `clearTextSelection()`: Clears the text selection from the window, useful for cleaning up after mouse selections.

## Events
The class handles several events to optimize user experience:
- `keydown` and `keyup` for managing `Ctrl` or `Cmd` keys.
- `mousedown` and `mouseup` for starting and ending mouse selection.
- `mouseenter` and `mouseleave` to detect whether the mouse is over the table.

## Example
Ensure your HTML table is properly set up with IDs and classes that match those specified in the `CellSelectionHandle` instance configuration.

```html
<table id="myTable">
   <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
</table>
```

## Conclusion
`CellSelectionHandle` is a flexible and configurable JavaScript class that enhances interaction with HTML tables through advanced selection features.

## Licence
```
Feel free to copy, modify the example paths and repository link according to your project structure and GitHub repository URL. Let me know if you need any further adjustments!
```