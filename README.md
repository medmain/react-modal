# Mission: Improve modal dialogs

Our current implementation of modal dialogs (`./src/modal.js`) is a bit limited, and we'd like to improve it.

To demonstrate the main issue, we created an example (`./src/app.js`) that displays a "two-step" confirmation dialog. There is a first "Warning!" dialog that displays a second "Are you sure?" dialog. The problem is that we'd like to display the second dialog without entirely hiding the first one. So, the first dialog would remain visible but slightly darkened.

Therefore, you'll have to change the architecture to display several modals (currently stored in `_stack`) at the same time.

Also, please make the following improvements:

- Handle the 'Return' and 'Escape' keys to trigger the 'Okay' and 'Cancel' actions.
- Use Ministate (https://github.com/ministate/ministate) to manage the state of the Modal instance so we can remove the methods `registerChangeListener()`, `emitChange()`, etc.
- Ensure that everything works in IE 11 and all evergreen browsers on desktop, mobile, and tablet.
- Write proper documentation. It should include an example of use and describe the public API: `new Modal()`, `modal.dialog()`, `modal.alert()` and `modal.confirm()`.

The example has been bootstrapped by Create React App. So, to play with it, invoke `npm install` and `npm start`.

As long as you keep the same public API, feel free to change any parts of the implementation.

Good luck! :)
