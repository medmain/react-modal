# React Modal by Medmain

`Modal` class can display a dialog window to ask for confirmation or to notify the user about an important action.

All methods used to display the modal return a Promise that resolves with a value when the modal is closed, by either pushing a button or using the "Escape" keyboard key.

## Get started

```js
const GetStarted = () => {
  const start = async () => {
    const answer = await modal.confirm('Do you want to delete it?', {width: 700});
    console.info(answer); // => true or false
  };
  return (
    <div>
      <RadiumStarterRoot>
        {modal.createElement()}
        <Button onClick={start}>START</Button>
      </RadiumStarterRoot>
    </div>
  );
};
```

## API Documentation

### Overview

- Constructor
- `.confirm()` method
- `.alert()` method
- `.dialog()` method

### Details

#### Constructor

Create an instance of the Modal class, setting the default labels of the OK and Cancel buttons.

```js
const modal = new Modal(options);
```

`options` argument is an object with 2 properties:

| Key               | Type               | Default value | Description                                             |
| ----------------- | ------------------ | ------------- | ------------------------------------------------------- |
| okButtonTitle     | string or function | `"OK"`        | Label of the primary button, used to confirm the action |
| cancelButtonTitle | string or function | `"Cancel"`    | Label of the button used to cancel the action           |

#### `dialog(options)` method

Display a dialog with a title, a message and any group of buttons.
Resolve with any value associated with the buttons.

```js
const answer = await modal.dialog(options);
```

One argument: an `options` object with the following properties:

| Key     | Type               | Default value | Description                                     |
| ------- | ------------------ | ------------- | ----------------------------------------------- |
| title   | String             | undefined     | Title of the modal window                       |
| message | String or function | undefined     | Message displayed in the modal, under the title |
| width   | String             | undefined     | Style width attribute E.g. `"400px"`            |
| padding | String             | undefined     | Style padding attribute E.g. `"1rem"`           |
| buttons | Array              | []            | Array of buttons objects                        |

The 2 following methods `confirm` and `alert` extend `dialog` behavior and can be considered as handy "shortcut" to perform some tasks.

#### `alert(message, options)` method

Display a modal window with a single button that closes the window.
Return a Promise that resolves when the modal is closed.

Used to display messages that the user can only dismiss by pushing the button, "success" or "error" messages for example.

```js
await modal.alert(message, options);
```

Arguments:

- `message`: the message displayed in the modal, as a String or a function, to allow JSX syntax
- `options` (optional): object used to customize the default behavior

| Key      | Type          | Default value     | Description                                                       |
| -------- | ------------- | ----------------- | ----------------------------------------------------------------- |
| title    | String        | undefined         | Title of the modal window                                         |
| width    | String        | undefined         | Style width attribute E.g. `"400px"`                              |
| padding  | String        | undefined         | Style padding attribute E.g. `"1rem"`                             |
| okButton | button object | Default OK button | Button object to override the behavior of the default "OK" button |

#### `confirm(message, options)` method

Display a modal window with a given message and 2 buttons.

Return a Promise that resolves with the `value` assigned to one of 2 buttons that was clicked.
By default the OK button makes the Promise resolves with `true` and the Cancel button makes the Promise resolve with `false`.

Useful to ask for user confirmation before an important action.

The arguments are the same as for `.alert()` method, except the extra `cancelButton` option.

```js
const answer = await modal.confirm(message, options);
```

Arguments:

- `message`: the message displayed in the modal, as a String or a function, to allow JSX syntax
- `options` (optional): object used to customize the default behavior

| Key          | Type          | Default value         | Description                                                           |
| ------------ | ------------- | --------------------- | --------------------------------------------------------------------- |
| title        | String        | undefined             | Title of the modal window                                             |
| width        | String        | undefined             | Style width attribute E.g. `"400px"`                                  |
| padding      | String        | undefined             | Style padding attribute E.g. `"1rem"`                                 |
| okButton     | button object | Default OK button     | Button object to override the behavior of the default "OK" button     |
| cancelButton | button object | Default Cancel button | Button object to override the behavior of the default "Cancel" button |

Minimal example:

```js
const answer = await modal.confirm('Are your really sure?');
if (answer) {
  // OK button was clicked
} else {
  // Cancel button was clicked
}
```

### Button object

All methods accept button objects to setup the buttons displayed in the modal footer.
Buttons are used to make the modal Promise resolve with a given value when the modal is closed.

For every button, provide either a `value` or a custom `onClick` handler, calling by yourself the `close` argument of the handler.

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
| value     | Any                        | true          | Value resolved by the Promise modal when clicked                             |
| title     | String or function         | undefined     | Button label as a string or a function `() => <span>OK</span>`               |
| onClick   | Function `({close}) => {}` | undefined     | Function called to customize the behavior when the button is clicked         |
| isDefault | Boolean                    | false         | Set to true to assign primary button style and listen to keyboard ENTER key |
