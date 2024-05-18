export default class CellSelectionHandle {

    /**
     * @param config
     * @param config.elementSelector
     * @param config.className
     */
    constructor(config = {}) {

        // Validate and set default configuration parameters
        if (config.elementSelector === undefined) {
            throw new Error('element is required');
        }

        if (config.className === undefined) {
            config.className = 'selected';
        }

        // Assign properties based on configuration
        this.elementSelector = config.elementSelector;
        this.className = config.className;
        this.ctrl = false;

        this.handleEventsListeners(event);


    }

    // Handle all events
    handleEventsListeners() {
        this.onKeydown(event);
        this.onKeyup(event);
        this.onClick(event);
        this.selectionchange(event);
    }

    // Add event listeners for control key and click events
    onKeydown(event) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Control' || event.key === 'Meta') {
                this.ctrl = true;
            }
        });
    }

    onKeyup(event) {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Control' || event.key === 'Meta') {
                this.ctrl = false;
            }
        });

    }

    // Add event listeners for click events
    onClick(event) {
        document.addEventListener('click', (event) => {
            if (this.ctrl === true && event.target.classList.contains(this.className)) {
                event.target.classList.remove(this.className);
            } else if (this.ctrl === true && !event.target.classList.contains(this.className)) {
                event.target.classList.add(this.className);
            }
        });
    }

    // Add event listener for selection change
    selectionchange() {
        document.addEventListener("selectionchange", (event) => {
            let selection = window.getSelection();
            let baseNode = selection.baseNode.dataset.number;
            let extentNode = selection.extentNode.dataset.number;
            let cellsSelected = this.getArrayOfSelectedCells(baseNode, extentNode)

            if (!selection) {
                return;
            }

            if (!selection.baseNode || !selection.extentNode) {
                return;
            }

            if (selection.baseNode.nodeName !== 'TD') {
                return;
            }

            if (this.ctrl === false) {
                this.removeSelectedFromElements();
            }

            cellsSelected.forEach((cellNumber) => {
                let cellSelected = document.querySelector(`${this.elementSelector}[data-number="${cellNumber}"]`);
                cellSelected.classList.add(this.className);
            });
        });
    }

    // Return array of selected cells
    getArrayOfSelectedCells(baseNode, extentNode) {

        let [abscissaBaseNode, ordinateBaseNode] = baseNode.split('-').map(Number);
        let [abscissaExtentNode, ordinateExtentNode] = extentNode.split('-').map(Number);

        if (abscissaBaseNode > abscissaExtentNode) {
            [abscissaBaseNode, abscissaExtentNode] = [abscissaExtentNode, abscissaBaseNode];
        }
        if (ordinateBaseNode > ordinateExtentNode) {
            [ordinateBaseNode, ordinateExtentNode] = [ordinateExtentNode, ordinateBaseNode];
        }

        let cellNumber = [];
        for (let a = abscissaBaseNode; a <= abscissaExtentNode; a++) {
            for (let o = ordinateBaseNode; o <= ordinateExtentNode; o++) {
                cellNumber.push(`${a}-${o}`);
            }
        }
        return cellNumber;
    }

    // Remove the selected class from all elements
    removeSelectedFromElements() {
        document.querySelectorAll(`${this.elementSelector}[data-number]`).forEach(element => {
            element.classList.remove(this.className);
        });
    }


}
