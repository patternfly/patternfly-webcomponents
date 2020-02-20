var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
};
import { Component, createElement, forwardRef } from 'react';
import on from './on';
/**
* @param refs List of React refs to merge.
* @returns Merged React ref.
*/
const mergeRefs = (...refs) => el => {
  refs.forEach(ref => {
      // https://github.com/facebook/react/issues/13029#issuecomment-410002316
      if (typeof ref === 'function') {
          ref(el);
      }
      else if (Object(ref) === ref) {
          // `React.Ref.current` is read-only for regular use case, but we update it here
          ref.current = el;
      }
  });
};
/**
* @param prop A prop value.
* @param descriptor A React prop descriptor.
* @returns The corresponding attribute value for the given prop value.
*/
const convertProp = (prop, descriptor) => {
  if (!descriptor) {
      return prop;
  }
  const { event, serialize } = descriptor;
  if (event) {
      // Events are not set as props, we use DOM `addEventListener()` instead
      return undefined;
  }
  return !serialize ? prop : serialize(prop);
};
/**
* @param props A set of React props.
* @param descriptor A set of React prop desciptor.
* @returns The set of React props to set to a custom element, corresponding to the given React props.
*/
const convertProps = (props, descriptor) => Object.keys(props).reduce((acc, propName) => {
  const { [propName]: descriptorItem } = descriptor;
  const converted = convertProp(props[propName], descriptorItem);
  return typeof converted === 'undefined'
      ? acc
      : Object.assign(Object.assign({}, acc), { [(descriptorItem && descriptorItem.attribute) || propName]: converted });
}, {});
/**
* Attaches listeners of custom events, to a custom element.
* @param elem The custom element.
* @param descriptor An object, keyed by prop name, of data that may have custom event names.
* @param callback A callback function that runs as the custom events fire.
* @returns A handle that allows to release all event listeners attached.
*/
const attachEventListeners = (elem, descriptor, callback) => {
  const handles = new Set();
  Object.keys(descriptor).forEach(propName => {
      if (descriptor[propName]) {
          const { event: eventDescriptor } = descriptor[propName];
          const name = Object(eventDescriptor) !== eventDescriptor
              ? eventDescriptor
              : eventDescriptor.name;
          const options = Object(eventDescriptor) !== eventDescriptor ? undefined : eventDescriptor.options;
          if (name) {
              handles.add(on(elem, name, event => {
                  callback(propName, event);
              }, options));
          }
      }
  });
  return {
      release() {
          handles.forEach(handle => {
              handle.release();
              handles.delete(handle);
          });
          return null;
      },
  };
};
/**
* @param name The tag name of the custom element.
* @param descriptor A descriptor for a set of React props for attributes of a custom element.
* @returns A React component working as a wrapper for the given custom element.
* @example
* import { render } from 'react-dom';
* import createCustomElementType, { booleanSerializer } from '/path/to/createCustomElementType';
*
* const BXDropdown = createCustomElementType('bx-dropdown', {
*   disabled: {
*     // Sets `disabled` attribute when the React prop value is truthy, unsets otherwise
*     serialize: booleanSerializer,
*   },
*   helperText: {
*     // Maps `helperText` React prop to `helper-text` attribute
*     attribute: 'helper-text',
*   },
*   onBeforeSelect: {
*     // Sets `onBeforeSelect` React prop value as a listener of `bx-dropdown-beingselected` custom event
*     event: 'bx-dropdown-beingselected',
*   },
* });
*
* render(
*   (
*     <BXDropdown
*       disabled={true}
*       helperText="some-helper-text"
*       onBeforeSelect={event => { console.log('bx-dropdown-beingselected is fired!', event); }}>
*       <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
*       <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
*       <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
*     </BXDropdown>
*   )
*   document.body
* );
*/
const createReactCustomElementType = (name, descriptor) => {
  /**
   * A React component working as a wrapper for the custom element.
   */
  class CustomElementType extends Component {
      constructor() {
          super(...arguments);
          /**
           * The handle that allows to release all event listeners attached to this custom element.
           */
          this._eventListenersHandle = null;
          /**
           * The callback function that runs as the custom events fire.
           * @param propName The React prop name associated with the event listener.
           * @param event The event.
           */
          this._handleEvent = (propName, event) => {
              const { [propName]: listener } = this.props;
              if (listener) {
                  listener.call(event.currentTarget, event);
              }
          };
          /**
           * Handles getting/losing the React `ref` object of this custom element.
           * @param elem The custom element.
           */
          this._handleElemRef = (elem) => {
              if (this._eventListenersHandle) {
                  this._eventListenersHandle.release();
                  this._eventListenersHandle = null;
              }
              if (elem) {
                  this._eventListenersHandle = attachEventListeners(elem, descriptor, this._handleEvent);
              }
          };
      }
      render() {
          const _a = this.props, { children, innerRef } = _a, props = __rest(_a, ["children", "innerRef"]);
          const mergedRef = mergeRefs(innerRef, this._handleElemRef);
          return createElement(name, Object.assign({ ref: mergedRef }, convertProps(props, descriptor)), children);
      }
  }
  return forwardRef((props, ref) => createElement(CustomElementType, Object.assign(Object.assign({}, props), { innerRef: ref })));
};
/**
* @param value A React prop value.
* @returns Serialized version of React prop value, as a boolean attribute in a custom element.
*/
export const booleanSerializer = value => (!value ? undefined : '');
/**
* @param value A React prop value.
* @returns Serialized version of React prop value, as a number attribute in a custom element.
*/
export const numberSerializer = value => String(value);
/**
* @param value A React prop value.
* @returns Serialized version of React prop value, as a object attribute in a custom element.
*/
export const objectSerializer = JSON.stringify;
export default createReactCustomElementType;
