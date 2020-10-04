# MuiForm

## How it works

It relies heavily on _Context_ to keep the components up to date. This can cause some re-renders unless you take care of that (more about that in _"Create-custom-field section"_).

## How to use

You can either use it as it is, or extend and make complex Fields by the HOC (maybe a hook could come later)
Start by importing the `Form`, you can also import the Fields you want, for now only `Input` and `Select` is supported. Include a submit button as well (wrap in div unless you want it streched).

### Basic usages

See example below

```
import Form, { Input, Select } from "muiform";
import MenuItem form "@material-ui/core/MenuItem";
import Button form "@material-ui/core/Button";

export default () => { // form-page

  function submit (values) {
    console.log('yay', values); // { a: "", b: "" }
  }

  return (
    <Form onSubmit={submit}>
      <Input name="a">
      <Select name="b">
        <MenuItem value="b1">B1</MenuItem>
        <MenuItem value="b2">B2</MenuItem>
      </Select>

      <div>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
```

And thats pretty much it

## Create custom Field

To create a new custom field you need to wrap it with the **HOC** _"withForm"_, I like to then wrap it with **React.memo** and set a **equal** function to skip unecessary re-renders (there is a isEqual function provided _- more about it later_).

The _props_ you give to your custom-field will live inside the _"prop"_ of the _"props"_ (sounds more tricky then it is).

withForm takes 2 argument,

1. component
2. defaultValue // defaults to null

```
import { withForm, isEqual } from "muiform";

// material-ui imports
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


// has 2 input fields
const CustomField = withForm(
  // note props (these are your props)
  React.memo(({ value, error, errorMessage, setValue, props }) => {
    const { label, ...rest } = props;

    // will have default value
    const [customValue, setCustomValue] = React.useState(value);

    function handleChange (e) {
      const { name, value } = e.target;
      const newValue = { ...customValue, [name]: value };

      setCustomValue(newValue);

      if (newValue.foo && newValue.bar) {
        setValue(newValue); // here we actually set the form value
      }
    }

    return (
      <FormControl
        {...rest}
        error={error}
        helperText={errorMessage}
      >
        {label && <InputLabel htmlFor={props.name}>{label}</InputLabel>}
        <input type="text" name="foo" value={customValue.foo} onChange={handleChange} />
        <input type="text" name="foo" value={customValue.bar} onChange={handleChange} />
        {Boolean(errorMessage) && (
          <FormHelperText>{errorMessage}</FormHelperText>
        )}
      </FormControl>
    );
  }, isEqual) // not the equal method here
, { foo: 'hello', bar: 'world' });

export default CustomField;
```

## Field props

The props that we can give the field are the following (and custom props ofc..)
| name | value |
|:--|:--:|
| value | any |
| hidden | bool |
| required | bool |
| validation | _function_ or _RegExp_ |
| errorMessage | _string_ or _ReactNode_ |

The props recieved when using HOC
| name | value |
|:--|:--:|
| value | any | our value |
| values | object | we can reference others value thought this object |
| setValue | function(value, <name>) | to set fields value (we can also set another's value if name is provided) |
| error | bool | |
| errors | object | same as values but with errors |
| setError | function(value, <name>) | works the same as _setValue_ |
| errorMessage | _string_ or _ReactNode_ | this is null if no _error && isTouched_ |
| isTouched | bool | |
| required | bool | |
| validation | _function_ or _RegExp_ | in case you want it :shrug: |
| defaultValue | any | the default value provided as a second argument for _withForm_ |

## isEqual

the isEqual checks if _isTouched_, _error_ has changed first
if not then it checks if value is the same as before
(since value could be an _array_, _object_ or plain) it does shallow checking for the first two

If you have a complex Field that is referencing another field, best would be to make a new equal funciton in order to receive this change.

## Known limitations

for now the defaultValue is set on the component and not when component is used (for my case this was needed..)
