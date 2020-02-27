import {ComplexAttributeConverter} from "lit-element/src/lib/updating-element";

export function classnames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
};

/*
  This is an example Attribute/Property converter to be used on a 'property' of lit-elememnt component class.
  Left this here as a reference, we know we will most likely need customer converters.
 */
export const booleanConverter: ComplexAttributeConverter = {
  toAttribute(value: any): unknown {
    return value ? '' : null;
  },

  fromAttribute(value: any) {
    console.log("Attr Value: " + value)
    let retVal;

    // test if attribute is Boolean type.
    if (typeof value === "boolean" && !Boolean(value)){
      console.log("Boolean Value: " + Boolean(value))
      retVal = "false";
    } else {
      retVal = value;
    }

    if (null === retVal || retVal === "false") {
      console.log("return: null")
      return null;
    } else  {
      console.log("return: true")
      return true;
    }
  }
};
