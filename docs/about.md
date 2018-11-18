# About the implementation

## Why `React Modal`

I decided to rely on a solid and well established basis to deal with the DOM interaction and the overlay handling: [React Modal](https://github.com/reactjs/react-modal)

Reason:

- Solid support provided by the React team
- Accessibility
- Supports keyboard shortcuts (one of the requirements)
- Supports IE 11 (an other requirement!)
- Enough low-level to let developers build their own dialog logic on top of it

## How to deal with the state

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

## Why a component approach

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

The result is the API described in `API.md` file.
