# CellSelectionHandle

A JavaScript class for managing the selection of table cells with support for multi-selection using the Control (or Meta) key.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Methods](#methods)
- [Events](#events)
- [Example](#example)
- [License](#license)

## Installation

Clone the repository or download the `CellSelectionHandle` class file to your project.

```sh
git clone https://github.com/yourusername/CellSelectionHandle.git
```

## Usage

1. Import the `CellSelectionHandle` class into your project.

    ```javascript
    import CellSelectionHandle from './path/to/CellSelectionHandle';
    ```

2. Initialize the `CellSelectionHandle` with the required configuration.

    ```javascript
    const cellSelection = new CellSelectionHandle({
        elementSelector: '.table-cell',
        className: 'highlighted'
    });
    ```

## Configuration

The `CellSelectionHandle` class accepts a configuration object with the following properties:

- **`elementSelector`** (string, required): The CSS selector to identify table cells.
- **`className`** (string, optional): The CSS class name to be added to selected cells. Defaults to `'selected'`.

## Methods

### `handleEventsListeners()`

Sets up event listeners for keydown, keyup, mousedown, mouseup, and selectionchange events.

### `handleKeydown(event)`

Handles the keydown event to detect when the Control or Meta key is pressed.

### `handleKeyup(event)`

Handles the keyup event to detect when the Control or Meta key is released.

### `handleMouseDown()`

Handles the mousedown event to add currently selected cells to the old selection if Control is pressed.

### `handleMouseUp()`

Handles the mouseup event to clear the old selection if Control is not pressed.

### `handleSelectionChange()`

Handles the selectionchange event to update the cell selection.

### `getSelectedCells()`

Retrieves the currently selected cells based on the selection range.

### `getArrayOfSelectedCells(baseNode, extentNode)`

Calculates the range of cells between the base and extent nodes.

### `removeSelectedFromElements()`

Removes the selected class from all elements matching the elementSelector.

## Events

The class listens to the following events to manage cell selection:

- `keydown`
- `keyup`
- `mousedown`
- `mouseup`
- `selectionchange`

## Example

Here is an example of how to use the `CellSelectionHandle` class in a project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cell Selection Example</title>
    <style>
        .highlighted {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td class="table-cell" data-number="1-1">1-1</td>
            <td class="table-cell" data-number="1-2">1-2</td>
        </tr>
        <tr>
            <td class="table-cell" data-number="2-1">2-1</td>
            <td class="table-cell" data-number="2-2">2-2</td>
        </tr>
    </table>

    <script type="module">
        import CellSelectionHandle from './path/to/CellSelectionHandle.js';

        const cellSelection = new CellSelectionHandle({
            elementSelector: '.table-cell',
            className: 'highlighted'
        });
    </script>
</body>
</html>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to modify the example paths and repository link according to your project structure and GitHub repository URL. Let me know if you need any further adjustments!