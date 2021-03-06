import { RadioComponent } from '../radio/Radio';
import _each from 'lodash/each';
import _isArray from 'lodash/isArray';
export class SelectBoxesComponent extends RadioComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.component.inputType = 'checkbox';
  }

  elementInfo() {
    let info = super.elementInfo();
    info.attr.name += '[]';
    info.attr.type = 'checkbox';
    return info;
  }

  /**
   * Only empty if the values are all false.
   *
   * @param value
   * @return {boolean}
   */
  isEmpty(value) {
    let empty = true;
    for (let key in value) {
      if (value[key]) {
        empty = false;
        break;
      }
    }

    return empty;
  }

  getValue() {
    let value = {};
    _each(this.inputs, (input) => {
      value[input.value] = !!input.checked;
    });
    return value;
  }

  /**
   * Set the value of this component.
   *
   * @param value
   * @param flags
   */
  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (_isArray(value)) {
      this.value = {};
      _each(value, (val) => {
        this.value[val] = true;
      });
    }
    else {
      this.value = value ? value : {};
    }

    _each(this.inputs, (input) => {
      if (this.value[input.value] == undefined) {
        this.value[input.value] = false;
      }
      input.checked = !!this.value[input.value];
    });

    this.updateValue(flags);
  }
}
