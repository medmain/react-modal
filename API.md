# Modal API Documentation

Current API analysis

`Modal` class can display a dialog window to ask for confirmation or to notify the user about an important action.

All methods used to display the modal return a Promise that resolves with the value associated with the buttons.

## Overview

- Constructor
- `.confirm()` method
- `.alert()`
- `.dialog()`

## Details

### Constructor

Create an instance of the Modal class, setting the default labels of the OK and Cancel buttons.

```js
const modal = new Modal(options);
```

Options parameter:

```
{
  okButtonTitle,
  cancelButtonTitle
}
```

| Key               | Type               | Default value | Description                                             |
| ----------------- | ------------------ | ------------- | ------------------------------------------------------- |
| okButtonTitle     | string or function | `"OK"`        | Label of the primary button, used to confirm the action |
| cancelButtonTitle | string or function | `"Cancel"`    | Label of the button used to cancel the action           |

## confirm(message, options) method

Return a Promise that resolves the `value` assigned to the button that was clicked

```js
const answer = await modal.confirm(message, options);
```

Options object:

```
{
  title,
  width,
  okButton
}
```

| Key      | Type                      | Default value     | Description                                                           |
| -------- | ------------------------- | ----------------- | --------------------------------------------------------------------- |
| title    | String                    | undefined         | Title of the modal window                                             |
| width    | String                    | undefined         | Style width attribute E.g. `"400px"`                                  |
| okButton | button object (see below) | Default OK button | A "button" object to override the behavior of the default "OK" button |

## Button object

```
{
  value,
  title,
  onClick,
  isDefault
}
```

| Key       | Type                       | Default value | Description                                                                  |
| --------- | -------------------------- | ------------- | ---------------------------------------------------------------------------- |
| value     | Any                        | true          | Value resolved by the Promise returned by the modal method                   |
| title     | String or function         | undefined     | Label of the button as a string or a function `() => <span>OK</span>`        |
| onClick   | Function `({close}) => {}` | undefined     | Function called to customize the behavior when the button is clicked         |
| isDefault | Boolean                    | false         | Set to true to assign primary button style and trigger to keyboard ENTER key |
