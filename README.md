# React Modal by Medmain

## API Documentation

`Modal` class can display a dialog window to ask for confirmation or to notify the user about an important action.

All methods used to display the modal return a Promise that resolves with a value when the modal is closed, by either pushing a button or using the "Escape" keyboard key.

To see the components in action, check the storybook: https://medmain-modal.surge.sh/

### Get started

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
| isDefault | Boolean                    | false         | Set to true to assign primary button style and listen to skeyboard ENTER key |

## Development

Start the application with `create-react-app`

```
npm start
```


Start the storybook:

```
npm run storybook
```

## About the implementation

### Why `React Modal` is included as a dependency

I decided to rely on a solid and well established basis to deal with the DOM interaction and the overlay handling: [React Modal](https://github.com/reactjs/react-modal)

Reason:

- Solid support provided by the React team
- Accessibility
- Supports keyboard shortcuts (one of the requirements)
- Supports IE 11 (an other requirement!)
- Enough low-level to let developers build their own dialog logic on top of it

### How to deal with the state

`React Modal` only provides components to display overlays but it lets the developers handle the state by themselves.

We need a way to trigger the modals when calling a function, in an imperative way.

My first approach was to use the context to provide a stateless component that handles the state open or close of a given modal.

Basically, the component provides a `showModal` function that is able to display **any component** inside a modal.

```js
<ModalConsumer>
  {({showModal}) => <Button onClick={() => showModal(MyModal)}>NEXT STEP</Button>}
</ModalConsumer>
```

One of the requirements was to be able to display several modal opened in the same time, so I implemented a stack of modals in the context, handling an array of components instead of a single component.

Later, when I compared the existing solution and my implementation, I noticed that CSS transition was missing.

To be able to show transition, we need to mount every instance of `React Modal` with the props `isOpen` set to false, and later when we call showModal, we need set it to `true`.

Considering that we are not going to show more than N modals in the same time, I implemented a "slots" feature.
Every time, we need modals from a parent component, we are going to include a stack of N slots.
Every slot is a ReactModal instance.
Every instance will contain, as a child, either the actual component to render or an "empty slot", that is just a dummy component that will never be shown to the screen.

Initial stack:

```js
<ReactModal isOpen={false}>
  <EmptySlot />
</ReactModel>
<ReactModal isOpen={false}>
  <EmptySlot />
</ReactModel>
<ReactModal isOpen={false}>
  <EmptySlot />
</ReactModel>
```

After we call `showModal(MyDialog1)`:

```js
<ReactModal isOpen={true}>
  <MyDialog1 />
</ReactModel>
<ReactModal isOpen={false}>
  <EmptySlot />
</ReactModel>
<ReactModal isOpen={false}>
  <EmptySlot />
</ReactModel>
```

After we call `showModal(MyDialog2)`, without closing MyDialog2, in order to show MyDialog2 on top of MyDialog1:

```js
<ReactModal isOpen={true}>
  <MyDialog1 />
</ReactModel>
<ReactModal isOpen={true}>
  <MyDialog2 />
</ReactModel>
<ReactModal isOpen={false}>
  <EmptySlot />
</ReactModel>
```

### Why a component approach

I studied the existing API and I tried to go from an imperative way to a more "component oriented" approach, while preserving the existing API.

The main reason is that I love the ability to test components in isolation, without any context.

An other reason is that it's very important to design components with flexibility in mind (using composition with `children` as much as possible), because we can never predict the future, for example at some point the client may request a `Confirm` dialog that includes an existing component instead of just showing plain text.

Using a tool like Storybook it's possible to write stories that are kind of visual testing specs.

I tried to make things as decoupled as possible, to be able to test every functionality easily, creating several **stateless components** in the `./sec/medmain-modal/components` folder.

At the lowest level there is a `<Modal>` component.

Then `<Dialog>` (called by `modal.dialog`) is an implementation if `<Modal>` where the content is set to a given title and a message.

`<Confirm>` goes further by setting the 2 buttons, while allowing some flexibility about the buttons.

The logic about the buttons was not trivial (`value` VS. `onClick` handler), so I created specific components and related stories.

`<Alert>` is even a more specialized version of the `<Dialog>` component.

Once we have all these components, we can create an API that provides kind of shortcuts to call `showModal` with the right component.
